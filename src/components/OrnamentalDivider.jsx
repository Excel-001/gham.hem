import React from 'react';

export default function OrnamentalDivider({ label, className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 my-6 ${className}`}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C8B8A6]/70 to-[#C8B8A6]" />
      {label && (
        <span className="text-[10px] md:text-xs font-semibold text-[#6A1C24] tracking-widest-plus uppercase px-3 py-1 bg-[#F4EFEA] border border-[#C8B8A6]/60 rounded-[1px] whitespace-nowrap font-sans">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C8B8A6]/70 to-[#C8B8A6]" />
    </div>
  );
}

