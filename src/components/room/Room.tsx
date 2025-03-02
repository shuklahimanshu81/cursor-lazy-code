'use client';

import { useState, useEffect } from 'react';
import { Editor } from '@monaco-editor/react';
import { io, Socket } from 'socket.io-client';
import { SUPPORTED_LANGUAGES } from '@/lib/utils';
import Link from 'next/link';

interface RoomProps {
  roomId: string;
  initialLanguage: string;
}

export function Room({ roomId, initialLanguage }: RoomProps) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState(initialLanguage);
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      query: { roomId },
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('code-change', (newCode: string) => {
      setCode(newCode);
    });

    socketInstance.on('language-change', (newLanguage: string) => {
      setLanguage(newLanguage);
    });

    socketInstance.on('user-joined', (data: { userId: string }) => {
      setParticipants(prev => [...prev, data.userId]);
    });

    socketInstance.on('user-left', (data: { userId: string }) => {
      setParticipants(prev => prev.filter(id => id !== data.userId));
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [roomId]);

  const handleCodeChange = (value: string = '') => {
    setCode(value);
    socket?.emit('code-change', { roomId, code: value });
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    socket?.emit('language-change', { roomId, language: newLanguage });
  };

  return (
    <div className="h-full flex flex-col">
      <header className="bg-card border-b border-border p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/"
              className="text-muted hover:text-foreground transition-colors inline-flex items-center space-x-2"
            >
              <span>←</span>
              <span>Back to home</span>
            </Link>
            <div className="h-6 w-px bg-border" />
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-background border border-border rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-muted">
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
            <div className="h-6 w-px bg-border mx-2" />
            <span className="text-sm text-muted">
              {participants.length} participant{participants.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </header>

      <div className="flex-1 relative">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
} 