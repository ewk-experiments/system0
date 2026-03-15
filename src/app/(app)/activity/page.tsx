"use client";

import { useApp } from "@/lib/context";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const typeConfig: Record<string, { emoji: string; color: string; bg: string }> = {
  contrarian: { emoji: '⚡', color: 'text-s0-red', bg: 'bg-s0-red/10' },
  novelty: { emoji: '🔭', color: 'text-s0-purple', bg: 'bg-s0-purple/10' },
  'noise-reduction': { emoji: '🔕', color: 'text-s0-amber', bg: 'bg-s0-amber/10' },
  diversity: { emoji: '🌐', color: 'text-s0-cyan', bg: 'bg-s0-cyan/10' },
  complexity: { emoji: '📈', color: 'text-s0-emerald', bg: 'bg-s0-emerald/10' },
  friction: { emoji: '🧠', color: 'text-s0-indigo', bg: 'bg-s0-indigo/10' },
};

export default function ActivityFeed() {
  const { interventions, rateIntervention } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-lg font-bold text-s0-text">Activity Feed</h1>
        <p className="font-mono text-xs text-s0-text-muted">Timeline of System 0 interventions · {interventions.length} total</p>
      </div>

      {interventions.length === 0 ? (
        <div className="rounded-xl border border-s0-border bg-s0-surface p-10 text-center">
          <p className="font-mono text-sm text-s0-text-muted">No activity yet. Start the simulation to generate interventions.</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 h-full w-px bg-s0-border" />

          <div className="space-y-3">
            {interventions.map((iv, i) => {
              const config = typeConfig[iv.type] || typeConfig.friction;
              return (
                <motion.div
                  key={iv.id}
                  className="relative flex items-start gap-4 pl-12"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.5) }}
                >
                  {/* Node */}
                  <div className={`absolute left-3 top-3 flex h-5 w-5 items-center justify-center rounded-full ${config.bg}`}>
                    <span className="text-[10px]">{config.emoji}</span>
                  </div>

                  <div className="flex-1 rounded-xl border border-s0-border bg-s0-surface p-4 hover:bg-s0-surface2 transition-colors">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[10px] text-s0-text-muted">
                        {new Date(iv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-medium ${config.bg} ${config.color}`}>
                        {iv.type}
                      </span>
                      <span className="rounded-full bg-s0-surface2 px-2 py-0.5 font-mono text-[10px] text-s0-text-muted">
                        impact: {Math.round(iv.impact_score * 100)}%
                      </span>
                    </div>
                    <p className="mt-2 text-[12px] text-s0-text">{iv.content}</p>
                    <p className="mt-1 font-mono text-[10px] text-s0-text-muted">{iv.reason}</p>
                    
                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="font-mono text-[10px] text-s0-text-muted mr-1">Helpful?</span>
                      <button
                        onClick={() => rateIntervention(iv.id, 1)}
                        className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
                          iv.user_rating === 1 ? 'bg-s0-emerald/20 text-s0-emerald' : 'bg-s0-surface2 text-s0-text-muted hover:text-s0-emerald'
                        }`}
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => rateIntervention(iv.id, -1)}
                        className={`flex h-6 w-6 items-center justify-center rounded-md transition-colors ${
                          iv.user_rating === -1 ? 'bg-s0-red/20 text-s0-red' : 'bg-s0-surface2 text-s0-text-muted hover:text-s0-red'
                        }`}
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
