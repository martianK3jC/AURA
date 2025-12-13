# AURA Color Standardization Guide

## 🎨 Official Color System

### Primary Brand Colors (ALL Screens)
```css
Primary CTA: from-red-600 to-rose-700
Primary Gradient: from-red-600 to-orange-600
Text Gradient: from-orange-400 to-red-500
```

### Semantic Colors (Status Indicators Only)
```css
Success: emerald-500 (checkmarks, completed states)
Warning: amber-500 (delays, attention needed)
Error: red-600 (critical alerts)
```

### ❌ FORBIDDEN COLORS (Never Use These for CTAs)
- Teal/Cyan (only for very specific contexts)
- Purple/Pink (removed)
- Green buttons (only for status, not CTAs)
- Blue (reserved for info badges only)

---

## 🔴 Button Standardization

### Primary CTA Button (Main Actions)
```tsx
className="w-full bg-gradient-to-r from-red-600 to-rose-700 text-white 
           font-bold py-4 rounded-xl 
           shadow-lg shadow-red-500/30 
           hover:shadow-xl hover:shadow-red-500/40 
           active:scale-[0.98] transition-all"
```

**Use for:**
- "Start Journey"
- "Next" / "Continue"
- "Choose Destination"
- "Book Ride"
- "Confirm"

### Secondary Button (Alternative Actions)
```tsx
className="border-2 border-red-200 hover:border-red-400 
           bg-white text-red-600 font-semibold 
           py-3 px-6 rounded-xl 
           hover:bg-red-50 transition-all"
```

**Use for:**
- "Back"
- "Skip"
- "Cancel"

### Selection Cards
```tsx
className={`border-2 transition-all hover:shadow-lg 
           ${isSelected 
             ? 'border-red-500 ring-2 ring-red-500 ring-offset-2 bg-red-50/30' 
             : 'border-gray-200 hover:border-red-300'}`}
```

---

## 🎯 Screen-Specific Rules

### Landing Screen
- Hero gradient: `from-red-600 to-orange-600`
- Primary CTA: `from-red-600 to-rose-700`

### Traveler Screens (All)
- Primary CTA: `from-red-600 to-rose-700`
- Selection highlights: `red-500` borders
- Active states: `bg-red-50`
- Icons: `text-red-600`

### Arrivals Screens
- ❌ DO NOT use teal/emerald for CTAs
- ✅ USE: `from-red-600 to-rose-700` (same as departure)
- Header can use teal gradient (informational only)
- CTAs must be red

### Operator Dashboard
- Primary CTA: `from-orange-600 to-red-600`
- Accents: orange/red/yellow
- Alert states: `red-600`
- Nominal states: emerald (status only)

---

## 🚫 Common Mistakes to Avoid

### ❌ WRONG:
```tsx
// Teal buttons
className="bg-teal-600"

// Purple buttons  
className="from-purple-600 to-pink-600"

// Green buttons (except status)
className="bg-green-500"

// Mixed inconsistent gradients
className="from-orange-500 to-red-600"
```

### ✅ CORRECT:
```tsx
// Always use red-to-rose for CTAs
className="bg-gradient-to-r from-red-600 to-rose-700"

// Consistent selection states
className="ring-2 ring-red-500 bg-red-50"

// Proper status colors
className="bg-emerald-500" // ONLY for completed checkmarks
```

---

## 📋 Files Needing Updates

### High Priority (User-Facing)
1. ✅ TransportationOptionsScreen.tsx - Fixed purple gradient
2. ❌ TravelerLoginScreen.tsx - Remove green/teal buttons
3. ❌ RouteTrackingScreen.tsx - Standardize teal to red
4. ❌ DestinationInputScreen.tsx - Fix teal selections
5. ❌ ArrivalDashboardScreen.tsx - Keep header teal, fix CTA to red

### Medium Priority
6. ❌ OperatorChatbot.tsx - Already using correct orange/red
7. ✅ OnboardingScreen.tsx - Already correct
8. ✅ LandingScreen.tsx - Already correct

---

## 🎨 Quick Reference Table

| Element | Color | Example |
|---------|-------|---------|
| **Primary CTA** | `from-red-600 to-rose-700` | Continue, Next, Confirm |
| **Selection Ring** | `ring-red-500` | Selected card |
| **Selection BG** | `bg-red-50` | Selected card background |
| **Hover Border** | `hover:border-red-400` | Card hover  state |
| **Icon** | `text-red-600` | Primary icons |
| **Success Status** | `emerald-500` | ✓ Completed |
| **Warning** | `amber-500` | ⚠ Delays |
| **Error** | `red-600` | ✗ Critical |

---

*Last Updated: December 13, 2025*  
*Version: 3.0 - Unified Color System*
