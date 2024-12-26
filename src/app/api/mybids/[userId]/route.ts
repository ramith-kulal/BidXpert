import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

type Params = {
  userId: string; // Ensure this matches the dynamic segment name
};

export async function GET(
  request: Request,
  context: { params: Params } // Adjust context to match Next.js expectations
) {
  try {
    const userId = context.params.userId || '2'; // Use `context.params` instead of `params`

    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    const userBids = await prisma.bid.findMany({
      where: { userId: numericUserId },
      include: { item: true },
    });

    return NextResponse.json(userBids);
  } catch (error) {
    console.error('Error fetching bids for user ID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
