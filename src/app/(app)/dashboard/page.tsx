"use client";

import { useApp } from "@/lib/context";
import { db } from "@/lib/db";
import { motion } from "framer-motion";
import { Brain, Zap, Eye, Gauge, Activity, AlertTriangle } from "lucide-react";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar,
} from "recharts";
import { useMemo } from "react";

function MetricGauge({ label, value, max, unit, icon: Icon, color, subtext }: {
  label: string; value: number; max: number; unit: string; icon: React.ElementType; color: string; subtext: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const data = [{ name: label, value: pct, fill: color }];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-s0-border bg-s0-surface p-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-4 w-4" style={{ color }} />
        <span className="font-mono text-[11px] uppercase tracking-wider text-s0-text-muted">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-16 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={data} startAngle={90} endAngle={-270}>
              <RadialBar background={{ fill: '#1e2a45' }} dataKey="value" cornerRadius={10} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <p className="font-mono text-2xl font-bold text-s0-text">{value}<span className="text-sm text-s0-text-muted">{unit}</span></p>
          <p className="font-mono text-[10px] text-s0-text-muted">{subtext}</p>
        </div>
      </div>
    </motion.div>
  );
}

const DIET_COLORS = ['#22d3ee', '#a78bfa', '#818cf8', '#34d399', '#fbbf24', '#f87171'];

export default function Dashboard() {
  const { user, cognitiveState, interventions, tick } = useApp();

  const states = useMemo(() => {
    if (!user) return [];
    return db.getCognitiveStates(user.id, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, tick]);

  const domainStats = useMemo(() => {
    if (!user) return [];
    return db.getDomainStats(user.id).slice(0, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, tick]);

  const dietData = domainStats.map((d, i) => ({
    name: d.domain.replace(/\.com|\.org|\.io/g, ''),
    value: Math.round(d.totalTime / 60),
    color: DIET_COLORS[i % DIET_COLORS.length],
  }));

  const timelineData = states.slice(-30).map((s, i) => ({
    idx: i,
    focus: s.focus_score,
    load: Math.round(s.cognitive_load * 100),
    echo: Math.round(s.echo_risk * 100),
    novelty: Math.round(s.novelty_index * 100),
  }));

  const recentInterventions = interventions.slice(0, 5);
  const cs = cognitiveState;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-lg font-bold text-s0-text">Cognitive Dashboard</h1>
          <p className="font-mono text-xs text-s0-text-muted">Real-time cognitive state monitoring</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-s0-border bg-s0-surface px-3 py-1.5">
          <div className="h-2 w-2 rounded-full bg-s0-emerald animate-pulse-slow" />
          <span className="font-mono text-[11px] text-s0-text-dim">System Active</span>
        </div>
      </div>

      {/* Metric gauges */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricGauge icon={Brain} label="Focus" value={cs?.focus_score ?? 0} max={100} unit="" color="#22d3ee" subtext={cs && cs.focus_score > 80 ? 'Deep focus' : cs && cs.focus_score > 50 ? 'Moderate' : 'Low'} />
        <MetricGauge icon={Eye} label="Novelty" value={cs ? Math.round(cs.novelty_index * 100) : 0} max={100} unit="%" color="#a78bfa" subtext={cs && cs.novelty_index > 0.6 ? 'High diversity' : 'Needs variety'} />
        <MetricGauge icon={AlertTriangle} label="Echo Risk" value={cs ? Math.round(cs.echo_risk * 100) : 0} max={100} unit="%" color={cs && cs.echo_risk > 0.7 ? '#f87171' : '#fbbf24'} subtext={cs && cs.echo_risk > 0.7 ? 'Chamber detected!' : 'Balanced'} />
        <MetricGauge icon={Gauge} label="Cog Load" value={cs ? Math.round(cs.cognitive_load * 100) : 0} max={100} unit="%" color="#34d399" subtext={cs && cs.cognitive_load > 0.7 ? 'Overloaded' : 'Sustainable'} />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Timeline */}
        <div className="lg:col-span-2 rounded-xl border border-s0-border bg-s0-surface p-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted mb-4">Cognitive State Timeline</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="gFocus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gLoad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gEcho" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="idx" tick={false} axisLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#4a5c7a' }} tickLine={false} axisLine={false} domain={[0, 100]} />
              <Tooltip contentStyle={{ background: '#131a2e', border: '1px solid #1e2a45', borderRadius: 8, fontSize: 11, color: '#e2e8f0' }} />
              <Area type="monotone" dataKey="focus" stroke="#22d3ee" fill="url(#gFocus)" strokeWidth={2} name="Focus" />
              <Area type="monotone" dataKey="load" stroke="#a78bfa" fill="url(#gLoad)" strokeWidth={2} name="Cog Load" />
              <Area type="monotone" dataKey="echo" stroke="#f87171" fill="url(#gEcho)" strokeWidth={1.5} name="Echo Risk" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {[{ label: 'Focus', color: '#22d3ee' }, { label: 'Load', color: '#a78bfa' }, { label: 'Echo', color: '#f87171' }].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full" style={{ background: l.color }} />
                <span className="font-mono text-[10px] text-s0-text-muted">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Diet */}
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5">
          <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted mb-4">Information Diet</h3>
          {dietData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={dietData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} strokeWidth={0}>
                    {dietData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#131a2e', border: '1px solid #1e2a45', borderRadius: 8, fontSize: 11, color: '#e2e8f0' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {dietData.map((d) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                      <span className="font-mono text-[11px] text-s0-text-dim">{d.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-s0-text-muted">{d.value}m</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center font-mono text-xs text-s0-text-muted py-10">Start simulation to see data</p>
          )}
        </div>
      </div>

      {/* Recent Interventions */}
      <div className="rounded-xl border border-s0-border bg-s0-surface p-5">
        <h3 className="font-mono text-xs uppercase tracking-wider text-s0-text-muted mb-4">Recent Interventions</h3>
        {recentInterventions.length > 0 ? (
          <div className="space-y-2">
            {recentInterventions.map((iv) => (
              <motion.div
                key={iv.id}
                className="flex items-start gap-3 rounded-lg border border-s0-border p-3 hover:bg-s0-surface2 transition-colors"
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] ${
                  iv.type === 'contrarian' ? 'bg-s0-red/10 text-s0-red' :
                  iv.type === 'novelty' ? 'bg-s0-purple/10 text-s0-purple' :
                  iv.type === 'noise-reduction' ? 'bg-s0-amber/10 text-s0-amber' :
                  'bg-s0-cyan/10 text-s0-cyan'
                }`}>
                  {iv.type === 'contrarian' ? '⚡' : iv.type === 'novelty' ? '🔭' : iv.type === 'noise-reduction' ? '🔕' : '🧠'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-s0-text">{iv.content}</p>
                  <p className="font-mono text-[10px] text-s0-text-muted mt-1">{iv.reason}</p>
                </div>
                <span className="font-mono text-[10px] text-s0-text-muted shrink-0">{new Date(iv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center font-mono text-xs text-s0-text-muted py-6">No interventions yet. Start the simulation to see System 0 in action.</p>
        )}
      </div>
    </div>
  );
}
