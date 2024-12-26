import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const defaultImages = [
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?w=400&h=300&fit=crop",
];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const startingBidRaw = formData.get("startingBid");
    const auctionDurationRaw = formData.get("auctionDuration");

    if (!title || typeof title !== "string") {
      throw new Error("Invalid or missing title");
    }
    if (!description || typeof description !== "string") {
      throw new Error("Invalid or missing description");
    }

    const startingBid = parseFloat(startingBidRaw as string);
    if (isNaN(startingBid)) {
      throw new Error("Invalid startingBid");
    }

    const auctionDuration = parseInt(auctionDurationRaw as string);
    if (isNaN(auctionDuration)) {
      throw new Error("Invalid auctionDuration");
    }

    let imagePaths: string[] = [];


      const randomImage =
        defaultImages[Math.floor(Math.random() * defaultImages.length)];
      imagePaths = [randomImage];

    const newItem = await prisma.item.create({
      data: {
        title,
        description,
        startingBid,
        auctionDuration,
        images: imagePaths, // Store image URLs in the database
        currentBid: startingBid,
      },
    });

    return NextResponse.json({
      message: "Auction item created successfully!",
      data: newItem,
    });
  } catch (error) {
    console.error("Error processing form data:", error.message);
    return NextResponse.json(
      { error: `Failed to process request: ${error.message}` },
      { status: 500 }
    );
  }
}


export async function GET() {
  return NextResponse.json(
    { error: "GET method not supported on this route." },
    { status: 405 }
  );
}
