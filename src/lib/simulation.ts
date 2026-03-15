// Simulation engine — generates realistic browsing data and cognitive states
import { db, type BrowsingData, type CognitiveState, type Intervention } from './db';

const DOMAINS = [
  { domain: 'arxiv.org', category: 'research', novelty: 0.8 },
  { domain: 'news.ycombinator.com', category: 'tech-news', novelty: 0.5 },
  { domain: 'twitter.com', category: 'social', novelty: 0.3 },
  { domain: 'reddit.com', category: 'social', novelty: 0.4 },
  { domain: 'github.com', category: 'development', novelty: 0.6 },
  { domain: 'medium.com', category: 'articles', novelty: 0.4 },
  { domain: 'youtube.com', category: 'video', novelty: 0.3 },
  { domain: 'nytimes.com', category: 'news', novelty: 0.5 },
  { domain: 'wikipedia.org', category: 'reference', novelty: 0.7 },
  { domain: 'substack.com', category: 'newsletters', novelty: 0.5 },
  { domain: 'scholar.google.com', category: 'research', novelty: 0.9 },
  { domain: 'lesswrong.com', category: 'rationality', novelty: 0.7 },
  { domain: 'notion.so', category: 'productivity', novelty: 0.2 },
  { domain: 'slack.com', category: 'communication', novelty: 0.1 },
  { domain: 'gmail.com', category: 'communication', novelty: 0.2 },
  { domain: 'bloomberg.com', category: 'finance', novelty: 0.6 },
  { domain: 'nature.com', category: 'science', novelty: 0.9 },
  { domain: 'arstechnica.com', category: 'tech-news', novelty: 0.5 },
];

const URLS = [
  { url: 'https://arxiv.org/abs/2403.12345', domain: 'arxiv.org', title: 'Scaling Laws for Neural Language Models Revisited' },
  { url: 'https://news.ycombinator.com/item?id=39876543', domain: 'news.ycombinator.com', title: 'Show HN: A new approach to agent architectures' },
  { url: 'https://twitter.com/home', domain: 'twitter.com', title: 'Twitter Feed' },
  { url: 'https://reddit.com/r/MachineLearning', domain: 'reddit.com', title: 'r/MachineLearning' },
  { url: 'https://github.com/trending', domain: 'github.com', title: 'Trending Repositories' },
  { url: 'https://medium.com/@author/the-future-of-ai-agents', domain: 'medium.com', title: 'The Future of AI Agents' },
  { url: 'https://youtube.com/watch?v=abc123', domain: 'youtube.com', title: 'Understanding Transformer Architectures' },
  { url: 'https://nytimes.com/2024/03/ai-regulation', domain: 'nytimes.com', title: 'AI Regulation Debate Intensifies' },
  { url: 'https://en.wikipedia.org/wiki/Cognitive_load', domain: 'wikipedia.org', title: 'Cognitive Load Theory' },
  { url: 'https://newsletter.substack.com/p/ai-weekly', domain: 'substack.com', title: 'AI Weekly Digest' },
  { url: 'https://scholar.google.com/scholar?q=metacognition', domain: 'scholar.google.com', title: 'Metacognition Research' },
  { url: 'https://lesswrong.com/posts/abc/alignment-ideas', domain: 'lesswrong.com', title: 'New Ideas in AI Alignment' },
  { url: 'https://nature.com/articles/neural-plasticity-2024', domain: 'nature.com', title: 'Neural Plasticity in Adult Learning' },
  { url: 'https://bloomberg.com/technology', domain: 'bloomberg.com', title: 'Bloomberg Technology' },
  { url: 'https://arstechnica.com/ai/2024/03/llm-benchmarks', domain: 'arstechnica.com', title: 'Why LLM Benchmarks Are Broken' },
];

const INTERVENTION_TEMPLATES = [
  { type: 'contrarian' as const, templates: [
    { reason: 'Echo chamber score exceeded {threshold}% — your reading has been {pct}% aligned on {topic}',
      content: 'Injected contrarian article: "{title}" — a perspective that challenges your current thinking on {topic}' },
    { reason: 'Detected convergent thinking pattern over last {hours} hours',
      content: 'Surfaced opposing viewpoint: "{title}" — considers {topic} from a {angle} perspective' },
  ]},
  { type: 'novelty' as const, templates: [
    { reason: 'Novelty index dropped below {threshold} — consuming mostly familiar sources',
      content: 'Surfaced obscure research paper: "{title}" — connects {topic1} to {topic2} in unexpected ways' },
    { reason: 'Information diet has been {pct}% from {count} domains for {hours} hours',
      content: 'Introduced content from unfamiliar domain: "{title}" — broadening exposure to {topic}' },
  ]},
  { type: 'noise-reduction' as const, templates: [
    { reason: 'Cognitive load exceeded {threshold}% during focus session',
      content: 'Reduced social media visibility and suppressed {count} non-urgent notifications' },
    { reason: 'Deep work session detected — protecting cognitive flow',
      content: 'Blocked {count} potential distractions. {urgent} items reclassified as important.' },
  ]},
  { type: 'diversity' as const, templates: [
    { reason: 'Topic concentration: {pct}% of reading in {topic} today',
      content: 'Broadened information feed — introduced perspectives from {topic2} and {topic3}' },
  ]},
  { type: 'complexity' as const, templates: [
    { reason: 'Flow state detected — cognitive capacity above threshold',
      content: 'Increased content complexity: switched from summaries to full papers. You\'re performing well.' },
  ]},
];

const TOPICS = ['AI/ML', 'systems design', 'cognitive science', 'philosophy', 'economics', 'neuroscience', 'distributed systems', 'information theory'];
const ANGLES = ['sociological', 'historical', 'economic', 'philosophical', 'biological', 'anthropological'];
const TITLES = [
  'The Limits of Scale: Why More Data Won\'t Save Us',
  'Cognitive Offloading and the Myth of Extended Mind',
  'Decentralized Intelligence: Lessons from Ant Colonies',
  'The Attention Economy is a Cognitive Trap',
  'Why Contrarian Thinking Fails Without Epistemic Humility',
  'Neural Plasticity in Digital Environments',
  'The Hidden Costs of Information Abundance',
  'From Cybernetics to AI: What We Forgot',
  'Ecological Rationality and Algorithm Design',
  'The Paradox of Choice in Knowledge Work',
];

function rand(min: number, max: number) { return Math.random() * (max - min) + min; }
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

// Calculate cognitive state from browsing data
export function calculateCognitiveState(userId: string): Omit<CognitiveState, 'id' | 'timestamp'> {
  const browsing = db.getBrowsingData(userId, 50);
  const domains = db.getDomainStats(userId);
  
  if (browsing.length === 0) {
    return { user_id: userId, focus_score: 75, novelty_index: 0.5, echo_risk: 0.3, cognitive_load: 0.4 };
  }

  // Focus: inverse of domain switching frequency
  const recentDomains = browsing.slice(-20).map(b => b.domain);
  const switches = recentDomains.filter((d, i) => i > 0 && d !== recentDomains[i - 1]).length;
  const focus_score = Math.max(10, Math.min(100, 100 - (switches / Math.max(1, recentDomains.length - 1)) * 100));

  // Novelty: how many unique domains vs total
  const uniqueDomains = new Set(browsing.map(b => b.domain)).size;
  const novelty_index = Math.min(1, uniqueDomains / Math.max(1, browsing.length) * 3);

  // Echo risk: how concentrated are visits
  const totalTime = domains.reduce((s, d) => s + d.totalTime, 0);
  const topDomainShare = domains.length > 0 ? domains[0].totalTime / Math.max(1, totalTime) : 0;
  const echo_risk = Math.min(1, topDomainShare * 1.5);

  // Cognitive load: based on recent activity density and scroll depth
  const recentAvgScroll = browsing.slice(-10).reduce((s, b) => s + b.scroll_depth, 0) / Math.min(10, browsing.length);
  const recentAvgTime = browsing.slice(-10).reduce((s, b) => s + b.time_spent, 0) / Math.min(10, browsing.length);
  const cognitive_load = Math.min(1, (recentAvgScroll * 0.4 + Math.min(1, recentAvgTime / 600) * 0.6));

  return { user_id: userId, focus_score: Math.round(focus_score), novelty_index: +novelty_index.toFixed(2), echo_risk: +echo_risk.toFixed(2), cognitive_load: +cognitive_load.toFixed(2) };
}

// Generate a single browsing event
export function generateBrowsingEvent(userId: string): BrowsingData {
  const urlInfo = pick(URLS);
  return db.addBrowsingData({
    user_id: userId,
    url: urlInfo.url,
    domain: urlInfo.domain,
    time_spent: Math.round(rand(15, 600)),
    scroll_depth: +rand(0.1, 1).toFixed(2),
    visit_count: Math.round(rand(1, 8)),
  });
}

// Generate intervention based on cognitive state  
export function generateIntervention(userId: string, state: CognitiveState): Intervention | null {
  const settings = db.getSettings(userId);
  const r = Math.random();
  
  let type: typeof INTERVENTION_TEMPLATES[number] | null = null;
  
  if (state.echo_risk > settings.echo_threshold && settings.enable_contrarian && r < settings.friction_level) {
    type = INTERVENTION_TEMPLATES.find(t => t.type === 'contrarian')!;
  } else if (state.novelty_index < settings.novelty_threshold && settings.enable_novelty && r < settings.friction_level) {
    type = INTERVENTION_TEMPLATES.find(t => t.type === 'novelty')!;
  } else if (state.cognitive_load > 0.7 && settings.enable_noise_reduction) {
    type = INTERVENTION_TEMPLATES.find(t => t.type === 'noise-reduction')!;
  } else if (state.focus_score > 80 && settings.enable_complexity && r < 0.3) {
    type = INTERVENTION_TEMPLATES.find(t => t.type === 'complexity')!;
  } else if (r < 0.2 && settings.enable_diversity) {
    type = INTERVENTION_TEMPLATES.find(t => t.type === 'diversity')!;
  }

  if (!type) return null;

  const template = pick(type.templates);
  const topic = pick(TOPICS);
  const reason = template.reason
    .replace('{threshold}', String(Math.round(rand(60, 85))))
    .replace('{pct}', String(Math.round(rand(70, 95))))
    .replace('{topic}', topic)
    .replace('{hours}', String(Math.round(rand(2, 8))))
    .replace('{count}', String(Math.round(rand(3, 15))));
  
  const content = template.content
    .replace('{title}', pick(TITLES))
    .replace('{topic}', topic)
    .replace('{topic1}', pick(TOPICS))
    .replace('{topic2}', pick(TOPICS))
    .replace('{topic3}', pick(TOPICS))
    .replace('{angle}', pick(ANGLES))
    .replace('{count}', String(Math.round(rand(5, 20))))
    .replace('{urgent}', String(Math.round(rand(1, 4))));

  return db.addIntervention({
    user_id: userId,
    type: type.type,
    reason,
    content,
    impact_score: +rand(0.3, 1).toFixed(2),
  });
}

// Seed initial demo data
export function seedDemoData(userId: string) {
  // Generate 50 browsing events spread over "today"
  for (let i = 0; i < 50; i++) {
    generateBrowsingEvent(userId);
  }
  
  // Generate cognitive states
  for (let i = 0; i < 24; i++) {
    const state = calculateCognitiveState(userId);
    db.addCognitiveState(state);
  }

  // Generate some interventions
  const latestState = db.getLatestCognitiveState(userId);
  if (latestState) {
    for (let i = 0; i < 8; i++) {
      generateIntervention(userId, latestState);
    }
  }
}

// Simulation runner — call this on an interval
export class SimulationRunner {
  private interval: ReturnType<typeof setInterval> | null = null;
  private listeners: Set<() => void> = new Set();

  start(userId: string, intervalMs = 3000) {
    this.stop();
    this.interval = setInterval(() => {
      // Generate 1-3 browsing events
      const count = Math.round(rand(1, 3));
      for (let i = 0; i < count; i++) {
        generateBrowsingEvent(userId);
      }
      
      // Update cognitive state
      const state = calculateCognitiveState(userId);
      const saved = db.addCognitiveState(state);
      
      // Maybe generate intervention (30% chance per tick)
      if (Math.random() < 0.3) {
        generateIntervention(userId, saved);
      }
      
      // Notify listeners
      this.listeners.forEach(fn => fn());
    }, intervalMs);
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  onUpdate(fn: () => void) {
    this.listeners.add(fn);
    return () => { this.listeners.delete(fn); };
  }

  get running() { return this.interval !== null; }
}

export const simulator = new SimulationRunner();
