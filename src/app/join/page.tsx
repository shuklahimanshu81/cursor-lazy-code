'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

export default function JoinRoom() {
  const router = useRouter();
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate room ID format
      if (!roomId.trim()) {
        throw new Error('Please enter a room ID');
      }

      // Check if room exists
      const response = await fetch(`/api/rooms/${roomId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Room not found');
      }

      // Redirect to room
      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error('Failed to join room:', error);
      setError(error instanceof Error ? error.message : 'Failed to join room');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto relative z-10">
          <Link 
            href="/"
            className="text-muted hover:text-foreground transition-colors mb-8 inline-flex items-center space-x-2"
          >
            <span>←</span>
            <span>Back to home</span>
          </Link>
          
          <div className="card">
            <h1 className="text-3xl font-bold mb-2">Join Room</h1>
            <p className="text-muted mb-8">Enter a room ID to join an existing session</p>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 text-sm text-red-500">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="roomId"
                label="Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter room ID..."
                required
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading}
                className={`button button-primary w-full ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Joining Room...' : 'Join Room'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 