import React, { useState } from 'react';
import { User, Calendar, Image as ImageIcon } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'event' | 'avatar' | 'general';
  fallbackText?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  fallbackType = 'general',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    if (fallbackType === 'avatar') {
      const initials = (fallbackText || alt || 'M')
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

      return (
        <div 
          className={`flex items-center justify-center bg-[#EFE9DF] text-stone-700 font-bold border border-[#DDD5C7] select-none ${className}`}
          title={alt}
        >
          {initials ? (
            <span className="text-xs font-mono">{initials}</span>
          ) : (
            <User className="w-1/2 h-1/2 opacity-70" />
          )}
        </div>
      );
    }

    if (fallbackType === 'event') {
      return (
        <div 
          className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F5EFE6] via-[#EFE8DC] to-[#E3DAC9] text-stone-700 border border-[#DDD5C7] p-4 text-center select-none ${className}`}
        >
          <Calendar className="w-8 h-8 text-stone-600 mb-1.5 opacity-80" />
          <span className="text-xs font-semibold text-stone-800 line-clamp-1">{alt || 'GDC Vadodara Event'}</span>
          <span className="text-[10px] text-stone-500 font-mono mt-0.5">Gujarat Developer Community</span>
        </div>
      );
    }

    return (
      <div 
        className={`flex items-center justify-center bg-[#F3EDE2] text-stone-500 border border-[#DDD5C7] ${className}`}
      >
        <ImageIcon className="w-6 h-6 opacity-60" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
