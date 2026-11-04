export type NavigationTab = 'home' | 'cards' | 'transfer' | 'vault' | 'activity';

export interface Transaction {
  id: string;
  merchant: string;
  cashtag?: string;
  category: 'Food & Dining' | 'Crypto & Stocks' | 'Transfers' | 'Shopping' | 'Yield & Rewards' | 'Entertainment';
  amount: number; // positive = inflow, negative = outflow
  timestamp: string;
  dateStr: string;
  iconName: string;
  avatarUrl?: string;
  status: 'completed' | 'pending' | 'reversed';
  note?: string;
}

export interface TickerAsset {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  isPositive: boolean;
  sparkline: number[];
  category: 'crypto' | 'equity' | 'yield';
}

export interface VirtualCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expDate: string;
  cvv: string;
  isFrozen: boolean;
  spendingLimit: number;
  currentSpent: number;
  colorScheme: 'obsidian' | 'kinetic-lime' | 'hyper-purple' | 'cyber-aurora';
  allowInternational: boolean;
  allowAtm: boolean;
}

export interface VaultStrategy {
  id: string;
  title: string;
  subtitle: string;
  apy: number;
  risk: 'Low' | 'Medium' | 'Algorithmic';
  balance: number;
  earnedYTD: number;
  isActive: boolean;
  asset: string;
}

export interface Contact {
  id: string;
  name: string;
  cashtag: string;
  avatar: string;
  recent: boolean;
}
