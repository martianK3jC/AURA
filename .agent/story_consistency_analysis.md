# AURA App - Story Consistency Analysis
**Date:** January 22, 2026
**Purpose:** Verify all screens align with presentation narrative

---

## 📖 **Presentation Story Recap**

### Key Characters:
- **Anna** - First-time traveler in Cebu (Passenger perspective)
- **David** - AOCC manager (Operations perspective)

### Core Narrative:
1. Anna is excited but unsure about her airport experience
2. David makes decisions that shape Anna's journey
3. AURA connects them through predictive AI
4. **Slide 6 Demo Flow:**
   - David sees AI prediction of security surge 30 min ahead
   - David deploys staff proactively
   - Anna sees short wait times and gets recommendations
   - Anna explores stress-free

---

## ✅ **Screen-by-Screen Analysis**

### 1. **LandingScreen.tsx** ✅ ALIGNED
**Purpose:** Introduction to AURA
**Content:**
- Tagline: "Travel without Turbulence" ✅
- Description: "Real-time predictions, seamless routing, and personalized care" ✅
- Badge: "Powered by Vertex AI" ✅
- CTA: "Start Journey" ✅

**Story Alignment:**
- Sets up the promise of stress-free travel (Anna's goal)
- Highlights AI/predictive capabilities (David's tools)
- **Rating:** 10/10

---

### 2. **TravelerLoginScreen.tsx** ✅ ALIGNED
**Purpose:** Onboard Anna (or any traveler)
**Content:**
- Journey selection: Arrival vs Departure ✅
- Name input (optional): "What should we call you?" ✅
- Flight number: "PR 123, 5J 567" ✅
- Personalized experience setup ✅

**Story Alignment:**
- This is where "Anna" would enter her details
- Currently uses generic "Traveler" if name not provided
- **Suggestion:** Default name could be "Anna" for demo consistency
- **Rating:** 9/10

---

### 3. **OnboardingScreen.tsx** ⚠️ NOT REVIEWED YET
**Purpose:** Quick tutorial
**Story Alignment:** TBD

---

### 4. **DashboardScreen.tsx** ✅ MOSTLY ALIGNED
**Purpose:** Anna's main journey view
**Content:**
- Personalized greeting: "Welcome back, Anna!" ✅
- Scenario A/B toggle ✅
- Journey timeline with steps ✅
- AURA Recommendations (Scenario B only) ✅
- Flight card with gate/boarding info ✅

**Story Alignment:**
- **Scenario A (Calm):** "On time for check-in" - Anna's ideal state
- **Scenario B (Stress):** "Tight Schedule" - Shows congestion
- AURA Recommendation card shows: "High congestion detected at Security Checkpoint" ✅
- Alternative route suggestion: "Go to Security Checkpoint 2 (Clear)" ✅
- This demonstrates David's proactive decision affecting Anna's view ✅

**Issues:**
- ❌ No visual connection to David/AOCC
- ❌ Can't show "David deployed staff" → "Anna sees short wait"
- ✅ Does show AI recommendations (lounge, food, tasks, shopping)

**Rating:** 8/10

---

### 5. **MapScreen.tsx** ✅ ALIGNED
**Purpose:** Visual navigation for Anna
**Content:**
- Interactive airport map (airport.png) ✅
- "LIVE DATA" indicator ✅
- Route guidance in bottom sheet ✅
- Smart Route: "Security → Baggage → Food Court → Check-in" ✅

**Story Alignment:**
- Shows real-time routing ✅
- "15m Saved" metric ✅
- Helps Anna navigate stress-free ✅

**Issues:**
- Route order seems unusual (Security before Check-in?)
- No visual of "David's decisions" affecting the map

**Rating:** 7/10

---

### 6. **ChatScreen.tsx** ⚠️ NOT REVIEWED YET
**Purpose:** AI assistant for Anna
**Story Alignment:** TBD

---

### 7. **ProfileScreen.tsx** ✅ ALIGNED
**Purpose:** User account management
**Content:**
- User profile (currently "gff") ✅
- Trip stats ✅
- Recent activity ✅
- Settings removed per user request ✅

**Story Alignment:**
- Supports personalized experience
- Not critical to demo narrative
- **Rating:** 7/10 (functional but not story-critical)

---

### 8. **ArrivalDashboardScreen.tsx** ⚠️ NOT REVIEWED YET
**Purpose:** Post-landing journey for arrivals
**Story Alignment:** TBD

---

### 9. **TransportationOptionsScreen.tsx** ⚠️ NOT REVIEWED YET
**Purpose:** Ground transport options
**Story Alignment:** TBD

---

### 10. **RouteTrackingScreen.tsx** ⚠️ NOT REVIEWED YET
**Purpose:** Live route tracking
**Story Alignment:** TBD

---

## ❌ **CRITICAL GAP: David's AOCC Dashboard**

### What's Missing:
The presentation script (Slide 6) explicitly requires:
1. **David's AOCC View** showing:
   - Live CCTV feeds with AI analysis
   - Crowd density heatmap
   - Predictive alert: "Security surge in 30 min"
   - Action buttons: "Deploy Staff" / "Open Lanes"

2. **Dual-View Demo** showing:
   - David's screen → Takes action
   - Anna's screen → Sees result

### Current State:
- ❌ No AOCC dashboard exists
- ❌ Only placeholder text: "This dashboard is hosted on a separate secure portal"
- ❌ Cannot demonstrate "Same AI brain, two users"

---

## 🎯 **Recommendations for Story Consistency**

### High Priority:
1. **Create AOCC Dashboard** (Critical for Slide 6)
   - Mock CCTV feeds with AI overlay
   - Predictive alerts panel
   - Staff deployment controls
   - Real-time metrics

2. **Add Demo Toggle** to switch perspectives:
   - Button: "View as David (AOCC)" / "View as Anna (Traveler)"
   - Shows cause-effect relationship

3. **Update Default Names:**
   - TravelerLoginScreen: Default to "Anna" for demo
   - ProfileScreen: Change "gff" to "Anna"

### Medium Priority:
4. **Fix Route Logic in MapScreen:**
   - Current: Security → Baggage → Food Court → Check-in
   - Typical: Check-in → Security → Gate
   - Clarify if this is intentional

5. **Add Visual Indicators:**
   - Show when "David's action" affects Anna's screen
   - Timestamp: "Updated 2 min ago based on AOCC deployment"

### Low Priority:
6. **Enhance Scenario B:**
   - Add more explicit "David helped you" messaging
   - Show before/after comparison

---

## 📊 **Overall Story Consistency Score**

| Screen | Alignment | Critical? |
|--------|-----------|-----------|
| Landing | 10/10 | ✅ Yes |
| Login | 9/10 | ✅ Yes |
| Dashboard | 8/10 | ✅ Yes |
| Map | 7/10 | ⚠️ Medium |
| Profile | 7/10 | ❌ No |
| **AOCC (Missing)** | **0/10** | **🔴 CRITICAL** |

**Overall:** 7/10 - Good foundation, but missing critical AOCC view for Slide 6 demo.

---

## 🎬 **Recommended Demo Flow for Slide 6**

### Current Capability:
1. ✅ Show Anna's Dashboard (Scenario B)
2. ✅ Show congestion alert
3. ✅ Show AURA recommendation
4. ❌ **CANNOT** show David's perspective
5. ❌ **CANNOT** show David taking action

### Ideal Demo Flow:
1. **Start with David's AOCC Dashboard**
   - "Gemini predicts surge in 30 min"
   - David clicks "Deploy Staff"
2. **Switch to Anna's Dashboard**
   - "Short wait time" appears
   - "Eat before flight" recommendation
3. **Show Anna exploring Map**
   - Stress-free navigation
   - Clear routes

---

## 💡 **Next Steps**

Would you like me to:
1. **Build the AOCC Dashboard** with mock data?
2. **Add perspective toggle** to switch between David/Anna views?
3. **Update default names** to "Anna" throughout?
4. **Review remaining screens** (Chat, Arrival, Transportation, Route Tracking)?

---

**End of Analysis**
