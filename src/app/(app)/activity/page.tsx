"use client";

import { motion } from "framer-motion";
import { activityFeed } from "@/lib/mock-data";

const categoryColors: Record<string, string> = {
  friction: "bg-red-100 text-red-700",
  adaptation: "bg-indigo-100 text-indigo-700",
  protection: "bg-amber-100 text-amber-700",
  diversity: "bg-violet-100 text-violet-700",
  state: "bg-emerald-100 text-emerald-700",
  filtering: "bg-sky-100 text-sky-700",
};

export default function ActivityFeed() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Activity Feed</h1>
        <p className="text-sm text-slate-500">Timeline of System 0 interventions</p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 h-full w-px bg-slate-200" />

        <div className="space-y-4">
          {activityFeed.map((item, i) => (
            <motion.div
              key={item.id}
              className="relative flex items-start gap-4 pl-14"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Node */}
              <div className="absolute left-4 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-indigo-100 shadow-sm">
                <span className="text-[10px]">{item.icon}</span>
              </div>

              <div className="flex-1 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-400">{item.time}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColors[item.category] || "bg-slate-100 text-slate-600"}`}>
                    {item.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-900">
                  <span className="font-medium">{item.action}</span>{" "}
                  <span className="text-slate-500">{item.detail}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
