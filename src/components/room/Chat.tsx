'use client';

import { useState, useEffect, useRef } from 'react';
import type { Socket } from 'socket.io-client';
import { formatTime } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface ChatProps {
  socket?: any;
  roomId: string;
}

export function Chat({ socket, roomId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('chat-message', (message: Message) => {
      setMessages((prev) => [...prev, { ...message, timestamp: new Date(message.timestamp) }]);
    });

    return () => {
      socket.off('chat-message');
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const message: Message = {
      id: Math.random().toString(36).substring(7),
      text: newMessage,
      sender: 'You', // TODO: Replace with actual user name
      timestamp: new Date(),
    };

    socket.emit('chat-message', { roomId, message });
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 border-l border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-white text-lg font-semibold">Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.sender === 'You' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.sender === 'You'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-200'
              }`}
            >
              <div className="text-sm font-medium mb-1">{message.sender}</div>
              <div>{message.text}</div>
              <div className="text-xs opacity-75 mt-1">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 