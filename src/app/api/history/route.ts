import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ReviewType } from '@/lib/ai';

// In a real application, this would be stored in a database
let reviews: Array<{
  id: number;
  userId: string;
  date: string;
  clause: string;
  type: ReviewType;
  analysis: string;
}> = [];

let nextId = 1;

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { clause, type, analysis } = body;

    // Validate input
    if (!clause || typeof clause !== 'string') {
      return NextResponse.json(
        { error: 'Contract clause is required' },
        { status: 400 }
      );
    }

    if (!type || !['risks', 'improvements', 'completeness', 'simplify', 'ambiguities'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid review type' },
        { status: 400 }
      );
    }

    if (!analysis || typeof analysis !== 'string') {
      return NextResponse.json(
        { error: 'Analysis is required' },
        { status: 400 }
      );
    }

    // Create new review
    const review = {
      id: nextId++,
      userId: session.user.id,
      date: new Date().toISOString(),
      clause,
      type: type as ReviewType,
      analysis,
    };

    // Save review (in memory for now)
    reviews.push(review);

    return NextResponse.json({ success: true, review });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's reviews
    const userReviews = reviews
      .filter(review => review.userId === session.user.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ reviews: userReviews });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 