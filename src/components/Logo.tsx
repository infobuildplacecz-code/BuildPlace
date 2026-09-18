import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  subtitleText?: string;
  idPrefix?: string;
}

export const LogoEmblem: React.FC<{
  size?: number;
  className?: string;
  idPrefix?: string;
}> = ({ size, className = '' }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 drop-shadow-2xl select-none group ${className}`}
      style={size ? { width: size, height: size } : undefined}
      aria-label="Buildplace.cz official emblem"
    >
      {!imgError ? (
        <img
          src="./assets/buildplace-emblem.jpg"
          alt="BUILDPLACE.CZ Эмблема"
          className="w-full h-full object-contain rounded-xl sm:rounded-2xl border-2 border-[#d89753]/65 shadow-xl shadow-[#d89753]/30 filter drop-shadow-[0_4px_22px_rgba(216,151,83,0.5)] transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      ) : (
        /* Fallback if image fails */
        <div className="w-full h-full rounded-xl bg-[#141c26] border-2 border-[#d89753] flex items-center justify-center text-[#d89753] font-black text-xs">
          BP.CZ
        </div>
      )}
    </div>
  );
};

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  subtitleText = 'СТРОЙЗАКАЗЫ ПО ЧЕХИИ',
  idPrefix = 'bp-logo',
}) => {
  // Dimensions calibrated for prominent visibility across mobile and desktop
  const emblemSizeClasses = {
    sm: 'w-10 h-10 sm:w-12 sm:h-12',
    md: 'w-13 h-13 sm:w-15 sm:h-15 lg:w-16 lg:h-16 xl:w-17 xl:h-17 2xl:w-19 2xl:h-19',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24',
    xl: 'w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36',
  };

  const titleSizes = {
    sm: 'text-base sm:text-xl tracking-tight',
    md: 'text-xl sm:text-2xl lg:text-[24px] xl:text-[26px] 2xl:text-[28px] tracking-tight',
    lg: 'text-2xl sm:text-3xl lg:text-4xl tracking-tight',
    xl: 'text-3xl sm:text-4xl lg:text-5xl tracking-tight',
  };

  // Subtitle clearly readable, high-contrast and prominent
  const subSizes = {
    sm: 'text-[8px] sm:text-[9.5px] tracking-[0.12em]',
    md: 'text-[9.5px] sm:text-[11px] lg:text-[11.5px] xl:text-[12px] 2xl:text-[12.5px] tracking-[0.14em] sm:tracking-[0.16em]',
    lg: 'text-[11px] sm:text-[12px] lg:text-[13px] tracking-[0.16em]',
    xl: 'text-[12px] sm:text-[14px] lg:text-[16px] tracking-[0.18em]',
  };

  return (
    <div
      id="brand-logo-container"
      className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}
    >
      <LogoEmblem className={emblemSizeClasses[size]} idPrefix={idPrefix} />

      {showText && (
        <div className="flex flex-col justify-center leading-tight min-w-0">
          <div
            className={`font-black text-white font-['Cabinet_Grotesk',sans-serif] ${titleSizes[size]} uppercase tracking-tight flex items-baseline gap-1 drop-shadow-md`}
          >
            <span>BUILD<span className="text-[#e5a864]">PLACE</span></span>
            <span className="text-slate-300 font-bold text-[0.7em]">.CZ</span>
          </div>
          <div
            className={`font-bold text-[#f3ca99] uppercase mt-0.5 sm:mt-1 font-['Plus_Jakarta_Sans',sans-serif] ${subSizes[size]} whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]`}
          >
            {subtitleText}
          </div>
        </div>
      )}
    </div>
  );
};

