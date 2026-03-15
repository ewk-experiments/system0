export const cognitiveState = {
  cognitiveLoad: 0.62,
  focusScore: 87,
  flowState: true,
  currentMode: "Deep Work" as const,
  activeFor: "2h 14m",
  informationDiet: [
    { name: "Technical", value: 42, color: "#6366f1" },
    { name: "Creative", value: 18, color: "#8b5cf6" },
    { name: "News", value: 12, color: "#a78bfa" },
    { name: "Social", value: 8, color: "#c4b5fd" },
    { name: "Reference", value: 20, color: "#ddd6fe" },
  ],
  focusTimeline: Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    focus: i >= 9 && i <= 17 ? Math.min(95, 40 + Math.random() * 55) : Math.max(10, Math.random() * 30),
    load: i >= 9 && i <= 17 ? 30 + Math.random() * 40 : Math.random() * 20,
  })),
};

export const frictionEvents = [
  { id: 1, time: "14:32", type: "contrarian" as const, title: "Surfaced contrarian perspective on LLM scaling laws", description: "You've read 4 articles supporting scaling — here's a dissenting view from Yann LeCun.", impact: "high" as const },
  { id: 2, time: "13:15", type: "complexity" as const, title: "Increased content complexity — flow state detected", description: "Switched from summary to full paper view. You're performing well.", impact: "medium" as const },
  { id: 3, time: "11:48", type: "noise-reduction" as const, title: "Reduced notification noise during deep work", description: "Suppressed 12 non-urgent notifications. 2 were reclassified as important.", impact: "low" as const },
  { id: 4, time: "10:22", type: "diversity" as const, title: "Broadened topic diversity", description: "Your reading has been 90% AI/ML today. Introduced a cognitive science perspective.", impact: "medium" as const },
  { id: 5, time: "09:45", type: "contrarian" as const, title: "Challenged assumption about agent architectures", description: "Detected convergent thinking pattern. Surfaced alternative approaches.", impact: "high" as const },
];

export const activityFeed = [
  { id: 1, time: "2 min ago", icon: "🔄", action: "Surfaced contrarian perspective", detail: "on LLM scaling laws", category: "friction" },
  { id: 2, time: "18 min ago", icon: "📈", action: "Increased content complexity", detail: "— you're in flow state", category: "adaptation" },
  { id: 3, time: "47 min ago", icon: "🔕", action: "Reduced notification noise", detail: "during deep work (12 suppressed)", category: "protection" },
  { id: 4, time: "1h ago", icon: "🧠", action: "Detected convergent thinking", detail: "— broadened information sources", category: "diversity" },
  { id: 5, time: "1h 32m ago", icon: "⚡", action: "Flow state initiated", detail: "— optimizing environment", category: "state" },
  { id: 6, time: "2h ago", icon: "📊", action: "Cognitive load dropping", detail: "— increasing complexity gradually", category: "adaptation" },
  { id: 7, time: "2h 45m ago", icon: "🎯", action: "Focus lock engaged", detail: "on systems architecture topic", category: "protection" },
  { id: 8, time: "3h ago", icon: "🌊", action: "Information reshape", detail: "— filtered 34 low-signal items", category: "filtering" },
];

export const cognitiveProfile = {
  weeklyFocus: [
    { day: "Mon", focus: 7.2, deep: 4.1, shallow: 3.1 },
    { day: "Tue", focus: 6.8, deep: 3.5, shallow: 3.3 },
    { day: "Wed", focus: 8.1, deep: 5.2, shallow: 2.9 },
    { day: "Thu", focus: 7.5, deep: 4.8, shallow: 2.7 },
    { day: "Fri", focus: 6.2, deep: 3.0, shallow: 3.2 },
    { day: "Sat", focus: 4.1, deep: 2.0, shallow: 2.1 },
    { day: "Sun", focus: 3.8, deep: 1.5, shallow: 2.3 },
  ],
  thinkingRatio: [
    { month: "Sep", convergent: 65, divergent: 35 },
    { month: "Oct", convergent: 58, divergent: 42 },
    { month: "Nov", convergent: 52, divergent: 48 },
    { month: "Dec", convergent: 60, divergent: 40 },
    { month: "Jan", convergent: 45, divergent: 55 },
    { month: "Feb", convergent: 50, divergent: 50 },
    { month: "Mar", convergent: 48, divergent: 52 },
  ],
  topicDiversity: [
    { topic: "AI/ML", hours: 32, percentage: 38 },
    { topic: "Systems Design", hours: 18, percentage: 21 },
    { topic: "Cognitive Science", hours: 12, percentage: 14 },
    { topic: "Philosophy", hours: 8, percentage: 10 },
    { topic: "Business", hours: 7, percentage: 8 },
    { topic: "Creative", hours: 5, percentage: 6 },
    { topic: "Other", hours: 3, percentage: 3 },
  ],
  productivityByHour: Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    productivity: i >= 9 && i <= 11 ? 85 + Math.random() * 15 : i >= 14 && i <= 16 ? 70 + Math.random() * 20 : i >= 7 && i <= 18 ? 30 + Math.random() * 40 : Math.random() * 15,
  })),
};

export const pricingPlans = [
  {
    name: "Individual",
    price: "$29",
    period: "/month",
    description: "For the knowledge worker who wants to think better.",
    features: [
      "Real-time cognitive state tracking",
      "Information diet optimization",
      "Friction engine (contrarian perspectives)",
      "Focus protection (notification management)",
      "Browser extension",
      "3 app integrations",
      "7-day cognitive history",
    ],
    cta: "Start thinking better",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    description: "For professionals who need peak cognitive performance.",
    features: [
      "Everything in Individual",
      "Unlimited app integrations",
      "90-day cognitive history",
      "Advanced thinking pattern analysis",
      "Custom friction profiles",
      "API access",
      "Priority support",
      "Team sharing (up to 3)",
    ],
    cta: "Upgrade your cognition",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams building a culture of better thinking.",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Org-wide cognitive analytics",
      "Custom integrations",
      "SSO / SAML",
      "Dedicated success manager",
      "On-premise deployment option",
      "SLA guarantee",
    ],
    cta: "Talk to us",
    highlighted: false,
  },
];
