import React from 'react';
import { 
  Wallet, 
  CreditCard, 
  ArrowLeftRight, 
  Cpu, 
  Activity, 
  Smartphone, 
  Monitor, 
  ShieldCheck, 
  Plus, 
  Zap,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../types';

interface ArcSidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenTransfer: () => void;
  onOpenDeposit: () => void;
  isMobilePreview: boolean;
  onToggleMobilePreview: () => void;
  totalBalance: number;
  vaultYieldTotal: number;
}

export const ArcSidebar: React.FC<ArcSidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenTransfer,
  onOpenDeposit,
  isMobilePreview,
  onToggleMobilePreview,
  totalBalance,
  vaultYieldTotal,
}) => {
  const navItems: { id: NavigationTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'home', label: 'Cash & Yield', icon: Wallet },
    { id: 'cards', label: 'Neo-Card Studio', icon: CreditCard },
    { id: 'transfer', label: 'P2P Instant Pay', icon: ArrowLeftRight },
    { id: 'vault', label: 'Algorithmic Vault', icon: Cpu, badge: '5.2% APY' },
    { id: 'activity', label: 'Ledger & Activity', icon: Activity },
  ];

  return (
    <aside className="w-[280px] shrink-0 h-screen sticky top-0 flex flex-col justify-between p-4 bg-[#0d0e12] border-r border-[#2e3240]/60 z-30 select-none">
      {/* Top Brand & Space Header */}
      <div className="flex flex-col gap-6">
        {/* Arc-style Window Pill Header */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#22C55E] to-[#6BFF8F] flex items-center justify-center text-[#0D0E12] font-black text-sm tracking-tighter shadow-[0_0_16px_rgba(34,197,94,0.4)]">
              K
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold tracking-tight text-base leading-tight">
                Kinetix
              </span>
              <span className="text-[11px] font-medium text-[#94A3B8] tracking-wider uppercase">
                Neo-Kinetic OS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-[#1a1c23] px-2 py-1 rounded-full border border-[#2e3240]">
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="text-[11px] font-semibold text-[#22C55E] tabular-numbers">Live</span>
          </div>
        </div>

        {/* Quick Balance Snapshot Pill */}
        <div className="glass-panel rounded-2xl p-3.5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#22C55E]/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-[#94A3B8]">Total Net Worth</span>
            <span className="text-[11px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-md border border-[#22C55E]/20">
              +14.8%
            </span>
          </div>
          <div className="text-2xl font-extrabold text-white tracking-tight tabular-numbers">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="mt-2 pt-2 border-t border-[#2e3240]/60 flex items-center justify-between text-[11px]">
            <span className="text-[#94A3B8] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#A855F7]" />
              AI Yields
            </span>
            <span className="font-semibold text-[#A855F7] tabular-numbers">
              +${vaultYieldTotal.toFixed(2)}/yr
            </span>
          </div>
        </div>

        {/* Navigation Spaces */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-[#475569] tracking-wider uppercase px-3 mb-1">
            Navigation Spaces
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-full text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? 'bg-[#1a1c23] text-white border border-[#2e3240] shadow-[0_0_20px_-5px_rgba(34,197,94,0.18)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1a1c23]/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-[#22C55E]/20 text-[#22C55E]'
                        : 'text-[#94A3B8] group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#A855F7]/15 text-[#DDB7FF] border border-[#A855F7]/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Action Shortcuts */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-[10px] font-bold text-[#475569] tracking-wider uppercase px-3 mb-1">
            Tactile Actions
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenTransfer}
              className="h-11 rounded-full bg-[#22C55E] text-[#0D0E12] font-bold text-xs flex items-center justify-center gap-1.5 transition-transform duration-150 hover:bg-[#4be277] active:scale-[0.97] shadow-[0_4px_16px_rgba(34,197,94,0.25)]"
            >
              <Zap className="w-3.5 h-3.5 fill-[#0D0E12]" />
              Send Pay
            </button>
            <button
              onClick={onOpenDeposit}
              className="h-11 rounded-full bg-[#1a1c23] hover:bg-[#232631] text-white border border-[#2e3240] font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-150 active:scale-[0.97]"
            >
              <Plus className="w-3.5 h-3.5 text-[#22C55E]" />
              Deposit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Profile & Viewport Simulator Controller */}
      <div className="flex flex-col gap-3 pt-4 border-t border-[#2e3240]/60">
        {/* Device Viewport Toggle */}
        <div className="bg-[#14161d] p-1.5 rounded-full border border-[#2e3240] flex items-center justify-between">
          <button
            onClick={onToggleMobilePreview}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-full text-xs font-semibold transition-all ${
              !isMobilePreview
                ? 'bg-[#1a1c23] text-white shadow-sm border border-[#2e3240]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-[#22C55E]" />
            Arc Desktop
          </button>
          <button
            onClick={onToggleMobilePreview}
            className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-full text-xs font-semibold transition-all ${
              isMobilePreview
                ? 'bg-[#22C55E] text-[#0D0E12] shadow-sm font-bold'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Phone View
          </button>
        </div>

        {/* User Card */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-2xl bg-[#14161d]/80 border border-[#2e3240]/40">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#232631] to-[#121317] border border-[#22C55E] flex items-center justify-center text-xs font-bold text-white shadow-[0_0_12px_rgba(34,197,94,0.3)]">
                AM
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#22C55E] border-2 border-[#0D0E12] rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-tight">Alex Mercer</span>
              <span className="text-[11px] text-[#94A3B8] font-mono leading-none">$alex_m</span>
            </div>
          </div>
          <div className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white" title="Account Verified">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
          </div>
        </div>
      </div>
    </aside>
  );
};
