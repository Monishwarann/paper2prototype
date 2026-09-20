import React from 'react';

type EvidenceType = 'PAPER_EVIDENCE' | 'AI_INFERENCE' | 'ENGINEERING_RECOMMENDATION' | 'NOT_SPECIFIED';

interface EvidenceBadgeProps {
  type: EvidenceType;
  quote?: string;
  page?: number;
  section?: string;
}

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({ type, quote, page, section }) => {
  const getBadgeStyle = () => {
    switch (type) {
      case 'PAPER_EVIDENCE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 icon-check';
      case 'AI_INFERENCE':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'ENGINEERING_RECOMMENDATION':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'NOT_SPECIFIED':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'PAPER_EVIDENCE':
        return `PAPER EVIDENCE ${page ? `(p. ${page})` : ''}`;
      case 'AI_INFERENCE':
        return 'AI METHODOLOGY INFERENCE';
      case 'ENGINEERING_RECOMMENDATION':
        return 'ENGINEERING RECOMMENDATION';
      case 'NOT_SPECIFIED':
        return 'NOT SPECIFIED IN PAPER';
    }
  };

  return (
    <div className="inline-flex flex-col gap-1">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle()}`}>
        {getLabel()}
      </span>
      {quote && (
        <p className="text-xs text-gray-400 italic bg-gray-900/60 p-2 rounded border border-gray-800 mt-1">
          "{quote}" {section && <span className="text-gray-500">— {section}</span>}
        </p>
      )}
    </div>
  );
};
