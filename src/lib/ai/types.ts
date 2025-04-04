export type ReviewType = 
  | 'RISKS'
  | 'IMPROVEMENTS'
  | 'COMPLETENESS'
  | 'SIMPLIFICATION'
  | 'AMBIGUITIES';

export interface AIProvider {
  name: 'openai' | 'claude' | 'perplexity';
  priority: number;
}

export interface ReviewRequest {
  clause: string;
  type: ReviewType;
  provider?: 'openai' | 'claude' | 'perplexity';
}

export interface ReviewResponse {
  analysis: string;
  provider: string;
}

export interface AIError extends Error {
  code: 'RATE_LIMIT' | 'VALIDATION_ERROR' | 'API_ERROR' | 'NETWORK_ERROR';
  retryAfter?: number;
}

export interface RateLimitConfig {
  tokensPerInterval: number;
  interval: number; // in milliseconds
}

export interface RetryConfig {
  maxRetries: number;
  initialDelay: number; // in milliseconds
  maxDelay: number; // in milliseconds
} 