'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SUPPORTED_LANGUAGES } from '@/lib/utils';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function NewRoom() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      console.log('Creating room with:', { name, language, isPrivate });
      const response = await fetch('/api/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          language,
          isPrivate,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create room');
      }

      console.log('Room created:', data);
      router.push(`/room/${data.id}`);
    } catch (error) {
      console.error('Failed to create room:', error);
      setError(error instanceof Error ? error.message : 'Failed to create room. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const languageOptions = SUPPORTED_LANGUAGES.map(lang => ({
    value: lang.value,
    label: lang.name
  }));

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
            <h1 className="text-3xl font-bold mb-2">Create New Room</h1>
            <p className="text-muted mb-8">Set up your collaborative coding environment</p>
            
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 mb-6 text-sm text-red-500">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                id="name"
                label="Room Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter room name..."
                required
                disabled={isLoading}
              />

              <Select
                id="language"
                label="Programming Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                options={languageOptions}
                disabled={isLoading}
              />

              <Checkbox
                id="isPrivate"
                label="Make room private"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                disabled={isLoading}
              />

              <button
                type="submit"
                disabled={isLoading}
                className={`button button-primary w-full ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Creating Room...' : 'Create Room'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
} 