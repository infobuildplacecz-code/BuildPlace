import React from 'react';
import { Send, Search, MessageSquare, PhoneCall, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface HowItWorksProps {
  currentLang: Language;
  telegramUrl: string;
}

const stepIcons = [
  Send,          // 1. Подпишись
  Search,        // 2. Найди заказ
  MessageSquare, // 3. Напиши в комментарии
  PhoneCall,     // 4. Получи контакт
];

export const HowItWorks: React.FC<HowItWorksProps> = ({ currentLang, telegramUrl }) => {
  const t = translations[currentLang];

  const handleTelegramClick = () => {
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="how-it-works"
      className="py-14 sm:py-24 bg-[#0d131c] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-['Cabinet_Grotesk',sans-serif] uppercase tracking-tight">
            {t.howItWorks.title}
          </h2>
          <div className="w-16 h-1 bg-[#d89753] mx-auto mt-3 sm:mt-4 rounded-full" />
          <p className="mt-3 sm:mt-4 text-slate-300 text-sm sm:text-lg">
            {t.howItWorks.subtitle}
          </p>
        </div>

        {/* 4 Steps Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8 lg:gap-4 relative">
          {t.howItWorks.steps.map((step, idx) => {
            const Icon = stepIcons[idx] || Send;
            const isLast = idx === t.howItWorks.steps.length - 1;

            return (
              <div
                key={idx}
                id={`how-step-${idx + 1}`}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Connecting arrow line for desktop */}
                {!isLast && (
                  <div className="hidden lg:flex items-center absolute top-10 left-[60%] w-[80%] z-0 pointer-events-none text-slate-600">
                    <div className="w-full border-t-2 border-dashed border-[#2f3d50] flex items-center justify-end">
                      <ArrowRight className="w-4 h-4 text-[#d89753]/60 -mr-1" />
                    </div>
                  </div>
                )}

                {/* Step Circle with badge */}
                <div className="relative mb-6 z-10">
                  {/* Number Badge */}
                  <div className="absolute -top-1.5 -left-1.5 w-7 h-7 rounded-full bg-gradient-to-tr from-[#b36e29] to-[#f3ca99] text-slate-950 font-black text-xs flex items-center justify-center shadow-md border-2 border-[#0d131c]">
                    {step.number}
                  </div>

                  {/* Icon Outer Shell */}
                  <div className="w-20 h-20 rounded-full bg-[#16212e] border-2 border-[#2b3a4e] group-hover:border-[#d89753] flex items-center justify-center text-slate-200 group-hover:text-[#d89753] transition-all duration-300 shadow-xl group-hover:scale-105">
                    <Icon className="w-9 h-9 stroke-[1.75]" />
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-base sm:text-lg font-black text-white font-['Cabinet_Grotesk',sans-serif] uppercase tracking-wide mb-2.5">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xs">
                  {step.description}
                </p>

                {/* Direct CTA on first step */}
                {idx === 0 && (
                  <button
                    onClick={handleTelegramClick}
                    className="mt-4 text-xs font-bold text-[#d89753] hover:text-[#e4a868] inline-flex items-center gap-1 uppercase tracking-wider underline underline-offset-4 cursor-pointer"
                  >
                    <span>{t.hero.ctaTelegram}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
