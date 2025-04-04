import { NextApiRequest, NextApiResponse } from 'next';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

// Initialize Redis client with proper error handling
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// Configure rate limiter
const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: 'ai_ratelimit',
  points: 10, // Number of requests
  duration: 1, // Per second
});

interface RateLimitError extends Error {
  msBeforeNext?: number;
}

// Rate limiting middleware
export async function rateLimiterMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  next: () => void
) {
  try {
    // Get user identifier (IP or authenticated user ID)
    const identifier = req.headers['x-forwarded-for'] || 
                      req.connection.remoteAddress ||
                      'unknown';
    
    // Check rate limit
    await rateLimiter.consume(identifier.toString());
    
    // Continue to next middleware/handler
    return next();
  } catch (error: unknown) {
    // Rate limit exceeded
    if (error instanceof Error && error.name === 'Error') {
      const rateLimitError = error as RateLimitError;
      return res.status(429).json({
        error: 'Too Many Requests',
        retryAfter: Math.round(rateLimitError.msBeforeNext || 1000) / 1000
      });
    }
    
    // Unexpected error
    console.error('Rate limiter error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
} 