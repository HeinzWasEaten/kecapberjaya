import React from 'react';
import { 
  Wallet, 
  CreditCard, 
  ArrowLeftRight, 
  Cpu, 
  Activity,
  Zap
} from 'lucide-react';
import { NavigationTab } from '../types';

interface MobileBottomNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenTransfer: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenTransfer,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d0e12]/95 backdrop-blur-xl border-t border-[#2e3240]/80 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 px-3 lg:hidden">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Cash Tab */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            currentTab === 'home' ? 'text-[#22C55E]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <Wallet className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold tracking-tight mt-1">Cash</span>
          {currentTab === 'home' && (
            <span className="w-1 h-1 rounded-full bg-[#22C55E] mt-0.5" />
          )}
        </button>

        {/* Cards Tab */}
        <button
          onClick={() => onSelectTab('cards')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            currentTab === 'cards' ? 'text-[#22C55E]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <CreditCard className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold tracking-tight mt-1">Card</span>
          {currentTab === 'cards' && (
            <span className="w-1 h-1 rounded-full bg-[#22C55E] mt-0.5" />
          )}
        </button>

        {/* Center Floating Quick Pay Pill */}
        <div className="flex-1 flex justify-center -mt-5">
          <button
            onClick={onOpenTransfer}
            className="w-13 h-13 rounded-full bg-[#22C55E] text-[#0D0E12] flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.45)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Instant P2P Pay"
          >
            <ArrowLeftRight className="w-6 h-6 stroke-[2.8]" />
          </button>
        </div>

        {/* Vault Tab */}
        <button
          onClick={() => onSelectTab('vault')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            currentTab === 'vault' ? 'text-[#A855F7]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <Cpu className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold tracking-tight mt-1">AI Vault</span>
          {currentTab === 'vault' && (
            <span className="w-1 h-1 rounded-full bg-[#A855F7] mt-0.5" />
          )}
        </button>

        {/* Activity Tab */}
        <button
          onClick={() => onSelectTab('activity')}
          className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
            currentTab === 'activity' ? 'text-[#22C55E]' : 'text-[#94A3B8] hover:text-white'
          }`}
        >
          <Activity className="w-5 h-5 stroke-[2.2]" />
          <span className="text-[10px] font-bold tracking-tight mt-1">Ledger</span>
          {currentTab === 'activity' && (
            <span className="w-1 h-1 rounded-full bg-[#22C55E] mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};
