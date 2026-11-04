import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  TrendingUp,
  CreditCard
} from 'lucide-react';

interface AccountCardProps {
  balance: number;
  availableCash: number;
  vaultBalance: number;
  isCardFrozen: boolean;
  onToggleCardFreeze: () => void;
  onOpenTransfer: () => void;
  onOpenDeposit: () => void;
  onOpenVault: () => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  balance,
  availableCash,
  vaultBalance,
  isCardFrozen,
  onToggleCardFreeze,
  onOpenTransfer,
  onOpenDeposit,
  onOpenVault,
}) => {
  const [activeTimeframe, setActiveTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1M');
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [viewMetric, setViewMetric] = useState<'total' | 'cash' | 'vault'>('total');

  const displayedAmount = 
    viewMetric === 'total' ? balance :
    viewMetric === 'cash' ? availableCash : vaultBalance;

  // Sparkline data points based on timeframe
  const sparklineData: Record<string, number[]> = {
    '1D': [47800, 47950, 47900, 48100, 48050, 48220, 48290.45],
    '1W': [45100, 45800, 46400, 46100, 47200, 47850, 48290.45],
    '1M': [41200, 42800, 43900, 45200, 46700, 47400, 48290.45],
    '1Y': [32000, 34500, 38100, 40400, 43200, 46100, 48290.45],
  };

  const currentPoints = sparklineData[activeTimeframe];
  const minVal = Math.min(...currentPoints);
  const maxVal = Math.max(...currentPoints);
  const range = maxVal - minVal || 1;

  // Convert points to SVG path
  const svgWidth = 420;
  const svgHeight = 70;
  const coordinates = currentPoints.map((val, idx) => {
    const x = (idx / (currentPoints.length - 1)) * svgWidth;
    const y = svgHeight - ((val - minVal) / range) * (svgHeight - 16) - 8;
    return `${x},${y}`;
  });
  const pathD = `M ${coordinates.join(' L ')}`;
  const areaD = `${pathD} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`;

  return (
    <div className="relative rounded-[2rem] p-6 lg:p-7 glass-panel overflow-hidden border border-[#2e3240] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
      {/* Neo-Kinetic Ambient Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#22C55E]/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#A855F7]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          {/* Segmented Metric Switcher */}
          <div className="flex items-center p-1 bg-[#14161d] rounded-full border border-[#2e3240]/80">
            <button
              onClick={() => setViewMetric('total')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-150 ${
                viewMetric === 'total'
                  ? 'bg-[#22C55E] text-[#0D0E12] shadow-sm'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Total Net
            </button>
            <button
              onClick={() => setViewMetric('cash')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-150 ${
                viewMetric === 'cash'
                  ? 'bg-[#1a1c23] text-white border border-[#2e3240]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Cash
            </button>
            <button
              onClick={() => setViewMetric('vault')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-150 ${
                viewMetric === 'vault'
                  ? 'bg-[#A855F7] text-white shadow-sm'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Yield Vault
            </button>
          </div>

          <button
            onClick={() => setIsBalanceHidden(!isBalanceHidden)}
            className="p-1.5 rounded-full text-[#94A3B8] hover:text-white hover:bg-[#1a1c23] transition-colors"
            title={isBalanceHidden ? 'Show balance' : 'Hide balance'}
          >
            {isBalanceHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Timeframe Chips */}
        <div className="flex items-center gap-1 bg-[#14161d]/80 p-1 rounded-full border border-[#2e3240]/60">
          {(['1D', '1W', '1M', '1Y'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setActiveTimeframe(tf)}
              className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all ${
                activeTimeframe === tf
                  ? 'bg-[#1a1c23] text-[#22C55E] border border-[#2e3240]'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Main Massive Display Balance */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 my-2">
        <div>
          <span className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider block mb-1">
            {viewMetric === 'total' ? 'Combined Portfolio & Cash' : viewMetric === 'cash' ? 'Available to Spend' : 'Algorithmic Yield Balance'}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-[-0.04em] leading-none tabular-numbers">
              {isBalanceHidden ? '••••••••' : `$${displayedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            </span>
          </div>
        </div>

        {/* Dynamic Delta & Micro-Badge */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E]">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-bold tabular-numbers">+14.2%</span>
            <span className="text-[10px] text-[#22C55E]/80">(${activeTimeframe === '1M' ? '5,840.45' : '1,240.10'})</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#94A3B8] font-mono bg-[#14161d] px-3 py-1.5 rounded-full border border-[#2e3240]/60">
            <CreditCard className="w-3.5 h-3.5 text-[#94A3B8]" />
            <span>Kinetix •••• 8421</span>
          </div>
        </div>
      </div>

      {/* Dynamic Sparkline Micro-Chart */}
      <div className="w-full my-4 relative h-[70px] overflow-hidden">
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full preserve-3d" preserveAspectRatio="none">
          <defs>
            <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#sparklineGrad)" />
          <path
            d={pathD}
            fill="none"
            stroke="#22C55E"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Primary Kinetic Operational Hub (Ergonomic Thumb Targets) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
        {/* Primary Pay Button */}
        <button
          onClick={onOpenTransfer}
          className="h-14 rounded-full bg-[#22C55E] text-[#0D0E12] font-black text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-[#4be277] transition-all duration-150 active:scale-[0.98] glow-lime-sm cursor-pointer"
        >
          <ArrowUpRight className="w-4 h-4 stroke-[3]" />
          <span>Pay & Send</span>
        </button>

        {/* Deposit Button */}
        <button
          onClick={onOpenDeposit}
          className="h-14 rounded-full bg-[#1a1c23] hover:bg-[#232631] text-white border border-[#2e3240] font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] cursor-pointer"
        >
          <ArrowDownLeft className="w-4 h-4 text-[#22C55E]" />
          <span>Deposit Cash</span>
        </button>

        {/* AI Alpha Yield / Algorithmic Action Button */}
        <button
          onClick={onOpenVault}
          className="h-14 rounded-full relative overflow-hidden ai-shimmer text-white border border-[#A855F7]/40 font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-[#DDB7FF] group-hover:rotate-12 transition-transform" />
          <span className="text-[#FFFFFF]">AI Vault +5.2%</span>
        </button>

        {/* Card Freeze Toggle Button */}
        <button
          onClick={onToggleCardFreeze}
          className={`h-14 rounded-full border font-bold text-sm tracking-tight flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] cursor-pointer ${
            isCardFrozen
              ? 'bg-[#F43F5E]/20 border-[#F43F5E] text-[#FF8892] glow-coral'
              : 'bg-[#1a1c23] hover:bg-[#232631] border-[#2e3240] text-[#94A3B8] hover:text-white'
          }`}
        >
          {isCardFrozen ? (
            <>
              <ShieldAlert className="w-4 h-4 text-[#F43F5E]" />
              <span>Card Frozen</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
              <span>Freeze Card</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
