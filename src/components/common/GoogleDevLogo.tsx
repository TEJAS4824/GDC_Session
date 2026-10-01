import React from 'react';

interface GoogleDevLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  chapterText?: string;
  layout?: 'horizontal' | 'vertical';
}

export const GoogleDevLogo: React.FC<GoogleDevLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
  chapterText = 'Vadodara',
  layout = 'horizontal'
}) => {
  const sizeMap = {
    xs: { w: 20, h: 10, stroke: 2.8 },
    sm: { w: 28, h: 14, stroke: 3.2 },
    md: { w: 40, h: 20, stroke: 3.8 },
    lg: { w: 56, h: 28, stroke: 4.5 },
    xl: { w: 80, h: 40, stroke: 5.5 }
  };

  const config = sizeMap[size];

  // The iconic official Google Developer Community brackets: < and >
  // Left bracket: Blue (#4285F4) and Red (#EA4335)
  // Right bracket: Green (#34A853) and Yellow (#FBBC05)
  const LogoIcon = (
    <svg 
      viewBox="0 0 72 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      style={{ width: config.w, height: config.h }}
      aria-label="Google Developer Community Logo"
    >
      {/* Left bracket: Top half (Google Blue) */}
      <path
        d="M26 4L9 18"
        stroke="#4285F4"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left bracket: Bottom half (Google Red) */}
      <path
        d="M9 18L26 32"
        stroke="#EA4335"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Right bracket: Top half (Google Green) */}
      <path
        d="M46 4L63 18"
        stroke="#34A853"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right bracket: Bottom half (Google Yellow) */}
      <path
        d="M63 18L46 32"
        stroke="#FBBC05"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (!showText) {
    return <span className={`inline-flex items-center ${className}`}>{LogoIcon}</span>;
  }

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {LogoIcon}
        <div className="mt-2">
          <p className="font-bold text-stone-900 tracking-tight text-sm leading-tight">
            Google Developer Community
          </p>
          <p className="text-xs text-stone-500 font-medium tracking-wide">
            {chapterText} Chapter
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {LogoIcon}
      <div className="flex flex-col leading-none">
        <span className="font-bold text-stone-900 tracking-tight text-sm">
          Google Developer Community
        </span>
        <span className="text-[11px] font-semibold text-stone-600 tracking-wide mt-0.5">
          {chapterText}
        </span>
      </div>
    </div>
  );
};

export const GoogleColorBar: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-full h-1 flex ${className}`} aria-hidden="true">
      <div className="h-full w-1/4 bg-[#4285F4]" />
      <div className="h-full w-1/4 bg-[#EA4335]" />
      <div className="h-full w-1/4 bg-[#FBBC05]" />
      <div className="h-full w-1/4 bg-[#34A853]" />
    </div>
  );
};
