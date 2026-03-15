"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Slider({ label, value, onChange, min = 0, max = 100, unit = "" }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; unit?: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="font-mono text-sm text-slate-500">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </div>
  );
}

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${checked ? "bg-indigo-600" : "bg-slate-200"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

const allDomains = ["AI/ML", "Engineering", "Design", "Business", "Science", "Philosophy", "Creative", "News", "Health", "Finance"];

export default function Settings() {
  const [friction, setFriction] = useState(65);
  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("08:00");
  const [domains, setDomains] = useState(new Set(["AI/ML", "Engineering", "Design"]));
  const [notifications, setNotifications] = useState({ browser: true, email: false, digest: true, friction: true });

  const toggleDomain = (d: string) => {
    const next = new Set(domains);
    next.has(d) ? next.delete(d) : next.add(d);
    setDomains(next);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Configure how System 0 operates</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Friction */}
        <Card>
          <CardHeader>
            <CardTitle>Friction Engine</CardTitle>
            <CardDescription>How aggressively System 0 challenges your thinking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Slider label="Friction Intensity" value={friction} onChange={setFriction} unit="%" />
            <div className="flex justify-between text-xs text-slate-400">
              <span>Gentle</span>
              <span>Balanced</span>
              <span>Aggressive</span>
            </div>
            <p className="text-xs text-slate-500">
              At {friction}%, System 0 will introduce contrarian perspectives approximately {Math.round(friction / 10)} times per day.
            </p>
          </CardContent>
        </Card>

        {/* Domains */}
        <Card>
          <CardHeader>
            <CardTitle>Monitored Domains</CardTitle>
            <CardDescription>Topics System 0 actively tracks and reshapes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {allDomains.map((d) => (
                <button
                  key={d}
                  onClick={() => toggleDomain(d)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                    domains.has(d) ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-500 hover:border-slate-300"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quiet Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Quiet Hours</CardTitle>
            <CardDescription>System 0 reduces all interventions during these hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div>
                <label className="mb-1 block text-xs text-slate-500">Start</label>
                <input
                  type="time" value={quietStart} onChange={(e) => setQuietStart(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm"
                />
              </div>
              <span className="mt-5 text-slate-400">→</span>
              <div>
                <label className="mb-1 block text-xs text-slate-500">End</label>
                <input
                  type="time" value={quietEnd} onChange={(e) => setQuietEnd(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 font-mono text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose how System 0 communicates with you</CardDescription>
          </CardHeader>
          <CardContent>
            <Toggle label="Browser notifications" description="Real-time alerts for high-impact events" checked={notifications.browser} onChange={(v) => setNotifications({ ...notifications, browser: v })} />
            <Toggle label="Email digest" description="Daily summary of interventions" checked={notifications.email} onChange={(v) => setNotifications({ ...notifications, email: v })} />
            <Toggle label="Weekly cognitive digest" description="Weekly report of thinking patterns" checked={notifications.digest} onChange={(v) => setNotifications({ ...notifications, digest: v })} />
            <Toggle label="Friction notifications" description="Alert when contrarian content is surfaced" checked={notifications.friction} onChange={(v) => setNotifications({ ...notifications, friction: v })} />
          </CardContent>
        </Card>

        {/* Data & Account */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Data & Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Export Cognitive Data</Button>
              <Button variant="outline">Download Activity Log</Button>
              <Button variant="outline" className="text-red-600 hover:bg-red-50 hover:text-red-700">Delete Account</Button>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Data exports include all cognitive state history, intervention logs, and profile data in JSON format.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
