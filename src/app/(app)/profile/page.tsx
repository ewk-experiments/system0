"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cognitiveProfile } from "@/lib/mock-data";
import {
  BarChart, Bar, AreaChart, Area, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

export default function CognitiveProfile() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Cognitive Profile</h1>
        <p className="text-sm text-slate-500">Your thinking patterns over time</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly Focus */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Focus Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={cognitiveProfile.weeklyFocus}>
                <XAxis dataKey="day" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} unit="h" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="deep" name="Deep Work" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="shallow" name="Shallow Work" fill="#c4b5fd" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Thinking Ratio */}
        <Card>
          <CardHeader>
            <CardTitle>Convergent vs Divergent Thinking</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={cognitiveProfile.thinkingRatio}>
                <defs>
                  <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="divGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} unit="%" />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="convergent" stroke="#6366f1" fill="url(#convGrad)" strokeWidth={2} name="Convergent" />
                <Area type="monotone" dataKey="divergent" stroke="#8b5cf6" fill="url(#divGrad)" strokeWidth={2} name="Divergent" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Productivity by Hour */}
        <Card>
          <CardHeader>
            <CardTitle>Productivity by Hour of Day</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={cognitiveProfile.productivityByHour}>
                <XAxis dataKey="hour" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <Line type="monotone" dataKey="productivity" stroke="#6366f1" strokeWidth={2} dot={false} name="Productivity" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic Diversity */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Diversity — This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cognitiveProfile.topicDiversity.map((topic) => (
                <div key={topic.topic} className="flex items-center gap-3">
                  <span className="w-20 shrink-0 text-xs text-slate-600 sm:w-28 sm:text-sm">{topic.topic}</span>
                  <div className="flex-1">
                    <div className="h-6 w-full overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${topic.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                      />
                    </div>
                  </div>
                  <span className="w-16 text-right font-mono text-xs text-slate-400">{topic.hours}h ({topic.percentage}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
