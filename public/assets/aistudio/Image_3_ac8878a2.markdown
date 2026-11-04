---
name: Neo-Kinetic Dark Fintech
colors:
  surface: '#121317'
  surface-dim: '#121317'
  surface-bright: '#38393d'
  surface-container-lowest: '#0d0e12'
  surface-container-low: '#1a1b20'
  surface-container: '#1f1f24'
  surface-container-high: '#292a2e'
  surface-container-highest: '#343439'
  on-surface: '#e3e2e7'
  on-surface-variant: '#bccbb9'
  inverse-surface: '#e3e2e7'
  inverse-on-surface: '#2f3035'
  outline: '#869585'
  outline-variant: '#3d4a3d'
  surface-tint: '#4ae176'
  primary: '#4be277'
  on-primary: '#003915'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#006e2f'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#ffb3b7'
  on-tertiary: '#67001b'
  tertiary-container: '#ff8892'
  on-tertiary-container: '#840025'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#121317'
  on-background: '#e3e2e7'
  surface-variant: '#343439'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-numeric:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
This design system defines a high-velocity, youth-centric financial experience that fuses the hyper-stylized utilitarianism of Cash App with the fluid spatial craft of Arc Browser. Built primarily for a mobile-first Gen Z cohort, the aesthetic rejects clinical corporate banking in favor of an energetic, game-native interface that makes wealth management, algorithmic trading, and peer-to-peer transfers feel visceral and modern.

The visual style merges dark-mode glassmorphism with high-contrast kinetic accents:
- **Spatial Glass Surfaces:** Semi-translucent obsidian layers resting over atmospheric depth blurs, giving panels an elevated deck feel.
- **Electric Accent Signifiers:** High-voltage neon cues that map directly to financial behavior—treating algorithmic/AI insights, inbound capital, and outgoing cash as luminous focal points.
- **Gamified Tactility:** Heavy, ergonomic tap targets, snappy spatial transitions, and high-feedback states designed for intuitive single-thumb operation.

## Colors
The palette leverages a deep void background to maximize the luminance of purposeful accent tokens:

- **Surface & Void Base:** 
  - Canvas / Canvas Root: `#0D0E12` (Pitch Charcoal Void)
  - Surface Glass Base: `#1A1C23` with alpha variants for layering (`rgba(26, 28, 35, 0.7)` to `rgba(26, 28, 35, 0.95)`)
  - Elevated Container / Floating Modals: `#232631`
  - Outline / Glass Hairline: `#2E3240` (Subtle 1px structural boundary)
  
- **Functional & Expressive Accents:**
  - **Primary (`#22C55E` - Vibrant Lime):** Wealth expansion, inbound deposits, yields, active toggles, and primary conversion triggers.
  - **Secondary (`#A855F7` - Electric Purple):** Automated investing, predictive AI features, algorithmic balance projections, and premium features.
  - **Tertiary (`#F43F5E` - Muted Coral):** Debits, outgoing splits, card freezes, loss margins, and critical confirmations.
  
- **Text & Editorial Hierarchy:**
  - High Emphasis: `#FFFFFF` (Solid White)
  - Medium Emphasis / Secondary: `#94A3B8` (Cool Slate)
  - Low Emphasis / Disabled: `#475569` (Darkened Muted Slate)

## Typography
Plus Jakarta Sans delivers geometric precision with rounded terminals, giving numeric figures and financial statistics a modern, friendly readability. 

- Large balance metrics use `display-lg` with tight negative tracking (`-0.04em`) to create an authoritative, ticker-like visual presence.
- Tonal hierarchy is driven by weight variation: headings and balance indicators utilize 700/800 weights, while supporting contextual labels use 600 weight with wide letter-spacing (`0.02em` to `0.04em`) to mimic terminal indicators.
- Numeric representations must always enforce tabular sizing (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter during real-time balance fluctuations or ticker changes.

## Layout & Spacing
The layout employs an 8pt-aligned fluid grid system optimized for one-handed mobile reachability:

- **Mobile First Ergonomics:** Primary operational hubs and sticky transactional buttons reside strictly within the bottom 40% of the screen (the primary thumb zone). Visual assets and static balances sit in the top upper viewport.
- **Breakpoints & Max Widths:**
  - Mobile (`< 640px`): Single column fluid container with `1rem` outer margins. Full-bleed cards or 16px inset cards.
  - Tablet (`640px - 1024px`): 6-column grid with `1.5rem` gutters.
  - Desktop (`> 1024px`): 12-column grid maxing out at `1200px` centered canvas, with a dedicated persistent Arc-inspired floating left rail (280px).
- **Rhythm:** Inter-card vertical spacing relies on `space-md` (16px), while tight grouping of input fields or metric groups adheres strictly to `space-sm` (8px).

## Elevation & Depth
Depth is created by layered glassmorphic translucency rather than traditional black drop shadows:

- **Base Void (Level 0):** Canvas `#0D0E12`. No blur, zero elevation.
- **Glass Panel (Level 1):** Semi-opaque background (`rgba(26, 28, 35, 0.75)`), backdrop blur of `20px`, accompanied by an inner stroke border of `1px solid #2E3240`.
- **Floating Modals & Active Decks (Level 2):** `#1A1C23` with a backdrop blur of `32px`, bordered by `1px solid rgba(46, 50, 64, 0.8)`. Soft ambient glow under active surfaces using colored luminescence rather than gray shadows (e.g., lime glow: `0px 12px 32px -8px rgba(34, 197, 94, 0.15)`).
- **Interactive Press States:** Elements recess with a subtle scale transformation (`scale(0.97)`) and a reduction in surface opacity, simulating a haptic physical push.

## Shapes
A pill-dominant shape profile reflects the modern mobile OS vernacular and contemporary desktop app framing:

- **Primary Containers & Cards:** Rounded with `rounded-lg` (2rem / 32px), creating smooth, pebble-like surfaces that mimic physical credit cards and phone boundaries.
- **Action Triggers & Inputs:** Standardized on full pill shapes (`rounded-full` / 9999px) for buttons, search bars, and segment pills to maximize tap comfort.
- **Micro UI Elements:** Badges, transaction status pills, and numeric tokens use `rounded-md` (0.75rem / 12px) to prevent circular visual fatigue.

## Components

### Buttons
- **Primary (Deposit/Pay):** Solid `#22C55E` fill, `#0D0E12` bold typography. Full pill shape. Height: `56px` for thumb-target comfort. Hover/active states include scale-down (`0.98`) and a soft neon halo.
- **AI Assist / Action:** Gradient border or fill derived from `#A855F7` with subtle animated purple shimmer. Height: `48px`.
- **Secondary / Ghost:** Transparent surface with `1px solid #2E3240`, white text, lightening to `#1A1C23` on press.

### Cards & Decks
- **Glassmorphic Account Card:** Dark slate base `#1A1C23` with `1px solid #2E3240`, backdrop blur `24px`, padding `1.5rem`. Contains balance hierarchy, masked account numbers, and dynamic micro-charts.
- **Arc-Style Ticker Card:** Compact horizontal pill card featuring high-contrast neon sparklines and ticker abbreviations.

### Input Fields
- **Money / Transfer Input:** Borderless, massive display numeric typography (`48px`), centered or leading with an accent symbol. Supporting keypad uses floating glass discs.
- **Form Inputs:** Full pill, height `52px`, `#14161D` background with `1px solid #2E3240`, placeholder `#475569`, active focus ring glowing with `#22C55E` (1px) and zero offset blur.

### Chips & Segment Controls
- **Filter & Category Chips:** Pill-shaped, minimal background `rgba(255, 255, 255, 0.05)`, text `#94A3B8`. Active state toggles to solid white text with a vibrant border matching the domain (Lime for income filters, Purple for automated savings).

### Checkboxes, Toggles & Radios
- **Switches:** Pill tracks (`52px x 32px`) in `#1A1C23` with `#2E3240` border. Active state transitions the track background to `#22C55E` with an off-white circular knob (`24px`).
- **Gamified Checkmarks:** Circular selection controls that populate with a glowing `#22C55E` checkmark and subtle radial burst animation upon transaction approval.

### Transaction Lists
- Rows have a min-height of `68px` for one-tap readability. Left slot features a rounded square (`16px`) container holding merchant avatar or dynamic category icon. Right slot features tabular aligned numeric totals: `+#...` in Lime Green, `-#...` in crisp White or Coral.