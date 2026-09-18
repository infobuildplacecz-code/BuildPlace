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
    sm: 'w-8 h-8 sm:w-10 sm:h-10',
    md: 'w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-15 lg:h-15 xl:w-16 xl:h-16',
    lg: 'w-14 h-14 sm:w-18 sm:h-18 lg:w-22 lg:h-22',
    xl: 'w-18 h-18 sm:w-24 sm:h-24 lg:w-32 lg:h-32',
  };

  const titleSizes = {
    sm: 'text-sm sm:text-base tracking-tight',
    md: 'text-base sm:text-xl lg:text-[23px] xl:text-[25px] tracking-tight',
    lg: 'text-xl sm:text-2xl lg:text-3xl tracking-tight',
    xl: 'text-2xl sm:text-3xl lg:text-4xl tracking-tight',
  };

  // Subtitle clearly readable, high-contrast; on small mobile screens hidden to prevent header overflow
  const subSizes = {
    sm: 'text-[7.5px] sm:text-[9px] tracking-[0.1em]',
    md: 'hidden sm:block text-[9.5px] sm:text-[10.5px] lg:text-[11.5px] xl:text-[12px] tracking-[0.14em] sm:tracking-[0.16em]',
    lg: 'text-[10px] sm:text-[11.5px] lg:text-[12.5px] tracking-[0.16em]',
    xl: 'text-[11px] sm:text-[13px] lg:text-[15px] tracking-[0.18em]',
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

