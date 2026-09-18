import React, { useState, useEffect } from 'react';
import {
  Send,
  MapPin,
  Tag,
  Banknote,
  Calendar,
  ExternalLink,
  Eye,
  RefreshCw,
  Radio,
} from 'lucide-react';
import { Language, TelegramOrder } from '../types';
import { translations } from '../translations';
import { fetchLiveTelegramOrders, getStoredCachedOrders } from '../services/telegramService';
import { FALLBACK_TELEGRAM_ORDERS } from '../data/fallbackOrders';

interface LiveOrdersPreviewProps {
  currentLang: Language;
  telegramUrl: string;
}

export const LiveOrdersPreview: React.FC<LiveOrdersPreviewProps> = ({
  currentLang,
  telegramUrl,
}) => {
  const t = translations[currentLang];
  const [orders, setOrders] = useState<TelegramOrder[]>(() => {
    const cached = getStoredCachedOrders();
    return cached.length > 0 ? cached : FALLBACK_TELEGRAM_ORDERS;
  });
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setIsSyncing(true);
      try {
        const res = await fetchLiveTelegramOrders();
        if (res.orders && res.orders.length > 0) {
          setOrders(res.orders);
        }
      } catch (err) {
        console.warn('Preview sync err:', err);
      } finally {
        setIsSyncing(false);
      }
    }
    load();
  }, []);

  // Filter unique cities
  const cities = ['all', ...Array.from(new Set(orders.map((o) => o.city).filter(Boolean)))];

  const filteredOrders =
    selectedCity === 'all'
      ? orders
      : orders.filter((o) => o.city.toLowerCase().includes(selectedCity.toLowerCase()));

  const displayedOrders = filteredOrders.slice(0, 6);

  const labels = {
    cs: {
      filterAll: 'Všechna města',
      applyTg: 'Odpovědět na TG',
      directOwner: 'Ověřený přímý zadavatel',
      views: 'zhlédnutí',
      showMoreTg: 'Zobrazit všech 20+ zakázek na Telegramu',
    },
    uk: {
      filterAll: 'Усі міста',
      applyTg: 'Відгукнутися в TG',
      directOwner: 'Особистий контакт замовника',
      views: 'переглядів',
      showMoreTg: 'Переглянути всі 20+ замовлень у Telegram',
    },
    ru: {
      filterAll: 'Все города',
      applyTg: 'Откликнуться в TG',
      directOwner: 'Прямой контакт заказчика',
      views: 'просмотров',
      showMoreTg: 'Смотреть все 20+ заказов в Telegram',
    },
    en: {
      filterAll: 'All cities',
      applyTg: 'Apply via TG',
      directOwner: 'Direct project owner',
      views: 'views',
      showMoreTg: 'View all 20+ orders in Telegram',
    },
  }[currentLang];

  return (
    <section
      id="live-orders"
      className="py-14 sm:py-24 bg-[#0e141d] border-t border-[#1b2432] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
              <span>{t.liveOrders.liveBadge}</span>
              <span className="text-slate-400">• @buildplacecz</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-['Cabinet_Grotesk',sans-serif] uppercase tracking-tight">
              {t.liveOrders.title}
            </h2>
            <p className="mt-2 text-slate-400 text-xs sm:text-base max-w-2xl">
              {t.liveOrders.subtitle}
            </p>
          </div>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-[#1b2636] hover:bg-[#253449] border border-[#304157] text-[#e4a868] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:-translate-y-0.5 w-full sm:w-auto shrink-0 shadow-md"
          >
            <span>{t.liveOrders.viewInTelegram}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {cities.slice(0, 8).map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer border ${
                selectedCity === city
                  ? 'bg-[#d89753] text-slate-950 font-bold border-[#d89753] shadow-md shadow-[#d89753]/20'
                  : 'bg-[#151f2b] text-slate-300 border-[#26374a] hover:bg-[#1e2c3d] hover:text-white'
              }`}
            >
              {city === 'all' ? labels.filterAll : city}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedOrders.map((order) => (
            <div
              key={order.id}
              className="p-4.5 sm:p-5 rounded-2xl bg-[#141d27] border border-[#243345] hover:border-[#d89753]/60 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <div className="space-y-3">
                {/* Order Top Meta */}
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-1 text-[#e4a868] font-bold bg-[#1d2938] px-2 py-0.5 rounded border border-[#2a3c52] font-mono text-[11px]">
                    <MapPin className="w-3 h-3 text-[#d89753]" />
                    <span>{order.city}</span>
                  </span>

                  <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      <span>{order.date}</span>
                    </span>
                    <span className="flex items-center gap-1 text-slate-300">
                      <Eye className="w-3 h-3 text-[#d89753]" />
                      <span>{order.views}</span>
                    </span>
                  </div>
                </div>

                {/* Category & Order Title */}
                <a
                  href={order.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-base font-bold text-white font-['Cabinet_Grotesk',sans-serif] leading-snug group-hover:text-[#f3ca99] transition-colors"
                >
                  {order.category}
                </a>

                {/* Short description preview */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {order.summary}
                </p>

                {/* Price and post badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs pt-1">
                  <span className="flex items-center gap-1 text-[#d89753] bg-[#22180e] px-2.5 py-1 rounded font-bold font-mono border border-[#48331d] text-xs">
                    <Banknote className="w-3.5 h-3.5" />
                    <span>{order.price}</span>
                  </span>

                  <span className="text-[11px] text-slate-400 font-mono">
                    #{order.id}
                  </span>
                </div>
              </div>

              {/* Card Footer CTA */}
              <div className="mt-4 pt-3 border-t border-[#1e2c3c] flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-400 truncate">
                  {labels.directOwner}
                </span>

                <a
                  href={order.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#d89753] to-[#b36e29] hover:from-[#e4a868] hover:to-[#c48139] text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shrink-0 cursor-pointer"
                >
                  <Send className="w-3 h-3 fill-slate-950" />
                  <span>{labels.applyTg}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All on Telegram Banner */}
        <div className="mt-10 text-center">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#172230] hover:bg-[#202f42] text-[#f3ca99] hover:text-white border border-[#2e4056] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:-translate-y-0.5"
          >
            <Send className="w-4 h-4 text-[#d89753]" />
            <span>{labels.showMoreTg}</span>
            <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
          </a>
        </div>
      </div>
    </section>
  );
};
