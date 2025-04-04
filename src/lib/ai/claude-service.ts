import Anthropic from '@anthropic-ai/sdk';
import { BaseAIService } from './base-service';
import { ReviewRequest, AIProvider } from './types';
import { generatePrompt, getSystemPrompt, addExamplesToPrompt } from '../prompts';

export class ClaudeService extends BaseAIService {
  private client: Anthropic;

  constructor(apiKey: string) {
    super({
      name: 'claude',
      priority: 2,
    });
    this.client = new Anthropic({
      apiKey
    });
  }

  protected generatePrompt(request: ReviewRequest): string {
    try {
      // Generate the base prompt
      const basePrompt = generatePrompt(request, 'claude');
      
      // Add few-shot examples for improved results
      return addExamplesToPrompt(basePrompt, request.type, 'claude');
    } catch (error) {
      throw this.createError(
        error instanceof Error ? error.message : 'Error generating prompt',
        'VALIDATION_ERROR'
      );
    }
  }

  protected async callAPI(prompt: string): Promise<string> {
    try {
      // Get the system prompt
      const systemPrompt = getSystemPrompt('claude');
      
      const response = await this.client.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 1500,
        temperature: 0.5,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      if (!response.content?.[0] || typeof response.content[0] !== 'object' || !('value' in response.content[0])) {
        throw this.createError('Invalid response format', 'API_ERROR');
      }

      return response.content[0].value;
    } catch (error: any) {
      if (error?.status === 429) {
        throw this.createError(
          'Rate limit exceeded',
          'RATE_LIMIT',
          error.headers?.['retry-after'] ? parseInt(error.headers['retry-after']) * 1000 : undefined
        );
      }
      throw this.createError(error.message || 'Claude API error', 'API_ERROR');
    }
  }
} 