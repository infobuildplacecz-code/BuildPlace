import React from 'react';
import { Award, Zap, Building2, Layers, CheckCircle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface WhyUsDetailedProps {
  currentLang: Language;
}

export const WhyUsDetailed: React.FC<WhyUsDetailedProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  const tradeCategories = [
    { name: currentLang === 'cs' ? 'Zednické & Monolitické práce' : currentLang === 'uk' ? 'Мурування та Монолітні роботи' : currentLang === 'en' ? 'Masonry & Concrete Works' : 'Кладочные и Монолитные работы', count: '120+' },
    { name: currentLang === 'cs' ? 'Obklady a Dlažby' : currentLang === 'uk' ? 'Плитка та Керамограніт' : currentLang === 'en' ? 'Tiling & Stonework' : 'Плитка и Керамогранит', count: '95+' },
    { name: currentLang === 'cs' ? 'Sádrokartony & Omítky' : currentLang === 'uk' ? 'Гіпсокартон та Штукатурка' : currentLang === 'en' ? 'Drywall & Plastering' : 'Гипсокартон и Штукатурка', count: '80+' },
    { name: currentLang === 'cs' ? 'Elektro & Voda, Topení' : currentLang === 'uk' ? 'Електрика та Сантехніка' : currentLang === 'en' ? 'Electrical & Plumbing' : 'Электрика и Сантехника', count: '70+' },
    { name: currentLang === 'cs' ? 'Fasády & Zateplení' : currentLang === 'uk' ? 'Фасади та Утеплення' : currentLang === 'en' ? 'Facades & Insulation' : 'Фасады и Утепление', count: '65+' },
    { name: currentLang === 'cs' ? 'Střechy & Klempířství' : currentLang === 'uk' ? 'Покрівлі та Жерстяні роботи' : currentLang === 'en' ? 'Roofing & Sheet Metal' : 'Кровли и Жестяные работы', count: '45+' },
  ];

  return (
    <section
      id="why-us-detailed"
      className="py-14 sm:py-24 bg-[#111722] border-t border-[#1e2736] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e2a3a] border border-[#2f3f54] text-[#d89753] text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>
              {currentLang === 'cs'
                ? 'Český stavební ekosystém'
                : currentLang === 'uk'
                ? 'Будівельний екосистем Чехії'
                : currentLang === 'en'
                ? 'Czech Construction Network'
                : 'Чешский строительный сектор'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-['Cabinet_Grotesk',sans-serif] uppercase tracking-tight">
            {t.whyUsDetailed.title}
          </h2>
          <div className="w-16 h-1 bg-[#d89753] mx-auto mt-3 sm:mt-4 rounded-full" />
          <p className="mt-3 sm:mt-4 text-slate-300 text-sm sm:text-lg">
            {t.whyUsDetailed.subtitle}
          </p>
        </div>

        {/* 4 In-Depth Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-10 sm:mb-16">
          {t.whyUsDetailed.reasons.map((reason, idx) => (
            <div
              key={idx}
              id={`why-us-item-${idx + 1}`}
              className="p-5 sm:p-8 rounded-2xl bg-[#17212e] border border-[#273549] hover:border-[#d89753]/60 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-[#223042] text-[#d89753] text-[11px] sm:text-xs font-bold font-mono uppercase tracking-wider border border-[#304157]">
                    {reason.highlight}
                  </span>
                  <span className="text-slate-400 font-bold font-mono text-sm">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-white font-['Cabinet_Grotesk',sans-serif] mb-2 sm:mb-3">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#222d3e] flex items-center gap-2 text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  {currentLang === 'cs'
                    ? 'Prověřená praxe na stavbách v Česku'
                    : currentLang === 'uk'
                    ? 'Перевірена практика на обʼєктах у Чехії'
                    : currentLang === 'en'
                    ? 'Verified track record on Czech job sites'
                    : 'Проверенная практика на стройках в Чехии'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Construction Specializations Matrix */}
        <div className="p-5 sm:p-8 rounded-2xl bg-[#151d29] border border-[#253243] shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-[#243040] pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#1e2a3a] text-[#d89753]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white font-['Cabinet_Grotesk',sans-serif] uppercase">
                  {currentLang === 'cs'
                    ? 'Stavební obory v našem kanálu'
                    : currentLang === 'uk'
                    ? 'Будівельні напрямки в каналі'
                    : currentLang === 'en'
                    ? 'Trade categories covered'
                    : 'Строительные направления в канале'}
                </h4>
                <p className="text-xs text-slate-400">
                  {currentLang === 'cs'
                    ? 'Zakázky pro samostatné řemeslníky i kompletní stavební firmy'
                    : currentLang === 'uk'
                    ? 'Замовлення для індивідуальних майстрів та повнокомплектних бригад'
                    : currentLang === 'en'
                    ? 'Orders for individual tradesmen and complete contractor firms'
                    : 'Заказы для индивидуальных мастеров и комплексных строительных компаний'}
                </p>
              </div>
            </div>

            <div className="text-xs text-[#e4a868] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>Praha • Brno • Plzeň • Ostrava</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {tradeCategories.map((cat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#1a2432] border border-[#2c3a4d] text-center flex flex-col justify-between hover:border-[#d89753]/50 transition-colors"
              >
                <span className="text-xs font-bold text-slate-200 leading-snug">
                  {cat.name}
                </span>
                <span className="text-[11px] font-mono text-[#d89753] font-semibold mt-2">
                  {cat.count} {currentLang === 'cs' ? 'objektů' : currentLang === 'uk' ? 'об’єктів' : currentLang === 'en' ? 'sites' : 'объектов'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
