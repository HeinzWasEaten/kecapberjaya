import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  RotateCw, 
  Globe, 
  Lock, 
  Sliders, 
  Smartphone, 
  Wifi, 
  Sparkles,
  CreditCard,
  Check
} from 'lucide-react';
import { VirtualCard } from '../types';

interface NeoCardStudioProps {
  card: VirtualCard;
  onUpdateCard: (updated: Partial<VirtualCard>) => void;
}

export const NeoCardStudio: React.FC<NeoCardStudioProps> = ({
  card,
  onUpdateCard,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showSensitive, setShowSensitive] = useState(false);
  const [addedToWallet, setAddedToWallet] = useState(false);

  const skinGradients = {
    obsidian: 'from-[#1a1b20] via-[#121317] to-[#0d0e12] border-[#2e3240] text-white',
    'kinetic-lime': 'from-[#122e1b] via-[#0d1f13] to-[#0a140d] border-[#22C55E]/60 text-white',
    'hyper-purple': 'from-[#2b1042] via-[#1a0a2a] to-[#0e0517] border-[#A855F7]/60 text-white',
    'cyber-aurora': 'from-[#0e272a] via-[#141d2e] to-[#1e102d] border-[#6BFF8F]/50 text-white',
  };

  const skinAccentGlow = {
    obsidian: 'rgba(255, 255, 255, 0.05)',
    'kinetic-lime': 'rgba(34, 197, 94, 0.25)',
    'hyper-purple': 'rgba(168, 85, 247, 0.25)',
    'cyber-aurora': 'rgba(107, 255, 143, 0.2)',
  };

  const handleWalletAdd = () => {
    setAddedToWallet(true);
    setTimeout(() => setAddedToWallet(false), 3000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Neo-Card Studio
          </h2>
          <p className="text-xs text-[#94A3B8]">
            Interactive virtual Visa with biometric security & dynamic spending guardrails.
          </p>
        </div>

        {/* Flip Card Action */}
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="px-3.5 py-1.5 rounded-full bg-[#1a1c23] hover:bg-[#232631] border border-[#2e3240] text-xs font-bold text-white flex items-center gap-1.5 transition-all active:scale-[0.97]"
        >
          <RotateCw className="w-3.5 h-3.5 text-[#22C55E]" />
          Flip Card
        </button>
      </div>

      {/* 3D Interactive Virtual Card Canvas */}
      <div className="flex justify-center py-2">
        <div 
          className="w-full max-w-[400px] aspect-[1.586/1] rounded-[2rem] p-6 relative select-none cursor-pointer transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
          style={{
            perspective: '1000px',
            boxShadow: `0 20px 50px ${skinAccentGlow[card.colorScheme]}`,
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Card Surface Container */}
          <div
            className={`w-full h-full rounded-[2rem] p-6 bg-gradient-to-br ${skinGradients[card.colorScheme]} border relative overflow-hidden flex flex-col justify-between transition-all duration-300 ${
              card.isFrozen ? 'brightness-75 contrast-125' : ''
            }`}
          >
            {/* Frozen Ice Scrim Overlay */}
            {card.isFrozen && (
              <div className="absolute inset-0 z-30 bg-gradient-to-t from-[#0d0e12]/80 via-cyan-950/30 to-transparent backdrop-blur-[2px] flex items-center justify-center">
                <div className="px-4 py-1.5 rounded-full bg-[#F43F5E]/20 border border-[#F43F5E] text-[#FF8892] text-xs font-black uppercase tracking-wider flex items-center gap-2 glow-coral">
                  <ShieldAlert className="w-4 h-4" /> Card Temporarily Frozen
                </div>
              </div>
            )}

            {/* Atmospheric Background Wave / Noise Accent */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-[#22C55E]/10 rounded-full blur-2xl pointer-events-none" />

            {!isFlipped ? (
              /* Card Front */
              <>
                {/* Top Row: Chip, Contactless, Logo */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    {/* EMV Chip */}
                    <div className="w-11 h-8 rounded-lg bg-gradient-to-br from-[#E2B770] to-[#B38536] border border-[#f3d08f]/40 p-1 flex flex-col justify-between shadow-inner">
                      <div className="w-full h-0.5 bg-black/20 rounded" />
                      <div className="w-full h-0.5 bg-black/20 rounded" />
                    </div>
                    <Wifi className="w-5 h-5 text-white/70 rotate-90" />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black tracking-tight text-white">Kinetix</span>
                    <span className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">Black</span>
                  </div>
                </div>

                {/* Card Number */}
                <div className="relative z-10 my-auto">
                  <div className="text-xl sm:text-2xl font-mono font-bold tracking-[0.16em] text-white tabular-numbers text-shadow">
                    {showSensitive
                      ? card.cardNumber
                      : `••••  ••••  ••••  ${card.cardNumber.slice(-4)}`}
                  </div>
                </div>

                {/* Bottom Row: Holder & Expiry & Visa */}
                <div className="flex items-end justify-between relative z-10">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/50">
                      Cardmember
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      {card.cardHolder}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-white/50">
                        Expires
                      </span>
                      <span className="text-xs font-mono font-bold text-white tabular-numbers">
                        {card.expDate}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-lg font-black italic tracking-tighter text-white">
                        VISA
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Card Back */
              <>
                <div className="w-full h-10 bg-black/80 -mx-6 mt-2 relative z-10" />

                <div className="relative z-10 flex flex-col gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-white/50">
                    Security Code & Signature
                  </span>
                  <div className="flex items-center justify-between bg-white/90 rounded-md px-3 py-1.5 text-black">
                    <span className="text-[10px] italic font-serif">Authorized Alex Mercer</span>
                    <span className="font-mono font-bold tracking-widest text-xs">
                      {showSensitive ? card.cvv : '•••'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] text-white/40 font-mono relative z-10">
                  <span>FDIC Insured through Kinetix Partner Bank</span>
                  <span>Tap to flip front</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Card Skin Selector Chips */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider">
          Custom Hardware Finish
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { id: 'obsidian', name: 'Obsidian Void', color: 'bg-[#121317]' },
            { id: 'kinetic-lime', name: 'Hyper-Lime Neon', color: 'bg-[#122e1b]' },
            { id: 'hyper-purple', name: 'Cyber Violet', color: 'bg-[#2b1042]' },
            { id: 'cyber-aurora', name: 'Aurora Glass', color: 'bg-[#0e272a]' },
          ].map((skin) => (
            <button
              key={skin.id}
              onClick={() => onUpdateCard({ colorScheme: skin.id as any })}
              className={`p-3 rounded-2xl border flex items-center gap-2.5 transition-all active:scale-[0.98] ${
                card.colorScheme === skin.id
                  ? 'bg-[#1a1c23] border-[#22C55E] text-white shadow-sm'
                  : 'bg-[#14161d] border-[#2e3240] text-[#94A3B8] hover:text-white'
              }`}
            >
              <div className={`w-5 h-5 rounded-full ${skin.color} border border-white/20`} />
              <span className="text-xs font-bold truncate">{skin.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Card Guardrails & Switches (52px x 32px standard switches from spec) */}
      <div className="glass-panel rounded-[2rem] p-5 border border-[#2e3240] space-y-4">
        <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-wider block">
          Card Security Controls
        </span>

        {/* Freeze Card Switch */}
        <div className="flex items-center justify-between py-2 border-b border-[#2e3240]/40">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              card.isFrozen ? 'bg-[#F43F5E]/20 text-[#FF8892]' : 'bg-[#14161d] text-[#94A3B8]'
            }`}>
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Instant Freeze Card</div>
              <div className="text-xs text-[#94A3B8]">Blocks all physical and virtual transactions</div>
            </div>
          </div>

          {/* Pill Track Switch (52px x 32px) */}
          <button
            onClick={() => onUpdateCard({ isFrozen: !card.isFrozen })}
            className={`w-[52px] h-[32px] rounded-full border p-1 transition-colors relative cursor-pointer ${
              card.isFrozen
                ? 'bg-[#F43F5E] border-[#F43F5E]'
                : 'bg-[#1a1c23] border-[#2e3240]'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform ${
                card.isFrozen ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* International Usage Switch */}
        <div className="flex items-center justify-between py-2 border-b border-[#2e3240]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14161d] text-[#94A3B8] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">International Zero-FX</div>
              <div className="text-xs text-[#94A3B8]">Spend abroad without foreign exchange markups</div>
            </div>
          </div>

          <button
            onClick={() => onUpdateCard({ allowInternational: !card.allowInternational })}
            className={`w-[52px] h-[32px] rounded-full border p-1 transition-colors relative cursor-pointer ${
              card.allowInternational
                ? 'bg-[#22C55E] border-[#22C55E]'
                : 'bg-[#1a1c23] border-[#2e3240]'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full bg-white transition-transform ${
                card.allowInternational ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Reveal Card Details Toggle */}
        <div className="flex items-center justify-between py-2 border-b border-[#2e3240]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#14161d] text-[#94A3B8] flex items-center justify-center">
              {showSensitive ? <Eye className="w-5 h-5 text-[#22C55E]" /> : <EyeOff className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-sm font-bold text-white">Reveal Full CVV & PAN</div>
              <div className="text-xs text-[#94A3B8]">Show unmasked numbers for online checkout</div>
            </div>
          </div>

          <button
            onClick={() => setShowSensitive(!showSensitive)}
            className="px-3.5 py-1.5 rounded-full bg-[#1a1c23] hover:bg-[#232631] border border-[#2e3240] text-xs font-bold text-white transition-all"
          >
            {showSensitive ? 'Hide' : 'Reveal'}
          </button>
        </div>

        {/* Monthly Spending Limit Slider */}
        <div className="py-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">Monthly Spending Guardrail</span>
            <span className="text-xs font-black text-[#22C55E] tabular-numbers">
              ${card.currentSpent.toFixed(0)} / ${card.spendingLimit.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min={500}
            max={15000}
            step={250}
            value={card.spendingLimit}
            onChange={(e) => onUpdateCard({ spendingLimit: Number(e.target.value) })}
            className="w-full accent-[#22C55E] bg-[#14161d] h-2 rounded-lg cursor-pointer"
          />

          <div className="flex justify-between text-[10px] text-[#475569] mt-1 font-mono">
            <span>$500 min</span>
            <span>$15,000 max</span>
          </div>
        </div>

        {/* Apple Wallet / Google Pay Pill CTA */}
        <div className="pt-2">
          <button
            onClick={handleWalletAdd}
            className="w-full h-12 rounded-full bg-white hover:bg-slate-100 text-[#0D0E12] font-black text-xs tracking-tight flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md cursor-pointer"
          >
            {addedToWallet ? (
              <>
                <Check className="w-4 h-4 text-[#22C55E]" />
                <span>Added to Apple Wallet & Google Pay</span>
              </>
            ) : (
              <>
                <Smartphone className="w-4 h-4" />
                <span>Add to Apple Wallet / Google Pay</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
