# AURA Design System: The Single Source of Truth

**Version:** 3.1 (Journey-Centric Semantics)
**Last Updated:** December 17, 2025

This document supersedes all previous style guides. It defines the definitive color, typography, and component standards for the AURA travel application.

---

## 🎨 1. Core Color System

### 🔴 Primary Brand Colors (Identity)
Used for primary interactions across the entire app, regardless of context.
- **Brand Red:** `#DC2626` (red-600)
- **Brand Rose:** `#BE123C` (rose-700)
- **Brand Gradient:** `bg-gradient-to-r from-red-600 to-rose-700`

### 🚥 Semantic Status Colors
Strictly for status indicators only.
- **Success (Good/On Time):** `emerald-500`
- **Warning (Delay/Wait):** `amber-500`
- **Critical (Error/Late):** `red-600`
- **Info (Neutral):** `blue-500`

---

## 🗺️ 2. Journey Context Themes (Psychology)
We use color psychology to manage traveler anxiety.

### 🛫 Departure Context ("Safe & Professional")
*Goal: Reduce anxiety, signal efficiency.*
- **Header:** Slate/Blue Gradient (`from-slate-700 to-blue-600`)
- **Backgrounds:** Cool Neutrals (`slate-50`, `white`)
- **Accents:** Professional Blue (`blue-600`) with Red Brand Highlights
- **Used In:** `DashboardScreen`, `MapScreen`, `Departure Cards`

### 🛬 Arrival Context ("Warm & Welcoming")
*Goal: Create excitement, signal hospitality.*
- **Header:** Warm Amber Gradient (`from-yellow-500 to-orange-600`)
- **Backgrounds:** Warm Neutrals (`orange-50`)
- **Accents:** Friendly Orange (`orange-600`)
- **Used In:** `ArrivalDashboard`, `TransportationOptions`, `DestinationInput`

---

## 🧱 3. Component Standards

### Primary CTA Button (Global)
**Usage:** The main action on any screen.
```tsx
className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 active:scale-[0.98] transition-all"
```

### Glass Cards (Content Containers)
**Usage:** To group content on animated/gradient backgrounds.
```tsx
// Default
className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm"

// Active Selection (Departure)
className="ring-2 ring-red-500 ring-offset-2 bg-red-50"

// Active Selection (Arrival)
className="ring-2 ring-orange-500 ring-offset-2 bg-orange-50"
```

---

## 🚫 4. Forbidden Patterns
1.  **NO Red for "Normal" Departure Status:** Do not use red backgrounds for "Going to Airport" cards (causes panic). Use Blue/Slate.
2.  **NO Teal/Cyan Buttons:** Teal is only for illustrations or specific map features, never for primary action buttons.
3.  **NO Purple/Pink:** Removed from the palette entirely to maintain the MCIA Red/Orange brand identity.


YUO CAN SEARCH THE INTERNET FOR MORE IDEAS.