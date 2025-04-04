import OpenAI from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import axios from 'axios';

export type ReviewType = 'risks' | 'improvements' | 'completeness' | 'simplify' | 'ambiguities';

interface AIResponse {
  analysis: string;
  error?: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

class AIService {
  private openai: OpenAI;
  private anthropic: Anthropic;
  private perplexityApiKey: string;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.anthropic = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY || '',
    });

    this.perplexityApiKey = process.env.PERPLEXITY_API_KEY || '';
  }

  private getPromptForReviewType(clause: string, type: ReviewType): string {
    const prompts = {
      risks: `Please analyze the following contract clause for potential risks and liabilities:
      
${clause}

Focus on:
1. Legal risks and potential liabilities
2. Financial implications
3. Compliance issues
4. Operational risks
5. Recommendations for risk mitigation`,

      improvements: `Please suggest improvements for the following contract clause:
      
${clause}

Consider:
1. Clarity and readability
2. Legal effectiveness
3. Protection of interests
4. Industry best practices
5. Specific improvement recommendations`,

      completeness: `Please check the following contract clause for completeness and identify any gaps:
      
${clause}

Analyze:
1. Missing essential elements
2. Undefined terms
3. Incomplete conditions
4. Required additional clauses
5. Recommendations for completion`,

      simplify: `Please simplify the following contract clause while maintaining its legal effectiveness:
      
${clause}

Focus on:
1. Using plain language
2. Maintaining legal meaning
3. Improving readability
4. Reducing complexity
5. Preserving key terms`,

      ambiguities: `Please identify potential ambiguities in the following contract clause:
      
${clause}

Look for:
1. Unclear terms or phrases
2. Multiple possible interpretations
3. Vague conditions
4. Undefined references
5. Recommendations for clarity`
    };

    return prompts[type];
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async retryOperation<T>(
    operation: () => Promise<T>,
    retries = MAX_RETRIES
  ): Promise<T> {
    try {
      return await operation();
    } catch (error) {
      if (retries > 0) {
        await this.sleep(RETRY_DELAY);
        return this.retryOperation(operation, retries - 1);
      }
      throw error;
    }
  }

  private async analyzeWithOpenAI(prompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0]?.message?.content || '';
  }

  private async analyzeWithClaude(prompt: string): Promise<string> {
    const response = await this.anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 2000,
      temperature: 0.7,
      messages: [{ role: 'user', content: prompt }],
    });

    if (response.content[0]?.type === 'text') {
      return response.content[0].text;
    }
    return '';
  }

  private async analyzeWithPerplexity(prompt: string): Promise<string> {
    if (!this.perplexityApiKey) {
      throw new Error('Perplexity API key not configured');
    }

    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: 'sonar-medium-online',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${this.perplexityApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0]?.message?.content || '';
  }

  public async analyzeClause(clause: string, type: ReviewType): Promise<AIResponse> {
    const prompt = this.getPromptForReviewType(clause, type);

    try {
      // Try OpenAI first
      try {
        const analysis = await this.retryOperation(() => this.analyzeWithOpenAI(prompt));
        return { analysis };
      } catch (openaiError) {
        console.error('OpenAI analysis failed:', openaiError);

        // Try Claude as fallback
        try {
          const analysis = await this.retryOperation(() => this.analyzeWithClaude(prompt));
          return { analysis };
        } catch (claudeError) {
          console.error('Claude analysis failed:', claudeError);

          // Try Perplexity as final fallback
          try {
            const analysis = await this.retryOperation(() => this.analyzeWithPerplexity(prompt));
            return { analysis };
          } catch (perplexityError) {
            console.error('Perplexity analysis failed:', perplexityError);
            throw new Error('All AI services failed to analyze the clause');
          }
        }
      }
    } catch (error) {
      console.error('Clause analysis failed:', error);
      return {
        analysis: '',
        error: 'Failed to analyze the clause. Please try again later.',
      };
    }
  }
}

// Export singleton instance
export const aiService = new AIService(); 