import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  ArrowUpRight, 
  RefreshCw, 
  Check, 
  Lock, 
  Zap,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VaultStrategy } from '../types';

interface AlgorithmicVaultProps {
  strategies: VaultStrategy[];
  onHarvestYield: (amount: number) => void;
  onAllocateToStrategy: (strategyId: string, amount: number) => void;
  availableCash: number;
}

export const AlgorithmicVault: React.FC<AlgorithmicVaultProps> = ({
  strategies,
  onHarvestYield,
  onAllocateToStrategy,
  availableCash,
}) => {
  const [selectedStrategyId, setSelectedStrategyId] = useState<string>(strategies[0].id);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [timeHorizonYears, setTimeHorizonYears] = useState<number>(5);
  const [isHarvesting, setIsHarvesting] = useState<boolean>(false);
  const [depositAmount, setDepositAmount] = useState<string>('250');
  const [depositModalOpen, setDepositModalOpen] = useState<boolean>(false);

  const totalVaultBalance = strategies.reduce((acc, s) => acc + s.balance, 0);
  const totalEarnedYTD = strategies.reduce((acc, s) => acc + s.earnedYTD, 0);

  // Compound interest calculation
  const selectedStrategy = strategies.find((s) => s.id === selectedStrategyId) || strategies[0];
  const rate = selectedStrategy.apy / 100;
  const n = 12; // monthly compounding
  const t = timeHorizonYears;
  const p = selectedStrategy.balance;
  const pmt = monthlyContribution;

  // Future value of lump sum + future value of series:
  // FV = P * (1 + r/n)^(n*t) + PMT * [((1 + r/n)^(n*t) - 1) / (r/n)]
  const fvLump = p * Math.pow(1 + rate / n, n * t);
  const fvSeries = pmt * ((Math.pow(1 + rate / n, n * t) - 1) / (rate / n));
  const projectedVaultTotal = fvLump + fvSeries;
  
  // Benchmark against standard bank 0.05%
  const bankRate = 0.0005;
  const bankFV = p * Math.pow(1 + bankRate / n, n * t) + pmt * ((Math.pow(1 + bankRate / n, n * t) - 1) / (bankRate / n));
  const alphaAdvantage = projectedVaultTotal - bankFV;

  const handleHarvestAll = () => {
    if (totalEarnedYTD <= 0) return;
    setIsHarvesting(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#A855F7', '#DDB7FF', '#22C55E', '#FFFFFF'],
      });
    } catch {
      // safe
    }

    setTimeout(() => {
      onHarvestYield(totalEarnedYTD);
      setIsHarvesting(false);
    }, 600);
  };

  const handleDepositSubmit = () => {
    const num = parseFloat(depositAmount);
    if (num > 0 && num <= availableCash) {
      onAllocateToStrategy(selectedStrategyId, num);
      setDepositModalOpen(false);
      setDepositAmount('250');
      try {
        confetti({
          particleCount: 50,
          spread: 45,
          colors: ['#22C55E', '#A855F7'],
        });
      } catch {}
    } else {
      alert(`Invalid amount or exceeds available cash ($${availableCash.toFixed(2)})`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Overview Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Algorithmic AI Vault
            </span>
            <span className="text-xs font-bold text-[#A855F7] bg-[#A855F7]/15 px-2.5 py-0.5 rounded-full border border-[#A855F7]/30">
              Auto-Compounding
            </span>
          </div>
          <p className="text-xs text-[#94A3B8]">
            Automated liquidity vaults capturing market spreads, treasury yields, and crypto roundups.
          </p>
        </div>

        {/* Harvest Action */}
        <button
          onClick={handleHarvestAll}
          disabled={isHarvesting}
          className="h-12 px-5 rounded-full ai-shimmer text-white border border-[#A855F7]/40 text-xs font-bold flex items-center justify-center gap-2 hover:border-[#A855F7] transition-all active:scale-[0.98] glow-purple cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-[#DDB7FF]" />
          <span>Harvest YTD Yield (${totalEarnedYTD.toFixed(2)})</span>
        </button>
      </div>

      {/* Vault Balance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {strategies.map((strat) => {
          const isSelected = selectedStrategyId === strat.id;
          return (
            <div
              key={strat.id}
              onClick={() => setSelectedStrategyId(strat.id)}
              className={`p-5 rounded-[2rem] glass-panel border transition-all duration-200 cursor-pointer relative overflow-hidden active:scale-[0.99] ${
                isSelected
                  ? 'border-[#A855F7] bg-[#1a1c23] shadow-[0_0_24px_rgba(168,85,247,0.2)]'
                  : 'border-[#2e3240] hover:border-[#A855F7]/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-[#94A3B8]">{strat.asset}</span>
                <span className="text-xs font-black text-[#A855F7] bg-[#A855F7]/15 px-2 py-0.5 rounded-full border border-[#A855F7]/30 tabular-numbers">
                  {strat.apy}% APY
                </span>
              </div>

              <div className="text-base font-bold text-white mb-1">{strat.title}</div>
              <p className="text-[11px] text-[#94A3B8] mb-4 line-clamp-2">{strat.subtitle}</p>

              <div className="pt-3 border-t border-[#2e3240]/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#94A3B8] uppercase block">Principal</span>
                  <span className="text-lg font-extrabold text-white tabular-numbers">
                    ${strat.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-[#94A3B8] uppercase block">Yield Earned</span>
                  <span className="text-sm font-bold text-[#22C55E] tabular-numbers">
                    +${strat.earnedYTD.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Projection Simulator Deck */}
      <div className="glass-panel rounded-[2rem] p-6 border border-[#2e3240] shadow-[0_12px_36px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#A855F7]" />
              <h3 className="text-base font-bold text-white">
                Predictive AI Growth Projection
              </h3>
            </div>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Simulate exponential compounding on <span className="text-white font-semibold">{selectedStrategy.title}</span> ({selectedStrategy.apy}% APY).
            </p>
          </div>

          {/* Time Horizon Pills */}
          <div className="flex items-center gap-1 bg-[#14161d] p-1 rounded-full border border-[#2e3240]">
            {[1, 3, 5, 10].map((yr) => (
              <button
                key={yr}
                onClick={() => setTimeHorizonYears(yr)}
                className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${
                  timeHorizonYears === yr
                    ? 'bg-[#A855F7] text-white shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {yr}Y
              </button>
            ))}
          </div>
        </div>

        {/* Projection KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#14161d] border border-[#2e3240] mb-6">
          <div>
            <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block">
              Estimated Total Balance
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-numbers">
              ${Math.round(projectedVaultTotal).toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider block">
              Algorithmic Net Yield
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#22C55E] tracking-tight tabular-numbers">
              +${Math.round(projectedVaultTotal - p - (pmt * 12 * t)).toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[#A855F7] uppercase tracking-wider block">
              Alpha vs Traditional Bank
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#DDB7FF] tracking-tight tabular-numbers">
              +${Math.round(alphaAdvantage).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Interactive Slider */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">Monthly Vault Allocation</span>
            <span className="font-mono font-bold text-[#A855F7] text-sm tabular-numbers">
              ${monthlyContribution.toLocaleString()} / month
            </span>
          </div>

          <input
            type="range"
            min={50}
            max={3000}
            step={50}
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            className="w-full accent-[#A855F7] bg-[#14161d] h-2 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-[#475569] font-mono">
            <span>$50/mo</span>
            <span>$1,500/mo</span>
            <span>$3,000/mo</span>
          </div>
        </div>

        {/* Quick Deposit Button into this Vault Strategy */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#2e3240]/60">
          <div className="text-xs text-[#94A3B8] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            Audited Smart Vault with instant liquidity & zero lockup periods.
          </div>

          <button
            onClick={() => setDepositModalOpen(true)}
            className="w-full sm:w-auto h-12 px-6 rounded-full bg-[#22C55E] text-[#0D0E12] font-black text-xs tracking-tight flex items-center justify-center gap-2 hover:bg-[#4be277] transition-all active:scale-[0.98] glow-lime-sm cursor-pointer"
          >
            <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            Deposit into {selectedStrategy.asset}
          </button>
        </div>
      </div>

      {/* Mini Deposit Modal */}
      {depositModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-sm rounded-[2rem] glass-modal p-6 relative border border-[#2e3240]">
            <h4 className="text-base font-bold text-white mb-2">
              Deposit into {selectedStrategy.title}
            </h4>
            <p className="text-xs text-[#94A3B8] mb-4">
              Funds will immediately start earning <span className="text-[#A855F7] font-bold">{selectedStrategy.apy}% APY</span> compounding hourly.
            </p>

            <div className="mb-4">
              <label className="text-[11px] font-bold text-[#94A3B8] uppercase block mb-1">
                Deposit Amount (USD)
              </label>
              <div className="h-12 rounded-full bg-[#14161d] border border-[#2e3240] px-4 flex items-center">
                <span className="text-[#22C55E] font-bold mr-1">$</span>
                <input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  className="bg-transparent text-white font-mono font-bold text-base focus:outline-none w-full"
                />
              </div>
              <span className="text-[10px] text-[#475569] mt-1 block">
                Available Cash: ${availableCash.toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setDepositModalOpen(false)}
                className="h-11 rounded-full bg-[#1a1c23] border border-[#2e3240] text-xs font-bold text-white hover:bg-[#232631]"
              >
                Cancel
              </button>
              <button
                onClick={handleDepositSubmit}
                className="h-11 rounded-full bg-[#22C55E] text-[#0D0E12] text-xs font-black hover:bg-[#4be277] glow-lime-sm"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
