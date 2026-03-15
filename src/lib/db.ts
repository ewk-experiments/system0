// Client-side database using localStorage, matching the SQL schema
// All data persists across sessions in the browser

import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  gemini_api_key?: string;
}

export interface CognitiveState {
  id: string;
  user_id: string;
  focus_score: number;
  novelty_index: number;
  echo_risk: number;
  cognitive_load: number;
  timestamp: string;
}

export interface Intervention {
  id: string;
  user_id: string;
  type: 'contrarian' | 'novelty' | 'friction' | 'noise-reduction' | 'diversity' | 'complexity';
  reason: string;
  content: string;
  impact_score: number;
  user_rating: number | null; // -1, 0, 1
  timestamp: string;
}

export interface BrowsingData {
  id: string;
  user_id: string;
  url: string;
  domain: string;
  time_spent: number; // seconds
  scroll_depth: number; // 0-1
  visit_count: number;
  timestamp: string;
}

export interface Settings {
  user_id: string;
  friction_level: number;
  novelty_threshold: number;
  echo_threshold: number;
  focus_hours: string; // JSON array of {start, end}
  blacklist: string; // comma-separated domains
  whitelist: string;
  enable_contrarian: boolean;
  enable_novelty: boolean;
  enable_noise_reduction: boolean;
  enable_complexity: boolean;
  enable_diversity: boolean;
}

function getStore<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(`s0_${key}`) || '[]');
  } catch { return []; }
}

function setStore<T>(key: string, data: T[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`s0_${key}`, JSON.stringify(data));
}

function getOne<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const val = localStorage.getItem(`s0_${key}`);
    return val ? JSON.parse(val) : null;
  } catch { return null; }
}

function setOne<T>(key: string, data: T) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`s0_${key}`, JSON.stringify(data));
}

// Users
export const db = {
  // Auth
  getCurrentUser(): User | null {
    return getOne<User>('current_user');
  },
  
  setCurrentUser(user: User | null) {
    if (user) setOne('current_user', user);
    else if (typeof window !== 'undefined') localStorage.removeItem('s0_current_user');
  },

  createUser(email: string, name: string): User {
    const user: User = { id: uuidv4(), email, name, created_at: new Date().toISOString() };
    const users = getStore<User>('users');
    users.push(user);
    setStore('users', users);
    this.setCurrentUser(user);
    // Create default settings
    this.upsertSettings({
      user_id: user.id,
      friction_level: 0.5,
      novelty_threshold: 0.3,
      echo_threshold: 0.7,
      focus_hours: JSON.stringify([{ start: '22:00', end: '08:00' }]),
      blacklist: '',
      whitelist: '',
      enable_contrarian: true,
      enable_novelty: true,
      enable_noise_reduction: true,
      enable_complexity: true,
      enable_diversity: true,
    });
    return user;
  },

  findUserByEmail(email: string): User | undefined {
    return getStore<User>('users').find(u => u.email === email);
  },

  updateUser(id: string, updates: Partial<User>) {
    const users = getStore<User>('users');
    const idx = users.findIndex(u => u.id === id);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...updates };
      setStore('users', users);
      const current = this.getCurrentUser();
      if (current?.id === id) this.setCurrentUser(users[idx]);
    }
  },

  // Cognitive States
  addCognitiveState(state: Omit<CognitiveState, 'id' | 'timestamp'>): CognitiveState {
    const entry: CognitiveState = { ...state, id: uuidv4(), timestamp: new Date().toISOString() };
    const states = getStore<CognitiveState>('cognitive_states');
    states.push(entry);
    // Keep last 500
    if (states.length > 500) states.splice(0, states.length - 500);
    setStore('cognitive_states', states);
    return entry;
  },

  getCognitiveStates(userId: string, limit = 100): CognitiveState[] {
    return getStore<CognitiveState>('cognitive_states')
      .filter(s => s.user_id === userId)
      .slice(-limit);
  },

  getLatestCognitiveState(userId: string): CognitiveState | null {
    const states = this.getCognitiveStates(userId, 1);
    return states[states.length - 1] || null;
  },

  // Interventions
  addIntervention(intervention: Omit<Intervention, 'id' | 'timestamp' | 'user_rating'>): Intervention {
    const entry: Intervention = { ...intervention, id: uuidv4(), user_rating: null, timestamp: new Date().toISOString() };
    const interventions = getStore<Intervention>('interventions');
    interventions.push(entry);
    if (interventions.length > 500) interventions.splice(0, interventions.length - 500);
    setStore('interventions', interventions);
    return entry;
  },

  getInterventions(userId: string, limit = 50): Intervention[] {
    return getStore<Intervention>('interventions')
      .filter(i => i.user_id === userId)
      .slice(-limit)
      .reverse();
  },

  rateIntervention(id: string, rating: number) {
    const interventions = getStore<Intervention>('interventions');
    const idx = interventions.findIndex(i => i.id === id);
    if (idx >= 0) {
      interventions[idx].user_rating = rating;
      setStore('interventions', interventions);
    }
  },

  // Browsing Data
  addBrowsingData(data: Omit<BrowsingData, 'id' | 'timestamp'>): BrowsingData {
    const entry: BrowsingData = { ...data, id: uuidv4(), timestamp: new Date().toISOString() };
    const browsing = getStore<BrowsingData>('browsing_data');
    browsing.push(entry);
    if (browsing.length > 1000) browsing.splice(0, browsing.length - 1000);
    setStore('browsing_data', browsing);
    return entry;
  },

  getBrowsingData(userId: string, limit = 200): BrowsingData[] {
    return getStore<BrowsingData>('browsing_data')
      .filter(b => b.user_id === userId)
      .slice(-limit);
  },

  getDomainStats(userId: string): { domain: string; totalTime: number; visits: number; avgScroll: number }[] {
    const data = this.getBrowsingData(userId);
    const stats = new Map<string, { totalTime: number; visits: number; scrollSum: number; count: number }>();
    for (const d of data) {
      const s = stats.get(d.domain) || { totalTime: 0, visits: 0, scrollSum: 0, count: 0 };
      s.totalTime += d.time_spent;
      s.visits += d.visit_count;
      s.scrollSum += d.scroll_depth;
      s.count++;
      stats.set(d.domain, s);
    }
    return Array.from(stats.entries())
      .map(([domain, s]) => ({ domain, totalTime: s.totalTime, visits: s.visits, avgScroll: s.scrollSum / s.count }))
      .sort((a, b) => b.totalTime - a.totalTime);
  },

  // Settings
  getSettings(userId: string): Settings {
    const all = getStore<Settings>('settings');
    return all.find(s => s.user_id === userId) || {
      user_id: userId,
      friction_level: 0.5,
      novelty_threshold: 0.3,
      echo_threshold: 0.7,
      focus_hours: JSON.stringify([{ start: '22:00', end: '08:00' }]),
      blacklist: '',
      whitelist: '',
      enable_contrarian: true,
      enable_novelty: true,
      enable_noise_reduction: true,
      enable_complexity: true,
      enable_diversity: true,
    };
  },

  upsertSettings(settings: Settings) {
    const all = getStore<Settings>('settings');
    const idx = all.findIndex(s => s.user_id === settings.user_id);
    if (idx >= 0) all[idx] = settings;
    else all.push(settings);
    setStore('settings', all);
  },

  // Clear all data
  clearAll() {
    if (typeof window === 'undefined') return;
    const keys = Object.keys(localStorage).filter(k => k.startsWith('s0_'));
    keys.forEach(k => localStorage.removeItem(k));
  },
};
