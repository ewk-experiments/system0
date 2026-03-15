"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Chrome, Mail, Calendar, BookOpen, ArrowRight, Check } from "lucide-react";
import Link from "next/link";

const steps = [
  { title: "Install Extension", description: "System 0 works through a browser extension that observes your information environment." },
  { title: "Connect Apps", description: "Link the tools you use daily so System 0 can understand your information flow." },
  { title: "Set Preferences", description: "Tell us how you think best so we can calibrate your experience." },
];

const apps = [
  { name: "Google Calendar", icon: Calendar, connected: false },
  { name: "Gmail", icon: Mail, connected: false },
  { name: "Reading List", icon: BookOpen, connected: false },
];

const workStyles = ["Deep Focus", "Multitasker", "Balanced", "Creative Explorer"];
const focusPatterns = ["Morning person", "Night owl", "Consistent", "Variable"];
const domains = ["AI/ML", "Engineering", "Design", "Business", "Science", "Philosophy", "Creative", "News"];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [connectedApps, setConnectedApps] = useState<Set<string>>(new Set());
  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedPattern, setSelectedPattern] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());

  const toggleApp = (name: string) => {
    const next = new Set(connectedApps);
    next.has(name) ? next.delete(name) : next.add(name);
    setConnectedApps(next);
  };

  const toggleDomain = (d: string) => {
    const next = new Set(selectedDomains);
    next.has(d) ? next.delete(d) : next.add(d);
    setSelectedDomains(next);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s.title} className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium ${
                i < step ? "bg-indigo-600 text-white" : i === step ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-600" : "bg-slate-100 text-slate-400"
              }`}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`h-px w-12 ${i < step ? "bg-indigo-600" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-8">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-slate-900">{steps[step].title}</h2>
                  <p className="mt-2 text-sm text-slate-500">{steps[step].description}</p>
                </div>

                {step === 0 && (
                  <div className="space-y-4">
                    <button className="flex w-full items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                        <Chrome className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-slate-900">Chrome Extension</p>
                        <p className="text-xs text-slate-500">Works with Chrome, Brave, Edge, Arc</p>
                      </div>
                      <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
                    </button>
                    <p className="text-center text-xs text-slate-400">The extension observes your browsing patterns to model cognitive state. No data leaves your device.</p>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-3">
                    {apps.map((app) => {
                      const isConnected = connectedApps.has(app.name);
                      return (
                        <button
                          key={app.name}
                          onClick={() => toggleApp(app.name)}
                          className={`flex w-full items-center gap-4 rounded-xl border p-4 transition-all ${
                            isConnected ? "border-indigo-200 bg-indigo-50" : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <app.icon className={`h-5 w-5 ${isConnected ? "text-indigo-600" : "text-slate-400"}`} />
                          <span className="font-medium text-slate-900">{app.name}</span>
                          {isConnected && <Check className="ml-auto h-4 w-4 text-indigo-600" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Work Style</label>
                      <div className="grid grid-cols-2 gap-2">
                        {workStyles.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedStyle(s)}
                            className={`rounded-lg border px-3 py-2 text-sm transition-all ${
                              selectedStyle === s ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Focus Pattern</label>
                      <div className="grid grid-cols-2 gap-2">
                        {focusPatterns.map((p) => (
                          <button
                            key={p}
                            onClick={() => setSelectedPattern(p)}
                            className={`rounded-lg border px-3 py-2 text-sm transition-all ${
                              selectedPattern === p ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-700">Domains of Interest</label>
                      <div className="flex flex-wrap gap-2">
                        {domains.map((d) => (
                          <button
                            key={d}
                            onClick={() => toggleDomain(d)}
                            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                              selectedDomains.has(d) ? "border-indigo-300 bg-indigo-50 text-indigo-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
                            }`}
                          >
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-8 flex gap-3">
                  {step > 0 && (
                    <Button variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>Back</Button>
                  )}
                  {step < 2 ? (
                    <Button className="flex-1" onClick={() => setStep(step + 1)}>
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Link href="/dashboard" className="flex-1">
                      <Button className="w-full">
                        Launch System 0 <Zap className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
