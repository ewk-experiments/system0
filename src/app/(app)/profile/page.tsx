"use client";

import { useApp } from "@/lib/context";
import { db } from "@/lib/db";
import { motion } from "framer-motion";
import {
  BarChart, Bar, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { useMemo } from "react";

export default function CognitiveProfile() {
  const { user, interventions, tick } = useApp();

  const states = useMemo(() => {
    if (!user) return [];
    return db.getCognitiveStates(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, tick]);

  const domainStats = useMemo(() => {
    if (!user) return [];
    return db.getDomainStats(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, tick]);

  // Aggregate states into hourly bins
  const hourlyData = useMemo(() => {
    const bins = Array.from({ length: 24 }, (_, h) => ({ hour: h, focus: 0, load: 0, count: 0 }));
    for (const s of states) {
      const h = new Date(s.timestamp).getHours();
      bins[h].focus += s.focus_score;
      bins[h].load += s.cognitive_load * 100;
      bins[h].count++;
    }
    return bins.map(b => ({ hour: `${b.hour}:00`, focus: b.count ? Math.round(b.focus / b.count) : 0, load: b.count ? Math.round(b.load / b.count) : 0 }));
  }, [states]);

  // Intervention type breakdown
  const typeBreakdown = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const iv of interventions) {
      counts[iv.type] = (counts[iv.type] || 0) + 1;
    }
    return Object.entries(counts).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count);
  }, [interventions]);

  // Rating stats
  const ratingStats = useMemo(() => {
    const rated = interventions.filter(iv => iv.user_rating !== null);
    const helpful = rated.filter(iv => iv.user_rating === 1).length;
    const unhelpful = rated.filter(iv => iv.user_rating === -1).length;
    return { total: interventions.length, rated: rated.length, helpful, unhelpful, rate: rated.length ? Math.round(helpful / rated.length * 100) : 0 };
  }, [interventions]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-lg font-bold text-s0-text">Cognitive Profile</h1>
        <p className="font-mono text-xs text-s0-text-muted">Your thinking patterns and System 0 effectiveness</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: 'Total Interventions', value: ratingStats.total, color: 'text-s0-cyan' },
          { label: 'Rated Helpful', value: `${ratingStats.helpful}`, color: 'text-s0-emerald' },
          { label: 'Approval Rate', value: `${ratingStats.rate}%`, color: 'text-s0-purple' },
          { label: 'Data Points', value: states.length, color: 'text-s0-amber' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-s0-border bg-s0-surface p-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-s0-text-muted">{s.label}</span>
            <p className={`font-mono text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Focus by Hour */}
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted mb-4">Avg Focus & Load by Hour</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={hourlyData}>
              <XAxis dataKey="hour" tick={{ fontSize: 9, fill: '#4a5c7a' }} tickLine={false} axisLine={false} interval={3} />
              <YAxis tick={{ fontSize: 9, fill: '#4a5c7a' }} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#131a2e', border: '1px solid #1e2a45', borderRadius: 8, fontSize: 11, color: '#e2e8f0' }} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="focus" name="Focus" fill="#22d3ee" radius={[3, 3, 0, 0]} />
              <Bar dataKey="load" name="Load" fill="#a78bfa" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Intervention Types */}
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted mb-4">Intervention Breakdown</h3>
          {typeBreakdown.length > 0 ? (
            <div className="space-y-3">
              {typeBreakdown.map(t => {
                const maxCount = typeBreakdown[0].count;
                const pct = (t.count / maxCount) * 100;
                return (
                  <div key={t.type}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[11px] text-s0-text-dim">{t.type}</span>
                      <span className="font-mono text-[10px] text-s0-text-muted">{t.count}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-s0-border">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-s0-cyan to-s0-purple"
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center font-mono text-xs text-s0-text-muted py-10">No data yet</p>
          )}
        </div>

        {/* Domain Usage */}
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5 lg:col-span-2">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted mb-4">Domain Usage</h3>
          {domainStats.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
              {domainStats.slice(0, 12).map(d => (
                <div key={d.domain} className="rounded-lg border border-s0-border bg-s0-bg p-3">
                  <p className="font-mono text-[11px] text-s0-text truncate">{d.domain}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-[10px] text-s0-cyan">{Math.round(d.totalTime / 60)}m</span>
                    <span className="font-mono text-[10px] text-s0-text-muted">{d.visits} visits</span>
                    <span className="font-mono text-[10px] text-s0-text-muted">{Math.round(d.avgScroll * 100)}% scroll</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center font-mono text-xs text-s0-text-muted py-6">No browsing data</p>
          )}
        </div>
      </div>
    </div>
  );
}
