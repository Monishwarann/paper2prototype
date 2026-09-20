'use client';

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

interface StarterFile {
  filepath: string;
  description: string;
  language: string;
  content: string;
}

interface MonacoCodeViewerProps {
  files: StarterFile[];
}

export const MonacoCodeViewer: React.FC<MonacoCodeViewerProps> = ({ files }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (!files || files.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 bg-dark-900 rounded-xl border border-gray-800">
        No starter code generated yet.
      </div>
    );
  }

  const activeFile = files[selectedIdx] || files[0];

  return (
    <div className="flex flex-col md:flex-row bg-dark-900 border border-gray-800 rounded-xl overflow-hidden h-[500px]">
      {/* Sidebar file tree */}
      <div className="w-full md:w-64 bg-dark-800 border-r border-gray-800 p-3 space-y-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 px-2 mb-2">
          Generated Blueprints
        </h4>
        {files.map((file, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all ${
              selectedIdx === idx
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-gray-400 hover:bg-gray-700/40 hover:text-gray-200'
            }`}
          >
            <div className="truncate font-medium">{file.filepath}</div>
            <div className="text-[10px] text-gray-500 truncate">{file.description}</div>
          </button>
        ))}
      </div>

      {/* Editor area */}
      <div className="flex-1 flex flex-col">
        <div className="bg-dark-800/80 px-4 py-2 border-b border-gray-800 flex justify-between items-center text-xs">
          <span className="font-mono text-indigo-400">{activeFile.filepath}</span>
          <span className="text-gray-500 uppercase">{activeFile.language}</span>
        </div>
        <div className="flex-1">
          <Editor
            height="100%"
            language={activeFile.language || 'python'}
            theme="vs-dark"
            value={activeFile.content}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 13,
              scrollBeyondLastLine: false,
              lineNumbers: 'on',
            }}
          />
        </div>
      </div>
    </div>
  );
};
