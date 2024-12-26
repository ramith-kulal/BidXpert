import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Ensure you have the 

// Handle GET request to fetch dashboard data
export async function GET() {
  try {
    // Total Bids
    const totalBids = await prisma.bid.count();

    // Total Money Spent
    const totalMoneySpent = await prisma.bid.aggregate({
      _sum: {
        amount: true,
      },
    });

    // Total Items Sold
    const totalItemsSold = await prisma.item.count({
      where: {
        currentBid: {
          gt: 0, // Only count items with bids placed
        },
      },
    });

    // Fetching the dashboard data
    const dashboardData = {
      totalBids,
      totalMoneySpent: totalMoneySpent._sum.amount || 0,
      totalItemsSold,
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
