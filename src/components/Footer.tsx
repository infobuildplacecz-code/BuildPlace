import React, { useState } from 'react';
import { Send, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';
import { Language } from '../types';
import { translations } from '../translations';

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

interface FooterProps {
  currentLang: Language;
  telegramUrl: string;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, telegramUrl }) => {
  const t = translations[currentLang];
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTg, setCopiedTg] = useState(false);

  const email = 'info@buildplace.cz';
  const instagramUrl = 'https://www.instagram.com/buildplacecz';
  const facebookUrl = 'https://www.facebook.com/share/1C6Pc84Sn6/?mibextid=wwXIfr';

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopyTg = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(telegramUrl);
    setCopiedTg(true);
    setTimeout(() => setCopiedTg(false), 2200);
  };

  const handleTelegramClick = () => {
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer id="site-footer" className="bg-[#080c12] text-slate-300 pt-16 pb-12 border-t border-[#1f2937] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#1b2330]">
          {/* Col 1: Brand presentation (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Logo
              size="lg"
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
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm pt-2">
              {t.footer.description}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#131b26] border border-[#233042] text-[11px] font-bold text-[#d89753] uppercase tracking-wider">
                🇨🇿 {t.footer.czechMarketBadge}
              </span>
            </div>
          </div>

          {/* Col 2: Telegram Focus Area (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-[#111722] border border-[#273447] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-[#d89753] font-['Cabinet_Grotesk',sans-serif]">
                TELEGRAM CHANNEL
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {t.footer.telegramHighlight}
            </p>

            <button
              id="footer-telegram-cta"
              onClick={handleTelegramClick}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d89753] via-[#c6843b] to-[#b36e29] hover:from-[#e5a560] hover:via-[#cf8d45] hover:to-[#be7a35] text-slate-950 font-black text-sm tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Send className="w-4 h-4 fill-slate-950" />
              <span className="font-['Cabinet_Grotesk',sans-serif]">
                {t.footer.telegramCta}
              </span>
            </button>

            <div className="flex items-center justify-between gap-2 pt-1 text-xs">
              <a
                href={telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#e4a868] hover:text-white transition-colors font-mono font-semibold flex items-center gap-1 min-w-0 truncate"
              >
                <span className="truncate">{telegramUrl}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>

              <button
                onClick={handleCopyTg}
                title="Копировать ссылку на канал"
                className="px-2 py-1 rounded bg-[#182330] hover:bg-[#233345] text-slate-300 hover:text-white border border-[#2b3d52] flex items-center gap-1 text-[11px] transition-colors cursor-pointer shrink-0"
              >
                {copiedTg ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">
                      {currentLang === 'cs' ? 'Zkopírováno' : currentLang === 'uk' ? 'Скопійовано' : currentLang === 'en' ? 'Copied' : 'Скопировано'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>
                      {currentLang === 'cs' ? 'Kopírovat' : currentLang === 'uk' ? 'Копіювати' : currentLang === 'en' ? 'Copy' : 'Копировать'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Col 3: Direct Contacts & Socials (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Email Box */}
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                {t.footer.contactsTitle}
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${email}`}
                  id="footer-contact-email"
                  className="group flex items-center gap-2 text-sm sm:text-base font-semibold text-white hover:text-[#d89753] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#d89753]" />
                  <span>{email}</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                  className="p-1.5 rounded bg-[#16202c] hover:bg-[#202d3e] text-slate-400 hover:text-white border border-[#2b394b] transition-colors cursor-pointer"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              {copiedEmail && (
                <div className="text-[11px] text-emerald-400 mt-1 font-medium">
                  {currentLang === 'cs'
                    ? 'E-mail zkopírován do schránky'
                    : currentLang === 'uk'
                    ? 'Пошту скопійовано'
                    : currentLang === 'en'
                    ? 'Email copied to clipboard'
                    : 'Почта скопирована в буфер'}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
                {t.footer.socialTitle}
              </div>
              <div className="flex flex-col space-y-2.5">
                {/* Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-link-instagram"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#141c27] hover:bg-[#1d2737] border border-[#253345] hover:border-[#d89753]/50 text-slate-200 text-xs font-semibold transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <InstagramIcon className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                    <span>Instagram: @buildplacecz</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                </a>

                {/* Facebook */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-link-facebook"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#141c27] hover:bg-[#1d2737] border border-[#253345] hover:border-[#d89753]/50 text-slate-200 text-xs font-semibold transition-all group"
                >
                  <span className="flex items-center gap-2">
                    <FacebookIcon className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span>Facebook Buildplace.cz</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>{t.footer.rights}</div>
          <div className="flex items-center gap-6">
            <span>Praha • Brno • Plzeň • Ostrava</span>
            <span className="text-slate-600">|</span>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-400 hover:text-[#d89753] transition-colors"
            >
              Наверх ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
