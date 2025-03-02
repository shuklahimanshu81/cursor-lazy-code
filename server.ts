const { Server } = require('socket.io');
const { createServer } = require('http');
const { Socket } = require('socket.io');

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface Position {
  lineNumber: number;
  column: number;
}

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const rooms = new Map<string, Set<string>>();

io.on('connection', (socket: typeof Socket) => {
  const roomId = socket.handshake.query.roomId as string;
  
  // Join room
  socket.join(roomId);
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId)?.add(socket.id);

  // Notify others about new user
  socket.to(roomId).emit('user-joined', {
    userId: socket.id,
    timestamp: new Date(),
  });
  
  // Handle code changes
  socket.on('code-change', ({ roomId, code }: { roomId: string; code: string }) => {
    socket.to(roomId).emit('code-change', code);
  });

  // Handle language changes
  socket.on('language-change', ({ roomId, language }: { roomId: string; language: string }) => {
    socket.to(roomId).emit('language-change', language);
  });

  // Handle cursor movements
  socket.on('cursor-move', ({ roomId, position }: { roomId: string; position: Position }) => {
    socket.to(roomId).emit('cursor-move', {
      userId: socket.id,
      position,
    });
  });

  // Handle chat messages
  socket.on('chat-message', ({ roomId, message }: { roomId: string; message: Message }) => {
    socket.to(roomId).emit('chat-message', {
      ...message,
      sender: socket.id, // The client will map this to the actual user name
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    socket.leave(roomId);
    rooms.get(roomId)?.delete(socket.id);
    if (rooms.get(roomId)?.size === 0) {
      rooms.delete(roomId);
    }
    socket.to(roomId).emit('user-left', {
      userId: socket.id,
      timestamp: new Date(),
    });
  });
});

const port = parseInt(process.env.SOCKET_PORT || '3001', 10);
httpServer.listen(port);

console.log(`Socket.io server running on port ${port}`); 