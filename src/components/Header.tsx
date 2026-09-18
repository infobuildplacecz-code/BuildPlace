import React, { useState, useEffect } from 'react';
import {
  Send,
  Globe,
  ChevronDown,
  Menu,
  X,
  Check,
  ClipboardCheck,
  HelpCircle,
  Award,
  Radio,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  telegramUrl: string;
}

const LANGUAGES: Array<{ code: Language; label: string; flag: string; nativeName: string }> = [
  { code: 'ru', label: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿', nativeName: 'Čeština' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦', nativeName: 'Українська' },
  { code: 'en', label: 'English', flag: '🇬🇧', nativeName: 'English' },
];

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  telegramUrl,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[currentLang];
  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTelegramClick = () => {
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <header
      id="main-site-header"
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0f151d]/95 backdrop-blur-md border-b border-[#2a3443] shadow-xl py-2 sm:py-2.5'
          : 'bg-gradient-to-b from-[#0b0f16]/95 via-[#0f151d]/85 to-transparent border-b border-white/5 py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-6">
        {/* Logo */}
        <a
          href="#"
          id="header-brand-link"
          className="group flex items-center transition-transform hover:scale-[1.01] shrink-0"
        >
          <Logo
            size="md"
            subtitleText={
              currentLang === 'cs'
                ? 'STAVEBNÍ ZAKÁZKY V ČESKU'
                : currentLang === 'uk'
                ? 'БУДІВЕЛЬНІ ЗАМОВЛЕННЯ В ЧЕХІЇ'
                : currentLang === 'en'
                ? 'CONSTRUCTION ORDERS IN CZECHIA'
                : 'СТРОИТЕЛЬНЫЕ ЗАКАЗЫ ПО ЧЕХИИ'
            }
          />
        </a>

        {/* Desktop Navigation with Balanced High-Readability Typography */}
        <nav className="hidden lg:flex items-center gap-2.5 xl:gap-5 2xl:gap-7 text-[13.5px] xl:text-[15px] 2xl:text-[16px] font-bold text-slate-100 whitespace-nowrap">
          <button
            id="nav-link-why-buildplace"
            onClick={() => handleNavClick('why-buildplace')}
            className="hover:text-[#e4a868] transition-colors cursor-pointer py-1.5 whitespace-nowrap"
          >
            {t.nav.benefits}
          </button>
          <button
            id="nav-link-how-it-works"
            onClick={() => handleNavClick('how-it-works')}
            className="hover:text-[#e4a868] transition-colors cursor-pointer py-1.5 whitespace-nowrap"
          >
            {t.nav.howItWorks}
          </button>
          <button
            id="nav-link-why-us"
            onClick={() => handleNavClick('why-us-detailed')}
            className="hover:text-[#e4a868] transition-colors cursor-pointer py-1.5 whitespace-nowrap"
          >
            {t.nav.whyUs}
          </button>
          <button
            id="nav-link-orders"
            onClick={() => handleNavClick('live-orders')}
            className="hover:text-[#e4a868] transition-colors cursor-pointer flex items-center gap-2 py-1.5 whitespace-nowrap"
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>{t.nav.orders}</span>
          </button>
          <button
            id="nav-link-contacts"
            onClick={() => handleNavClick('site-footer')}
            className="hover:text-[#e4a868] transition-colors cursor-pointer py-1.5 whitespace-nowrap"
          >
            {t.nav.contacts}
          </button>
        </nav>

        {/* Right Controls: Language Switcher & Telegram CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="language-selector-button"
              type="button"
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-[#1a2330] hover:bg-[#232f40] border border-[#2e3b4d] text-slate-100 text-xs sm:text-sm font-bold tracking-wide transition-all shadow-sm cursor-pointer whitespace-nowrap"
              aria-label="Change language"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-4 h-4 text-[#d89753] shrink-0" />
              <span className="uppercase text-xs sm:text-sm font-black">{activeLangObj.code}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                  isLangOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isLangOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLangOpen(false)}
                />
                <div
                  id="language-dropdown-menu"
                  className="absolute right-0 mt-2 w-52 rounded-xl bg-[#151c27] border border-[#2e3b4d] shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                >
                  <div className="px-4 py-2 text-xs uppercase font-bold tracking-wider text-slate-400 border-b border-slate-800">
                    Выберите язык / Jazyk
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      id={`lang-select-${lang.code}`}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-sm sm:text-base text-left transition-colors cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-[#243142] text-[#e4a868] font-bold'
                          : 'text-slate-200 hover:bg-[#1c2635] hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-lg">{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      {currentLang === lang.code && (
                        <Check className="w-4 h-4 text-[#e4a868]" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Telegram Button in Header */}
          <button
            id="header-telegram-cta"
            onClick={handleTelegramClick}
            className="relative group overflow-hidden px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#d99650] via-[#c48139] to-[#b36e29] hover:from-[#e5a560] hover:via-[#cf8d45] hover:to-[#be7a35] text-slate-950 font-black text-xs sm:text-sm xl:text-base tracking-wide uppercase transition-all duration-200 shadow-lg shadow-[#b56f2f]/20 hover:shadow-[#b56f2f]/35 active:scale-95 flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer whitespace-nowrap"
            aria-label="Open Telegram channel"
          >
            <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
              <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5 fill-slate-950 shrink-0" />
              <span className="font-['Cabinet_Grotesk',sans-serif]">
                Telegram
              </span>
            </span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 sm:p-3 rounded-xl bg-[#1a2330] hover:bg-[#222e3e] text-slate-200 hover:text-white border border-[#2e3b4d] active:scale-95 transition-all flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6 text-[#d89753]" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Modern Slide-In Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Dimmed Background Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Body */}
          <div
            id="mobile-navigation-drawer"
            className="relative ml-auto w-full max-w-sm h-full bg-[#0d141e] border-l border-[#243142] shadow-2xl flex flex-col justify-between p-6 z-50 overflow-y-auto"
          >
            {/* Top Bar inside Drawer */}
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#1f2c3d]">
                <Logo
                  size="md"
                  subtitleText={
                    currentLang === 'cs'
                      ? 'STAVEBNÍ ZAKÁZKY V ČESKU'
                      : currentLang === 'uk'
                      ? 'БУДІВЕЛЬНІ ЗАМОВЛЕННЯ В ЧЕХІЇ'
                      : currentLang === 'en'
                      ? 'CONSTRUCTION ORDERS IN CZECHIA'
                      : 'СТРОИТЕЛЬНЫЕ ЗАКАЗЫ ПО ЧЕХИИ'
                  }
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-[#16202c] text-slate-400 hover:text-white border border-[#2a384b] hover:border-[#d89753] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links with Icons */}
              <nav className="mt-6 space-y-2">
                <button
                  onClick={() => handleNavClick('why-buildplace')}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left text-base font-bold text-slate-100 hover:text-white hover:bg-[#172230] transition-colors cursor-pointer"
                >
                  <ClipboardCheck className="w-5 h-5 text-[#d89753] shrink-0" />
                  <span>{t.nav.benefits}</span>
                </button>

                <button
                  onClick={() => handleNavClick('how-it-works')}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left text-base font-bold text-slate-100 hover:text-white hover:bg-[#172230] transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-5 h-5 text-[#d89753] shrink-0" />
                  <span>{t.nav.howItWorks}</span>
                </button>

                <button
                  onClick={() => handleNavClick('why-us-detailed')}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left text-base font-bold text-slate-100 hover:text-white hover:bg-[#172230] transition-colors cursor-pointer"
                >
                  <Award className="w-5 h-5 text-[#d89753] shrink-0" />
                  <span>{t.nav.whyUs}</span>
                </button>

                <button
                  onClick={() => handleNavClick('live-orders')}
                  className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-left text-base font-bold text-slate-100 hover:text-white hover:bg-[#172230] transition-colors bg-[#131d2a]/70 border border-[#223042] cursor-pointer"
                >
                  <span className="flex items-center gap-3.5">
                    <Radio className="w-5 h-5 text-emerald-400 shrink-0 animate-pulse" />
                    <span>{t.nav.orders}</span>
                  </span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    ONLINE
                  </span>
                </button>

                <button
                  onClick={() => handleNavClick('site-footer')}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-left text-base font-bold text-slate-100 hover:text-white hover:bg-[#172230] transition-colors cursor-pointer"
                >
                  <Mail className="w-5 h-5 text-[#d89753] shrink-0" />
                  <span>{t.nav.contacts}</span>
                </button>
              </nav>

              {/* Language Switcher Grid */}
              <div className="mt-6 pt-5 border-t border-[#1f2c3d]">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#d89753]" />
                  <span>Язык / Jazyk / Language:</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onLanguageChange(lang.code);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-[#223145] border-[#d89753] text-[#f3ca99] shadow-md'
                          : 'bg-[#141d29] border-[#222e3e] text-slate-300 hover:bg-[#1a2535]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      {currentLang === lang.code && (
                        <Check className="w-4 h-4 text-[#d89753]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Action in Drawer */}
            <div className="mt-8 pt-5 border-t border-[#1f2c3d] space-y-3">
              <div className="text-xs text-slate-300 flex items-center justify-between font-medium">
                <span>Канал: @buildplacecz</span>
                <span className="text-emerald-400 font-bold text-xs">● Активен</span>
              </div>
              <button
                onClick={handleTelegramClick}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#d89753] via-[#c6843b] to-[#b36e29] text-slate-950 font-black uppercase text-base tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-[#b36e29]/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer"
              >
                <Send className="w-5 h-5 fill-slate-950" />
                <span>{t.nav.telegramButton}</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
