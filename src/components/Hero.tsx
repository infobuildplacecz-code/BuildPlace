import React, { useState } from 'react';
import { Send, ShieldCheck, CheckCircle2, MapPin, Calendar, Users2, Copy, Check } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { LiveTelegramCard } from './LiveTelegramCard';

interface HeroProps {
  currentLang: Language;
  telegramUrl: string;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, telegramUrl }) => {
  const t = translations[currentLang];
  const [copiedLink, setCopiedLink] = useState(false);

  const handleTelegramClick = () => {
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyChannelLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(telegramUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen lg:min-h-0 lg:h-screen pt-20 sm:pt-24 lg:pt-24 xl:pt-28 pb-6 lg:pb-10 flex items-center overflow-hidden bg-[#0a0e14]"
    >
      {/* Background Architectural Construction Image - Balanced Medium Tone (Neither washed-out nor overly bright) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="./assets/prague-construction-hero.jpg"
          alt="Prague construction site with industrial tower cranes and historic city view"
          className="w-full h-full object-cover object-right md:object-center opacity-75 filter brightness-90 contrast-105 saturate-95 scale-100"
          referrerPolicy="no-referrer"
        />

        {/* Balanced Vignette: Left side dark for clear text legibility, Right side nicely visible with balanced brightness */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e14] via-[#0a0e14]/80 via-40% md:via-48% to-[#0a0e14]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e141c] via-transparent to-[#0a0e14]/40" />

        {/* Mobile Scrim */}
        <div className="absolute inset-0 bg-[#0a0e14]/45 md:bg-transparent" />

        {/* Soft bottom transition blend to next section */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#0e141c] to-transparent" />

        {/* Subtle Warm Copper Ambient Glow */}
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#d89753]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          {/* Main Hero Content (Left 7-8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-5 lg:space-y-5 xl:space-y-6">
            {/* Top Market Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16202c]/90 border border-[#3b4b60] backdrop-blur-md text-[#f3ca99] text-xs font-bold uppercase tracking-widest shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.hero.tagline}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-[46px] xl:text-[56px] 2xl:text-[64px] font-black text-white font-['Cabinet_Grotesk',sans-serif] tracking-tight uppercase leading-[1.02] sm:leading-[0.98] drop-shadow-md break-words">
                {t.hero.titlePart1}
                <br />
                <span className="bg-gradient-to-r from-[#f7d6a8] via-[#e5a864] to-[#b8732f] bg-clip-text text-transparent drop-shadow-sm">
                  {t.hero.titleAccent}
                </span>
              </h1>
            </div>

            {/* Subheadline */}
            <p className="max-w-2xl text-slate-200 text-sm sm:text-base lg:text-lg xl:text-xl font-normal leading-relaxed drop-shadow-sm">
              {t.hero.subtitle}
            </p>

            {/* Primary Telegram CTA Action Area */}
            <div className="pt-2 sm:pt-3 space-y-3 sm:space-y-3.5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  id="hero-telegram-main-cta"
                  onClick={handleTelegramClick}
                  className="group relative w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-[#d89753] via-[#c6843b] to-[#b36e29] hover:from-[#e5a560] hover:via-[#cf8d45] hover:to-[#be7a35] text-slate-950 font-black text-sm sm:text-base lg:text-lg tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#b36e29]/30 hover:shadow-2xl hover:shadow-[#b36e29]/50 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer border border-white/20"
                >
                  <Send className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-slate-950 transition-transform group-hover:translate-x-1" />
                  <span className="font-['Cabinet_Grotesk',sans-serif]">
                    {t.hero.ctaTelegram}
                  </span>
                </button>

                <div className="flex items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm text-slate-300 font-medium px-3.5 py-2.5 bg-[#121924]/80 backdrop-blur-sm rounded-lg border border-white/10 w-full sm:w-fit">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#d89753] shrink-0" />
                  <span>{t.hero.badgeVerified}</span>
                </div>
              </div>

              {/* Direct Link Clarification & Copy action */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-1.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-xs sm:text-sm">
                    {currentLang === 'cs'
                      ? 'Přímý odkaz:'
                      : currentLang === 'uk'
                      ? 'Пряме посилання:'
                      : currentLang === 'en'
                      ? 'Direct channel link:'
                      : 'Прямая ссылка на канал:'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-[#16212e]/90 border border-[#2f3f54] font-mono text-[#e4a868] text-xs sm:text-sm">
                  <span className="truncate">https://t.me/buildplacecz</span>
                  <button
                    onClick={handleCopyChannelLink}
                    title="Копировать ссылку на канал"
                    className="p-1 hover:text-white transition-colors cursor-pointer shrink-0"
                    aria-label="Копировать ссылку"
                  >
                    {copiedLink ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {copiedLink && (
                  <span className="text-emerald-400 font-semibold animate-fade-in text-xs">
                    {currentLang === 'cs'
                      ? 'Zkopírováno!'
                      : currentLang === 'uk'
                      ? 'Скопійовано!'
                      : currentLang === 'en'
                      ? 'Copied!'
                      : 'Скопировано!'}
                  </span>
                )}
              </div>
            </div>

            {/* Key Value Metric Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 pt-3 sm:pt-4 border-t border-[#222c3b]/80">
              <div className="flex items-center gap-2.5 sm:gap-3 text-slate-300 text-xs sm:text-sm bg-[#101722]/85 backdrop-blur-sm p-2.5 sm:p-3 rounded-xl border border-white/5">
                <div className="p-2 rounded-lg bg-[#16202c] border border-[#2c394b] text-[#d89753] shrink-0">
                  <MapPin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <div className="text-white font-bold leading-tight text-xs sm:text-sm">{t.hero.statCities}</div>
                  <div className="text-[11px] sm:text-xs text-slate-400">
                    {currentLang === 'cs'
                      ? 'Všechny kraje ČR'
                      : currentLang === 'uk'
                      ? 'Усі регіони Чехії'
                      : currentLang === 'en'
                      ? 'All Czech regions'
                      : 'Все регионы Чехии'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 text-slate-300 text-xs sm:text-sm bg-[#101722]/85 backdrop-blur-sm p-2.5 sm:p-3 rounded-xl border border-white/5">
                <div className="p-2 rounded-lg bg-[#16202c] border border-[#2c394b] text-[#d89753] shrink-0">
                  <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <div className="text-white font-bold leading-tight text-xs sm:text-sm">{t.hero.statDaily}</div>
                  <div className="text-[11px] sm:text-xs text-slate-400">
                    {currentLang === 'cs'
                      ? 'Nové zakázky denně'
                      : currentLang === 'uk'
                      ? 'Щоденні нові заявки'
                      : currentLang === 'en'
                      ? 'Fresh daily posts'
                      : 'Свежие заявки в ленте'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 text-slate-300 text-xs sm:text-sm bg-[#101722]/85 backdrop-blur-sm p-2.5 sm:p-3 rounded-xl border border-white/5">
                <div className="p-2 rounded-lg bg-[#16202c] border border-[#2c394b] text-[#d89753] shrink-0">
                  <Users2 className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <div className="text-white font-bold leading-tight text-xs sm:text-sm">0% {t.hero.statNoSpam}</div>
                  <div className="text-[11px] sm:text-xs text-slate-400">
                    {currentLang === 'cs'
                      ? 'Přímá dohoda'
                      : currentLang === 'uk'
                      ? 'Прямий договір'
                      : currentLang === 'en'
                      ? 'Direct agreement'
                      : 'Прямой договор'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating Frosted-Glass Card - Live Synced with Telegram channel */}
          <div className="lg:col-span-5 xl:col-span-4 block mt-6 lg:mt-0">
            <LiveTelegramCard currentLang={currentLang} telegramUrl={telegramUrl} />
          </div>
        </div>
      </div>
    </section>
  );
};

