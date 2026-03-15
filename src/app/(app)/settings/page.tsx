"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/lib/context";
import type { Settings } from "@/lib/db";
import { isGeminiReady } from "@/lib/gemini";

function Slider({ label, value, onChange, min = 0, max = 100, step = 1, unit = "", desc }: {
  label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number; unit?: string; desc?: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="font-mono text-xs text-s0-text">{label}</label>
        <span className="font-mono text-xs text-s0-cyan">{Math.round(value * (max <= 1 ? 100 : 1))}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
      {desc && <p className="font-mono text-[10px] text-s0-text-muted mt-1">{desc}</p>}
    </div>
  );
}

function Toggle({ label, description, checked, onChange }: {
  label: string; description: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-s0-border last:border-0">
      <div>
        <p className="font-mono text-xs text-s0-text">{label}</p>
        <p className="font-mono text-[10px] text-s0-text-muted">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors ${checked ? "bg-s0-cyan" : "bg-s0-border"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-s0-bg shadow transition-transform ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { settings, updateSettings, setApiKey, user } = useApp();
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [focusStart, setFocusStart] = useState("22:00");
  const [focusEnd, setFocusEnd] = useState("08:00");
  const [blacklist, setBlacklist] = useState("");
  const [whitelist, setWhitelist] = useState("");

  useEffect(() => {
    if (settings) {
      try {
        const fh = JSON.parse(settings.focus_hours);
        if (fh[0]) { setFocusStart(fh[0].start); setFocusEnd(fh[0].end); }
      } catch {}
      setBlacklist(settings.blacklist);
      setWhitelist(settings.whitelist);
    }
  }, [settings]);

  if (!settings) return null;

  const save = (updates: Partial<Settings>) => updateSettings(updates);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-lg font-bold text-s0-text">Settings</h1>
        <p className="font-mono text-xs text-s0-text-muted">Configure System 0's behavior</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Friction Engine */}
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5 space-y-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted">Friction Engine</h3>
          <Slider label="Friction Level" value={settings.friction_level} onChange={(v) => save({ friction_level: v })} min={0} max={1} step={0.05} unit="%" desc={`At ${Math.round(settings.friction_level * 100)}%, ~${Math.round(settings.friction_level * 10)} interventions per day`} />
          <Slider label="Novelty Threshold" value={settings.novelty_threshold} onChange={(v) => save({ novelty_threshold: v })} min={0} max={1} step={0.05} unit="%" desc="Below this, System 0 pushes new content" />
          <Slider label="Echo Chamber Threshold" value={settings.echo_threshold} onChange={(v) => save({ echo_threshold: v })} min={0} max={1} step={0.05} unit="%" desc="Above this, System 0 injects contrarian views" />
        </div>

        {/* Intervention Types */}
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted mb-3">Intervention Types</h3>
          <Toggle label="Contrarian Perspectives" description="Challenge one-sided thinking with opposing views" checked={settings.enable_contrarian} onChange={(v) => save({ enable_contrarian: v })} />
          <Toggle label="Novelty Injection" description="Surface unfamiliar content when novelty is low" checked={settings.enable_novelty} onChange={(v) => save({ enable_novelty: v })} />
          <Toggle label="Noise Reduction" description="Suppress distractions during high cognitive load" checked={settings.enable_noise_reduction} onChange={(v) => save({ enable_noise_reduction: v })} />
          <Toggle label="Complexity Scaling" description="Increase content depth during flow states" checked={settings.enable_complexity} onChange={(v) => save({ enable_complexity: v })} />
          <Toggle label="Topic Diversity" description="Broaden your information diet when too narrow" checked={settings.enable_diversity} onChange={(v) => save({ enable_diversity: v })} />
        </div>

        {/* Focus Hours */}
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted mb-3">Quiet Hours</h3>
          <p className="font-mono text-[10px] text-s0-text-muted mb-3">System 0 reduces interventions during these hours</p>
          <div className="flex items-center gap-3">
            <div>
              <label className="font-mono text-[10px] text-s0-text-muted block mb-1">Start</label>
              <input type="time" value={focusStart} onChange={(e) => { setFocusStart(e.target.value); save({ focus_hours: JSON.stringify([{ start: e.target.value, end: focusEnd }]) }); }}
                className="rounded-lg border border-s0-border bg-s0-bg px-3 py-2 font-mono text-xs text-s0-text" />
            </div>
            <span className="mt-4 text-s0-text-muted">→</span>
            <div>
              <label className="font-mono text-[10px] text-s0-text-muted block mb-1">End</label>
              <input type="time" value={focusEnd} onChange={(e) => { setFocusEnd(e.target.value); save({ focus_hours: JSON.stringify([{ start: focusStart, end: e.target.value }]) }); }}
                className="rounded-lg border border-s0-border bg-s0-bg px-3 py-2 font-mono text-xs text-s0-text" />
            </div>
          </div>
        </div>

        {/* Domain Filters */}
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5 space-y-4">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted">Domain Filters</h3>
          <div>
            <label className="font-mono text-[10px] text-s0-text-muted block mb-1">Blacklist (comma-separated)</label>
            <input value={blacklist} onChange={(e) => { setBlacklist(e.target.value); save({ blacklist: e.target.value }); }}
              placeholder="facebook.com, tiktok.com" className="w-full rounded-lg border border-s0-border bg-s0-bg px-3 py-2 font-mono text-xs text-s0-text placeholder:text-s0-text-muted focus:border-s0-cyan focus:outline-none" />
          </div>
          <div>
            <label className="font-mono text-[10px] text-s0-text-muted block mb-1">Whitelist (comma-separated)</label>
            <input value={whitelist} onChange={(e) => { setWhitelist(e.target.value); save({ whitelist: e.target.value }); }}
              placeholder="arxiv.org, nature.com" className="w-full rounded-lg border border-s0-border bg-s0-bg px-3 py-2 font-mono text-xs text-s0-text placeholder:text-s0-text-muted focus:border-s0-cyan focus:outline-none" />
          </div>
        </div>

        {/* API Key */}
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5 lg:col-span-2">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted mb-3">Gemini API</h3>
          <div className="flex items-center gap-2 mb-3">
            <div className={`h-2 w-2 rounded-full ${isGeminiReady() ? 'bg-s0-emerald' : 'bg-s0-red'}`} />
            <span className="font-mono text-xs text-s0-text-dim">{isGeminiReady() ? 'Connected' : 'Not connected'}</span>
          </div>
          <div className="flex gap-2">
            <input type="password" value={apiKeyInput} onChange={(e) => setApiKeyInput(e.target.value)}
              placeholder="Enter Gemini API key..." className="flex-1 rounded-lg border border-s0-border bg-s0-bg px-3 py-2 font-mono text-xs text-s0-text placeholder:text-s0-text-muted focus:border-s0-cyan focus:outline-none" />
            <button onClick={() => { setApiKey(apiKeyInput); setApiKeyInput(''); }} className="rounded-lg bg-s0-cyan/10 px-4 py-2 font-mono text-xs text-s0-cyan hover:bg-s0-cyan/20">
              Save
            </button>
          </div>
          <p className="font-mono text-[10px] text-s0-text-muted mt-2">
            Get a free key at <a href="https://aistudio.google.com/apikey" target="_blank" className="text-s0-cyan hover:underline">aistudio.google.com/apikey</a>. Used for Perspective Shift analysis.
          </p>
        </div>

        {/* Data */}
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5 lg:col-span-2">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted mb-3">Data</h3>
          <div className="flex gap-3">
            <button onClick={() => {
              const data = JSON.stringify({ cognitive_states: localStorage.getItem('s0_cognitive_states'), interventions: localStorage.getItem('s0_interventions'), browsing_data: localStorage.getItem('s0_browsing_data') });
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a'); a.href = url; a.download = 'system0-export.json'; a.click();
            }} className="rounded-lg border border-s0-border px-3 py-2 font-mono text-xs text-s0-text-dim hover:border-s0-cyan/30 hover:text-s0-text transition-colors">
              Export Data
            </button>
            <button onClick={() => { if (confirm('Clear all System 0 data?')) { localStorage.clear(); window.location.reload(); } }}
              className="rounded-lg border border-s0-red/30 px-3 py-2 font-mono text-xs text-s0-red/70 hover:bg-s0-red/5 hover:text-s0-red transition-colors">
              Clear All Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
