"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Zap, Shield, TrendingUp } from "lucide-react";
import { cognitiveState, frictionEvents } from "@/lib/mock-data";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

function StatCard({ icon: Icon, label, value, sub, color }: { icon: React.ElementType; label: string; value: string; sub: string; color: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="font-mono text-xs text-slate-400">{sub}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

const impactColors = { high: "bg-red-100 text-red-700", medium: "bg-amber-100 text-amber-700", low: "bg-slate-100 text-slate-600" };
const typeLabels = { contrarian: "Contrarian", complexity: "Complexity", "noise-reduction": "Noise Reduction", diversity: "Diversity" };

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-500">Real-time cognitive state overview</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Brain} label="Cognitive Load" value={`${Math.round(cognitiveState.cognitiveLoad * 100)}%`} sub="Moderate" color="bg-indigo-600" />
        <StatCard icon={TrendingUp} label="Focus Score" value={`${cognitiveState.focusScore}`} sub="Excellent" color="bg-violet-600" />
        <StatCard icon={Zap} label="Current Mode" value={cognitiveState.currentMode} sub={`Active ${cognitiveState.activeFor}`} color="bg-emerald-600" />
        <StatCard icon={Shield} label="Noise Blocked" value="12" sub="Since focus lock" color="bg-amber-600" />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Focus Timeline */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Focus & Cognitive Load — Today</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={cognitiveState.focusTimeline}>
                <defs>
                  <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} interval={3} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Area type="monotone" dataKey="focus" stroke="#6366f1" fill="url(#focusGrad)" strokeWidth={2} name="Focus" />
                <Area type="monotone" dataKey="load" stroke="#a78bfa" fill="url(#loadGrad)" strokeWidth={2} name="Load" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Info Diet */}
        <Card>
          <CardHeader>
            <CardTitle>Information Diet</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={cognitiveState.informationDiet} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2}>
                  {cognitiveState.informationDiet.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 space-y-1.5">
              {cognitiveState.informationDiet.map((d) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-slate-600">{d.name}</span>
                  </div>
                  <span className="font-mono text-slate-400">{d.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Friction Events */}
      <Card>
        <CardHeader>
          <CardTitle>Friction Events — Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {frictionEvents.map((event) => (
              <motion.div
                key={event.id}
                className="flex items-start gap-4 rounded-lg border border-slate-100 p-4 transition-colors hover:bg-slate-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="mt-0.5 font-mono text-xs text-slate-400">{event.time}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-slate-900">{event.title}</h4>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${impactColors[event.impact]}`}>
                      {event.impact}
                    </span>
                    <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium text-indigo-600">
                      {typeLabels[event.type]}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
