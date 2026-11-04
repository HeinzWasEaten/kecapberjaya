import React, { useState, useEffect } from 'react';
import { 
  ArcSidebar 
} from './components/ArcSidebar';
import { 
  AccountCard 
} from './components/AccountCard';
import { 
  TickerPillScroller 
} from './components/TickerPillScroller';
import { 
  TransactionList 
} from './components/TransactionList';
import { 
  TransferModal 
} from './components/TransferModal';
import { 
  DepositModal 
} from './components/DepositModal';
import { 
  NeoCardStudio 
} from './components/NeoCardStudio';
import { 
  AlgorithmicVault 
} from './components/AlgorithmicVault';
import { 
  TradeModal 
} from './components/TradeModal';
import { 
  MobileBottomNav 
} from './components/MobileBottomNav';
import { 
  NavigationTab, 
  Transaction, 
  TickerAsset, 
  VirtualCard, 
  VaultStrategy, 
  Contact 
} from './types';
import { 
  INITIAL_TICKERS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_CONTACTS, 
  INITIAL_CARD, 
  INITIAL_VAULT_STRATEGIES 
} from './data/mockData';
import { 
  Bell, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Sparkles, 
  ShieldCheck, 
  Smartphone, 
  Monitor,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('home');
  const [isMobilePreview, setIsMobilePreview] = useState<boolean>(false);

  // Financial State
  const [availableCash, setAvailableCash] = useState<number>(22050.45);
  const [vaultStrategies, setVaultStrategies] = useState<VaultStrategy[]>(INITIAL_VAULT_STRATEGIES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [tickers, setTickers] = useState<TickerAsset[]>(INITIAL_TICKERS);
  const [virtualCard, setVirtualCard] = useState<VirtualCard>(INITIAL_CARD);
  const [contacts] = useState<Contact[]>(INITIAL_CONTACTS);

  // Modals state
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [selectedTickerForTrade, setSelectedTickerForTrade] = useState<TickerAsset | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Calculate aggregate balances
  const vaultBalance = vaultStrategies.reduce((acc, v) => acc + v.balance, 0);
  const totalBalance = availableCash + vaultBalance;
  const vaultYieldTotal = vaultStrategies.reduce((acc, v) => acc + v.earnedYTD, 0);

  // Real-time micro price heartbeat for ticker liveliness
  useEffect(() => {
    const interval = setInterval(() => {
      setTickers((prev) =>
        prev.map((t) => {
          const delta = (Math.random() - 0.48) * (t.price * 0.001);
          const newPrice = Number((t.price + delta).toFixed(2));
          return {
            ...t,
            price: newPrice,
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleToggleCardFreeze = () => {
    setVirtualCard((prev) => {
      const nextFrozen = !prev.isFrozen;
      showToast(nextFrozen ? 'Virtual Visa Frozen ❄️' : 'Virtual Visa Unfrozen & Active ⚡');
      return { ...prev, isFrozen: nextFrozen };
    });
  };

  const handleUpdateCard = (updated: Partial<VirtualCard>) => {
    setVirtualCard((prev) => ({ ...prev, ...updated }));
  };

  const handleCompleteTransfer = (newTx: Transaction) => {
    const absAmount = Math.abs(newTx.amount);
    setAvailableCash((prev) => Math.max(0, prev - absAmount));
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Sent $${absAmount.toFixed(2)} to ${newTx.merchant}`);
  };

  const handleCompleteDeposit = (amount: number, newTx: Transaction) => {
    setAvailableCash((prev) => prev + amount);
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`Deposited $${amount.toFixed(2)} into Kinetix Cash`);
  };

  const handleHarvestYield = (amount: number) => {
    setAvailableCash((prev) => prev + amount);
    setVaultStrategies((prev) =>
      prev.map((s) => ({
        ...s,
        earnedYTD: 0,
      }))
    );
    const harvestTx: Transaction = {
      id: `tx-harvest-${Date.now()}`,
      merchant: 'Obsidian Yield Auto-Harvest',
      category: 'Yield & Rewards',
      amount: amount,
      timestamp: 'Just now',
      dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      iconName: 'Sparkles',
      status: 'completed',
      note: 'YTD Algorithmic Yield Harvest to Cash',
    };
    setTransactions((prev) => [harvestTx, ...prev]);
    showToast(`Harvested $${amount.toFixed(2)} to Cash! 🚀`);
  };

  const handleAllocateToStrategy = (strategyId: string, amount: number) => {
    setAvailableCash((prev) => prev - amount);
    setVaultStrategies((prev) =>
      prev.map((s) => (s.id === strategyId ? { ...s, balance: s.balance + amount } : s))
    );
    const allocTx: Transaction = {
      id: `tx-alloc-${Date.now()}`,
      merchant: `Deposit to Vault: ${vaultStrategies.find((s) => s.id === strategyId)?.title || 'Yield Vault'}`,
      category: 'Crypto & Stocks',
      amount: -amount,
      timestamp: 'Just now',
      dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      iconName: 'Cpu',
      status: 'completed',
      note: 'Capital allocation to algorithmic vault',
    };
    setTransactions((prev) => [allocTx, ...prev]);
    showToast(`Allocated $${amount.toFixed(2)} to Algorithmic Vault`);
  };

  const handleExecuteTrade = (
    ticker: TickerAsset,
    amount: number,
    side: 'buy' | 'sell',
    newTx: Transaction
  ) => {
    if (side === 'buy') {
      setAvailableCash((prev) => prev - amount);
    } else {
      setAvailableCash((prev) => prev + amount);
    }
    setTransactions((prev) => [newTx, ...prev]);
    showToast(`${side === 'buy' ? 'Purchased' : 'Sold'} $${amount.toFixed(2)} of ${ticker.symbol}`);
  };

  // Render the core active screen content
  const renderScreenContent = () => {
    switch (currentTab) {
      case 'cards':
        return (
          <div className="flex flex-col gap-6">
            <NeoCardStudio
              card={virtualCard}
              onUpdateCard={handleUpdateCard}
            />
          </div>
        );

      case 'transfer':
        return (
          <div className="flex flex-col gap-6">
            <div className="glass-panel rounded-[2rem] p-6 border border-[#2e3240] text-center">
              <div className="w-14 h-14 rounded-full bg-[#22C55E]/15 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center mx-auto mb-3">
                <Zap className="w-7 h-7 fill-current" />
              </div>
              <h2 className="text-2xl font-black text-white">Instant Peer-to-Peer Hub</h2>
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mt-1 mb-5">
                Send zero-fee money in real-time to any $cashtag, phone number, or crypto wallet.
              </p>
              <button
                onClick={() => setIsTransferOpen(true)}
                className="h-14 px-8 rounded-full bg-[#22C55E] text-[#0D0E12] font-black text-sm tracking-tight inline-flex items-center gap-2 hover:bg-[#4be277] transition-all glow-lime cursor-pointer"
              >
                <span>Launch Tactile Keypad</span>
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
            <div>
              <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block mb-3">
                Recent P2P Transfers
              </span>
              <TransactionList
                transactions={transactions.filter((t) => t.category === 'Transfers')}
              />
            </div>
          </div>
        );

      case 'vault':
        return (
          <AlgorithmicVault
            strategies={vaultStrategies}
            onHarvestYield={handleHarvestYield}
            onAllocateToStrategy={handleAllocateToStrategy}
            availableCash={availableCash}
          />
        );

      case 'activity':
        return (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Activity & Settlement Ledger
              </h2>
              <p className="text-xs text-[#94A3B8]">
                Real-time transaction history with instant receipts and cryptographic audit proofs.
              </p>
            </div>
            <TransactionList transactions={transactions} />
          </div>
        );

      case 'home':
      default:
        return (
          <div className="flex flex-col gap-6">
            {/* Primary Glassmorphic Account Card */}
            <AccountCard
              balance={totalBalance}
              availableCash={availableCash}
              vaultBalance={vaultBalance}
              isCardFrozen={virtualCard.isFrozen}
              onToggleCardFreeze={handleToggleCardFreeze}
              onOpenTransfer={() => setIsTransferOpen(true)}
              onOpenDeposit={() => setIsDepositOpen(true)}
              onOpenVault={() => setCurrentTab('vault')}
            />

            {/* Arc-Style Ticker Scroller */}
            <TickerPillScroller
              tickers={tickers}
              onSelectTicker={(ticker) => setSelectedTickerForTrade(ticker)}
            />

            {/* Recent High-Velocity Activity */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
                  Recent Ledger Activity
                </span>
                <button
                  onClick={() => setCurrentTab('activity')}
                  className="text-xs font-semibold text-[#22C55E] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View All <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <TransactionList transactions={transactions.slice(0, 6)} />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0E12] text-[#E3E2E7] flex flex-col font-sans selection:bg-[#22C55E]/30 selection:text-white relative">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1a1c23] border border-[#22C55E] text-white text-xs font-bold flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container Layout */}
      {isMobilePreview ? (
        /* PHONE VIEWPORT SIMULATION (390px iPhone Frame with Notch & Bottom Safe Area) */
        <div className="min-h-screen py-6 px-4 flex flex-col items-center justify-center bg-[#07080a]">
          {/* Top Bar Switcher to return to desktop */}
          <div className="mb-4 flex items-center gap-3">
            <span className="text-xs font-semibold text-[#94A3B8]">
              Simulating Mobile Touch First Viewport (390px)
            </span>
            <button
              onClick={() => setIsMobilePreview(false)}
              className="px-3 py-1 rounded-full bg-[#1a1c23] text-white border border-[#2e3240] text-xs font-bold flex items-center gap-1.5 hover:bg-[#232631] transition-all"
            >
              <Monitor className="w-3.5 h-3.5 text-[#22C55E]" />
              Switch to Arc Desktop
            </button>
          </div>

          {/* Physical Phone Frame */}
          <div className="w-[390px] h-[844px] rounded-[48px] bg-[#0d0e12] border-[6px] border-[#2e3240] shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden relative flex flex-col">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-50 flex items-center justify-between px-3">
              <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#1a1c23] border border-white/20" />
            </div>

            {/* Mobile Status Bar */}
            <div className="h-11 px-7 flex items-end justify-between text-[11px] font-bold text-white z-40 select-none pb-1">
              <span>9:41</span>
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <span className="w-5 h-2.5 rounded-sm border border-white flex items-center p-0.5">
                  <span className="h-full w-full bg-[#22C55E] rounded-xs" />
                </span>
              </div>
            </div>

            {/* Mobile Header */}
            <div className="px-5 py-2 flex items-center justify-between border-b border-[#2e3240]/40">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#22C55E] to-[#6BFF8F] flex items-center justify-center text-[#0D0E12] font-black text-xs">
                  K
                </div>
                <span className="text-sm font-extrabold text-white">Kinetix</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTransferOpen(true)}
                  className="w-8 h-8 rounded-full bg-[#1a1c23] border border-[#2e3240] flex items-center justify-center text-white"
                >
                  <Zap className="w-4 h-4 text-[#22C55E]" />
                </button>
              </div>
            </div>

            {/* Scrollable Mobile Body */}
            <div className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-none">
              {renderScreenContent()}
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <MobileBottomNav
              currentTab={currentTab}
              onSelectTab={setCurrentTab}
              onOpenTransfer={() => setIsTransferOpen(true)}
            />
          </div>
        </div>
      ) : (
        /* EXPANDED ARC DESKTOP & RESPONSIVE CANVAS */
        <div className="flex-1 flex w-full">
          {/* Floating Arc Sidebar Rail (Hidden on small mobile screens) */}
          <div className="hidden lg:block">
            <ArcSidebar
              currentTab={currentTab}
              onSelectTab={setCurrentTab}
              onOpenTransfer={() => setIsTransferOpen(true)}
              onOpenDeposit={() => setIsDepositOpen(true)}
              isMobilePreview={isMobilePreview}
              onToggleMobilePreview={() => setIsMobilePreview(true)}
              totalBalance={totalBalance}
              vaultYieldTotal={vaultYieldTotal}
            />
          </div>

          {/* Centered 12-Column Responsive Desktop Canvas (max-w-[1200px]) */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top Bar for Desktop & Mobile Header */}
            <header className="sticky top-0 z-30 bg-[#0d0e12]/90 backdrop-blur-xl border-b border-[#2e3240]/60 px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
              {/* Brand and Active Tab Label */}
              <div className="flex items-center gap-3">
                <div className="lg:hidden w-8 h-8 rounded-full bg-gradient-to-tr from-[#22C55E] to-[#6BFF8F] flex items-center justify-center text-[#0D0E12] font-black text-sm">
                  K
                </div>
                <div>
                  <h1 className="text-base sm:text-lg font-black text-white tracking-tight capitalize leading-tight">
                    {currentTab === 'home' && 'Cash & Algorithmic Yield'}
                    {currentTab === 'cards' && 'Virtual Neo-Card Studio'}
                    {currentTab === 'transfer' && 'Instant P2P Pay'}
                    {currentTab === 'vault' && 'Automated Wealth Vault'}
                    {currentTab === 'activity' && 'Settlement Ledger'}
                  </h1>
                  <span className="text-[11px] text-[#94A3B8] font-medium hidden sm:inline">
                    Neo-Kinetic Dark Architecture · Zero-Fee FedNow Settlement
                  </span>
                </div>
              </div>

              {/* Action Buttons in Header */}
              <div className="flex items-center gap-2.5">
                {/* Switch to phone frame button */}
                <button
                  onClick={() => setIsMobilePreview(true)}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1c23] hover:bg-[#232631] text-white border border-[#2e3240] text-xs font-bold transition-all"
                  title="Preview in Mobile Viewport Mode"
                >
                  <Smartphone className="w-3.5 h-3.5 text-[#22C55E]" />
                  <span>Phone Frame</span>
                </button>

                {/* Primary Quick Pay Header Trigger */}
                <button
                  onClick={() => setIsTransferOpen(true)}
                  className="h-9 px-4 rounded-full bg-[#22C55E] text-[#0D0E12] font-black text-xs tracking-tight flex items-center gap-1.5 hover:bg-[#4be277] transition-all glow-lime-sm cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-[#0D0E12]" />
                  <span>Instant Pay</span>
                </button>
              </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12">
              {renderScreenContent()}
            </main>

            {/* Mobile Fixed Bottom Nav (rendered only on mobile viewports) */}
            <MobileBottomNav
              currentTab={currentTab}
              onSelectTab={setCurrentTab}
              onOpenTransfer={() => setIsTransferOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Modals */}
      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
        availableCash={availableCash}
        contacts={contacts}
        onCompleteTransfer={handleCompleteTransfer}
      />

      <DepositModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        onCompleteDeposit={handleCompleteDeposit}
      />

      <TradeModal
        ticker={selectedTickerForTrade}
        onClose={() => setSelectedTickerForTrade(null)}
        availableCash={availableCash}
        onExecuteTrade={handleExecuteTrade}
      />
    </div>
  );
}
