import OpenAI from 'openai';
import { BaseAIService } from './base-service';
import { ReviewRequest, AIProvider } from './types';
import { generatePrompt, getSystemPrompt, addExamplesToPrompt } from '../prompts';

export class OpenAIService extends BaseAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    super({
      name: 'openai',
      priority: 1,
    });
    this.client = new OpenAI({ apiKey });
  }

  protected generatePrompt(request: ReviewRequest): string {
    try {
      // Generate the base prompt
      const basePrompt = generatePrompt(request, 'openai');
      
      // Add few-shot examples for improved results
      return addExamplesToPrompt(basePrompt, request.type, 'openai');
    } catch (error) {
      throw this.createError(
        error instanceof Error ? error.message : 'Error generating prompt',
        'VALIDATION_ERROR'
      );
    }
  }

  protected async callAPI(prompt: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'system', content: getSystemPrompt('openai') },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const analysis = response.choices[0]?.message?.content;
      if (!analysis) {
        throw this.createError('No analysis generated', 'API_ERROR');
      }

      return analysis;
    } catch (error: any) {
      if (error?.status === 429) {
        throw this.createError(
          'Rate limit exceeded',
          'RATE_LIMIT',
          error.headers?.['retry-after'] ? parseInt(error.headers['retry-after']) * 1000 : undefined
        );
      }
      throw this.createError(error.message || 'OpenAI API error', 'API_ERROR');
    }
  }
} 