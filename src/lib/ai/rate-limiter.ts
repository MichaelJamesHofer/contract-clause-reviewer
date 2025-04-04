import { AIProvider } from './types';

interface TokenBucket {
  tokens: number;
  lastRefill: number;
}

class RateLimiter {
  private buckets: Map<AIProvider['name'], TokenBucket>;
  private readonly refillRate: number; // tokens per second
  private readonly bucketCapacity: number;

  constructor(refillRate = 2, bucketCapacity = 10) {
    this.buckets = new Map();
    this.refillRate = refillRate;
    this.bucketCapacity = bucketCapacity;
  }

  private getBucket(provider: AIProvider['name']): TokenBucket {
    let bucket = this.buckets.get(provider);
    if (!bucket) {
      bucket = { tokens: this.bucketCapacity, lastRefill: Date.now() };
      this.buckets.set(provider, bucket);
    }
    return bucket;
  }

  private refillBucket(bucket: TokenBucket): void {
    const now = Date.now();
    const timePassed = (now - bucket.lastRefill) / 1000; // Convert to seconds
    const tokensToAdd = timePassed * this.refillRate;
    
    bucket.tokens = Math.min(bucket.tokens + tokensToAdd, this.bucketCapacity);
    bucket.lastRefill = now;
  }

  async tryAcquire(provider: AIProvider['name']): Promise<boolean> {
    const bucket = this.getBucket(provider);
    this.refillBucket(bucket);

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }

    return false;
  }

  async waitForToken(provider: AIProvider['name']): Promise<void> {
    const bucket = this.getBucket(provider);
    this.refillBucket(bucket);

    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return;
    }

    const tokensNeeded = 1 - bucket.tokens;
    const waitTime = (tokensNeeded / this.refillRate) * 1000;
    await new Promise(resolve => setTimeout(resolve, waitTime));
    
    bucket.tokens = 0;
    bucket.lastRefill = Date.now();
  }
}

// Create a singleton instance
export const rateLimiter = new RateLimiter(); 