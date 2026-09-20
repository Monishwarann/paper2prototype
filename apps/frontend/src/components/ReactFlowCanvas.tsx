'use client';

import React, { useMemo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';

interface ReactFlowCanvasProps {
  components?: Array<{
    id: string;
    name: string;
    category: string;
    description: string;
    technologies: string[];
  }>;
}

export const ReactFlowCanvas: React.FC<ReactFlowCanvasProps> = ({ components }) => {
  const initialNodes: Node[] = useMemo(() => {
    if (!components || components.length === 0) {
      return [
        {
          id: '1',
          position: { x: 100, y: 150 },
          data: { label: 'Next.js Frontend Dashboard\n(Next.js 14, Tailwind, React Flow)' },
          style: { background: '#1e1b4b', color: '#818cf8', border: '1px solid #6366f1', borderRadius: '8px', padding: '12px', fontSize: '12px', width: 220 }
        },
        {
          id: '2',
          position: { x: 380, y: 150 },
          data: { label: 'FastAPI API Gateway\n(Python, Pydantic, Auth)' },
          style: { background: '#064e3b', color: '#34d399', border: '1px solid #10b981', borderRadius: '8px', padding: '12px', fontSize: '12px', width: 220 }
        },
        {
          id: '3',
          position: { x: 660, y: 80 },
          data: { label: 'PyTorch Inference Worker\n(CUDA, ONNX Runtime)' },
          style: { background: '#4c1d95', color: '#c084fc', border: '1px solid #a855f7', borderRadius: '8px', padding: '12px', fontSize: '12px', width: 220 }
        },
        {
          id: '4',
          position: { x: 660, y: 220 },
          data: { label: 'Qdrant Vector DB\n(RAG Retrieval, Embeddings)' },
          style: { background: '#701a75', color: '#f0abfc', border: '1px solid #e879f9', borderRadius: '8px', padding: '12px', fontSize: '12px', width: 220 }
        }
      ];
    }

    return components.map((comp, idx) => ({
      id: comp.id,
      position: { x: (idx % 3) * 280 + 80, y: Math.floor(idx / 3) * 160 + 80 },
      data: { label: `${comp.name}\n[${comp.category}]\n${comp.technologies.join(', ')}` },
      style: {
        background: comp.category === 'Frontend' ? '#1e1b4b' : comp.category === 'Backend' ? '#064e3b' : '#312e81',
        color: '#f3f4f6',
        border: '1px solid rgba(255,255,255,0.2)',
        borderRadius: '8px',
        padding: '12px',
        fontSize: '12px',
        width: 230
      }
    }));
  }, [components]);

  const initialEdges: Edge[] = useMemo(() => [
    { id: 'e1-2', source: '1', target: '2', animated: true, label: 'REST / WS', style: { stroke: '#6366f1' } },
    { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Inference Request', style: { stroke: '#10b981' } },
    { id: 'e2-4', source: '2', target: '4', animated: true, label: 'Vector Search', style: { stroke: '#a855f7' } },
  ], []);

  return (
    <div className="w-full h-[450px] bg-dark-900 rounded-xl border border-gray-800 overflow-hidden relative">
      <div className="absolute top-3 left-4 z-10 bg-gray-900/80 backdrop-blur px-3 py-1 rounded text-xs text-gray-400 border border-gray-700">
        Interactive Architecture Diagram (React Flow)
      </div>
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <Background color="#374151" gap={16} />
        <Controls />
        <MiniMap nodeColor={() => '#6366f1'} maskColor="rgba(0, 0, 0, 0.6)" />
      </ReactFlow>
    </div>
  );
};
