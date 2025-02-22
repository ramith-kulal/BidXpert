import { NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma'; // Ensure you have the Prisma instance

// Handle POST request for placing a bid
export async function POST(request, context) {
  let { id } = context.params;
  id = id.trim();

  const { bid } = await request.json();
  console.log(`Received bid: $${bid} for product ID: ${id} by user `);

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
        userId: 3, // Using the userId received in the request body
        itemId: parseInt(id, 10),
      },
    });

    console.log(`Updated product with ID ${id}. New bid: $${bid}`);
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error(`Error processing bid for product ID: ${id}`, error);

    // Ensure the error response is valid
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message || 'An unknown error occurred.',
      },
      { status: 500 }
    );
  }
}
