"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export default function SignIn() {
  const { login } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim(), name.trim() || email.split('@')[0]);
    router.push("/dashboard");
  };

  const handleDemo = () => {
    login("demo@system0.ai", "Demo User");
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-s0-bg">
      {/* Subtle background */}
      <div className="fixed inset-0 animate-neural opacity-50" />
      
      <motion.div
        className="relative z-10 w-full max-w-sm px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="rounded-2xl border border-s0-border bg-s0-surface p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-s0-cyan to-s0-purple">
              <Zap className="h-6 w-6 text-s0-bg" />
            </div>
            <h1 className="font-mono text-xl font-bold text-s0-text">SYSTEM 0</h1>
            <p className="mt-2 font-mono text-xs text-s0-text-muted">Ambient Cognitive Reshaper</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-s0-text-muted">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="mt-1 w-full rounded-lg border border-s0-border bg-s0-bg px-3 py-2.5 font-mono text-sm text-s0-text placeholder:text-s0-text-muted focus:border-s0-cyan focus:outline-none"
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-s0-text-muted">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1 w-full rounded-lg border border-s0-border bg-s0-bg px-3 py-2.5 font-mono text-sm text-s0-text placeholder:text-s0-text-muted focus:border-s0-cyan focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-s0-cyan to-s0-purple py-2.5 font-mono text-sm font-semibold text-s0-bg hover:opacity-90 transition-opacity"
            >
              Enter System 0
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-s0-border" />
            <span className="font-mono text-[10px] text-s0-text-muted">or</span>
            <div className="flex-1 h-px bg-s0-border" />
          </div>

          <button
            onClick={handleDemo}
            className="w-full rounded-lg border border-s0-border bg-s0-bg py-2.5 font-mono text-sm text-s0-text-dim hover:border-s0-cyan/30 hover:text-s0-text transition-colors"
          >
            Try Demo Mode
          </button>

          <p className="mt-6 text-center font-mono text-[10px] text-s0-text-muted">
            Data stored locally in your browser. No server required.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
