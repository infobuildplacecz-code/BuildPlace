import React from 'react';
import { ClipboardCheck, MapPin, Handshake, ShieldCheck, Clock } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface WhyCardsProps {
  currentLang: Language;
}

const cardIcons = [
  ClipboardCheck, // 1. Только реальные заказы
  MapPin,         // 2. По всей Чехии
  Handshake,      // 3. Прямой контакт с заказчиком
  ShieldCheck,    // 4. Без рекламы и спама
  Clock,          // 5. Новые заказы каждый день
];

export const WhyCards: React.FC<WhyCardsProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <section
      id="why-buildplace"
      className="py-14 sm:py-24 bg-[#111722] border-t border-b border-[#1f2937] relative overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-[#d89753]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-['Cabinet_Grotesk',sans-serif] uppercase tracking-tight">
            {t.whyBuildplace.title.split('BUILDPLACE.CZ?')[0]}
            <span className="text-[#d89753]">BUILDPLACE.CZ?</span>
          </h2>
          <div className="w-16 h-1 bg-[#d89753] mx-auto mt-3 sm:mt-4 rounded-full" />
          <p className="mt-3 sm:mt-4 text-slate-300 text-sm sm:text-lg">
            {t.whyBuildplace.subtitle}
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-6">
          {t.whyBuildplace.cards.map((card, idx) => {
            const Icon = cardIcons[idx] || ShieldCheck;
            return (
              <div
                key={idx}
                id={`why-card-${idx + 1}`}
                className="group relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl bg-[#16202c]/90 hover:bg-[#1a2635] border border-[#273547] hover:border-[#d89753]/60 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                {/* Icon Container with Copper Accent */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1f2b3b] group-hover:bg-[#27374b] border border-[#37475d] group-hover:border-[#d89753] flex items-center justify-center text-[#d89753] transition-colors mb-4 sm:mb-5 shadow-inner">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.75]" />
                </div>

                {/* Card Title */}
                <h3 className="text-sm sm:text-base font-extrabold text-white font-['Cabinet_Grotesk',sans-serif] uppercase tracking-wide leading-tight mb-2 sm:min-h-[2.5rem] flex items-center">
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {card.description}
                </p>

                {/* Bottom subtle indicator line */}
                <div className="w-8 h-0.5 bg-transparent group-hover:bg-[#d89753] mt-3 sm:mt-4 transition-all duration-300 rounded-full" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
