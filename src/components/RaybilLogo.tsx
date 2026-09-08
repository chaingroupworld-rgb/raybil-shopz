import React from 'react';

interface RaybilLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  textColor?: string;
}

export const RaybilLogo: React.FC<RaybilLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  textColor = 'text-[#0b1b36]'
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* High-Fidelity SVG Icon based on the uploaded logo */}
      <svg
        viewBox="0 0 100 100"
        className={`${iconSizes[size]} drop-shadow-sm flex-shrink-0 transition-transform duration-300 hover:scale-105`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="raybilBolt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8000" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="raybilNavy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#152e54" />
            <stop offset="100%" stopColor="#0a1931" />
          </linearGradient>
          <filter id="subtleShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Main Bold "R" Silhouette */}
        <path
          d="M 18 10 
             H 58 
             C 76 10, 86 21, 86 38 
             C 86 52, 77 62, 64 66 
             L 86 94 
             H 68 
             L 48 68 
             H 36 
             V 94 
             H 18 
             Z 
             M 36 26 
             V 52 
             H 54 
             C 64 52, 70 47, 70 39 
             C 70 31, 64 26, 54 26 
             Z"
          fill="url(#raybilNavy)"
        />

        {/* Dynamic Lightning Bolt Cutting through the R */}
        <polygon
          points="52,14 26,52 44,52 30,82 66,42 48,42"
          fill="url(#raybilBolt)"
          filter="url(#subtleShadow)"
        />

        {/* 3D Shopping Bag on the lower right of R */}
        <g transform="translate(50, 44) scale(0.48)" filter="url(#subtleShadow)">
          {/* Orange left facet for 3D depth */}
          <polygon points="12,24 25,16 25,82 12,90" fill="#f97316" />
          {/* Deep Navy front facet */}
          <path
            d="M 25 16 
               H 80 
               Q 84 16 84 20 
               V 78 
               Q 84 82 80 82 
               H 25 
               Z"
            fill="#0b1b36"
          />
          {/* Gold loop handles with eyelets */}
          <path
            d="M 42 16 C 42 0, 67 0, 67 16"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="42" cy="18" r="3.5" fill="#f59e0b" />
          <circle cx="67" cy="18" r="3.5" fill="#f59e0b" />
        </g>
      </svg>

      {/* Brand Text */}
      {showText && (
        <span className={`font-extrabold tracking-tight ${textSizes[size]} ${textColor} font-sans flex items-center`}>
          Raybil
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 ml-1 inline-block"></span>
        </span>
      )}
    </div>
  );
};
