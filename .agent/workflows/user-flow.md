---
description: Optimized user flow for AURA app wireframe
---

# AURA App User Flow Workflow

This workflow defines the smooth user journey through the AURA app wireframe for both travelers and operators.

---

## Traveler Flow (Target User B: "Anna")

### 1. Entry & Onboarding

**Landing Screen** (`LandingScreen.tsx`)
- ✨ User sees value proposition: "Travel without Turbulence"
- 📝 **Action:** Enter flight number OR click "Continue as Guest"
- 🎯 **Goal:** Set user expectations and capture flight context

**Improvement Needed:**
- Add smooth entrance animation
- Pre-fill flight number if from external link/QR code
- Show example flight numbers for demo

---

### 2. Primary Dashboard Experience

**Dashboard Screen** (`DashboardScreen.tsx`)
- 📊 User sees **Dynamic Timeline** with 4-6 journey steps
- 📍 **Current Location** clearly marked with "YOU ARE HERE"
- ⏱️ Real-time wait estimates for each checkpoint
- 🎨 **Visual Status:** Green (smooth) or Red (delay)

**User Interactions:**
1. Scroll through timeline to see full journey
2. Tap AI recommendation card (if critical scenario)
3. Access Chat or Map from bottom navigation
4. View total time to gate in sticky footer

**Smooth Transitions:**
```
Timeline Item → Tap "Update Route" → Map Screen (with route highlighted)
Timeline Item → Tap FAB Chat button → Chat Screen (with context pre-loaded)
```

---

### 3. Alternative Route Discovery

**Map Screen** (`MapScreen.tsx`)

**Entry Point:** User clicked AI recommendation: "Smart Route Found"

**User Experience:**
1. **See Map:** Draggable terminal floor plan
2. **Congestion Zones:** Visual red blobs showing bottlenecks
3. **Smart Path:** Animated cyan path showing alternate route
4. **Step-by-Step Directions:** Clear walking instructions
5. **Stats:** Time saved, walking distance, confidence level

**Action:** User mentally confirms or returns to dashboard

**Improvement Needed:**
- Add "Start Navigation" button that sends route to phone's native map
- Haptic feedback when dragging map
- Real-time position tracking on map (simulation)

---

### 4. AI Assistant Interaction

**Chat Screen** (`ChatScreen.tsx`)

**Entry Points:**
- FAB button from Dashboard
- Bottom navigation "Chat" tab
- Push notification with urgent update

**User Flow:**
1. **See Context Banner:** "Scenario B (Traffic Delay) • High Priority"
2. **Read AURA Greeting:** AI acknowledges current situation
3. **Quick Actions:** Tap suggested chips OR type custom question
4. **Multi-language Support:** "Translate instructions to Cebuano"
5. **Get Answer:** Fast, contextual response

**Conversational Examples:**
```
User: "Can you translate instructions for my driver to Cebuano?"
AURA: "Boss, likay ta sa Fernan Bridge kay naay aksidente..."

User: "What items are prohibited?"
AURA: "Power banks allowed in carry-on only (max 100Wh)..."
```

---

### 5. Profile & Settings

**Profile Screen** (`ProfileScreen.tsx`)

**Purpose:** User management and preferences

**User Flow:**
1. View travel stats (gamification)
2. Check flight history with time saved
3. Toggle notifications
4. Enable/disable proactive suggestions
5. Logout

---

## Operator Flow (Target User A: "David" - AOCC)

### 1. Operator Authentication

**Landing Screen → AOCC Login Button**

**Flow:**
1. Click "AOCC Operator Login" (top-right)
2. *(Future)* Enter credentials
3. Direct to Operator Dashboard

**Improvement Needed:**
- Add proper login screen (not just direct navigation)
- Role-based access control
- Shift handoff workflow

---

### 2. Command Center Overview

**Operator Dashboard Screen** (`OperatorDashboardScreen.tsx`)

**Primary View - "God Mode":**

```
┌─────────────────────────────────────┐
│ Header: System Status | Logout      │
├─────────────────────────────────────┤
│ KPIs: Total Pax | Avg Wait Time     │
├─────────────────────────────────────┤
│ LIVE TERMINAL HEATMAP               │
│ [Visual congestion zones]           │
├──────────────────┬──────────────────┤
│ PREDICTIVE       │ CCTV AI FEEDS    │
│ ALERTS           │ [CAM 04][CAM 08] │
│ [Critical Alert] │                  │
│ [Deploy Staff]   │ DENSITY: HIGH    │
└──────────────────┴──────────────────┘
```

**Operator Actions:**
1. **Monitor Heatmap:** See real-time congestion (color-coded)
2. **Respond to Alerts:** 
   - Click "Ignore" → Alert marked resolved
   - Click "Deploy Staff" → Sends notification to staff mobile
3. **View CCTV Analysis:** AI-annotated camera feeds
4. **Toggle Demo Status:** Click system status to test alert mode

---

### 3. Alert Response Workflow

**Critical Alert Triggered:**

```
🚨 Alert appears → Operator reads location + issue
↓
Reviews heatmap to confirm congestion
↓
Checks recommended action
↓
Clicks "Deploy Staff" OR "Initiate Protocol"
↓
System sends dispatch notification
↓
Alert status changes to "Resolved"
```

**Improvement Needed:**
- Add two-way communication with field staff
- Show staff locations on map
- Track response times
- Alert escalation if not acknowledged

---

## Cross-Screen Navigation Flow

### Mobile Bottom Navigation (Traveler)

```
┌────┬────┬────┬────┐
│ 🏠 │ 🗺️ │ 💬 │ 👤 │
│Home│ Map│Chat│Prof│
└────┴────┴────┴────┘
```

**Tap Behavior:**
- **Home:** Returns to Dashboard (preserves scenario state)
- **Map:** Opens last viewed map OR airport overview
- **Chat:** Opens AI assistant (loads context from current journey)
- **Profile:** User settings and history

**Visual Feedback:**
- Active tab: Violet glow + white text
- Inactive tabs: Gray with hover state
- Chat: Red notification dot if AURA has urgent message

---

### Desktop Sidebar Navigation (Traveler)

**Persistent Left Sidebar:**
- AURA logo + branding
- Vertical menu with icons + labels
- Active state highlighting
- Logout at bottom
- Larger touch targets (48x48px)

**Responsive Breakpoint:** `md:` (768px)

---

## Edge Cases & Error States

### 1. No Flight Number Entered
- **Solution:** Allow "Guest Mode" with generic airport timeline
- Show: "Check-in → Security → Gates" without specific gate

### 2. Flight Not Found
- **Solution:** Show error + suggest manual entry or continue as guest
- Provide contact support button

### 3. Natural Disaster (Typhoon)
- **Alert Banner:** "⚠️ Severe Weather Alert"
- **Auto-navigate to Chat:** AURA proactively informs about cancellations
- **Action:** "View Rebooking Options" button

### 4. Missed Flight Scenario
- **Detection:** Gate closes while user still in security
- **Alert:** Critical red banner + vibration
- **AURA Action:** Automatically suggests rebooking or connects to airline desk

---

## Animation & Transition Guidelines

### Screen Transitions

```css
/* Smooth fade + slide */
- Entry: opacity 0→1, translateY(20px)→0
- Exit: opacity 1→0, translateY(0)→(-20px)
- Duration: 300ms ease-out
```

### Loading States

**Dashboard Timeline:**
- Skeleton cards fade in sequentially (100ms delay each)
- Progress indicators for wait time calculations

**Map Screen:**
- Map elements fade in after background renders
- Route path animates drawing (2s duration)

### Interactive Feedback

- **Button Press:** Scale 0.95 + shadow reduction
- **Card Tap:** Slight elevation increase (4px→8px shadow)
- **Swipe Actions:** 60fps smooth tracking

---

## Accessibility Flow

### Keyboard Navigation

1. **Tab Order:** Logical top-to-bottom, left-to-right
2. **Skip Links:** "Skip to main content" for screen readers
3. **Focus Indicators:** 2px violet outline on all interactive elements

### Screen Reader Announcements

```
Dashboard loaded → "Dashboard. Your flight PR 123 to Narita. 4 steps. Current location: Lahug."

Timeline update → "Wait time updated. Security checkpoint now 35 minutes. This is longer than expected."

Alert received → "Critical alert. Traffic delay detected on your route. Tap for details."
```

---

## Performance Optimization Flow

### Initial Load
1. Show landing screen immediately (inline CSS)
2. Load critical fonts (Inter)
3. Fetch user data in background
4. Render dashboard with loading skeletons
5. Replace skeletons with real data

### Screen Switching
- **Instant perceived navigation** (optimistic updates)
- Pre-fetch adjacent screens on idle
- Cache previously viewed screens

---

## Summary: Smooth User Flow Principles

✅ **Clear Entry Points:** Landing → Dashboard in 1 tap
✅ **Contextual Navigation:** Each screen knows where user came from
✅ **Predictive Loading:** Pre-fetch likely next screens
✅ **Persistent State:** Scenario/flight data maintained across screens
✅ **Visual Continuity:** Consistent design language and transitions
✅ **Error Recovery:** Graceful fallbacks for missing data
✅ **Accessibility First:** Keyboard, screen reader, high contrast support

**Next Step:** Implement these flows with real data integration and user testing.
