import { RetryOptions, AIError } from './types';

const defaultOptions: RetryOptions = {
  maxAttempts: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffFactor: 2,
};

export async function withRetry<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const retryOptions = { ...defaultOptions, ...options };
  let lastError: AIError | Error | null = null;
  let attempt = 0;

  while (attempt < retryOptions.maxAttempts) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as AIError | Error;
      
      // Don't retry on validation errors
      if ((error as AIError).code === 'VALIDATION_ERROR') {
        throw error;
      }

      attempt++;
      
      // If we've used all attempts, throw the last error
      if (attempt === retryOptions.maxAttempts) {
        throw lastError;
      }

      // Calculate delay with exponential backoff
      const delay = Math.min(
        retryOptions.initialDelay * Math.pow(retryOptions.backoffFactor, attempt - 1),
        retryOptions.maxDelay
      );

      // If we have a rate limit error with retryAfter, use that instead
      if ((error as AIError).code === 'RATE_LIMIT' && (error as AIError).retryAfter) {
        await new Promise(resolve => setTimeout(resolve, (error as AIError).retryAfter!));
      } else {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // This should never happen due to the throw in the loop
  throw lastError;
} 