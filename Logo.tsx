
import React from 'react';

const Logo: React.FC<{ className?: string; onClick?: () => void }> = ({ className = "h-12", onClick }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`} onClick={onClick}>
      <div className="relative w-12 h-14 shrink-0">
        {/* Elegant Eiffel Tower SVG */}
        <svg viewBox="0 0 100 140" className="w-full h-full fill-current text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
          <path d="M50 5 L48 10 L52 10 Z" />
          <path d="M48 10 L46 40 L54 40 L52 10 Z" />
          <path d="M46 40 L40 90 L60 90 L54 40 Z" />
          <path d="M40 90 L25 140 L35 140 L50 100 L65 140 L75 140 L60 90 Z" />
          <rect x="42" y="38" width="16" height="2" />
          <rect x="38" y="88" width="24" height="3" />
          <path d="M40 140 Q50 120 60 140" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-accent text-xl font-black tracking-tighter leading-none text-white">
          RADIO ELECTRO
        </span>
        <span className="font-accent text-sm font-bold tracking-[0.3em] text-cyan-400">
          PARIS
        </span>
        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">
          www.radio-electro.paris
        </span>
      </div>
    </div>
  );
};

export default Logo;
