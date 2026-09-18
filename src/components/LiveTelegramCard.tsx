import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Send,
  ExternalLink,
  RefreshCw,
  MapPin,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Radio,
  Share2,
} from 'lucide-react';
import { Language, TelegramOrder } from '../types';
import { fetchLiveTelegramOrders, getStoredCachedOrders } from '../services/telegramService';
import { FALLBACK_TELEGRAM_ORDERS } from '../data/fallbackOrders';

interface LiveTelegramCardProps {
  currentLang: Language;
  telegramUrl: string;
}

function formatSyncTime(date: Date, lang: Language): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  if (lang === 'cs') return `v ${hours}:${minutes}`;
  if (lang === 'uk') return `о ${hours}:${minutes}`;
  if (lang === 'en') return `at ${hours}:${minutes}`;
  return `в ${hours}:${minutes}`;
}

export const LiveTelegramCard: React.FC<LiveTelegramCardProps> = ({
  currentLang,
  telegramUrl,
}) => {
  // Initial state loads instantly from cache/fallback without blank screen
  const [orders, setOrders] = useState<TelegramOrder[]>(() => {
    const cached = getStoredCachedOrders();
    return cached.length > 0 ? cached : FALLBACK_TELEGRAM_ORDERS;
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncText, setLastSyncText] = useState<string>('щойно');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showFullText, setShowFullText] = useState<boolean>(false);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'live' | 'cache' | 'offline'>('live');

  const rotationTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync orders from channel
  const loadOrders = useCallback(async (isManual = false) => {
    setIsSyncing(true);
    try {
      const result = await fetchLiveTelegramOrders();
      if (result.orders && result.orders.length > 0) {
        setOrders(result.orders);
        if (result.source === 'telegram-live') {
          setSyncStatus('live');
        } else if (result.source === 'github-cache') {
          setSyncStatus('cache');
        } else {
          setSyncStatus('offline');
        }
      }
      setLastSyncText(formatSyncTime(new Date(), currentLang));
    } catch (err) {
      console.warn('Sync failed, keeping current orders:', err);
    } finally {
      setIsSyncing(false);
    }
  }, [currentLang]);

  // Initial load on mount
  useEffect(() => {
    loadOrders();

    // Auto-sync periodically every 60 seconds (works in background on GitHub Pages)
    const syncInterval = setInterval(() => {
      loadOrders();
    }, 60000);

    return () => clearInterval(syncInterval);
  }, [loadOrders]);

  // Auto-rotate orders every 7 seconds when not paused by mouse hover
  useEffect(() => {
    if (isPaused || orders.length <= 1) return;

    rotationTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % orders.length);
    }, 7000);

    return () => {
      if (rotationTimerRef.current) clearInterval(rotationTimerRef.current);
    };
  }, [isPaused, orders.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + orders.length) % orders.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % orders.length);
  };

  const handleManualSync = (e: React.MouseEvent) => {
    e.stopPropagation();
    loadOrders(true);
  };

  const handleShareOrder = (e: React.MouseEvent, order: TelegramOrder) => {
    e.stopPropagation();
    navigator.clipboard.writeText(order.url);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const currentOrder = orders[currentIndex] || orders[0] || FALLBACK_TELEGRAM_ORDERS[0];

  // Helper translations for the card
  const labels = {
    cs: {
      channelTitle: 'Buildplace.cz',
      syncLive: 'Živá synchronizace',
      syncCache: 'Aktualizováno z kanálu',
      syncing: 'Aktualizuji...',
      updated: 'Aktualizováno:',
      justNow: 'právě teď',
      postNo: 'Zakázka',
      views: 'zhlédnutí',
      openPost: 'Otevřít na Telegramu',
      viewAll: 'Přejít do kanálu @buildplacecz',
      expandDetails: 'Zobrazit celý text',
      collapseDetails: 'Méně podrobností',
      directContact: 'Bez provize • Přímý kontakt',
      copied: 'Odkaz na zakázku zkopírován!',
      autoRotateNotice: 'Automatické střídání zakázek',
    },
    uk: {
      channelTitle: 'Buildplace.cz',
      syncLive: 'Жива синхронізація',
      syncCache: 'Синхронізовано з Telegram',
      syncing: 'Оновлення...',
      updated: 'Оновлено:',
      justNow: 'щойно',
      postNo: 'Замовлення',
      views: 'переглядів',
      openPost: 'Відкрити в Telegram',
      viewAll: 'Відкрити канал @buildplacecz',
      expandDetails: 'Повний опис замовлення',
      collapseDetails: 'Згорнути деталі',
      directContact: 'Без посередників • Прямий контакт',
      copied: 'Посилання на замовлення скопійовано!',
      autoRotateNotice: 'Автоматичне оновлення замовлень',
    },
    ru: {
      channelTitle: 'Buildplace.cz',
      syncLive: 'Живая синхронизация',
      syncCache: 'Синхронизировано с Telegram',
      syncing: 'Обновление...',
      updated: 'Обновлено:',
      justNow: 'только что',
      postNo: 'Заказ',
      views: 'просмотров',
      openPost: 'Открыть в Telegram',
      viewAll: 'Перейти в канал @buildplacecz',
      expandDetails: 'Полный текст заказа',
      collapseDetails: 'Свернуть детали',
      directContact: 'Без посредников • Прямой контакт',
      copied: 'Ссылка на заказ скопирована!',
      autoRotateNotice: 'Автоматическая ротация заказов',
    },
    en: {
      channelTitle: 'Buildplace.cz',
      syncLive: 'Live Sync Active',
      syncCache: 'Synced with Telegram',
      syncing: 'Updating...',
      updated: 'Updated:',
      justNow: 'just now',
      postNo: 'Order',
      views: 'views',
      openPost: 'Open in Telegram',
      viewAll: 'Open @buildplacecz channel',
      expandDetails: 'View full description',
      collapseDetails: 'Collapse details',
      directContact: 'No middlemen • Direct contact',
      copied: 'Order link copied to clipboard!',
      autoRotateNotice: 'Auto-rotating live orders',
    },
  }[currentLang];

  return (
    <div
      id="live-telegram-sync-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative p-4 sm:p-5 lg:p-5 xl:p-6 rounded-2xl bg-[#0e1520]/90 lg:bg-[#0e1520]/80 hover:bg-[#0e1520]/95 border-2 border-[#d89753]/45 shadow-2xl backdrop-blur-md space-y-3.5 sm:space-y-4 transition-all duration-300 group"
    >
      {/* Glow highlight */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#d89753]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header: Channel info + Live Sync status badge */}
      <div className="flex items-center justify-between border-b border-[#253243]/90 pb-3 sm:pb-3.5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#090d13] p-1 border-2 border-[#d89753]/70 flex items-center justify-center shrink-0 shadow-lg shadow-[#d89753]/25">
            <img
              src="./assets/buildplace-emblem.jpg"
              alt="BUILDPLACE.CZ"
              className="w-full h-full object-contain rounded-lg"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-[#0e1520]" />
            </span>
          </div>

          <div>
            <div className="text-base sm:text-lg font-black text-white font-['Cabinet_Grotesk',sans-serif] uppercase tracking-wide flex items-center gap-2">
              <span>{labels.channelTitle}</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 uppercase">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                LIVE
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e4a868] hover:text-[#f3ca99] font-mono font-bold transition-colors"
              >
                @buildplacecz
              </a>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 text-[11px] flex items-center gap-1">
                {isSyncing ? (
                  <span className="text-amber-400 flex items-center gap-1">
                    <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                    {labels.syncing}
                  </span>
                ) : (
                  <span className="text-emerald-400/90 font-medium">
                    {labels.syncLive}
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Sync refresh button & Channel quick-link */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            title={`${labels.updated} ${lastSyncText}`}
            className="p-2 rounded-lg bg-[#16212e] hover:bg-[#223247] text-slate-300 hover:text-[#e4a868] border border-[#2d3e54] transition-all cursor-pointer disabled:opacity-50"
            aria-label="Оновити список замовлень"
          >
            <RefreshCw
              className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-amber-400' : ''}`}
            />
          </button>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs px-2.5 py-1.5 rounded-lg bg-[#1a2533] hover:bg-[#253549] text-slate-300 hover:text-white border border-[#31435a] flex items-center gap-1.5 transition-colors"
          >
            <span className="font-mono text-[11px] font-bold text-[#e4a868]">t.me</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Dynamic Active Live Order Box */}
      {currentOrder && (
        <div className="relative rounded-xl bg-[#090d13]/90 border border-[#2c3a4d] hover:border-[#d89753]/80 p-3.5 sm:p-4 space-y-2.5 transition-all shadow-inner">
          {/* Order Header: Post ID, City & Live Stats */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#162231] border border-[#2b3e57] text-[#e4a868] font-mono font-bold text-[11px]">
                <span>#{currentOrder.id}</span>
                {currentOrder.isNew && (
                  <span className="ml-1 px-1 py-0.2 rounded bg-amber-500 text-slate-950 font-sans font-black text-[9px]">
                    NEW
                  </span>
                )}
              </span>

              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold text-xs bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                <MapPin className="w-3 h-3 text-emerald-400 shrink-0" />
                <span className="truncate max-w-[130px] sm:max-w-[160px]">{currentOrder.city}</span>
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{currentOrder.date}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Eye className="w-3 h-3 text-[#d89753]" />
                <span>{currentOrder.views}</span>
              </span>
            </div>
          </div>

          {/* Title & Category */}
          <div className="space-y-1">
            <a
              href={currentOrder.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base font-bold text-white hover:text-[#f3ca99] leading-snug line-clamp-2 transition-colors flex items-start justify-between gap-2 group/title"
            >
              <span>{currentOrder.category}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/title:text-[#e4a868] shrink-0 mt-1 opacity-70 group-hover/title:opacity-100 transition-opacity" />
            </a>

            {/* Bullets or Summary preview */}
            {!showFullText ? (
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 pt-0.5">
                {currentOrder.summary}
              </p>
            ) : (
              <div className="text-xs text-slate-200 bg-[#121923] p-2.5 rounded-lg border border-white/10 space-y-1 max-h-48 overflow-y-auto font-sans leading-relaxed">
                {(currentOrder.lines || currentOrder.fullText.split('\n').filter(Boolean)).map(
                  (ln: string, idx: number) => (
                    <div key={idx} className="text-slate-300">
                      {ln}
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* Pricing and Action row */}
          <div className="pt-2 border-t border-[#1e2a39] flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-mono font-bold text-[#f3ca99] text-xs sm:text-sm">
                {currentOrder.price}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowFullText(!showFullText)}
                className="text-[11px] text-slate-400 hover:text-white underline cursor-pointer"
              >
                {showFullText ? labels.collapseDetails : labels.expandDetails}
              </button>

              <button
                type="button"
                onClick={(e) => handleShareOrder(e, currentOrder)}
                title="Копіювати посилання"
                className="p-1.5 rounded bg-[#182331] hover:bg-[#223347] text-slate-300 hover:text-[#e4a868] transition-colors cursor-pointer"
              >
                <Share2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Pagination / Navigation bar */}
      <div className="flex items-center justify-between gap-2 text-xs text-slate-400 pt-1">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrev}
            aria-label="Попереднє замовлення"
            className="p-1.5 rounded-lg bg-[#141d28] hover:bg-[#1f2d3f] text-slate-300 hover:text-white border border-[#253447] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="font-mono text-xs text-slate-300 font-bold px-1">
            {currentIndex + 1} / {orders.length}
          </span>

          <button
            onClick={handleNext}
            aria-label="Наступне замовлення"
            className="p-1.5 rounded-lg bg-[#141d28] hover:bg-[#1f2d3f] text-slate-300 hover:text-white border border-[#253447] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Small Progress Dots or Notice */}
        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400/80 animate-pulse" />
          <span>{labels.autoRotateNotice}</span>
        </div>
      </div>

      {copiedNotification && (
        <div className="text-center text-xs text-emerald-400 font-medium py-1 animate-fade-in bg-emerald-950/40 rounded-lg border border-emerald-800/40">
          {labels.copied}
        </div>
      )}

      {/* Direct Telegram Channel Card Action */}
      <div className="pt-1 space-y-2">
        <a
          id="hero-live-card-telegram-cta"
          href={currentOrder ? currentOrder.url : telegramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#d89753] to-[#b36e29] hover:from-[#e5a560] hover:to-[#be7a35] text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#b36e29]/25 hover:shadow-[#b36e29]/50 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Send className="w-4 h-4 fill-slate-950" />
          <span className="font-['Cabinet_Grotesk',sans-serif]">
            {labels.openPost} (#{currentOrder?.id || 270})
          </span>
        </a>

        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 font-mono">
          <span className="flex items-center gap-1 text-emerald-400/90">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span>{labels.directContact}</span>
          </span>
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e4a868] hover:text-[#f3ca99] hover:underline"
          >
            {labels.viewAll} →
          </a>
        </div>
      </div>
    </div>
  );
};
