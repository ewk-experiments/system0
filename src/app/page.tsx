"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, Brain, Shield, Waves, ArrowRight, ChevronRight, Activity } from "lucide-react";
import { pricingPlans } from "@/lib/mock-data";

function HeroAnimation() {
  return (
    <div className="relative mx-auto mt-16 h-80 w-full max-w-2xl">
      {/* Central brain node */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-200">
          <Brain className="h-10 w-10 text-white" />
        </div>
        <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-indigo-400/20" />
      </motion.div>

      {/* Orbiting info nodes */}
      {[
        { label: "News", angle: 0, delay: 0 },
        { label: "Email", angle: 60, delay: 0.5 },
        { label: "Social", angle: 120, delay: 1 },
        { label: "Papers", angle: 180, delay: 1.5 },
        { label: "Slack", angle: 240, delay: 2 },
        { label: "Calendar", angle: 300, delay: 2.5 },
      ].map((node) => {
        const r = 130;
        const rad = (node.angle * Math.PI) / 180;
        const x = Math.cos(rad) * r;
        const y = Math.sin(rad) * r;
        return (
          <motion.div
            key={node.label}
            className="absolute left-1/2 top-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1, x: x - 28, y: y - 14 }}
            transition={{ delay: node.delay * 0.3, duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2 + node.delay * 0.3, repeat: Infinity }}
            >
              {node.label}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Flowing lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 500 320">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const r = 130;
          const rad = (angle * Math.PI) / 180;
          const x = 250 + Math.cos(rad) * r;
          const y = 160 + Math.sin(rad) * r;
          return (
            <motion.line
              key={i}
              x1={250} y1={160} x2={x} y2={y}
              stroke="url(#grad)"
              strokeWidth={1}
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
            />
          );
        })}
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <motion.div
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
        <Icon className="h-5 w-5 text-indigo-600" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm leading-relaxed text-slate-500">{description}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">System 0</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm text-slate-600 hover:text-slate-900">Features</Link>
            <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">Pricing</Link>
            <Link href="/auth/signin" className="text-sm text-slate-600 hover:text-slate-900">Sign In</Link>
            <Link href="/auth/signin">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              The anti-chatbot
            </div>
            <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
              The AI that thinks{" "}
              <span className="gradient-text">before you think</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 leading-relaxed">
              System 0 is an ambient intelligence layer that reshapes your information environment 
              based on your cognitive state. It doesn&apos;t chat. It thinks alongside you.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link href="/auth/signin">
                <Button size="lg">
                  Start free trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg">How it works</Button>
              </Link>
            </div>
          </motion.div>

          <HeroAnimation />
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Not a chatbot. An ambient layer.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              System 0 monitors your cognitive state and silently reshapes the information around you — 
              surfacing what matters, suppressing noise, and introducing friction when you need it.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Observe", desc: "System 0 reads signals from your browser, calendar, and apps to model your cognitive state in real-time." },
              { step: "02", title: "Reshape", desc: "It silently adjusts your information environment — filtering noise, elevating signal, matching content complexity to your state." },
              { step: "03", title: "Challenge", desc: "When you're converging too fast, it introduces friction — contrarian perspectives, alternative framings, blind spots." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                className="relative rounded-2xl border border-slate-200 bg-white p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="font-mono text-4xl font-bold text-indigo-100">{item.step}</span>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Designed for deeper thinking</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">
              Every feature exists to help you think better — not to keep you engaged.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard icon={Brain} title="Cognitive State Modeling" description="Real-time estimation of focus, cognitive load, and thinking mode. System 0 knows when you're in flow." />
            <FeatureCard icon={Shield} title="Focus Protection" description="Automatically suppresses non-urgent notifications during deep work. Reclaims your attention." />
            <FeatureCard icon={Waves} title="Information Reshaping" description="Adjusts content complexity and volume to match your current cognitive capacity." />
            <FeatureCard icon={Zap} title="Friction Engine" description="Introduces contrarian perspectives when you're converging too fast. Prevents echo chambers." />
            <FeatureCard icon={Brain} title="Thinking Patterns" description="Track convergent vs divergent thinking ratios, topic diversity, and cognitive rhythms over time." />
            <FeatureCard icon={Activity} title="Intervention Log" description="Full transparency into every action System 0 takes. Review, override, or adjust at any time." />
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="border-t border-slate-100 bg-slate-50/50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Think better, starting today</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-500">14-day free trial. No credit card required.</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-indigo-200 bg-white shadow-lg shadow-indigo-100 ring-1 ring-indigo-100"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-slate-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  <span className="ml-1 text-slate-500">{plan.period}</span>
                </div>
                <p className="mt-3 text-sm text-slate-500">{plan.description}</p>
                <ul className="mt-6 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <ChevronRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-indigo-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signin" className="mt-8 block">
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-indigo-600">
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-900">System 0</span>
          </div>
          <p className="text-sm text-slate-400">© 2026 System 0. Think better.</p>
        </div>
      </footer>
    </div>
  );
}
