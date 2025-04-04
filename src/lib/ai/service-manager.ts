import { OpenAIService } from './openai-service';
import { ClaudeService } from './claude-service';
import { PerplexityService } from './perplexity-service';
import { ReviewRequest, ReviewResponse, AIError } from './types';

export class AIServiceManager {
  private services: Map<string, OpenAIService | ClaudeService | PerplexityService>;

  constructor() {
    this.services = new Map();
    
    // Initialize services if API keys are available
    if (process.env.OPENAI_API_KEY) {
      this.services.set('openai', new OpenAIService(process.env.OPENAI_API_KEY));
    }
    if (process.env.ANTHROPIC_API_KEY) {
      this.services.set('claude', new ClaudeService(process.env.ANTHROPIC_API_KEY));
    }
    if (process.env.PERPLEXITY_API_KEY) {
      this.services.set('perplexity', new PerplexityService(process.env.PERPLEXITY_API_KEY));
    }

    if (this.services.size === 0) {
      throw new Error('No AI services configured. Please provide at least one API key.');
    }
  }

  async review(request: ReviewRequest): Promise<ReviewResponse> {
    // If a specific provider is requested and available, use it
    if (request.provider && this.services.has(request.provider)) {
      return this.services.get(request.provider)!.review(request);
    }

    // Try services in priority order
    const errors: AIError[] = [];
    for (const service of this.services.values()) {
      try {
        return await service.review(request);
      } catch (error) {
        const aiError = error as AIError;
        errors.push(aiError);
        
        // If it's not a rate limit error, try the next service
        if (aiError.code !== 'RATE_LIMIT') {
          continue;
        }
        
        // If all services have rate limit errors, throw the last one
        if (errors.every(e => e.code === 'RATE_LIMIT') && 
            errors.length === this.services.size) {
          throw aiError;
        }
      }
    }

    // If we get here, all services failed
    throw new Error('All AI services failed. Please try again later.');
  }
} 