'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Cpu, Plus, LayoutDashboard, Folder, FileText, ShieldCheck,
  Layers, Database, Code, GitBranch, Settings, Activity, ArrowRight, CheckCircle
} from 'lucide-react';
import { NewProjectModal } from '@/components/NewProjectModal';

export default function DashboardPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [projects, setProjects] = useState([
    {
      id: 'demo-medical-classifier',
      name: 'Deep Learning Medical Image Classifier',
      description: 'Automated medical image classification using ResNet50 and spatial attention.',
      domain: 'Healthcare / Computer Vision',
      status: 'COMPLETED',
      readiness: 94,
      updatedAt: '2 hours ago'
    },
    {
      id: 'proj_transformer_nlp',
      name: 'Attention-Guided Transformer Summarizer',
      description: 'Long-document summarization leveraging sparse multi-head attention mechanisms.',
      domain: 'Natural Language Processing',
      status: 'COMPLETED',
      readiness: 88,
      updatedAt: '1 day ago'
    }
  ]);

  const handleCreateProject = (newProj: { name: string; description: string; domain: string; provider: string }) => {
    const id = `proj_${Date.now()}`;
    const p = {
      id,
      name: newProj.name,
      description: newProj.description || 'Research paper implementation workspace.',
      domain: newProj.domain,
      status: 'COMPLETED',
      readiness: 92,
      updatedAt: 'Just now'
    };
    setProjects([p, ...projects]);
    router.push(`/projects/${id}`);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-dark-800/80 border-r border-gray-800 p-4 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-lg text-white">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-base text-white tracking-tight">Paper2Prototype</h1>
            <p className="text-[10px] text-indigo-400 font-mono">DEVELOPER DASHBOARD</p>
          </div>
        </div>

        <nav className="space-y-1 text-xs">
          <button className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg bg-indigo-600/20 text-indigo-400 font-medium border border-indigo-500/30">
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Dashboard</span>
          </button>

          <Link href="/projects/demo-medical-classifier" className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition">
            <Folder className="w-4 h-4" />
            <span>All Projects</span>
          </Link>

          <Link href="/projects/demo-medical-classifier" className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition">
            <ShieldCheck className="w-4 h-4" />
            <span>Requirements</span>
          </Link>

          <Link href="/projects/demo-medical-classifier" className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition">
            <Layers className="w-4 h-4" />
            <span>Architectures</span>
          </Link>

          <Link href="/projects/demo-medical-classifier" className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition">
            <Database className="w-4 h-4" />
            <span>Databases</span>
          </Link>

          <Link href="/projects/demo-medical-classifier" className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition">
            <Code className="w-4 h-4" />
            <span>Code Blueprints</span>
          </Link>

          <Link href="/projects/demo-medical-classifier" className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-gray-200 transition">
            <GitBranch className="w-4 h-4" />
            <span>Roadmaps</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Good afternoon 👋</h2>
            <p className="text-xs text-gray-400 mt-1">Transform your next research paper into an implementation-ready prototype.</p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl text-xs transition shadow-lg shadow-indigo-500/25"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        {/* KPI Stats Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="glass-card p-5 rounded-xl border border-indigo-500/20 space-y-1">
            <span className="text-xs text-gray-400 font-mono">ACTIVE PROJECTS</span>
            <div className="text-3xl font-extrabold text-white">{projects.length}</div>
            <span className="text-[10px] text-indigo-400">12 AI Agents Active</span>
          </div>

          <div className="glass-card p-5 rounded-xl border border-purple-500/20 space-y-1">
            <span className="text-xs text-gray-400 font-mono">PAPERS ANALYZED</span>
            <div className="text-3xl font-extrabold text-purple-400">14</div>
            <span className="text-[10px] text-purple-300">PyMuPDF Text Extract</span>
          </div>

          <div className="glass-card p-5 rounded-xl border border-emerald-500/20 space-y-1">
            <span className="text-xs text-gray-400 font-mono">ARTIFACTS GENERATED</span>
            <div className="text-3xl font-extrabold text-emerald-400">392</div>
            <span className="text-[10px] text-emerald-300">28 Artifacts per Paper</span>
          </div>

          <div className="glass-card p-5 rounded-xl border border-amber-500/20 space-y-1">
            <span className="text-xs text-gray-400 font-mono">AVG PROTOTYPE READINESS</span>
            <div className="text-3xl font-extrabold text-amber-400">91%</div>
            <span className="text-[10px] text-amber-300">Verified Evidence</span>
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Recent Research Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((p) => (
              <div key={p.id} className="glass-panel p-6 rounded-xl border border-gray-800 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                      {p.domain}
                    </span>
                    <span className="text-xs text-emerald-400 flex items-center space-x-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{p.readiness}% Readiness</span>
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-white">{p.name}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2">{p.description}</p>
                </div>

                <div className="pt-4 border-t border-gray-800 flex justify-between items-center">
                  <span className="text-[10px] text-gray-500">Updated {p.updatedAt}</span>
                  <Link
                    href={`/projects/${p.id}`}
                    className="flex items-center space-x-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                  >
                    <span>Open Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  );
}
