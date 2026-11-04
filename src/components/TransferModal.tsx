import React, { useState } from 'react';
import { 
  X, 
  Delete, 
  Send, 
  Check, 
  Sparkles, 
  User, 
  Zap, 
  Search,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Contact, Transaction } from '../types';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableCash: number;
  contacts: Contact[];
  onCompleteTransfer: (newTx: Transaction) => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
  availableCash,
  contacts,
  onCompleteTransfer,
}) => {
  const [amountStr, setAmountStr] = useState<string>('0');
  const [selectedContact, setSelectedContact] = useState<Contact>(contacts[0]);
  const [customCashtag, setCustomCashtag] = useState<string>('');
  const [note, setNote] = useState<string>('Dinner & drinks 🥂');
  const [isInstant, setIsInstant] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [completedTx, setCompletedTx] = useState<Transaction | null>(null);

  if (!isOpen) return null;

  const numericAmount = parseFloat(amountStr) || 0;

  const handleKeyPress = (val: string) => {
    if (isSuccess) return;

    if (val === 'backspace') {
      if (amountStr.length <= 1) {
        setAmountStr('0');
      } else {
        setAmountStr(amountStr.slice(0, -1));
      }
      return;
    }

    if (val === '.') {
      if (amountStr.includes('.')) return;
      setAmountStr(amountStr + '.');
      return;
    }

    // Cap decimal places at 2
    if (amountStr.includes('.') && amountStr.split('.')[1].length >= 2) {
      return;
    }

    if (amountStr === '0') {
      setAmountStr(val);
    } else {
      if (amountStr.length >= 7) return; // limit input length
      setAmountStr(amountStr + val);
    }
  };

  const handleExecutePayment = () => {
    if (numericAmount <= 0) return;
    if (numericAmount > availableCash) {
      alert(`Amount exceeds your available cash balance ($${availableCash.toFixed(2)})`);
      return;
    }

    const recipientName = customCashtag.trim() ? customCashtag : selectedContact.name;
    const cashtag = customCashtag.trim() ? customCashtag : selectedContact.cashtag;

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      merchant: recipientName,
      cashtag: cashtag,
      category: 'Transfers',
      amount: -numericAmount,
      timestamp: 'Just now',
      dateStr: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      iconName: 'ArrowUpRight',
      status: 'completed',
      note: note.trim() || 'Instant transfer',
    };

    setCompletedTx(newTx);
    setIsSuccess(true);

    // Gamified visual celebration: Canvas Confetti & Radial burst
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#22C55E', '#A855F7', '#6BFF8F', '#FFFFFF'],
      });
    } catch {
      // safe fallback
    }

    onCompleteTransfer(newTx);
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setAmountStr('0');
    setCompletedTx(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-[2.5rem] glass-modal p-6 relative overflow-hidden border border-[#2e3240] shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
        {/* Ambient glow */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-[#22C55E]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#22C55E]/20 text-[#22C55E] flex items-center justify-center">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              {isSuccess ? 'Payment Confirmed' : 'Instant P2P Transfer'}
            </span>
          </div>

          <button
            onClick={resetAndClose}
            className="w-9 h-9 rounded-full bg-[#14161d] hover:bg-[#232631] border border-[#2e3240] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          /* Gamified Success State with Radial Burst Animation */
          <div className="flex flex-col items-center justify-center py-8 text-center relative z-10">
            {/* Gamified Checkmark with animated glowing rings */}
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-[#22C55E] blur-xl opacity-40 animate-ping" />
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#22C55E] to-[#6BFF8F] flex items-center justify-center text-[#0D0E12] shadow-[0_0_32px_rgba(34,197,94,0.6)] relative z-10 animate-in zoom-in-75 duration-300">
                <Check className="w-10 h-10 stroke-[3.5]" />
              </div>
            </div>

            <span className="text-xs font-bold text-[#22C55E] uppercase tracking-wider mb-1">
              Transaction Settled
            </span>
            <div className="text-4xl font-black text-white tracking-tight tabular-numbers mb-2">
              ${numericAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-sm text-[#94A3B8] mb-6">
              Transferred instantly to <span className="text-white font-bold">{completedTx?.merchant}</span>
            </p>

            <div className="w-full bg-[#14161d] rounded-2xl p-4 border border-[#2e3240] text-left text-xs mb-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Reference ID</span>
                <span className="font-mono text-white">{completedTx?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Speed</span>
                <span className="text-[#22C55E] font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-[#22C55E]" /> Real-Time Zero Fee
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Memo</span>
                <span className="text-white">{completedTx?.note}</span>
              </div>
            </div>

            <button
              onClick={resetAndClose}
              className="w-full h-14 rounded-full bg-[#22C55E] text-[#0D0E12] font-black text-sm tracking-tight flex items-center justify-center gap-2 hover:bg-[#4be277] transition-transform active:scale-[0.98] glow-lime cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        ) : (
          /* Transfer Input & Tactile Keypad */
          <div className="flex flex-col relative z-10">
            {/* Recipient Quick Chips */}
            <div className="mb-4">
              <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider block mb-2">
                Recent Contacts
              </span>
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                {contacts.map((contact) => {
                  const isSelected = selectedContact.id === contact.id && !customCashtag;
                  return (
                    <button
                      key={contact.id}
                      onClick={() => {
                        setSelectedContact(contact);
                        setCustomCashtag('');
                      }}
                      className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all active:scale-[0.96] ${
                        isSelected
                          ? 'bg-[#1a1c23] border-[#22C55E] text-white shadow-[0_0_12px_rgba(34,197,94,0.25)]'
                          : 'bg-[#14161d] border-[#2e3240] text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#232631] to-[#121317] border border-[#2e3240] flex items-center justify-center text-[10px] font-bold text-white">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-xs font-semibold">{contact.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Cashtag / Name Input */}
            <div className="mb-3">
              <div className="h-11 rounded-full bg-[#14161d] border border-[#2e3240] focus-within:border-[#22C55E] px-4 flex items-center gap-2 transition-all">
                <Search className="w-4 h-4 text-[#475569]" />
                <input
                  type="text"
                  placeholder="Or enter $cashtag, phone, or name..."
                  value={customCashtag}
                  onChange={(e) => setCustomCashtag(e.target.value)}
                  className="bg-transparent w-full text-xs text-white placeholder-[#475569] focus:outline-none"
                />
              </div>
            </div>

            {/* Massive Display Numeric Typography ($48px) */}
            <div className="py-4 text-center my-1">
              <div className="text-5xl font-black text-white tracking-tight tabular-numbers flex items-center justify-center">
                <span className="text-[#22C55E] mr-1">$</span>
                <span>{amountStr}</span>
              </div>
              <div className="text-[11px] font-medium text-[#94A3B8] mt-1">
                Available Cash: <span className="font-bold text-white tabular-numbers">${availableCash.toFixed(2)}</span>
              </div>
            </div>

            {/* Note Memo Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="What is this for? (Add note or emoji)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-11 px-4 rounded-full bg-[#14161d] border border-[#2e3240] focus:border-[#22C55E] text-xs text-white placeholder-[#475569] focus:outline-none transition-colors"
              />
            </div>

            {/* Floating Glass Discs Keypad (Cash App Style) */}
            <div className="grid grid-cols-3 gap-2.5 mb-5">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleKeyPress(key)}
                  className="h-13 rounded-2xl bg-[#14161d] hover:bg-[#1a1c23] border border-[#2e3240]/80 flex items-center justify-center text-lg font-bold text-white transition-all active:scale-[0.93] active:bg-[#232631] cursor-pointer"
                >
                  {key === 'backspace' ? (
                    <Delete className="w-5 h-5 text-[#94A3B8]" />
                  ) : (
                    key
                  )}
                </button>
              ))}
            </div>

            {/* Primary Action Button (56px full pill with neon halo) */}
            <button
              onClick={handleExecutePayment}
              disabled={numericAmount <= 0}
              className={`w-full h-14 rounded-full font-black text-sm tracking-tight flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.98] cursor-pointer ${
                numericAmount > 0
                  ? 'bg-[#22C55E] text-[#0D0E12] glow-lime hover:bg-[#4be277]'
                  : 'bg-[#1a1c23] text-[#475569] border border-[#2e3240] cursor-not-allowed'
              }`}
            >
              <span>Pay ${numericAmount.toFixed(2)}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
