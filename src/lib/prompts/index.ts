import { ReviewType, ReviewRequest } from '../ai/types';
import { promptTemplates } from './templates';
import { systemPrompts } from './system-prompts';
import { PromptProvider } from './types';

/**
 * Replace template placeholders with actual content
 */
function populateTemplate(template: string, clause: string): string {
  return template.replace(/{{clause}}/g, clause);
}

/**
 * Get the system prompt for a specific provider
 */
export function getSystemPrompt(provider: PromptProvider): string {
  const systemPrompt = systemPrompts.find(p => p.provider === provider);
  if (!systemPrompt) {
    throw new Error(`No system prompt found for provider: ${provider}`);
  }
  return systemPrompt.content;
}

/**
 * Generate a prompt for a specific review type and provider
 */
export function generatePrompt(request: ReviewRequest, provider: PromptProvider): string {
  // Find the template for the requested review type
  const template = promptTemplates.find(t => t.type === request.type);
  if (!template) {
    throw new Error(`No template found for review type: ${request.type}`);
  }

  // Get the provider-specific template
  const providerTemplate = template.template[provider];
  if (!providerTemplate) {
    throw new Error(`No template found for provider: ${provider}`);
  }

  // Populate the template with the clause
  return populateTemplate(providerTemplate, request.clause);
}

/**
 * Get few-shot examples for a specific review type
 */
export function getExamples(type: ReviewType): { clause: string; analysis: string }[] {
  const template = promptTemplates.find(t => t.type === type);
  if (!template) {
    throw new Error(`No examples found for review type: ${type}`);
  }
  return template.examples;
}

/**
 * Add few-shot learning examples to a prompt if available
 */
export function addExamplesToPrompt(
  prompt: string, 
  type: ReviewType, 
  provider: PromptProvider
): string {
  try {
    const examples = getExamples(type);
    if (!examples || examples.length === 0) {
      return prompt;
    }

    // Format depends on the provider
    let exampleText = '';
    
    switch (provider) {
      case 'openai':
        exampleText = examples.map(ex => 
          `Example Clause:\n"${ex.clause}"\n\nExpected Analysis:\n${ex.analysis}\n\n`
        ).join('');
        return `${prompt}\n\nHere's an example of how to analyze a similar clause:\n\n${exampleText}`;
        
      case 'claude':
        exampleText = examples.map(ex => 
          `Example Contract Clause:\n"""${ex.clause}"""\n\nAnalysis:\n${ex.analysis}\n\n`
        ).join('');
        return `${prompt}\n\nHere is an example analysis for reference:\n\n${exampleText}`;
        
      case 'perplexity':
        exampleText = examples.map(ex => 
          `EXAMPLE CLAUSE:\n"""${ex.clause}"""\n\nEXAMPLE ANALYSIS:\n${ex.analysis}\n\n`
        ).join('');
        return `${prompt}\n\nReference this example analysis:\n\n${exampleText}`;
        
      default:
        return prompt;
    }
  } catch (error) {
    // If there's any error, return the original prompt
    console.error('Error adding examples to prompt:', error);
    return prompt;
  }
}

export * from './types';
export { promptTemplates } from './templates';
export { systemPrompts } from './system-prompts'; 