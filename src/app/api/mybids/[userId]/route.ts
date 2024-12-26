import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

type Params = {
  userId: string;
};

export async function GET(request: Request, { params }: { params: Params }) {
  try {
    const userId = params.userId || '2'; // Ensure userId is available

    // Validate userId
    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) {
      return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });
    }

    // Fetch bids placed by the user
    const userBids = await prisma.bid.findMany({
      where: { userId: numericUserId },
      include: {
        item: true, // Include the item details in the bid response
      },
    });

    return NextResponse.json(userBids);
  } catch (error) {
    console.error('Error fetching bids for user ID:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }

}
