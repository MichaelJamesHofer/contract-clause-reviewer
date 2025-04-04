import { BaseAIService } from './base-service';
import { ReviewRequest, AIProvider } from './types';
import { generatePrompt, getSystemPrompt, addExamplesToPrompt } from '../prompts';

interface PerplexityRequestBody {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  max_tokens?: number;
}

interface PerplexityChoice {
  index: number;
  message: {
    role: string;
    content: string;
  };
  finish_reason: string;
}

interface PerplexityResponse {
  id: string;
  choices: PerplexityChoice[];
  created: number;
  model: string;
  object: string;
}

export class PerplexityService extends BaseAIService {
  private apiKey: string;
  private apiUrl: string = 'https://api.perplexity.ai/chat/completions';
  private defaultModel: string = 'sonar-medium-online';

  constructor(apiKey: string) {
    super({
      name: 'perplexity',
      priority: 3,
    });
    this.apiKey = apiKey;
  }

  protected generatePrompt(request: ReviewRequest): string {
    try {
      // Generate the base prompt
      const basePrompt = generatePrompt(request, 'perplexity');
      
      // Add few-shot examples for improved results
      return addExamplesToPrompt(basePrompt, request.type, 'perplexity');
    } catch (error) {
      throw this.createError(
        error instanceof Error ? error.message : 'Error generating prompt',
        'VALIDATION_ERROR'
      );
    }
  }

  protected async callAPI(prompt: string): Promise<string> {
    try {
      const requestBody: PerplexityRequestBody = {
        model: this.defaultModel,
        messages: [
          {
            role: 'system',
            content: getSystemPrompt('perplexity')
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        if (response.status === 429) {
          const retryAfter = response.headers.get('retry-after');
          throw this.createError(
            'Rate limit exceeded',
            'RATE_LIMIT',
            retryAfter ? parseInt(retryAfter) * 1000 : undefined
          );
        }
        
        const errorData = await response.text();
        throw this.createError(
          `API error (${response.status}): ${errorData}`,
          'API_ERROR'
        );
      }

      const data: PerplexityResponse = await response.json();
      const analysis = data.choices[0]?.message?.content;
      
      if (!analysis) {
        throw this.createError('No analysis generated', 'API_ERROR');
      }

      return analysis;
    } catch (error: any) {
      if (error.code) {
        throw error; // Already formatted as AIError
      }
      throw this.createError(
        error.message || 'Perplexity API error',
        'API_ERROR'
      );
    }
  }
} 