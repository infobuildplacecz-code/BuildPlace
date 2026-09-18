import { TelegramOrder } from '../types';
import { FALLBACK_TELEGRAM_ORDERS } from '../data/fallbackOrders';

const LOCAL_STORAGE_KEY = 'buildplace_live_orders_cache_v2';
const LAST_SYNC_KEY = 'buildplace_last_sync_timestamp';

// Helper to parse HTML from Telegram channel preview into structured orders
export function parseTelegramChannelHtml(htmlString: string): TelegramOrder[] {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const messageElements = doc.querySelectorAll('.tgme_widget_message_wrap');
    
    if (!messageElements || messageElements.length === 0) {
      return [];
    }

    const parsed: TelegramOrder[] = [];

    messageElements.forEach((wrap) => {
      const msg = wrap.querySelector('.tgme_widget_message');
      const postAttr = msg?.getAttribute('data-post'); // e.g. "buildplacecz/270"
      if (!postAttr) return;

      const numMatch = postAttr.match(/buildplacecz\/(\d+)/i);
      const postNum = numMatch ? parseInt(numMatch[1], 10) : 0;
      if (!postNum) return;

      const textEl = wrap.querySelector('.tgme_widget_message_text');
      if (!textEl) return;

      // Extract raw text preserving line breaks
      const clone = textEl.cloneNode(true) as HTMLElement;
      // Convert emoji tags to text if any
      clone.querySelectorAll('i.emoji').forEach((em) => {
        const bold = em.querySelector('b');
        if (bold) {
          em.replaceWith(bold.textContent || '');
        }
      });
      // Replace <br> with \n
      clone.querySelectorAll('br').forEach((br) => {
        br.replaceWith('\n');
      });

      const fullText = (clone.textContent || '').trim();
      if (!fullText) return;

      const timeEl = wrap.querySelector('time');
      const timeStr = timeEl?.textContent?.trim() || '';
      const datetimeStr = timeEl?.getAttribute('datetime') || '';

      const viewsEl = wrap.querySelector('.tgme_widget_message_views');
      const viewsStr = viewsEl?.textContent?.trim() || '1.5k';

      // Parse structured lines
      const lines = fullText
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

      let dateStr = '';
      let cityStr = '';
      let categoryStr = '';
      let priceStr = '';
      const bullets: string[] = [];

      for (const line of lines) {
        if (line.includes('📅') || /^\d{2}\.\d{2}\.\d{4}/.test(line)) {
          dateStr = line.replace(/^[📅\s]+/, '').trim();
        } else if (line.includes('📍')) {
          cityStr = line.replace(/^[📍\s]+/, '').trim();
        } else if (
          /работы|Práce|práce|монтаж|укладка|утепление|ремонт|строительство|плитка|кровля|фасад|сантех|электр|столяр|бетон|монолит/i.test(
            line
          )
        ) {
          if (!categoryStr) categoryStr = line;
        } else if (
          line.includes('💰') ||
          line.includes('Оплата:') ||
          line.includes('Kč') ||
          line.includes('Platba:')
        ) {
          priceStr = line.replace(/^[💰\s]+/, '').trim();
        } else if (line.startsWith('▪') || line.startsWith('■') || line.startsWith('-')) {
          bullets.push(line.replace(/^[▪■\-\s]+/, '').trim());
        }
      }

      if (!categoryStr) {
        for (const l of lines) {
          if (!l.includes('📅') && !l.includes('📍') && !l.includes('#') && !l.includes('Интересуют')) {
            categoryStr = l;
            break;
          }
        }
      }

      const summary =
        bullets.length > 0
          ? bullets.slice(0, 3).join(' • ')
          : lines.length > 3
          ? lines[3]
          : fullText.slice(0, 120);

      parsed.push({
        id: postNum,
        postId: `buildplacecz/${postNum}`,
        url: `https://t.me/buildplacecz/${postNum}`,
        date: dateStr || timeStr || 'Сьогодні',
        datetime: datetimeStr,
        time: timeStr,
        views: viewsStr,
        city: cityStr || 'Česká republika',
        category: categoryStr || 'Будівельні роботи',
        title: categoryStr || 'Будівельне замовлення',
        summary: summary,
        price: priceStr || 'Оплата: договірна / пряма',
        fullText: fullText,
        bullets: bullets,
      });
    });

    // Sort descending (newest post first)
    parsed.sort((a, b) => b.id - a.id);
    return parsed;
  } catch (err) {
    console.warn('Failed to parse telegram html:', err);
    return [];
  }
}

// Fetch live posts from Telegram channel using multiple fallback strategies
export async function fetchLiveTelegramOrders(): Promise<{
  orders: TelegramOrder[];
  source: 'telegram-live' | 'github-cache' | 'offline';
  timestamp: number;
}> {
  const channelUrl = 'https://t.me/s/buildplacecz';
  const now = Date.now();

  // 1. Try Live CORS proxies (fetches real-time HTML from t.me/s/buildplacecz)
  const proxyEndpoints = [
    // AllOrigins JSON proxy (reliable for GitHub Pages)
    `https://api.allorigins.win/get?url=${encodeURIComponent(channelUrl)}&disableCache=true`,
    // Direct raw proxy
    `https://corsproxy.io/?url=${encodeURIComponent(channelUrl)}`,
  ];

  for (const proxyUrl of proxyEndpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const res = await fetch(proxyUrl, {
        signal: controller.signal,
        headers: { Accept: 'application/json, text/html' },
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        let html = '';
        if (proxyUrl.includes('allorigins.win/get')) {
          const data = await res.json();
          html = data.contents || '';
        } else {
          html = await res.text();
        }

        if (html && html.includes('data-post=')) {
          const liveOrders = parseTelegramChannelHtml(html);
          if (liveOrders.length > 0) {
            // Check for newly added orders compared to fallback/cache
            const cached = getStoredCachedOrders();
            const highestKnownId = cached.length > 0 ? cached[0].id : (FALLBACK_TELEGRAM_ORDERS[0]?.id || 0);

            const enriched = liveOrders.map((ord) => ({
              ...ord,
              isNew: ord.id > highestKnownId,
            }));

            // Save to LocalStorage for offline resilience
            saveOrdersToStorage(enriched);
            localStorage.setItem(LAST_SYNC_KEY, now.toString());

            return {
              orders: enriched,
              source: 'telegram-live',
              timestamp: now,
            };
          }
        }
      }
    } catch {
      // Continue to next strategy
    }
  }

  // 2. Try static repo data file: public/data-telegram-orders.json (works reliably on GitHub Pages & static hosting!)
  try {
    const rawBase = typeof window !== 'undefined' ? window.location.pathname : './';
    const cleanBase = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase.replace(/\/[^/]*$/, '');
    const candidatePaths = [
      './data-telegram-orders.json',
      `${cleanBase}/data-telegram-orders.json`,
      '/data-telegram-orders.json',
    ];

    for (const jsonPath of candidatePaths) {
      try {
        const res = await fetch(`${jsonPath}?t=${now}`);
        if (res.ok) {
          const data: TelegramOrder[] = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            saveOrdersToStorage(data);
            return {
              orders: data,
              source: 'github-cache',
              timestamp: now,
            };
          }
        }
      } catch {
        // next candidate
      }
    }
  } catch {
    // Fall through
  }

  // 3. Fallback to LocalStorage or built-in bundle
  const cached = getStoredCachedOrders();
  if (cached.length > 0) {
    return {
      orders: cached,
      source: 'offline',
      timestamp: parseInt(localStorage.getItem(LAST_SYNC_KEY) || '0', 10) || now,
    };
  }

  // 4. Default bundled orders (20 real orders from channel)
  return {
    orders: FALLBACK_TELEGRAM_ORDERS,
    source: 'offline',
    timestamp: now,
  };
}

export function getStoredCachedOrders(): TelegramOrder[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return [];
}

export function saveOrdersToStorage(orders: TelegramOrder[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // quota exceeded or private mode
  }
}
