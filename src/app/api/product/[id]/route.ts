import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // Ensure you have the Prisma instance

// Handle GET request for product details
export async function GET(request: Request, context: { params: { id: string } }) {
  let { id } = context.params;
  id = id.trim();

  // Validate ID format (assuming it should be an integer)
  if (isNaN(parseInt(id, 10))) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  try {
    // Fetch the product from the database
    const product = await prisma.item.findUnique({
      where: { id: parseInt(id, 10) }, // Match the Prisma schema type
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Return the product data
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product for ID:', id, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Handle POST request for placing a bid
export async function POST(request: Request, context: { params: { id: string } }) {
  let { id } = context.params;
  id = id.trim();

  // Parse the bid from the request body
  const { bid } = await request.json();

  // Validate ID format (assuming it should be an integer)
  if (isNaN(parseInt(id, 10))) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  // Validate the bid
  if (isNaN(bid) || bid <= 0) {
    return NextResponse.json({ error: 'Bid must be a positive number' }, { status: 400 });
  }

  try {
    // Fetch the product to check the current bid
    const product = await prisma.item.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if the new bid is greater than the current bid by at least $10
    if (bid < product.currentBid + 10) {
      return NextResponse.json({
        error: `Bid must be at least $10 higher than the current bid of $${product.currentBid}`,
      }, { status: 400 });
    }

    // Update the product with the new bid
    const updatedProduct = await prisma.item.update({
      where: { id: parseInt(id, 10) },
      data: { currentBid: bid },
    });

    console.log(`Updated product with ID ${id}. New bid: $${bid}`);

    // Return the updated product data
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error processing bid for product ID:', id, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
