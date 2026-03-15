# System 0 — Complete UX Flows

> Ambient AI layer that reshapes your information environment based on cognitive state. Not a chatbot — invisible infrastructure.

---

## Table of Contents

1. [Sign Up / Log In](#1-sign-up--log-in)
2. [Onboarding Walkthrough](#2-onboarding-walkthrough)
3. [Core First-Time Use Flow](#3-core-first-time-use-flow)
4. [Returning User Experience](#4-returning-user-experience)
5. [Settings / Profile Management](#5-settings--profile-management)
6. [Subscription / Upgrade Flow](#6-subscription--upgrade-flow)
7. [Sharing / Social Features](#7-sharing--social-features)
8. [Notifications & Re-engagement](#8-notifications--re-engagement)
9. [Account Deletion & Data Export](#9-account-deletion--data-export)
10. [Error States, Empty States, Loading States](#10-error-states-empty-states-loading-states)
11. [Mobile vs Desktop Considerations](#11-mobile-vs-desktop-considerations)

---

## 1. Sign Up / Log In

### 1.1 Discovery Entry Points

System 0 has two entry points:
1. **Website (system0.ai)** — marketing + account creation
2. **Chrome Web Store** — extension listing

Both funnel to the same auth flow.

### 1.2 Landing Page

**Screen: Hero**
- Minimal, almost empty page. White/off-white background.
- Single line, center-screen: **"The best interface is no interface."**
- Below, smaller: "System 0 is an ambient AI layer that reshapes your information environment based on how you think."
- Primary CTA: `Install Extension` (links to Chrome Web Store)
- Secondary: `Learn More` → scrolls to feature sections
- No screenshots — the product is invisible by design. Instead: abstract data visualizations showing information density changing

**Feature Sections (scroll):**
1. **"It watches how you think."** — "System 0 passively monitors your digital behavior — reading speed, tab switching, scroll patterns, time-of-day rhythms — to understand your cognitive state."
2. **"It removes the noise."** — "When you're deep in focus, distracting elements fade. Sidebars collapse. Recommendations disappear. Your screen becomes what matters."
3. **"It adds productive friction."** — "Stuck in a thinking rut? System 0 introduces contrarian information — a different perspective, a challenging article — to break the loop."
4. **"It adjusts complexity."** — "Cognitively overloaded? Content simplifies. In flow state? Complexity increases. Your information environment adapts to you."

- Bottom CTA: `Get Started — $29/mo` / `Start 14-Day Free Trial`

### 1.3 Auth Flow

**Trigger:** `Install Extension` or `Start Free Trial` on website

**Screen: Create Account**
- Opened as full-page (not modal — feels more considered for a $29/mo product)
- Headline: **"Create your System 0 account"**
- `Continue with Google` (recommended — simplifies extension auth)
- Divider: "— or —"
- Email + password fields (password: 8+ chars, 1 number)
- `Create Account` button
- "Already have an account? `Log in`"
- Footer: Terms + Privacy Policy links

**Google OAuth:**
1. Redirect to Google consent
2. Scopes: email, profile
3. On success → redirect to post-auth extension install prompt
4. On cancel → return to auth page

**Email Flow:**
1. Enter email + password → `Create Account`
2. Verification email: "Verify your email to activate System 0" → click link → verified
3. Redirect to extension install prompt

**Post-Auth Screen: Install Extension**
- "Now install the System 0 extension."
- `Add to Chrome` button (links to Chrome Web Store listing)
- "After installing, the extension will automatically connect to your account."
- Also: "Desktop app available for deeper integration" + `Download for macOS` / `Download for Windows`
- Skip option: "I'll install later" → goes to web dashboard (limited without extension)

### 1.4 Extension Installation

1. Chrome Web Store → `Add to Chrome` → permission dialog
2. Permissions requested:
   - "Read and change all your data on all websites" (required for ambient operation)
   - "Read your browsing history" (for behavior analysis)
3. On install → extension icon appears in toolbar (subtle, nearly invisible — a thin circle)
4. Extension auto-detects logged-in account (if same browser) or shows: "Connect to your account" → one-click auth via token
5. → Proceeds to Onboarding

### 1.5 Edge Cases

| Scenario | Behavior |
|---|---|
| Non-Chrome browser | "System 0 currently requires Chrome or a Chromium-based browser (Edge, Brave, Arc). Firefox support coming soon." |
| Extension installed but no account | Extension popup: "Create an account to activate System 0." + `Sign Up` link |
| Account created but extension not installed | Dashboard banner: "System 0 needs the browser extension to work. `Install Now`" |
| Multiple Chrome profiles | Extension links to whichever account is logged into system0.ai in that profile |
| Corporate/managed Chrome | "Your browser is managed by your organization. Some System 0 features may be restricted." + `Learn More` |

---

## 2. Onboarding Walkthrough

### 2.1 Post-Install Welcome (Extension Popup)

**Screen: Extension Activated**
- Small popup from extension icon
- "System 0 is active." ✓
- "Let's calibrate to how you work. This takes about 3 minutes."
- `Start Calibration` button
- `Skip — start with defaults` text link

### 2.2 Calibration Flow (Opens in New Tab)

**Screen 1 of 4: Your Work Style**
- Headline: **"Tell us how you work."**
- Cards to select (multi-select):
  - 🔬 **Deep Research** — "I spend hours reading long articles, papers, documentation"
  - ✍️ **Writing & Creation** — "I write articles, code, design, create content"
  - 📊 **Analysis & Data** — "I work with spreadsheets, dashboards, analytics"
  - 💬 **Communication** — "I'm in email, Slack, and meetings most of the day"
  - 🎯 **Project Management** — "I coordinate tasks, track progress, organize work"
  - 🧭 **Exploration** — "I browse widely, follow rabbit holes, discover new things"
- "Select all that apply"
- `Continue`

**Screen 2 of 4: Your Focus Patterns**
- Headline: **"When are you at your best?"**
- Interactive timeline (24-hour clock):
  - Drag to mark "Deep focus" hours (green), "Meetings/collab" hours (blue), "Off" hours (grey)
  - Defaults pre-filled: 9-12 deep focus, 12-2 meetings, 2-5 mixed, evenings off
  - Editable — drag handles to adjust
- "System 0 uses this to know when to reduce noise vs. when to let things through."
- `Continue`

**Screen 3 of 4: Your Tolerance**
- Headline: **"How much should we intervene?"**
- Three sliders:

1. **Noise Reduction** (Low ← → Aggressive)
   - Low: "I'll handle my own distractions"
   - Aggressive: "Hide everything non-essential when I'm focused"
   
2. **Productive Friction** (Subtle ← → Challenging)
   - Subtle: "Gentle suggestions when I'm stuck"
   - Challenging: "Directly challenge my thinking with contrarian views"
   
3. **Complexity Adjustment** (Off ← → Adaptive)
   - Off: "Show everything as-is"
   - Adaptive: "Simplify when I'm overloaded, deepen when I'm in flow"

- Default: all at midpoint
- `Continue`

**Screen 4 of 4: Privacy Boundaries**
- Headline: **"What's off-limits?"**
- "System 0 never stores page content or personal data on our servers. All analysis happens locally in your browser."
- Blocklist section: "Exclude these sites from System 0:"
  - Pre-populated: banking sites (detected), health portals
  - `+ Add Site` input field (type URL or pattern like `*.bankofamerica.com`)
- Toggle: "Pause on incognito/private windows" (default: on)
- Toggle: "Show when System 0 is actively modifying a page" (default: on — subtle indicator)
- `Finish Setup`

### 2.3 Calibration Complete

**Screen: Ready**
- Brief animation: a page of cluttered text becoming clean
- "System 0 is now calibrated to your work style."
- "It will learn and improve over the next 7 days as it observes your patterns."
- "You won't notice it most of the time. That's the point."
- `Got It` → closes tab, System 0 begins ambient operation
- Subtle: extension icon gets a tiny green dot for 24 hours indicating "active and learning"

---

## 3. Core First-Time Use Flow

### 3.1 The Invisible Layer (Normal Browsing)

System 0's core experience is that **you don't experience it directly**. It works in the background. Here's what it does during the first session:

**Passive Monitoring (Invisible):**
- Tracks: scroll speed, reading time per page, tab switching frequency, time on page, mouse movement patterns, typing bursts
- Builds real-time cognitive state model: Focus / Flow / Scattered / Overloaded / Idle
- All processing local (WebAssembly model running in extension)

**First Intervention (Within 30-60 Minutes):**

The first visible action is gentle — a "hello" from the system.

*Scenario: User has been reading documentation for 20 minutes. System detects deep focus state.*

**What happens:** On the next page load, non-essential UI elements subtly fade to 40% opacity:
- Sidebar recommendations
- "Trending" sections
- Social share buttons
- Comment sections
- Related article grids

**The indicator:** A barely-visible thin line appears at the very top of the page (1px, cool blue). This is the System 0 presence indicator. Hovering over it shows a whisper tooltip: "System 0 reduced visual noise for your focus session."

**First "Productive Friction" (Within First Week):**

*Scenario: User has been reading articles about the same topic for 2 hours — all from the same perspective.*

**What happens:** Next time they open a new tab, before the default new tab page loads, a brief card appears (auto-dismisses in 8 seconds):

- Thin card, bottom-right of new tab page
- "A different angle:" + headline from a contrarian source on the same topic
- `Read` link / auto-dismiss countdown / `Not helpful` (trains the model)

### 3.2 First-Time Dashboard Visit

Users don't need to visit the dashboard, but curiosity will bring them.

**Access:** Click extension icon → `Open Dashboard` (or system0.ai/dashboard)

**Screen: Dashboard**
- Clean, minimal — data visualization forward
- Top section: **Cognitive State Timeline**
  - Horizontal timeline of today showing colored bands: deep blue (focus), green (flow), yellow (scattered), red (overloaded), grey (idle/away)
  - Current state indicator with label: "Right now: **Focused** for 23 minutes"
  
- Middle section: **Today's Interventions**
  - "3 interventions today"
  - List:
    - 10:14 AM — Noise reduction on docs.google.com (Focus state)
    - 11:32 AM — Complexity simplified on arxiv.org (Overload detected)
    - 2:07 PM — Contrarian article suggested (Thinking rut — same topic, 90 min)
  - Each with effectiveness indicator: ✓ Helpful / ✗ Dismissed / — No feedback

- Bottom section: **Weekly Patterns**
  - Bar chart: hours in each cognitive state per day this week
  - Insight card: "You're most focused between 9-11 AM on Tuesdays and Thursdays."
  - Trend: "Your average focus duration has increased 12% this week."

### 3.3 Extension Popup (Quick Access)

**Click extension icon → Popup (320×400px)**
- Current state: "**Focused** — 23 min" with colored dot
- Today's summary: "3 interventions · 4.2 hrs focused"
- Quick controls:
  - `Pause System 0` toggle (pauses for current session)
  - `Pause for 1 hour` / `Pause for today`
  - `Block this site` (adds current site to blocklist)
- `Open Dashboard` link
- `Settings` gear icon

---

## 4. Returning User Experience

### 4.1 Daily Experience

System 0 users don't "open" the app daily. It's always running. The returning user experience is:

1. **Open browser** → System 0 is already active (extension loaded)
2. **Browse normally** → interventions happen contextually
3. **Check in occasionally** → extension popup or dashboard for insights

### 4.2 Dashboard — Established User (Week 2+)

**Screen: Dashboard (Established)**
- Cognitive state timeline now shows 7/30-day views
- **Insights feed** (new additions as the model learns):
  - "Mondays after lunch are your lowest-focus period. Consider scheduling creative work then instead of deep reading."
  - "You spend 40% of scattered-state time on Twitter. System 0 has been reducing feed complexity during these periods."
  - "When you read contrarian content, your focus sessions afterward are 18% longer on average."
- **Intervention log** with filters: date range, intervention type, site
- **Focus score:** daily score (0-100) with 7-day trend sparkline
- **Comparison:** "Your focus patterns are similar to research professionals" (anonymous cohort)

### 4.3 Progressive Learning

The system gets smarter over time:

**Week 1:** Basic noise reduction, simple cognitive state detection
**Week 2-4:** Learns personal patterns — when you focus best, what triggers distraction, which sites correlate with different states
**Month 2+:** Anticipatory interventions — pre-simplifies pages before overload, introduces friction at optimal moments, adjusts based on calendar (meeting-heavy days get more aggressive noise reduction)

**Feedback Loops:**
- Hover over System 0 indicator → tooltip shows what changed → `Helpful` / `Not helpful` / `Undo`
- Contrarian suggestions: `Read` / `Not helpful` / `Don't suggest from this source`
- All feedback trains the local model

### 4.4 Desktop App (Deeper Integration)

**Beyond the browser:**
- System tray icon showing current cognitive state (colored dot)
- Can dim non-active application windows during focus state
- Integrates with system notifications — suppresses non-urgent notifications during focus
- Optional: keyboard shortcut to force-trigger "focus mode" (Ctrl+Shift+0)
- Calendar integration: detects meeting blocks, adjusts expectations
- Menu bar (macOS) / system tray (Windows): quick pause/status

---

## 5. Settings / Profile Management

### 5.1 Settings Hub (Dashboard → Settings)

**Account**
- Email + Google connection
- Change password
- Two-factor authentication: toggle + QR setup
- Active sessions: list of browsers/devices with `Sign Out` per device
- `Delete Account`

**Calibration**
- All settings from onboarding, re-editable:
  - Work style selection
  - Focus schedule (24-hour timeline)
  - Intervention sliders (noise, friction, complexity)
- `Recalibrate from scratch` — resets learned model, starts fresh 7-day learning

**Privacy & Blocklist**
- Sites excluded from System 0 (add/remove)
- "Pause on incognito" toggle
- Data storage: "All behavioral data is stored locally in your browser. Our servers never see your browsing content."
- `Clear Local Data` — wipes all behavioral data, resets model
- Data retention period: dropdown (30 days / 90 days / 1 year / Forever)

**Interventions**
- Toggle each intervention type independently:
  - Noise reduction: on/off + aggressiveness slider
  - Complexity adjustment: on/off + sensitivity slider
  - Productive friction: on/off + frequency cap (max X per day)
  - Contrarian suggestions: on/off + source preferences
- Intervention schedule: "Only intervene during work hours" toggle + time range
- Sound/haptic: "Play subtle sound on intervention" (off by default)

**Desktop App**
- Auto-launch on startup: toggle
- System notification management: on/off
- App dimming during focus: on/off + opacity slider
- Calendar integration: Connect Google Calendar / Outlook
- Keyboard shortcuts: customize

**Appearance**
- Extension indicator style: Thin line (default) / Dot / Off
- Dashboard theme: System / Light / Dark

**Subscription**
- Current plan + billing
- `Manage Subscription`

---

## 6. Subscription / Upgrade Flow

### 6.1 Pricing Model

System 0 is a paid product with a free trial:
- **14-day free trial** (full features, no card required)
- **$29/month** individual
- **$24/month** billed annually ($288/year)
- No free tier — the product requires continuous operation to be valuable

### 6.2 Trial Start

**From landing page or extension install → account creation includes trial start**
- No credit card required for trial
- Clear messaging: "14 days free. No card needed. Cancel by doing nothing."
- Dashboard shows: "Trial: 12 days remaining" (subtle, in header)

### 6.3 Trial → Paid Conversion

**Day 10 of 14: Conversion prompt**

**Extension popup (once):**
- "System 0 has made 47 interventions in 10 days."
- "Your average focus duration increased 23%."
- "Trial ends in 4 days."
- `Subscribe — $29/mo` / `Remind Me Later`

**Day 13: Dashboard banner**
- "Your trial ends tomorrow. System 0 will stop adapting your environment."
- Personalized stat: "This week alone, System 0 reduced noise on 34 pages during your focus time."
- `Subscribe` / `Switch to Annual ($24/mo)`

**Day 14: Trial ended**
- Extension icon turns grey
- Extension popup: "Your trial has ended. System 0 is paused."
- "Subscribe to resume ambient intelligence."
- `Subscribe — $29/mo` / `Annual — $24/mo`
- Dashboard: accessible, shows historical data, but no active interventions

### 6.4 Payment

**Screen: Subscribe**
- Plan selection: Monthly ($29/mo) / Annual ($24/mo — save 17%)
- Payment: Apple Pay / Google Pay / Credit Card (Stripe)
- Card fields: number, expiry, CVC, ZIP
- `Subscribe` button
- "Cancel anytime. Your data stays local."
- On success: extension icon returns to normal, "Welcome back. System 0 is active." toast
- On failure: "Payment failed. Check your card details." + `Try Again`

### 6.5 Cancellation

1. Dashboard → Settings → Subscription → `Cancel Subscription`
2. **Screen: Before you go**
   - "In the last 30 days, System 0 has:"
   - Personalized stats: interventions, focus increase, noise reduced
   - "What's not working?"
   - Checkboxes: Too expensive / Not noticeable / Privacy concerns / Switching to alternative / Other
   - `Continue Cancellation` / `Keep Subscription`
3. If "Too expensive" selected → offer annual: "Switch to annual billing? That's $24/mo instead of $29."
4. **Final confirmation:** "Your subscription ends [date]. System 0 will stop all interventions. Your local data remains on your device."
5. `Confirm Cancellation`

---

## 7. Sharing / Social Features

### 7.1 Design Philosophy

System 0 is inherently private. Sharing is minimal and opt-in.

### 7.2 Focus Score Sharing

**Dashboard → Focus Score → `Share`**
- Generates a minimal card:
  - "My focus score this week: **87/100**"
  - 7-day sparkline
  - System 0 branding (tiny)
- Share options: Copy image / Twitter/X / LinkedIn
- No personal data, browsing history, or intervention details included

### 7.3 Team Features (Future — V2)

- Team dashboard: anonymized aggregate focus patterns
- "Your team's collective focus peaks at 10 AM on Wednesdays"
- No individual browsing data shared — only cognitive state aggregates
- Admin can set team-wide defaults (but individuals can override)

### 7.4 Referral Program

**Dashboard → Refer**
- "Know someone who'd benefit from System 0?"
- Referral link
- Reward: "You both get 1 month free."
- Tracker: referrals sent / converted / months earned

---

## 8. Notifications & Re-engagement

### 8.1 Active User Notifications

System 0 communicates primarily through its ambient interface. Explicit notifications are rare:

| Notification | Channel | Timing | Copy |
|---|---|---|---|
| Weekly report available | Extension badge | Monday AM | Badge "1" on extension icon. Popup: "Your weekly focus report is ready." |
| New insight discovered | Extension badge | When detected | "New insight: You focus 30% better with instrumental music playing." |
| Major model update | Extension popup (once) | On update | "System 0 learned something new about your patterns. `View Insight`" |
| Subscription reminder | Email | Day 10, 13, 14 of trial | See Trial section |

### 8.2 Lapsed User Re-engagement

**User hasn't opened browser in 7+ days:**
- Email: "Your System 0 model is waiting. The longer you use it, the smarter it gets."

**User paused System 0 for 3+ days:**
- Extension popup on next browser open: "System 0 has been paused for 3 days. Resume?" + `Resume` / `Keep Paused`

**User cancelled but extension still installed:**
- Extension popup (once, 30 days after cancel): "Missing the quiet? Resubscribe and your model picks up right where it left off." + `Resubscribe` / `Uninstall Extension`

### 8.3 Notification Preferences

- Dashboard → Settings → Notifications
- Toggles: Weekly report (on/off), Insights (on/off), Email updates (on/off)
- "System 0 will never send more than 2 notifications per week."

---

## 9. Account Deletion & Data Export

### 9.1 Data Export

**Dashboard → Settings → Account → `Export My Data`**
- "Your behavioral data lives locally in your browser. This export includes your account settings and server-side data."
- Export includes:
  - `settings.json` (calibration, preferences, blocklist)
  - `subscription.json` (billing history)
  - `insights.json` (generated insights, anonymized)
- Local data (behavioral model, cognitive state history) can be exported separately from the extension:
  - Extension popup → Settings → `Export Local Data`
  - Downloads: `cognitive_timeline.json`, `intervention_log.json`, `behavioral_model.bin`
- Both exports as ZIP, immediate download (no email wait — data is small)

### 9.2 Account Deletion

1. Dashboard → Settings → Account → `Delete Account`
2. **Screen: Delete Account**
   - "Deleting your account will:"
   - "• Cancel your subscription immediately"
   - "• Remove your account from our servers"
   - "• The extension will be deactivated"
   - "• Local browser data will remain until you uninstall the extension"
   - `Export My Data First` / `Delete Account` (red)
3. **Confirm:** Type "DELETE" + re-authenticate
4. On deletion:
   - Server data removed within 24 hours
   - Extension shows: "Account deleted. Uninstall the extension to remove local data." + `Uninstall` link
   - Confirmation email sent
5. Desktop app: auto-detects deleted account, shows "Account removed" and offers uninstall

---

## 10. Error States, Empty States, Loading States

### 10.1 Loading States

| Context | Treatment |
|---|---|
| Extension initializing | Extension icon: animated pulse (2s on browser start) |
| Dashboard loading | Skeleton UI: grey bars for timeline, shimmer cards for insights |
| Cognitive model processing | Invisible — model runs in background, no user-facing loading |
| Generating weekly report | Dashboard: "Preparing your weekly report…" (takes <5s) |
| Desktop app launching | Splash: System 0 logo, "Connecting to browser…" (max 3s) |

### 10.2 Empty States

| Context | Empty State |
|---|---|
| Dashboard — first visit (no data yet) | "System 0 is learning your patterns. Check back in a few hours for your first insights." + animated timeline filling in |
| Insights — no insights yet | "No insights yet. System 0 typically generates its first insight within 3-5 days of use." |
| Intervention log — none today | "No interventions today. System 0 only acts when it detects an opportunity to help." |
| Blocklist — empty | "No sites blocked. Add sites you want System 0 to ignore." + `Add Site` |
| Weekly report — first week | "Your first weekly report will be available next Monday." |

### 10.3 Error States

| Error | Treatment |
|---|---|
| Extension can't connect to account | Extension popup: "Can't connect to your account. Check your internet connection." + `Retry` / `Log In Again` |
| Extension conflict (another extension blocking) | Extension popup: "System 0 may conflict with [extension]. Some features may be limited." + `Learn More` |
| WebAssembly not supported | Extension popup: "Your browser doesn't support a feature System 0 needs. Please update Chrome." |
| Dashboard server error | "Something went wrong loading your dashboard. Your extension continues working normally." + `Retry` |
| Desktop app can't find extension | "Can't detect the System 0 browser extension. Is Chrome running?" + `Retry` / `Install Extension` |
| Payment failed (renewal) | Email: "Your payment failed. Update your card to keep System 0 active." + Dashboard banner: "Payment issue — update in Settings" |
| Model corruption (local data) | Extension detects invalid model → auto-resets: "System 0 needed to recalibrate. It will take a few days to relearn your patterns." (rare) |
| Site breaks with System 0 active | User reports via extension: `Report Issue on This Site` → sends anonymized site URL + intervention type. Auto-adds to blocklist. |

---

## 11. Mobile vs Desktop Considerations

### 11.1 Platform Strategy

System 0 is **desktop-first**. The browser extension is the core product. Mobile is a companion.

### 11.2 Desktop (Primary)

**Chrome Extension (Core):**
- All ambient features: noise reduction, complexity adjustment, productive friction
- Local WebAssembly model for cognitive state inference
- Extension popup for quick controls
- Works across all websites

**Desktop App (Enhancement):**
- macOS: menu bar app. Windows: system tray.
- Extends beyond browser: system notification management, app window dimming, calendar integration
- Syncs with extension via local WebSocket
- Lightweight: <50MB, minimal CPU usage

**Dashboard (Web):**
- Full insights, timeline, reports, settings
- Responsive down to tablet
- Primary settings management

### 11.3 Mobile (Companion — V2)

**Mobile App (iOS/Android):**
- NOT an ambient browser layer (mobile browsers don't support deep extensions)
- Instead, a **focus companion:**
  - View your cognitive state timeline from desktop sessions
  - Weekly focus report with insights
  - Remote pause/resume System 0 on desktop
  - Notification management: "Focus mode active on desktop — hold notifications?"
  - Widget: today's focus score + current state (if desktop active)

**Mobile-Specific Screens:**
- **Home:** Today's focus score, active status, quick toggle
- **Timeline:** Cognitive state visualization (scrollable, touch-friendly)
- **Insights:** Card-based, swipeable
- **Settings:** Mirror of desktop settings (changes sync)

### 11.4 Design Language Across Platforms

| Element | Desktop Extension | Desktop App | Web Dashboard | Mobile App |
|---|---|---|---|---|
| Primary interaction | Ambient (invisible) | Menu bar / tray | Click/scroll | Tap/swipe |
| Visual density | Minimal (it's invisible) | Ultra-minimal | Medium (data viz) | Low (card-based) |
| Color coding | Blue=focus, Green=flow, Yellow=scattered, Red=overloaded, Grey=idle | Same | Same | Same |
| Typography | System font | System font | Inter / system | SF Pro / Roboto |
| Animation | Subtle fades only | None | Smooth transitions | iOS/Material native |

### 11.5 Cross-Device Sync

- Account settings sync via server (encrypted)
- Behavioral model is local-only (never syncs)
- Insights sync for mobile viewing
- Intervention log syncs for mobile viewing
- Multiple browser profiles: each runs its own model independently

---

## Appendix: Intervention Examples

### Noise Reduction Examples

**On a news site (focus state):**
- Sidebar: faded to 20% opacity
- "Trending" bar: hidden
- Comment section: collapsed with "Show comments" link
- Auto-playing video: paused, muted
- Cookie banners: auto-dismissed (if clear accept/reject)

**On Twitter/X (scattered state):**
- "Who to follow" section: hidden
- Trending sidebar: hidden
- Timeline: no change (user is intentionally browsing)

**On documentation site (flow state):**
- Table of contents: remains (useful for navigation)
- "Edit this page" / GitHub links: faded
- Ads: hidden
- Related articles footer: hidden

### Productive Friction Examples

**Thinking rut detected (same topic, 90+ min):**
- Gentle: New tab shows "Another perspective:" + contrarian article headline + source
- Moderate: Small card on current page, bottom-right: "You've been on this topic for a while. Here's a challenge: [contrarian headline]"
- Challenging: Brief full-tab interstitial (2s, dismissible): "Before you continue: [headline that directly contradicts current reading]"

**Echo chamber detected (same sources, same viewpoint):**
- "You've read 5 articles on [topic] from [ideological direction] sources. Here's the other side:" + article link

### Complexity Adjustment Examples

**Overloaded state + dense technical article:**
- System 0 activates "simplified view": larger font, wider margins, reduced visual elements
- Long paragraphs get subtle reading guides (thin line tracking scroll position)
- Complex tables: key columns highlighted, others faded

**Flow state + simple content:**
- No intervention (don't add complexity artificially — that would be annoying)
- But if user searches for more depth: prioritize comprehensive results in future tab suggestions

---

## Appendix: Privacy Architecture

### What stays local (always):
- All browsing content and page data
- Behavioral model (scroll patterns, reading speed, etc.)
- Cognitive state inference model
- Intervention decisions

### What reaches the server (encrypted):
- Account credentials
- Subscription status
- Calibration settings
- Anonymized, aggregated intervention effectiveness (opt-in, for model improvement)

### What is never collected:
- URLs visited
- Page content
- Keystrokes
- Screenshots
- Personally identifiable browsing patterns

This architecture is core to the product and should be prominent in marketing, onboarding, and settings.
