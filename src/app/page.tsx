"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Brain, Shield, Eye, Activity, ArrowRight } from "lucide-react";

const features = [
  { icon: Brain, title: "Cognitive State Monitoring", desc: "Real-time tracking of focus, novelty, echo chamber risk, and cognitive load." },
  { icon: Eye, title: "Perspective Shifting", desc: "AI-powered contrarian analysis that challenges your assumptions using Gemini." },
  { icon: Shield, title: "Friction Engine", desc: "Configurable interventions that inject healthy cognitive friction into your information diet." },
  { icon: Activity, title: "Adaptive Interventions", desc: "Rate and refine System 0's suggestions. It learns what works for your thinking style." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-s0-bg">
      <div className="fixed inset-0 animate-neural opacity-30" />
      
      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-s0-cyan to-s0-purple">
            <Zap className="h-3.5 w-3.5 text-s0-bg" />
          </div>
          <span className="font-mono text-sm font-semibold text-s0-text">SYSTEM 0</span>
        </div>
        <Link href="/auth/signin" className="rounded-lg bg-s0-surface border border-s0-border px-4 py-2 font-mono text-xs text-s0-text-dim hover:text-s0-text hover:border-s0-cyan/30 transition-colors">
          Sign In
        </Link>
      </nav>

      {/* Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-s0-border bg-s0-surface px-3 py-1 mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-s0-emerald animate-pulse-slow" />
            <span className="font-mono text-[10px] text-s0-text-dim">Cognitive reshaping active</span>
          </div>
          
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-s0-text leading-tight">
            The AI that thinks<br />
            <span className="text-gradient">before you think</span>
          </h1>
          
          <p className="mt-6 max-w-xl mx-auto font-mono text-sm text-s0-text-dim leading-relaxed">
            System 0 monitors your digital environment and subtly reshapes your information diet. 
            It detects echo chambers, cognitive overload, and routine — then injects friction, 
            contrarian perspectives, and novel stimuli.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/auth/signin" className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-s0-cyan to-s0-purple px-6 py-3 font-mono text-sm font-semibold text-s0-bg hover:opacity-90 transition-opacity">
              Enter System 0 <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/auth/signin" className="rounded-lg border border-s0-border px-6 py-3 font-mono text-sm text-s0-text-dim hover:border-s0-cyan/30 hover:text-s0-text transition-colors">
              Try Demo
            </Link>
          </div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          className="mt-16 rounded-xl border border-s0-border bg-s0-surface p-1 glow-cyan"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="rounded-lg bg-s0-bg p-4">
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: 'FOCUS', value: '87', color: '#22d3ee' },
                { label: 'NOVELTY', value: '42%', color: '#a78bfa' },
                { label: 'ECHO RISK', value: '23%', color: '#fbbf24' },
                { label: 'COG LOAD', value: '61%', color: '#34d399' },
              ].map(m => (
                <div key={m.label} className="rounded-lg border border-s0-border bg-s0-surface p-3">
                  <span className="font-mono text-[9px] text-s0-text-muted">{m.label}</span>
                  <p className="font-mono text-lg font-bold mt-0.5" style={{ color: m.color }}>{m.value}</p>
                </div>
              ))}
            </div>
            <div className="h-32 rounded-lg border border-s0-border bg-s0-surface flex items-center justify-center">
              <span className="font-mono text-xs text-s0-text-muted">[ cognitive state timeline ]</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="rounded-xl border border-s0-border bg-s0-surface p-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            >
              <f.icon className="h-5 w-5 text-s0-cyan mb-3" />
              <h3 className="font-mono text-sm font-semibold text-s0-text">{f.title}</h3>
              <p className="mt-2 font-mono text-xs text-s0-text-dim leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
