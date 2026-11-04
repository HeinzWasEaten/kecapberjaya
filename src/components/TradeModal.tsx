import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, ArrowRight, Zap, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { TickerAsset, Transaction } from '../types';

interface TradeModalProps {
  ticker: TickerAsset | null;
  onClose: () => void;
  availableCash: number;
  onExecuteTrade: (ticker: TickerAsset, amount: number, side: 'buy' | 'sell', newTx: Transaction) => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  ticker,
  onClose,
  availableCash,
  onExecuteTrade,
}) => {
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amountStr, setAmountStr] = useState<string>('100');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!ticker) return null;

  const numericAmount = parseFloat(amountStr) || 0;
  const estimatedShares = numericAmount / ticker.price;

  const handleTrade = () => {
    if (numericAmount <= 0) return;
    if (side === 'buy' && numericAmount > availableCash) {
      alert(`Amount exceeds your available cash ($${availableCash.toFixed(2)})`);
      return;
    }

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      merchant: `${side === 'buy' ? 'Bought' : 'Sold'} ${ticker.symbol}`,
      category: 'Crypto & Stocks',
      amount: side === 'buy' ? -numericAmount : numericAmount,
      timestamp: 'Just now',
      dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      iconName: 'Zap',
      status: 'completed',
      note: `${side.toUpperCase()} ${estimatedShares.toFixed(4)} ${ticker.symbol} @ $${ticker.price.toFixed(2)}`,
    };

    setIsSuccess(true);
    try {
      confetti({
        particleCount: 50,
        spread: 50,
        colors: ['#22C55E', '#A855F7', '#FFFFFF'],
      });
    } catch {}

    onExecuteTrade(ticker, numericAmount, side, newTx);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-[2.5rem] glass-modal p-6 relative overflow-hidden border border-[#2e3240] shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1a1c23] border border-[#2e3240] flex items-center justify-center font-black text-xs text-white">
              {ticker.symbol.slice(0, 3)}
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">{ticker.name}</span>
              <span className="text-xs text-[#94A3B8] font-mono block">
                ${ticker.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-[#14161d] hover:bg-[#232631] border border-[#2e3240] flex items-center justify-center text-[#94A3B8] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#22C55E] to-[#6BFF8F] flex items-center justify-center text-[#0D0E12] shadow-lg mb-4">
              <Check className="w-8 h-8 stroke-[3.5]" />
            </div>
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider mb-1">
              Order Executed
            </span>
            <div className="text-3xl font-black text-white tabular-numbers mb-2">
              ${numericAmount.toFixed(2)}
            </div>
            <p className="text-xs text-[#94A3B8] mb-6">
              {side === 'buy' ? 'Acquired' : 'Sold'} ~{estimatedShares.toFixed(4)} {ticker.symbol} at market price with zero commission.
            </p>
            <button
              onClick={resetAndClose}
              className="w-full h-12 rounded-full bg-[#22C55E] text-[#0D0E12] font-black text-xs tracking-tight hover:bg-[#4be277] transition-all glow-lime-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Side Switcher (Buy vs Sell) */}
            <div className="grid grid-cols-2 p-1 bg-[#14161d] rounded-full border border-[#2e3240]">
              <button
                onClick={() => setSide('buy')}
                className={`py-2 rounded-full text-xs font-bold transition-all ${
                  side === 'buy'
                    ? 'bg-[#22C55E] text-[#0D0E12] shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Buy {ticker.symbol}
              </button>
              <button
                onClick={() => setSide('sell')}
                className={`py-2 rounded-full text-xs font-bold transition-all ${
                  side === 'sell'
                    ? 'bg-[#F43F5E] text-white shadow-sm'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Sell {ticker.symbol}
              </button>
            </div>

            {/* Amount input */}
            <div className="text-center py-2">
              <span className="text-xs text-[#94A3B8] block mb-1">Order Amount in USD</span>
              <div className="text-4xl font-black text-white tracking-tight tabular-numbers flex items-center justify-center">
                <span className="text-[#22C55E] mr-1">$</span>
                <input
                  type="number"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="bg-transparent text-center w-40 focus:outline-none"
                />
              </div>
              <div className="text-xs text-[#94A3B8] mt-1 font-mono">
                ≈ {estimatedShares.toFixed(6)} {ticker.symbol}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center justify-center gap-2">
              {[50, 100, 250, 500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmountStr(amt.toString())}
                  className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                    amountStr === amt.toString()
                      ? 'bg-[#1a1c23] border-[#22C55E] text-[#22C55E]'
                      : 'bg-[#14161d] border-[#2e3240] text-[#94A3B8]'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-[#475569] text-center">
              Available Cash: ${availableCash.toFixed(2)}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleTrade}
              disabled={numericAmount <= 0}
              className={`w-full h-14 rounded-full font-black text-sm tracking-tight flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer ${
                side === 'buy'
                  ? 'bg-[#22C55E] text-[#0D0E12] glow-lime hover:bg-[#4be277]'
                  : 'bg-[#F43F5E] text-white glow-coral hover:bg-[#ff8892]'
              }`}
            >
              <span>Confirm {side === 'buy' ? 'Purchase' : 'Sale'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
