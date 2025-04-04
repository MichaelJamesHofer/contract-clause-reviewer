import { ReviewType } from '../ai/types';

/**
 * Different providers may need different prompt formats
 */
export type PromptProvider = 'openai' | 'claude' | 'perplexity';

/**
 * Context/examples provided for few-shot learning
 */
export interface PromptExample {
  /** The example contract clause text */
  clause: string;
  /** The expected analysis output for the example */
  analysis: string;
}

/**
 * Structure for system prompts for different models
 */
export interface SystemPrompt {
  /** Provider this system prompt is for */
  provider: PromptProvider;
  /** The system prompt content */
  content: string;
}

/**
 * Template for a specific review type
 */
export interface PromptTemplate {
  /** The review type this template is for */
  type: ReviewType;
  /** Provider-specific template text */
  template: Record<PromptProvider, string>;
  /** Few-shot learning examples for this review type */
  examples: PromptExample[];
}

/**
 * The full prompt data structure 
 */
export interface PromptConfig {
  /** System prompts for each provider */
  systemPrompts: SystemPrompt[];
  /** Templates for each review type */
  templates: PromptTemplate[];
}