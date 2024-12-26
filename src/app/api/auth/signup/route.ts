import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '../../../../lib/prisma'; // Adjust import as necessary
import { NextRequest } from 'next/server'; // Import NextRequest for type safety

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, phone, password } = body;

    if (!username || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'All fields are required!' },
        { status: 400 }
      );
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists! Try login instead' },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user in the database
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        phone,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: 'User created successfully!', user: newUser },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Use the error in the response to satisfy the rule
    console.error('Error:', error);

    return NextResponse.json(
      {
        error: `Something went wrong: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
      },
      { status: 500 }
    );
  }
}
