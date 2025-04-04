import { AIProvider, ReviewRequest, ReviewResponse, AIError } from './types';
import { rateLimiter } from './rate-limiter';
import { withRetry } from './retry';

export abstract class BaseAIService {
  protected provider: AIProvider;
  
  constructor(provider: AIProvider) {
    this.provider = provider;
  }

  protected abstract generatePrompt(request: ReviewRequest): string;
  protected abstract callAPI(prompt: string): Promise<string>;

  async review(request: ReviewRequest): Promise<ReviewResponse> {
    try {
      // Wait for rate limiting token
      await rateLimiter.waitForToken(this.provider.name);

      // Generate the prompt
      const prompt = this.generatePrompt(request);

      // Call API with retry logic
      const analysis = await withRetry(() => this.callAPI(prompt));

      return {
        analysis,
        provider: this.provider.name,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const aiError = error as AIError;
      aiError.provider = this.provider.name;
      throw aiError;
    }
  }

  protected createError(message: string, code: AIError['code'], retryAfter?: number): AIError {
    const error = new Error(message) as AIError;
    error.code = code;
    error.provider = this.provider.name;
    if (retryAfter) {
      error.retryAfter = retryAfter;
    }
    return error;
  }

  protected validateRequest(request: ReviewRequest): void {
    if (!request.clause?.trim()) {
      throw this.createError('Clause is required', 'VALIDATION_ERROR');
    }
    if (!request.type) {
      throw this.createError('Review type is required', 'VALIDATION_ERROR');
    }
  }
} 