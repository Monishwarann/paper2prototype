'use client';

import React, { useState } from 'react';
import { X, Plus, Cpu, Zap, Sparkles } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (project: { name: string; description: string; domain: string; provider: string }) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [domain, setDomain] = useState('Healthcare / Computer Vision');
  const [provider, setProvider] = useState('groq');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCreate({ name, description, domain, provider });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-dark-900 border border-indigo-500/30 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-indigo-600 rounded-xl text-white">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Create New Research Project</h3>
            <p className="text-xs text-gray-400">Initialize a new paper-to-prototype workspace</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Project Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Medical Scan Classifier"
              className="w-full bg-dark-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Description (Optional)</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of research target..."
              className="w-full bg-dark-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Research Domain</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-dark-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="Healthcare / Computer Vision">Healthcare / Computer Vision</option>
              <option value="Natural Language Processing (NLP)">Natural Language Processing (NLP)</option>
              <option value="Reinforcement Learning">Reinforcement Learning</option>
              <option value="Distributed Systems">Distributed Systems</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Primary AI Provider</label>
            <div className="grid grid-cols-3 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setProvider('groq')}
                className={`p-2.5 rounded-lg border text-left text-xs transition ${
                  provider === 'groq'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-dark-800 border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className="font-bold flex items-center space-x-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Groq</span>
                </div>
                <div className="text-[10px] text-gray-500">Llama 3.3 70B</div>
              </button>

              <button
                type="button"
                onClick={() => setProvider('gemini')}
                className={`p-2.5 rounded-lg border text-left text-xs transition ${
                  provider === 'gemini'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-dark-800 border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className="font-bold flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Gemini</span>
                </div>
                <div className="text-[10px] text-gray-500">Gemini 2.5 Flash</div>
              </button>

              <button
                type="button"
                onClick={() => setProvider('huggingface')}
                className={`p-2.5 rounded-lg border text-left text-xs transition ${
                  provider === 'huggingface'
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300'
                    : 'bg-dark-800 border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                <div className="font-bold flex items-center space-x-1">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                  <span>HuggingFace</span>
                </div>
                <div className="text-[10px] text-gray-500">Feature Embed</div>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-lg text-xs transition shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create & Launch Workspace</span>
          </button>
        </form>
      </div>
    </div>
  );
};
