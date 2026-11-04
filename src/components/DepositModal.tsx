import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Smartphone, 
  CreditCard, 
  Check, 
  ArrowDownLeft,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Transaction } from '../types';

interface DepositModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompleteDeposit: (amount: number, newTx: Transaction) => void;
}

export const DepositModal: React.FC<DepositModalProps> = ({
  isOpen,
  onClose,
  onCompleteDeposit,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'bank' | 'applepay' | 'debit'>('bank');
  const [amountStr, setAmountStr] = useState<string>('500');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickAmounts = [100, 250, 500, 1000, 2500];

  const handleDeposit = () => {
    const num = parseFloat(amountStr);
    if (!num || num <= 0) return;

    const methodNames = {
      bank: 'Chase Bank Checking (••• 4912)',
      applepay: 'Apple Pay Cash',
      debit: 'Visa Debit (••• 3081)',
    };

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      merchant: methodNames[selectedMethod],
      category: 'Transfers',
      amount: num,
      timestamp: 'Just now',
      dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      iconName: 'ArrowDownLeft',
      status: 'completed',
      note: 'Instant cash deposit',
    };

    setIsSuccess(true);
    try {
      confetti({
        particleCount: 60,
        spread: 55,
        colors: ['#22C55E', '#6BFF8F', '#FFFFFF'],
      });
    } catch {}

    onCompleteDeposit(num, newTx);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setAmountStr('500');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-[2.5rem] glass-modal p-6 relative overflow-hidden border border-[#2e3240] shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              {isSuccess ? 'Deposit Cleared' : 'Add Cash Instantly'}
            </span>
          </div>

          <button
            onClick={resetAndClose}
            className="w-9 h-9 rounded-full bg-[#14161d] hover:bg-[#232631] border border-[#2e3240] flex items-center justify-center text-[#94A3B8] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#22C55E] to-[#6BFF8F] flex items-center justify-center text-[#0D0E12] shadow-[0_0_32px_rgba(34,197,94,0.6)] mb-5">
              <Check className="w-10 h-10 stroke-[3.5]" />
            </div>
            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider mb-1">
              Funds Available Now
            </span>
            <div className="text-4xl font-black text-white tabular-numbers mb-2">
              +${parseFloat(amountStr).toFixed(2)}
            </div>
            <p className="text-xs text-[#94A3B8] mb-6">
              Instant settlement via FedNow / RTP network. Zero deposit fee.
            </p>
            <button
              onClick={resetAndClose}
              className="w-full h-14 rounded-full bg-[#22C55E] text-[#0D0E12] font-black text-sm tracking-tight hover:bg-[#4be277] transition-all glow-lime cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Amount Selection */}
            <div className="text-center py-2">
              <span className="text-xs text-[#94A3B8] block mb-1">Enter Deposit Amount</span>
              <div className="text-5xl font-black text-white tracking-tight tabular-numbers flex items-center justify-center">
                <span className="text-[#22C55E] mr-1">$</span>
                <input
                  type="number"
                  value={amountStr}
                  onChange={(e) => setAmountStr(e.target.value)}
                  className="bg-transparent text-center w-48 focus:outline-none"
                />
              </div>
            </div>

            {/* Quick Amount Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {quickAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmountStr(amt.toString())}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    amountStr === amt.toString()
                      ? 'bg-[#22C55E] text-[#0D0E12] border-[#22C55E]'
                      : 'bg-[#14161d] text-[#94A3B8] border-[#2e3240] hover:text-white'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            {/* Funding Source Selector */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block">
                Funding Account
              </span>

              {[
                { id: 'bank', name: 'Chase Premier Checking (••• 4912)', fee: 'Free · Instant', icon: Building2 },
                { id: 'applepay', name: 'Apple Pay Instant', fee: 'Free · 1-Tap', icon: Smartphone },
                { id: 'debit', name: 'Debit Card (••• 3081)', fee: 'Free · Instant', icon: CreditCard },
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = selectedMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethod(m.id as any)}
                    className={`w-full p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#1a1c23] border-[#22C55E] text-white shadow-sm'
                        : 'bg-[#14161d] border-[#2e3240] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-[#22C55E]/20 text-[#22C55E]' : 'bg-[#121317] text-[#94A3B8]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">{m.name}</div>
                        <div className="text-[10px] text-[#94A3B8]">{m.fee}</div>
                      </div>
                    </div>

                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#22C55E] bg-[#22C55E]' : 'border-[#475569]'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#0D0E12]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Deposit CTA */}
            <div className="pt-2">
              <button
                onClick={handleDeposit}
                className="w-full h-14 rounded-full bg-[#22C55E] text-[#0D0E12] font-black text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-[#4be277] transition-all glow-lime cursor-pointer active:scale-[0.98]"
              >
                <span>Deposit ${parseFloat(amountStr || '0').toFixed(2)}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
