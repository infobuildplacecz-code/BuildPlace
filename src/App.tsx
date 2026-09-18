import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhyCards } from './components/WhyCards';
import { HowItWorks } from './components/HowItWorks';
import { WhyUsDetailed } from './components/WhyUsDetailed';
import { LiveOrdersPreview } from './components/LiveOrdersPreview';
import { CtaBanner } from './components/CtaBanner';
import { Footer } from './components/Footer';
import { Language } from './types';
import { Send } from 'lucide-react';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('buildplace_lang');
    if (saved && (saved === 'ru' || saved === 'cs' || saved === 'uk' || saved === 'en')) {
      return saved;
    }
    return 'ru'; // Russian as requested: "основной это русский"
  });

  // Official Telegram channel link - instant redirection
  const [telegramUrl] = useState<string>('https://t.me/buildplacecz');
  const [showFloatingButton, setShowFloatingButton] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingButton(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setCurrentLang(newLang);
    localStorage.setItem('buildplace_lang', newLang);
    document.documentElement.lang = newLang;
  };

  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const handleFloatingTelegramClick = () => {
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#0e141c] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#d89753] selection:text-slate-950">
      {/* Sticky Header with Navigation, Language Switcher & Telegram CTA */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        telegramUrl={telegramUrl}
      />

      {/* Main Single Page Landing Content */}
      <main className="flex-grow">
        {/* 1. Hero Section with Prague Construction Background & Primary Telegram CTA */}
        <Hero currentLang={currentLang} telegramUrl={telegramUrl} />

        {/* 2. Why Buildplace.cz? (5 Core Cards from photo 2) */}
        <WhyCards currentLang={currentLang} />

        {/* 3. How it Works? (4 Process Steps from photo 2) */}
        <HowItWorks currentLang={currentLang} telegramUrl={telegramUrl} />

        {/* 4. Why Us / Why Our Company in-depth section */}
        <WhyUsDetailed currentLang={currentLang} />

        {/* 5. Live / Sample Orders from the channel (Real construction jobs in Prague, Brno, etc.) */}
        <LiveOrdersPreview currentLang={currentLang} telegramUrl={telegramUrl} />

        {/* 6. Pre-Footer "СТРОЙ. РАБОТАЙ. ЗАРАБАТЫВАЙ." Banner */}
        <CtaBanner currentLang={currentLang} telegramUrl={telegramUrl} />
      </main>

      {/* 7. High-End Footer with Email info@buildplace.cz, Instagram buildplacecz, Facebook & Telegram */}
      <Footer currentLang={currentLang} telegramUrl={telegramUrl} />

      {/* Floating Quick Telegram Action for instant access on any screen (only after scrolling past Hero) */}
      <aside
        id="floating-telegram-widget"
        aria-label="Telegram channel quick link"
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
          showFloatingButton ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={handleFloatingTelegramClick}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#d89753] via-[#c6843b] to-[#b36e29] hover:from-[#e5a560] hover:via-[#cf8d45] hover:to-[#be7a35] text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl shadow-[#b36e29]/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer border-2 border-white/20"
          aria-label="Join Telegram channel"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-slate-950"></span>
          </span>
          <Send className="w-4 h-4 fill-slate-950" />
          <span className="font-['Cabinet_Grotesk',sans-serif] hidden sm:inline">
            Telegram @buildplacecz
          </span>
        </button>
      </aside>
    </div>
  );
}
