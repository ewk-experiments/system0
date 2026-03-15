"use client";

import { useState } from "react";
import { useApp } from "@/lib/context";
import { generatePerspectiveShift, streamPerspectiveShift, isGeminiReady, type PerspectiveShift } from "@/lib/gemini";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Link2, HelpCircle, AlertTriangle, Loader2, Key } from "lucide-react";

export default function PerspectivePage() {
  const { user, setApiKey } = useApp();
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PerspectiveShift | null>(null);
  const [streaming, setStreaming] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(!isGeminiReady());

  const handleAnalyze = async () => {
    if (!topic.trim() || !isGeminiReady()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setStreaming({});

    try {
      // Use streaming for real-time feel
      const accumulated: Record<string, string> = {};
      for await (const chunk of streamPerspectiveShift(topic)) {
        accumulated[chunk.field] = (accumulated[chunk.field] || '') + chunk.text;
        setStreaming({ ...accumulated });
      }
      
      // Also get structured JSON result
      const structured = await generatePerspectiveShift(topic);
      setResult(structured);
      setStreaming({});
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSetKey = () => {
    if (apiKeyInput.trim()) {
      setApiKey(apiKeyInput.trim());
      setShowKeyInput(false);
    }
  };

  const sections = result ? [
    { key: 'opposing_viewpoint', icon: Zap, label: 'Opposing Viewpoint', color: '#f87171', text: result.opposing_viewpoint },
    { key: 'unexpected_connection', icon: Link2, label: 'Unexpected Connection', color: '#a78bfa', text: result.unexpected_connection },
    { key: 'unconsidered_question', icon: HelpCircle, label: 'Unconsidered Question', color: '#22d3ee', text: result.unconsidered_question },
    { key: 'cognitive_bias_warning', icon: AlertTriangle, label: 'Cognitive Bias Warning', color: '#fbbf24', text: result.cognitive_bias_warning },
  ] : Object.keys(streaming).length > 0 ? [
    { key: 'opposing_viewpoint', icon: Zap, label: 'Opposing Viewpoint', color: '#f87171', text: streaming.opposing_viewpoint || '' },
    { key: 'unexpected_connection', icon: Link2, label: 'Unexpected Connection', color: '#a78bfa', text: streaming.unexpected_connection || '' },
    { key: 'unconsidered_question', icon: HelpCircle, label: 'Unconsidered Question', color: '#22d3ee', text: streaming.unconsidered_question || '' },
    { key: 'cognitive_bias_warning', icon: AlertTriangle, label: 'Cognitive Bias Warning', color: '#fbbf24', text: streaming.cognitive_bias_warning || '' },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-lg font-bold text-s0-text">Perspective Shift</h1>
        <p className="font-mono text-xs text-s0-text-muted">Enter a topic or URL and let System 0 challenge your thinking</p>
      </div>

      {/* API Key */}
      {showKeyInput && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-s0-border bg-s0-surface p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Key className="h-4 w-4 text-s0-cyan" />
            <span className="font-mono text-xs text-s0-text">Gemini API Key Required</span>
          </div>
          <p className="font-mono text-[11px] text-s0-text-muted mb-3">
            Get a free key at <a href="https://aistudio.google.com/apikey" target="_blank" className="text-s0-cyan hover:underline">aistudio.google.com/apikey</a>
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKeyInput}
              onChange={(e) => setApiKeyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSetKey()}
              placeholder="AIza..."
              className="flex-1 rounded-lg border border-s0-border bg-s0-bg px-3 py-2 font-mono text-xs text-s0-text placeholder:text-s0-text-muted focus:border-s0-cyan focus:outline-none"
            />
            <button onClick={handleSetKey} className="rounded-lg bg-s0-cyan/10 px-4 py-2 font-mono text-xs text-s0-cyan hover:bg-s0-cyan/20 transition-colors">
              Save
            </button>
          </div>
        </motion.div>
      )}

      {/* Input */}
      <div className="rounded-xl border border-s0-border bg-s0-surface p-5">
        <div className="flex gap-3">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="Enter a topic, claim, or URL to analyze..."
            className="flex-1 rounded-lg border border-s0-border bg-s0-bg px-4 py-3 font-mono text-sm text-s0-text placeholder:text-s0-text-muted focus:border-s0-cyan focus:outline-none transition-colors"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !topic.trim() || !isGeminiReady()}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-s0-cyan to-s0-purple px-5 py-3 font-mono text-xs font-semibold text-s0-bg hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Analyze
          </button>
        </div>
        {!isGeminiReady() && !showKeyInput && (
          <button onClick={() => setShowKeyInput(true)} className="mt-2 font-mono text-[11px] text-s0-cyan hover:underline">
            + Add Gemini API key to enable analysis
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-s0-red/30 bg-s0-red/5 p-4">
          <p className="font-mono text-xs text-s0-red">{error}</p>
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {sections.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {sections.map((section, i) => (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-s0-border bg-s0-surface p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <section.icon className="h-4 w-4" style={{ color: section.color }} />
                  <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: section.color }}>{section.label}</span>
                </div>
                <p className="text-[13px] leading-relaxed text-s0-text">
                  {section.text || <span className="text-s0-text-muted animate-pulse">Analyzing...</span>}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Quick topics */}
      {!result && sections.length === 0 && (
        <div className="rounded-xl border border-s0-border bg-s0-surface p-5">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-s0-text-muted mb-3">Try These Topics</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'AI will replace most knowledge work within 5 years',
              'Remote work is more productive than office work',
              'Cryptocurrency is the future of finance',
              'Social media is destroying democracy',
              'Nuclear energy is the only solution to climate change',
              'Agile methodology is harmful to software quality',
            ].map((t) => (
              <button
                key={t}
                onClick={() => setTopic(t)}
                className="rounded-lg border border-s0-border px-3 py-1.5 font-mono text-[11px] text-s0-text-dim hover:border-s0-cyan/30 hover:text-s0-text transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
