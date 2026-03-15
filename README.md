# System 0

> The AI that thinks before you think.

An ambient intelligence layer that reshapes your information environment based on cognitive state. The anti-chatbot.

## What is System 0?

System 0 doesn't chat with you. It thinks alongside you. By monitoring your cognitive state through browser behavior, calendar patterns, and app usage, it silently:

- **Reshapes** your information environment to match your cognitive capacity
- **Protects** your focus by suppressing noise during deep work
- **Challenges** your thinking by surfacing contrarian perspectives when you're converging too fast
- **Tracks** your cognitive patterns over time

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui components
- **Animation:** Framer Motion
- **Data Viz:** Recharts
- **Auth:** NextAuth.js (Google OAuth)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Google OAuth credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

- `/` — Landing page with animated hero
- `/auth/signin` — Google OAuth sign-in
- `/onboarding` — Extension install, app connections, preferences
- `/dashboard` — Real-time cognitive state visualization
- `/profile` — Cognitive patterns over time
- `/activity` — Timeline of System 0 interventions
- `/settings` — Friction intensity, domains, quiet hours, notifications
- `/pricing` — Individual, Pro, Enterprise plans

## License

MIT
