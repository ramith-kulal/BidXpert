import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // Ensure you have the Prisma instance

// Handle POST request for placing a bid
export async function POST(request, context) {
  let { id } = context.params;
  id = id.trim();

  const { bid, userId } = await request.json();
  console.log(`Received bid: $${bid} for product ID: ${id} by user ${userId}`);

  // Add your validation and bid placement logic here...

  try {
    // Logic for placing the bid
    const updatedProduct = await prisma.item.update({
      where: { id: parseInt(id, 10) },
      data: { currentBid: bid },
    });

    // Save the bid for the user and the item
    await prisma.bid.create({
      data: {
        amount: bid,
        userId: userId, // Use the userId from the request
        itemId: parseInt(id, 10),
      },
    });

    console.log(`Updated product with ID ${id}. New bid: $${bid}`);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error processing bid for product ID:', id, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
