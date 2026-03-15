"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useApp } from "@/lib/context";
import {
  LayoutDashboard, Brain, Activity, Settings, Sparkles, LogOut, Menu, X, Play, Pause, Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/perspective", label: "Perspective Shift", icon: Sparkles },
  { href: "/activity", label: "Activity Feed", icon: Activity },
  { href: "/profile", label: "Cognitive Profile", icon: Brain },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { cognitiveState, simulationRunning, startSimulation, stopSimulation, logout } = useApp();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);

  const focusLabel = cognitiveState
    ? cognitiveState.focus_score > 80 ? 'Deep Focus' : cognitiveState.focus_score > 50 ? 'Active' : 'Scattered'
    : 'Initializing';

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-s0-border bg-s0-surface md:hidden"
        aria-label="Open nav"
      >
        <Menu className="h-5 w-5 text-s0-text-dim" />
      </button>

      {open && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setOpen(false)} />}

      <aside className={cn(
        "fixed left-0 top-0 z-50 h-screen w-60 border-r border-s0-border bg-s0-surface transition-transform duration-200",
        open ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0 md:z-40"
      )}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-14 items-center gap-2.5 border-b border-s0-border px-5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-s0-cyan to-s0-purple">
              <Zap className="h-3.5 w-3.5 text-s0-bg" />
            </div>
            <span className="font-mono text-sm font-semibold tracking-tight text-s0-text">SYSTEM 0</span>
            <div className="ml-auto flex h-5 items-center rounded-full bg-s0-emerald/10 px-2">
              <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-s0-emerald animate-pulse-slow" />
              <span className="font-mono text-[10px] text-s0-emerald">LIVE</span>
            </div>
            <button onClick={() => setOpen(false)} className="ml-1 md:hidden">
              <X className="h-4 w-4 text-s0-text-dim" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-0.5 p-2.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all",
                    isActive
                      ? "bg-s0-cyan/10 text-s0-cyan"
                      : "text-s0-text-dim hover:bg-s0-surface2 hover:text-s0-text"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Simulation control */}
          <div className="border-t border-s0-border p-3">
            <button
              onClick={simulationRunning ? stopSimulation : startSimulation}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all",
                simulationRunning
                  ? "bg-s0-amber/10 text-s0-amber hover:bg-s0-amber/20"
                  : "bg-s0-cyan/10 text-s0-cyan hover:bg-s0-cyan/20"
              )}
            >
              {simulationRunning ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {simulationRunning ? 'Pause Simulation' : 'Start Simulation'}
            </button>
          </div>

          {/* Status footer */}
          <div className="border-t border-s0-border p-3">
            <div className="rounded-lg bg-s0-bg p-3">
              <div className="flex items-center gap-2">
                <div className={cn("h-2 w-2 rounded-full", cognitiveState && cognitiveState.focus_score > 80 ? "bg-s0-emerald" : cognitiveState && cognitiveState.focus_score > 50 ? "bg-s0-amber" : "bg-s0-red")} />
                <span className="font-mono text-[11px] text-s0-text-dim">{focusLabel}</span>
              </div>
              {cognitiveState && (
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <div>
                    <span className="font-mono text-[10px] text-s0-text-muted">FOCUS</span>
                    <p className="font-mono text-xs text-s0-text">{cognitiveState.focus_score}</p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-s0-text-muted">LOAD</span>
                    <p className="font-mono text-xs text-s0-text">{Math.round(cognitiveState.cognitive_load * 100)}%</p>
                  </div>
                </div>
              )}
            </div>
            <button onClick={logout} className="mt-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-s0-text-muted hover:bg-s0-surface2 hover:text-s0-text-dim">
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
