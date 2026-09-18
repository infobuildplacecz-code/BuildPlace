// Node.js script to fetch latest posts from @buildplacecz Telegram channel
// and update public/data-telegram-orders.json

import fs from 'fs';
import https from 'https';

const CHANNEL_URL = 'https://t.me/s/buildplacecz';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
      }
    ).on('error', reject);
  });
}

function cleanHtmlText(raw) {
  let text = raw.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<i class="emoji"[^>]*><b>(.*?)<\/b><\/i>/gi, '$1');
  text = text.replace(/<[^>]+>/g, '');
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

async function run() {
  console.log('Fetching Telegram channel:', CHANNEL_URL);
  const html = await fetchHtml(CHANNEL_URL);

  const posts = [];
  const postPattern = /data-post="buildplacecz\/(\d+)"/g;
  const matches = [...html.matchAll(postPattern)];

  for (const match of matches) {
    const postNum = parseInt(match[1], 10);
    const postStart = match.index;
    const postChunk = html.slice(postStart, postStart + 5000);

    const textMatch = postChunk.match(
      /class="[^"]*tgme_widget_message_text[^"]*"[^>]*>([\s\S]*?)<\/div>/
    );
    const timeMatch = postChunk.match(/<time datetime="([^"]+)"[^>]*>([^<]+)<\/time>/);
    const viewsMatch = postChunk.match(
      /<span class="tgme_widget_message_views">([^<]+)<\/span>/
    );

    if (textMatch) {
      const cleanText = cleanHtmlText(textMatch[1]);
      const lines = cleanText.split('\n').map((l) => l.trim()).filter(Boolean);

      let dateStr = '';
      let cityStr = '';
      let categoryStr = '';
      let priceStr = '';
      const bullets = [];

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
          : cleanText.slice(0, 120);

      posts.push({
        id: postNum,
        postId: `buildplacecz/${postNum}`,
        url: `https://t.me/buildplacecz/${postNum}`,
        date: dateStr || (timeMatch ? timeMatch[2] : 'Сьогодні'),
        datetime: timeMatch ? timeMatch[1] : '',
        time: timeMatch ? timeMatch[2] : '',
        views: viewsMatch ? viewsMatch[1] : '1.5k',
        city: cityStr || 'Česká republika',
        category: categoryStr || 'Будівельні роботи',
        title: categoryStr || 'Будівельне замовлення',
        summary,
        price: priceStr || 'Оплата: договірна',
        fullText: cleanText,
        bullets,
        lines,
      });
    }
  }

  // Deduplicate and sort descending
  const uniqueMap = new Map();
  posts.forEach((p) => uniqueMap.set(p.id, p));
  const sorted = Array.from(uniqueMap.values()).sort((a, b) => b.id - a.id);

  console.log(`Parsed ${sorted.length} unique orders from Telegram channel.`);
  fs.writeFileSync('public/data-telegram-orders.json', JSON.stringify(sorted, null, 2), 'utf-8');
  console.log('Saved to public/data-telegram-orders.json');
}

run().catch((err) => {
  console.error('Update script failed:', err);
  process.exit(1);
});
