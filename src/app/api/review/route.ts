import { NextRequest, NextResponse } from 'next/server';
import { AIServiceManager } from '@/lib/ai/service-manager';
import { ReviewRequest, AIError } from '@/lib/ai/types';
import { sanitizeObject, validateRequiredFields } from '@/lib/utils/sanitize';
import { logger } from '@/lib/utils/logger';
import { getToken } from 'next-auth/jwt';

const serviceManager = new AIServiceManager();

export async function POST(request: NextRequest) {
  try {
    // Log the request
    logger.logApiRequest('POST', '/api/review', {
      ip: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    });

    // Check authentication if not in development mode
    if (process.env.NODE_ENV !== 'development') {
      const token = await getToken({ 
        req: request as any,
        secret: process.env.NEXTAUTH_SECRET 
      });
      
      if (!token) {
        logger.warn('Unauthorized access attempt to /api/review');
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }
    }
    
    // Parse and sanitize the request body
    const rawBody = await request.json();
    const body = sanitizeObject(rawBody);
    
    // Validate required fields
    const validation = validateRequiredFields(body, ['clause', 'type']);
    if (!validation.valid) {
      logger.warn('Invalid request to /api/review', { error: validation.message });
      return NextResponse.json(
        { error: validation.message },
        { status: 400 }
      );
    }

    // Create the review request
    const reviewRequest: ReviewRequest = {
      clause: body.clause,
      type: body.type,
      provider: body.provider // Optional provider preference
    };

    // Process the review request
    const result = await serviceManager.review(reviewRequest);
    
    // Log successful review
    logger.info('Successful review request', { 
      type: body.type, 
      provider: result.provider,
      length: body.clause.length
    });
    
    // Return the result
    return NextResponse.json(result);
    
  } catch (error) {
    const aiError = error as AIError;
    
    // Log the error
    logger.logApiError(
      error instanceof Error ? error : new Error(String(error)),
      '/api/review',
      { 
        code: aiError.code,
        provider: 'provider' in aiError ? aiError.provider : 'unknown'
      }
    );
    
    // Return appropriate error response based on error type
    switch (aiError.code) {
      case 'RATE_LIMIT':
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again later.' },
          { 
            status: 429,
            headers: aiError.retryAfter 
              ? { 'Retry-After': Math.ceil(aiError.retryAfter / 1000).toString() }
              : undefined
          }
        );
      case 'VALIDATION_ERROR':
        return NextResponse.json(
          { error: aiError.message },
          { status: 400 }
        );
      case 'API_ERROR':
        return NextResponse.json(
          { error: 'AI service error. Please try again later.' },
          { status: 502 }
        );
      default:
        return NextResponse.json(
          { error: 'Internal server error' },
          { status: 500 }
        );
    }
  }
} 