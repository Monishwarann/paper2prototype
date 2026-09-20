'use client';

import React from 'react';
import { Cpu, Database, FileText, Zap, Sparkles, BookOpen, Layers } from 'lucide-react';

interface LiveResearchPanelProps {
  paperTitle?: string;
  provider?: string;
  activeAgent?: string;
  retrievedChunksCount?: number;
}

export const LiveResearchPanel: React.FC<LiveResearchPanelProps> = ({
  paperTitle = "Deep Learning Medical Classifier",
  provider = "groq",
  activeAgent = "System Architect Agent",
  retrievedChunksCount = 43
}) => {
  return (
    <div className="bg-dark-800/80 border border-gray-800 rounded-xl p-4 space-y-4 text-xs">
      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">Live Research Intelligence</span>
        </div>
        <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] px-2 py-0.5 rounded font-mono">
          {provider.toUpperCase()}
        </span>
      </div>

      {/* Active AI Agent */}
      <div className="bg-dark-900/60 p-3 rounded-lg border border-gray-800 space-y-1">
        <div className="flex items-center space-x-1.5 text-purple-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active Agent</span>
        </div>
        <div className="text-gray-200 font-mono text-xs">{activeAgent}</div>
        <p className="text-[10px] text-gray-500">Synthesizing 28 implementation artifacts</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-dark-900/40 p-2.5 rounded border border-gray-800 space-y-0.5">
          <div className="flex items-center space-x-1 text-gray-400">
            <Database className="w-3 h-3 text-indigo-400" />
            <span className="text-[10px]">RAG Sources</span>
          </div>
          <div className="font-extrabold text-indigo-300 text-sm">{retrievedChunksCount} chunks</div>
        </div>

        <div className="bg-dark-900/40 p-2.5 rounded border border-gray-800 space-y-0.5">
          <div className="flex items-center space-x-1 text-gray-400">
            <BookOpen className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px]">Citations</span>
          </div>
          <div className="font-extrabold text-emerald-300 text-sm">Semantic Scholar</div>
        </div>
      </div>

      {/* Source Citation Stream */}
      <div className="space-y-2">
        <span className="text-[10px] font-semibold uppercase text-gray-400 tracking-wider">Top Source References</span>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          <div className="p-2 bg-dark-900/80 rounded border border-gray-800 text-[11px] space-y-0.5">
            <div className="font-semibold text-indigo-300">Page 3 · Methodology</div>
            <p className="text-gray-400 italic">"Convolutional feature extraction paired with CBAM spatial attention modules."</p>
          </div>
          <div className="p-2 bg-dark-900/80 rounded border border-gray-800 text-[11px] space-y-0.5">
            <div className="font-semibold text-indigo-300">Page 5 · Experiments</div>
            <p className="text-gray-400 italic">"Focal loss handles class imbalance across positive scans."</p>
          </div>
        </div>
      </div>
    </div>
  );
};
