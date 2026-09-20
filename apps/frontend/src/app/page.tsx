'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, Cpu, ArrowRight, Zap, ShieldCheck, Database, Code, Play } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function LandingPage() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);

  const handleDemoLaunch = () => {
    router.push('/projects/demo-medical-classifier');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploading(true);

    try {
      // 1. Create project
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: file.name.replace('.pdf', '') })
      });
      const pData = await res.json();

      // 2. Upload paper
      const formData = new FormData();
      formData.append('file', file);
      await fetch(`${API_BASE}/projects/${pData.id}/papers`, {
        method: 'POST',
        body: formData
      });

      router.push(`/projects/${pData.id}`);
    } catch (err) {
      console.error(err);
      // Fallback to demo
      router.push('/projects/demo-medical-classifier');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-gray-800/80 bg-dark-900/60 backdrop-blur sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-tight">Paper2Prototype</h1>
            <p className="text-xs text-indigo-400 font-mono">RESEARCH TO ENGINEERING</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleDemoLaunch}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-lg text-sm font-semibold transition"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Live Demo</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-16 text-center space-y-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono mb-4">
          <Zap className="w-3.5 h-3.5" />
          <span>Powered by 12 AI Agents & RAG Evidence Engine</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Turn Research Papers Into <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Real-World Software Prototypes
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Upload any research PDF. Paper2Prototype automatically extracts methodology, algorithms, and datasets to generate 28 implementation artifacts including React Flow architectures, PostgreSQL schemas, FastAPI REST specs, and starter code blueprints.
        </p>

        {/* PDF Upload Box */}
        <div className="max-w-xl mx-auto glass-panel p-8 rounded-2xl border border-indigo-500/30 shadow-2xl relative">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-indigo-500/10 rounded-full text-indigo-400 border border-indigo-500/20">
              <FileText className="w-10 h-10" />
            </div>
            {isUploading ? (
              <div className="space-y-2">
                <p className="text-indigo-400 font-semibold animate-pulse">Orchestrating 12 AI Agents & PDF RAG Engine...</p>
                <p className="text-xs text-gray-500">Generating 28 architectural artifacts</p>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-lg font-semibold text-white">Drop your Research Paper PDF here</p>
                  <p className="text-xs text-gray-400 mt-1">Supports arXiv, IEEE, ACM, Springer research papers</p>
                </div>
                <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg text-sm transition shadow-lg shadow-indigo-500/25 flex items-center space-x-2">
                  <span>Select PDF File</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
          <div className="glass-card p-6 rounded-xl space-y-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Strict Anti-Hallucination</h3>
            <p className="text-sm text-gray-400">
              Every requirement and formula is strictly categorized into Paper Evidence, AI Inference, or Engineering Recommendation.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-3">
            <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg w-fit">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">28 Artifact Blueprint</h3>
            <p className="text-sm text-gray-400">
              Generates system topology, PostgreSQL DDL schemas, REST OpenAPI specs, ML pipelines, and 8-phase engineering roadmaps.
            </p>
          </div>

          <div className="glass-card p-6 rounded-xl space-y-3">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-lg w-fit">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Starter Code Generation</h3>
            <p className="text-sm text-gray-400">
              View and edit production-grade Python FastAPI, PyTorch, and Docker starter files inside an interactive Monaco code viewer.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800/80 py-6 text-center text-xs text-gray-500">
        Paper2Prototype &copy; 2026 — Turn Research Papers Into Real-World Software Prototypes
      </footer>
    </div>
  );
}
