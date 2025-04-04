'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ReviewResultProps {
  analysis: string;
  provider: string;
  onSave: () => void;
}

export default function ReviewResult({ analysis, provider, onSave }: ReviewResultProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Analysis Result</h2>
          <span className="text-sm text-white/60">Powered by {provider}</span>
        </div>
        <div className="prose prose-invert max-w-none">
          {analysis.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-white/90">{paragraph}</p>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors ${
              isSaving ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {isSaving ? 'Saving...' : 'Save to History'}
          </button>
        </div>
      </div>
    </div>
  );
} 