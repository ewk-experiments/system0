'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { db, type User, type CognitiveState, type Intervention, type Settings } from './db';
import { simulator, seedDemoData, calculateCognitiveState } from './simulation';
import { initGemini } from './gemini';

interface AppState {
  user: User | null;
  cognitiveState: CognitiveState | null;
  interventions: Intervention[];
  settings: Settings | null;
  simulationRunning: boolean;
  tick: number;
}

interface AppContextType extends AppState {
  login: (email: string, name: string) => void;
  logout: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  rateIntervention: (id: string, rating: number) => void;
  updateSettings: (s: Partial<Settings>) => void;
  setApiKey: (key: string) => void;
  refresh: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    cognitiveState: null,
    interventions: [],
    settings: null,
    simulationRunning: false,
    tick: 0,
  });
  const initialized = useRef(false);

  // Load user on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    const user = db.getCurrentUser();
    if (user) {
      const cogState = db.getLatestCognitiveState(user.id);
      const interventions = db.getInterventions(user.id);
      const settings = db.getSettings(user.id);
      if (user.gemini_api_key) initGemini(user.gemini_api_key);
      setState({ user, cognitiveState: cogState, interventions, settings, simulationRunning: false, tick: 0 });
    }
  }, []);

  const refresh = useCallback(() => {
    setState(prev => {
      if (!prev.user) return prev;
      return {
        ...prev,
        cognitiveState: db.getLatestCognitiveState(prev.user.id),
        interventions: db.getInterventions(prev.user.id),
        settings: db.getSettings(prev.user.id),
        tick: prev.tick + 1,
      };
    });
  }, []);

  // Simulation listener
  useEffect(() => {
    if (!state.simulationRunning) return;
    const unsub = simulator.onUpdate(refresh);
    return unsub;
  }, [state.simulationRunning, refresh]);

  const login = useCallback((email: string, name: string) => {
    let user = db.findUserByEmail(email);
    if (!user) {
      user = db.createUser(email, name);
      seedDemoData(user.id);
    } else {
      db.setCurrentUser(user);
    }
    const cogState = db.getLatestCognitiveState(user.id);
    const interventions = db.getInterventions(user.id);
    const settings = db.getSettings(user.id);
    if (user.gemini_api_key) initGemini(user.gemini_api_key);
    setState({ user, cognitiveState: cogState, interventions, settings, simulationRunning: false, tick: 0 });
  }, []);

  const logout = useCallback(() => {
    simulator.stop();
    db.setCurrentUser(null);
    setState({ user: null, cognitiveState: null, interventions: [], settings: null, simulationRunning: false, tick: 0 });
  }, []);

  const startSimulation = useCallback(() => {
    if (!state.user) return;
    simulator.start(state.user.id, 3000);
    setState(prev => ({ ...prev, simulationRunning: true }));
  }, [state.user]);

  const stopSimulation = useCallback(() => {
    simulator.stop();
    setState(prev => ({ ...prev, simulationRunning: false }));
  }, []);

  const rateIntervention = useCallback((id: string, rating: number) => {
    db.rateIntervention(id, rating);
    refresh();
  }, [refresh]);

  const updateSettings = useCallback((updates: Partial<Settings>) => {
    if (!state.user) return;
    const current = db.getSettings(state.user.id);
    db.upsertSettings({ ...current, ...updates });
    refresh();
  }, [state.user, refresh]);

  const setApiKey = useCallback((key: string) => {
    if (!state.user) return;
    initGemini(key);
    db.updateUser(state.user.id, { gemini_api_key: key });
    setState(prev => prev.user ? { ...prev, user: { ...prev.user, gemini_api_key: key } } : prev);
  }, [state.user]);

  return (
    <AppContext.Provider value={{ ...state, login, logout, startSimulation, stopSimulation, rateIntervention, updateSettings, setApiKey, refresh }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
