import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Zap } from 'lucide-react';
import { TickerAsset } from '../types';

interface TickerPillScrollerProps {
  tickers: TickerAsset[];
  onSelectTicker: (ticker: TickerAsset) => void;
}

export const TickerPillScroller: React.FC<TickerPillScrollerProps> = ({
  tickers,
  onSelectTicker,
}) => {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
            Arc Algorithmic Tickers
          </span>
          <span className="text-[10px] font-bold text-[#A855F7] bg-[#A855F7]/10 px-2 py-0.5 rounded-full border border-[#A855F7]/20">
            Real-Time Feed
          </span>
        </div>
        <span className="text-xs text-[#475569] font-medium hidden sm:inline">
          Tap ticker to allocate
        </span>
      </div>

      {/* Horizontal pill scroller */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1.5 scrollbar-none snap-x">
        {tickers.map((ticker) => {
          const minVal = Math.min(...ticker.sparkline);
          const maxVal = Math.max(...ticker.sparkline);
          const range = maxVal - minVal || 1;
          const w = 64;
          const h = 24;

          const points = ticker.sparkline
            .map((val, idx) => {
              const x = (idx / (ticker.sparkline.length - 1)) * w;
              const y = h - ((val - minVal) / range) * (h - 6) - 3;
              return `${x},${y}`;
            })
            .join(' ');

          const strokeColor = ticker.isPositive ? '#22C55E' : '#F43F5E';

          return (
            <button
              key={ticker.symbol}
              onClick={() => onSelectTicker(ticker)}
              className="shrink-0 snap-start flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1a1c23]/90 hover:bg-[#232631] border border-[#2e3240] hover:border-[#22C55E]/40 transition-all duration-200 active:scale-[0.97] group text-left cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
            >
              {/* Symbol & Name */}
              <div className="flex flex-col">
                <span className="text-xs font-black text-white tracking-wider group-hover:text-[#22C55E] transition-colors">
                  {ticker.symbol}
                </span>
                <span className="text-[10px] text-[#94A3B8] font-medium truncate max-w-[70px]">
                  {ticker.name}
                </span>
              </div>

              {/* Sparkline */}
              <div className="w-16 h-6 flex items-center justify-center">
                <svg width={w} height={h} className="overflow-visible">
                  <polyline
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                </svg>
              </div>

              {/* Price & Delta */}
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-white tabular-numbers">
                  ${ticker.price.toLocaleString('en-US', { minimumFractionDigits: ticker.price < 10 ? 2 : 2 })}
                </span>
                <span
                  className={`text-[10px] font-bold flex items-center tabular-numbers ${
                    ticker.isPositive ? 'text-[#22C55E]' : 'text-[#F43F5E]'
                  }`}
                >
                  {ticker.isPositive ? '+' : ''}{ticker.changePercent}%
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
