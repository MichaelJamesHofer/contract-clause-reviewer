import { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

class RateLimit {
  private store: RateLimitStore = {};
  private readonly maxRequests = 10;
  private readonly windowMs = 60 * 1000; // 1 minute

  private getKey(req: NextRequest): string {
    // In production, use a more robust way to identify users
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown';
    const session = req.cookies.get('next-auth.session-token')?.value;
    return `${ip}-${session || 'anonymous'}`;
  }

  private cleanup(): void {
    const now = Date.now();
    for (const key in this.store) {
      if (this.store[key].resetTime <= now) {
        delete this.store[key];
      }
    }
  }

  async check(req: NextRequest): Promise<{ success: boolean; remaining: number }> {
    this.cleanup();

    const key = this.getKey(req);
    const now = Date.now();

    if (!this.store[key]) {
      this.store[key] = {
        count: 1,
        resetTime: now + this.windowMs,
      };
      return { success: true, remaining: this.maxRequests - 1 };
    }

    const record = this.store[key];

    if (record.resetTime <= now) {
      record.count = 1;
      record.resetTime = now + this.windowMs;
      return { success: true, remaining: this.maxRequests - 1 };
    }

    if (record.count >= this.maxRequests) {
      return { success: false, remaining: 0 };
    }

    record.count += 1;
    return { success: true, remaining: this.maxRequests - record.count };
  }
}

export const rateLimit = new RateLimit(); 