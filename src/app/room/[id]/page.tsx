import { Room } from '@/components/room/Room';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';

interface RoomPageProps {
  params: {
    id: string;
  };
}

async function getRoom(id: string) {
  try {
    const room = await prisma.room.findUnique({
      where: { id },
    });

    if (!room) {
      return null;
    }

    return room;
  } catch (error) {
    console.error('Failed to fetch room:', error);
    return null;
  }
}

export default async function RoomPage({ params }: RoomPageProps) {
  const room = await getRoom(params.id);

  if (!room) {
    return (
      <main className="min-h-screen bg-background text-foreground font-sans">
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Room Not Found</h1>
            <p className="text-muted mb-8">
              The room you're looking for doesn't exist or has been deleted.
            </p>
            <Link
              href="/"
              className="button button-primary"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <div className="h-screen">
        <Room roomId={room.id} initialLanguage={room.language} />
      </div>
    </main>
  );
} 