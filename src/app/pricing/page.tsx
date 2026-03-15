"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Zap, ChevronRight, Check } from "lucide-react";
import { pricingPlans } from "@/lib/mock-data";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-semibold">System 0</span>
          </Link>
          <Link href="/auth/signin"><Button size="sm">Get Started</Button></Link>
        </div>
      </nav>

      <div className="pt-32 pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
              Invest in <span className="gradient-text">better thinking</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
              14-day free trial on all plans. No credit card required.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-indigo-200 bg-white shadow-xl shadow-indigo-100 ring-1 ring-indigo-100 scale-105"
                    : "border-slate-200 bg-white"
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">Most popular</span>
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
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-indigo-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/auth/signin" className="mt-8 block">
                  <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>{plan.cta}</Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ */}
          <div className="mx-auto mt-24 max-w-2xl">
            <h2 className="text-center text-2xl font-bold text-slate-900">Frequently asked questions</h2>
            <div className="mt-8 space-y-4">
              {[
                { q: "How does System 0 track my cognitive state?", a: "Through a browser extension that analyzes browsing patterns, typing velocity, tab switching frequency, and time-of-day signals. No content is read — only behavioral patterns." },
                { q: "Does System 0 read my emails or messages?", a: "No. System 0 only analyzes metadata (timestamps, frequency, volume) from connected apps. Content stays private." },
                { q: "What is the Friction Engine?", a: "When System 0 detects you're converging on an idea too quickly, it surfaces contrarian perspectives or alternative framings to help you think more completely." },
                { q: "Can I turn off interventions?", a: "Yes. You have full control via Settings. Adjust friction intensity, set quiet hours, or pause System 0 entirely." },
              ].map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-slate-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-medium text-slate-900">
                    {faq.q}
                    <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="px-4 pb-4 text-sm text-slate-500">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
