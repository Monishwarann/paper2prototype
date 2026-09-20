'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Cpu, FileText, LayoutDashboard, Layers, Database,
  Code, ShieldCheck, GitBranch, Download, CheckCircle,
  AlertTriangle, RefreshCw, Activity, ListChecks, Copy, Play, Check
} from 'lucide-react';

import { ReactFlowCanvas } from '@/components/ReactFlowCanvas';
import { MonacoCodeViewer } from '@/components/MonacoCodeViewer';
import { EvidenceBadge } from '@/components/EvidenceBadge';
import { LiveResearchPanel } from '@/components/LiveResearchPanel';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function ProjectWorkspacePage() {
  const params = useParams();
  const projectId = (params?.id as string) || 'demo-medical-classifier';

  const [activeTab, setActiveTab] = useState<'overview' | 'requirements' | 'architecture' | 'database' | 'api' | 'ml' | 'roadmap' | 'code'>('overview');
  const [artifact, setArtifact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  useEffect(() => {
    async function fetchArtifacts() {
      try {
        const res = await fetch(`${API_BASE}/projects/${projectId}/artifacts`);
        if (res.ok) {
          const data = await res.json();
          setArtifact(data);
        }
      } catch (err) {
        console.error('Failed to fetch project artifacts:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchArtifacts();
  }, [projectId]);

  const handleExport = (format: string) => {
    window.open(`${API_BASE}/projects/${projectId}/export?format=${format}`, '_blank');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(label);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center space-x-3 text-indigo-400">
        <RefreshCw className="w-6 h-6 animate-spin" />
        <span className="font-mono text-sm">Loading Research Blueprint Workspace...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-gray-800 bg-dark-800/80 backdrop-blur px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition">
            <Cpu className="w-6 h-6" />
            <span className="font-bold text-sm tracking-tight text-white">Paper2Prototype</span>
          </Link>
          <span className="text-gray-600">/</span>
          <span className="text-sm font-semibold text-gray-200 truncate max-w-xs md:max-w-md">
            {artifact?.paper_title || 'Deep Learning Medical Image Classifier'}
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Readiness: {artifact?.proto_readiness_score || 94}%</span>
          </div>

          <button
            onClick={() => handleExport('markdown')}
            className="flex items-center space-x-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition shadow-md shadow-indigo-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Blueprint</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Nav */}
        <aside className="w-60 bg-dark-800/60 border-r border-gray-800 p-4 space-y-1 text-xs">
          <div className="px-3 py-2 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
            IDE Workspace Tabs
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === 'overview' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('requirements')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === 'requirements' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Requirements</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === 'architecture' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Architecture Canvas</span>
          </button>

          <button
            onClick={() => setActiveTab('database')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === 'database' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Database ERD</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === 'api' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>REST API Specs</span>
          </button>

          <button
            onClick={() => setActiveTab('ml')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === 'ml' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>ML Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === 'roadmap' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>Engineering Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg font-medium transition ${
              activeTab === 'code' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Starter Code Blueprint</span>
          </button>
        </aside>

        {/* Center Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-4 rounded-xl space-y-1 border border-indigo-500/20">
                  <span className="text-xs text-gray-400 font-mono">PROTOTYPE READINESS</span>
                  <div className="text-2xl font-extrabold text-indigo-400">{artifact?.proto_readiness_score || 94}%</div>
                  <span className="text-[10px] text-emerald-400">Implementation Ready</span>
                </div>

                <div className="glass-card p-4 rounded-xl space-y-1 border border-purple-500/20">
                  <span className="text-xs text-gray-400 font-mono">EVIDENCE ATTRIBUTION</span>
                  <div className="text-2xl font-extrabold text-purple-400">{artifact?.evidence_coverage_percent || 92}%</div>
                  <span className="text-[10px] text-purple-300">Verified against Paper PDF</span>
                </div>

                <div className="glass-card p-4 rounded-xl space-y-1 border border-emerald-500/20">
                  <span className="text-xs text-gray-400 font-mono">SYSTEM COMPONENTS</span>
                  <div className="text-2xl font-extrabold text-emerald-400">{artifact?.component_architecture?.length || 5}</div>
                  <span className="text-[10px] text-gray-400">Microservices & Storage</span>
                </div>

                <div className="glass-card p-4 rounded-xl space-y-1 border border-amber-500/20">
                  <span className="text-xs text-gray-400 font-mono">ENGINEERING TASKS</span>
                  <div className="text-2xl font-extrabold text-amber-400">{artifact?.implementation_tasks?.length || 8}</div>
                  <span className="text-[10px] text-gray-400">Across 6 Development Phases</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-panel p-6 rounded-xl space-y-3">
                  <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" />
                    <span>Research Problem</span>
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{artifact?.research_problem}</p>
                </div>

                <div className="glass-panel p-6 rounded-xl space-y-3">
                  <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                    <ListChecks className="w-5 h-5 text-indigo-400" />
                    <span>Research Gap</span>
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{artifact?.research_gap}</p>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl space-y-4">
                <h3 className="font-bold text-lg text-white">Recommended Technology Stack</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {artifact?.technology_recommendations?.map((tech: any, idx: number) => (
                    <div key={idx} className="bg-dark-800 p-4 rounded-lg border border-gray-800 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-indigo-400 text-sm">{tech.technology}</span>
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded">
                          {tech.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-300">{tech.reason}</p>
                      <EvidenceBadge type={tech.evidence_type} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: REQUIREMENTS */}
          {activeTab === 'requirements' && (
            <div className="glass-panel p-6 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Software Requirements Specification</h2>
              <div className="space-y-4">
                {artifact?.system_requirements?.map((req: any, idx: number) => (
                  <div key={idx} className="bg-dark-800 p-4 rounded-lg border border-gray-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold text-indigo-400">{req.id}: {req.title}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-gray-700 text-gray-300 rounded">{req.priority}</span>
                    </div>
                    <p className="text-xs text-gray-300">{req.description}</p>
                    {req.evidence && (
                      <EvidenceBadge
                        type={req.evidence.evidence_type}
                        quote={req.evidence.exact_quote}
                        page={req.evidence.page_number}
                        section={req.evidence.section_name}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="glass-panel p-6 rounded-xl space-y-4">
              <h2 className="text-xl font-bold text-white">Interactive System Architecture Canvas</h2>
              <p className="text-xs text-gray-400">React Flow interactive node topology. Drag, connect, and inspect components.</p>
              <ReactFlowCanvas components={artifact?.component_architecture} />
            </div>
          )}

          {/* TAB: DATABASE */}
          {activeTab === 'database' && (
            <div className="glass-panel p-6 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-white">PostgreSQL ERD Database Schema</h2>
              <div className="space-y-4">
                {artifact?.database_schema?.map((entity: any, idx: number) => (
                  <div key={idx} className="bg-dark-800 p-4 rounded-lg border border-gray-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <Database className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono text-sm font-bold text-white">{entity.table_name}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(`CREATE TABLE ${entity.table_name} (...);`, entity.table_name)}
                        className="flex items-center space-x-1 text-[10px] text-gray-400 hover:text-white bg-dark-900 px-2 py-1 rounded border border-gray-700"
                      >
                        {copiedPath === entity.table_name ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPath === entity.table_name ? 'Copied' : 'Copy SQL'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">{entity.description}</p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left text-gray-300">
                        <thead className="bg-dark-900 text-gray-400 uppercase text-[10px]">
                          <tr>
                            <th className="px-3 py-1.5">Column</th>
                            <th className="px-3 py-1.5">Type</th>
                            <th className="px-3 py-1.5">Constraints</th>
                            <th className="px-3 py-1.5">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entity.columns?.map((col: any, cidx: number) => (
                            <tr key={cidx} className="border-b border-gray-800/50">
                              <td className="px-3 py-1.5 font-mono text-indigo-300">{col.name}</td>
                              <td className="px-3 py-1.5 font-mono text-emerald-400">{col.type}</td>
                              <td className="px-3 py-1.5 text-gray-400">{col.constraints}</td>
                              <td className="px-3 py-1.5 text-gray-400">{col.description}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: API */}
          {activeTab === 'api' && (
            <div className="glass-panel p-6 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-white">REST OpenAPI Endpoint Specifications</h2>
              <div className="space-y-4">
                {artifact?.api_specifications?.map((api: any, idx: number) => (
                  <div key={idx} className="bg-dark-800 p-4 rounded-lg border border-gray-800 space-y-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        api.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      }`}>
                        {api.method}
                      </span>
                      <span className="font-mono text-sm font-bold text-white">{api.path}</span>
                    </div>
                    <p className="text-xs text-gray-300">{api.summary}</p>
                    <div className="bg-dark-900 p-3 rounded text-[11px] font-mono text-gray-300 overflow-x-auto">
                      <code>curl -X {api.method} "http://localhost:8000{api.path}" -H "Authorization: Bearer Token"</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ML PIPELINE */}
          {activeTab === 'ml' && (
            <div className="glass-panel p-6 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-white">Machine Learning Pipeline Specification</h2>
              <div className="space-y-4">
                {artifact?.ml_pipeline?.map((step: any, idx: number) => (
                  <div key={idx} className="bg-dark-800 p-4 rounded-lg border border-gray-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-indigo-400 text-sm">Step {step.step_number}: {step.name}</span>
                      <span className="text-[10px] text-gray-400">Tools: {step.tools?.join(', ')}</span>
                    </div>
                    <p className="text-xs text-gray-300">{step.description}</p>
                    <EvidenceBadge type={step.evidence_type} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: ROADMAP */}
          {activeTab === 'roadmap' && (
            <div className="glass-panel p-6 rounded-xl space-y-6">
              <h2 className="text-xl font-bold text-white">8-Phase Engineering Roadmap</h2>
              <div className="space-y-4">
                {artifact?.development_roadmap?.map((rm: any, idx: number) => (
                  <div key={idx} className="bg-dark-800 p-4 rounded-lg border border-gray-800 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-indigo-400 text-sm">{rm.phase}</span>
                      <span className="text-xs text-gray-400 font-mono">{rm.timeline}</span>
                    </div>
                    <p className="text-xs text-gray-300">{rm.goal}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CODE */}
          {activeTab === 'code' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Starter Code Blueprint</h2>
              <MonacoCodeViewer files={artifact?.starter_code_blueprint || []} />
            </div>
          )}
        </main>

        {/* Right Live Research Intelligence Drawer */}
        <aside className="w-72 hidden lg:block p-4 border-l border-gray-800 bg-dark-900">
          <LiveResearchPanel
            paperTitle={artifact?.paper_title}
            provider={artifact?.provider || 'groq'}
          />
        </aside>
      </div>
    </div>
  );
}
