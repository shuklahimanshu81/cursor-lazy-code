import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { PrismaClientKnownRequestError, PrismaClientInitializationError } from '@prisma/client/runtime/library';

const createRoomSchema = z.object({
  name: z.string().min(1).max(100),
  language: z.string(),
  isPrivate: z.boolean().default(false),
});

export async function POST(req: Request) {
  try {
    // Test database connection first
    try {
      await prisma.$connect();
      console.log('Database connection successful');
    } catch (connError) {
      console.error('Database connection failed:', connError);
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    console.log('Received request body:', body);

    const validatedData = createRoomSchema.parse(body);
    console.log('Validated data:', validatedData);

    // Check if anonymous user exists
    const anonymousUser = await prisma.user.findUnique({
      where: { id: 'anonymous' },
    });

    if (!anonymousUser) {
      console.log('Anonymous user not found, creating one...');
      await prisma.user.create({
        data: {
          id: 'anonymous',
          name: 'Anonymous',
        },
      });
    }

    const room = await prisma.room.create({
      data: {
        name: validatedData.name,
        language: validatedData.language,
        isPrivate: validatedData.isPrivate,
        creatorId: 'anonymous',
      },
    });

    console.log('Created room:', room);
    return NextResponse.json(room);
  } catch (error) {
    console.error('Failed to create room:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof PrismaClientInitializationError) {
      return NextResponse.json(
        { error: 'Database initialization failed. Please try again.' },
        { status: 500 }
      );
    }

    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'A room with this name already exists' },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create room. Please check the server logs.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        isPrivate: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
} 