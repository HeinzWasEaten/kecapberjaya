import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ArrowDownLeft, 
  ArrowUpRight, 
  Sparkles, 
  Coffee, 
  Music, 
  Download, 
  Zap, 
  Search,
  Share2,
  FileText,
  AlertCircle,
  X,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onSplitTransaction?: (tx: Transaction) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onSplitTransaction,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTxDetail, setActiveTxDetail] = useState<Transaction | null>(null);

  // Icon mapping
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return ShoppingBag;
      case 'ArrowDownLeft': return ArrowDownLeft;
      case 'ArrowUpRight': return ArrowUpRight;
      case 'Sparkles': return Sparkles;
      case 'Coffee': return Coffee;
      case 'Music': return Music;
      case 'Download': return Download;
      case 'Zap': return Zap;
      default: return ArrowUpRight;
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tx.cashtag && tx.cashtag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (tx.note && tx.note.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === 'income') return tx.amount > 0;
    if (selectedCategory === 'outflow') return tx.amount < 0 && tx.category !== 'Yield & Rewards';
    if (selectedCategory === 'yield') return tx.category === 'Yield & Rewards';
    return true;
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Search and Segmented Filter Chips */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Activity' },
            { id: 'income', label: 'Income & Inflow', color: 'border-[#22C55E] text-white' },
            { id: 'outflow', label: 'Outflows', color: 'border-[#F43F5E] text-white' },
            { id: 'yield', label: 'AI Yields', color: 'border-[#A855F7] text-white' },
          ].map((chip) => {
            const isActive = selectedCategory === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedCategory(chip.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-[0.97] cursor-pointer ${
                  isActive
                    ? `bg-[#1a1c23] ${chip.color || 'border-[#22C55E] text-white'} border shadow-sm`
                    : 'bg-[#14161d]/80 text-[#94A3B8] border border-transparent hover:text-white hover:border-[#2e3240]'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="h-9 w-full sm:w-56 rounded-full bg-[#14161d] border border-[#2e3240] focus-within:border-[#22C55E] px-3 flex items-center gap-2 transition-colors">
          <Search className="w-3.5 h-3.5 text-[#475569]" />
          <input
            type="text"
            placeholder="Search activity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-xs text-white placeholder-[#475569] focus:outline-none w-full"
          />
        </div>
      </div>

      {/* Transaction Rows Container */}
      <div className="glass-panel rounded-[2rem] p-2 sm:p-3 border border-[#2e3240] shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center text-[#94A3B8] text-xs">
            No transactions found matching your criteria.
          </div>
        ) : (
          <div className="divide-y divide-[#2e3240]/40">
            {filteredTransactions.map((tx) => {
              const Icon = getIcon(tx.iconName);
              const isPositive = tx.amount > 0;
              const isYield = tx.category === 'Yield & Rewards';

              return (
                <div
                  key={tx.id}
                  onClick={() => setActiveTxDetail(tx)}
                  className="min-h-[68px] px-3 py-3 rounded-2xl flex items-center justify-between gap-3 hover:bg-[#1f1f24]/70 transition-all duration-150 cursor-pointer group active:scale-[0.99]"
                >
                  {/* Left Slot: 16px Rounded Square Container */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-[16px] shrink-0 flex items-center justify-center transition-transform group-hover:scale-105 ${
                        isYield
                          ? 'bg-[#A855F7]/15 text-[#DDB7FF] border border-[#A855F7]/30'
                          : isPositive
                          ? 'bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30'
                          : 'bg-[#14161d] text-[#94A3B8] border border-[#2e3240]'
                      }`}
                    >
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>

                    {/* Merchant & Metadata Stack */}
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white truncate group-hover:text-[#22C55E] transition-colors">
                          {tx.merchant}
                        </span>
                        {tx.cashtag && (
                          <span className="text-[11px] text-[#94A3B8] font-mono hidden xs:inline">
                            {tx.cashtag}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <span className="truncate">{tx.category}</span>
                        <span aria-hidden="true" className="text-[#475569]">·</span>
                        <span className="whitespace-nowrap">{tx.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Slot: Tabular Formatted Numeric Total */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex flex-col items-end">
                      <span
                        className={`text-base font-extrabold tabular-numbers tracking-tight ${
                          isYield
                            ? 'text-[#A855F7]'
                            : isPositive
                            ? 'text-[#22C55E]'
                            : 'text-white'
                        }`}
                      >
                        {isPositive ? '+' : '-'}$
                        {Math.abs(tx.amount).toLocaleString('en-US', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] font-medium capitalize">
                        {tx.status}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#475569] group-hover:text-white transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Transaction Details Modal Drawer */}
      {activeTxDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-[2.5rem] glass-modal p-6 relative overflow-hidden border border-[#2e3240] shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
                Transaction Receipt
              </span>
              <button
                onClick={() => setActiveTxDetail(null)}
                className="w-8 h-8 rounded-full bg-[#14161d] hover:bg-[#232631] border border-[#2e3240] flex items-center justify-center text-[#94A3B8] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Total Amount & Merchant */}
            <div className="text-center py-4 border-b border-[#2e3240]/60">
              <div
                className={`text-4xl font-extrabold tracking-tight tabular-numbers mb-1 ${
                  activeTxDetail.amount > 0 ? 'text-[#22C55E]' : 'text-white'
                }`}
              >
                {activeTxDetail.amount > 0 ? '+' : '-'}$
                {Math.abs(activeTxDetail.amount).toFixed(2)}
              </div>
              <div className="text-lg font-bold text-white">{activeTxDetail.merchant}</div>
              <div className="text-xs text-[#94A3B8] mt-1">{activeTxDetail.note || activeTxDetail.category}</div>
            </div>

            {/* Details Table */}
            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Status</span>
                <span className="text-[#22C55E] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Instant Settled
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Date & Time</span>
                <span className="text-white font-medium">{activeTxDetail.dateStr} · {activeTxDetail.timestamp}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Category</span>
                <span className="text-white font-medium">{activeTxDetail.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Ledger ID</span>
                <span className="font-mono text-white text-[11px]">{activeTxDetail.id}-0x88f2a</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => {
                  alert(`Receipt shared with ${activeTxDetail.merchant}`);
                  setActiveTxDetail(null);
                }}
                className="h-12 rounded-full bg-[#1a1c23] hover:bg-[#232631] text-white border border-[#2e3240] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Share2 className="w-4 h-4 text-[#22C55E]" />
                Split / Share
              </button>
              <button
                onClick={() => {
                  alert('Receipt downloaded as PDF (Tax & Accounting Ready)');
                  setActiveTxDetail(null);
                }}
                className="h-12 rounded-full bg-[#22C55E] text-[#0D0E12] text-xs font-black flex items-center justify-center gap-1.5 hover:bg-[#4be277] transition-all glow-lime-sm"
              >
                <FileText className="w-4 h-4" />
                Get PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
