import React from 'react';
import { Send } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface CtaBannerProps {
  currentLang: Language;
  telegramUrl: string;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ currentLang, telegramUrl }) => {
  const t = translations[currentLang];

  const handleTelegramClick = () => {
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="cta-banner-section" className="bg-[#0b0f15] py-12 sm:py-20 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#17202c] via-[#111722] to-[#17202c] border-y border-[#263242]" />
      <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#d89753]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-10">
          {/* Left Motto */}
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-white font-['Cabinet_Grotesk',sans-serif] tracking-tight uppercase leading-snug">
              <span>{t.ctaBanner.motto1}</span>
              <span className="text-[#d89753]">{t.ctaBanner.motto2}</span>
              <span className="text-[#f3ca99]">{t.ctaBanner.motto3}</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-base font-normal leading-relaxed">
              {t.ctaBanner.text}
            </p>
          </div>

          {/* Right Telegram Action Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <button
              id="cta-banner-telegram-button"
              onClick={handleTelegramClick}
              className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-5 rounded-xl bg-gradient-to-r from-[#d89753] via-[#c6843b] to-[#b36e29] hover:from-[#e5a560] hover:via-[#cf8d45] hover:to-[#be7a35] text-slate-950 font-black text-sm sm:text-lg tracking-wider uppercase transition-all duration-300 shadow-xl shadow-[#b36e29]/25 hover:shadow-2xl hover:shadow-[#b36e29]/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer"
            >
              <Send className="w-4 h-4 sm:w-6 sm:h-6 fill-slate-950" />
              <span className="font-['Cabinet_Grotesk',sans-serif]">
                {t.ctaBanner.ctaButton}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
