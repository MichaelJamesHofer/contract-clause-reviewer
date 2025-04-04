'use client';

import { useState } from 'react';
import { ReviewType } from '@/lib/ai/types';
import ReviewResult from '@/components/review/ReviewResult';

const reviewTypes = [
  {
    id: 'RISKS' as ReviewType,
    name: 'Review for Risks',
    description: 'Identify potential legal risks and vulnerabilities in the clause'
  },
  {
    id: 'IMPROVEMENTS' as ReviewType,
    name: 'Suggest Improvements',
    description: 'Get suggestions for improving the clarity and effectiveness of the clause'
  },
  {
    id: 'COMPLETENESS' as ReviewType,
    name: 'Check Completeness',
    description: 'Verify if the clause covers all necessary aspects'
  },
  {
    id: 'SIMPLIFICATION' as ReviewType,
    name: 'Simplify Language',
    description: 'Get suggestions for simplifying complex legal language'
  },
  {
    id: 'AMBIGUITIES' as ReviewType,
    name: 'Find Ambiguities',
    description: 'Identify potential ambiguities or unclear terms'
  }
];

const providers = [
  { id: 'openai', name: 'GPT-4 (OpenAI)' },
  { id: 'claude', name: 'Claude (Anthropic)' },
  { id: 'perplexity', name: 'Perplexity AI' }
];

export default function ReviewPage() {
  const [clause, setClause] = useState('');
  const [selectedType, setSelectedType] = useState<ReviewType>('RISKS');
  const [selectedProvider, setSelectedProvider] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ analysis: string; provider: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clause,
          type: selectedType,
          provider: selectedProvider
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to analyze clause');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!result) return;

    try {
      const response = await fetch('/api/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clause,
          type: selectedType,
          analysis: result.analysis
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save review');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save review');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Contract Clause Review</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="clause" className="block text-sm font-medium mb-2">
            Enter Contract Clause
          </label>
          <textarea
            id="clause"
            value={clause}
            onChange={(e) => setClause(e.target.value)}
            className="w-full h-32 p-3 border rounded-lg"
            placeholder="Paste your contract clause here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Select Review Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviewTypes.map((type) => (
              <div
                key={type.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedType === type.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <h3 className="font-medium">{type.name}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Select AI Provider (Optional)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedProvider === provider.id ? 'border-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedProvider(
                  selectedProvider === provider.id ? undefined : provider.id
                )}
              >
                <h3 className="font-medium">{provider.name}</h3>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !clause.trim()}
          className={`w-full py-3 px-4 rounded-lg font-medium ${
            isLoading || !clause.trim()
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isLoading ? 'Analyzing...' : 'Analyze Clause'}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <ReviewResult
          analysis={result.analysis}
          provider={result.provider}
          onSave={handleSave}
        />
      )}
    </div>
  );
} 