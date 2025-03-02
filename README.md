# CodeCollab - Real-time Collaborative Code Editor

CodeCollab is a modern, real-time collaborative code editor that allows developers to code together seamlessly. Built with Next.js, TypeScript, and Socket.io, it provides a powerful platform for pair programming and collaborative development.

![CodeCollab Screenshot](screenshot.png)

## Features

### Real-time Collaboration
- **Live Code Editing**: Multiple users can edit code simultaneously
- **Cursor Tracking**: See other users' cursor positions in real-time
- **Instant Updates**: Changes are synchronized across all connected users
- **Language Support**: Syntax highlighting for multiple programming languages

### Room Management
- Create private or public coding rooms
- Join existing rooms via unique room IDs
- Select from various programming languages
- Persistent code storage

### Modern Editor Features
- Monaco Editor (same as VS Code)
- Syntax highlighting
- Auto-indentation
- Line numbers
- Dark theme optimized for coding

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Socket.io server
- **Database**: PostgreSQL with Prisma ORM
- **Editor**: Monaco Editor
- **Styling**: Custom dark theme with Tailwind CSS
- **State Management**: Zustand

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/codecollab.git
cd codecollab
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a .env file in the root directory with the following:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/codecollab?schema=public"
NEXT_PUBLIC_APP_URL="http://localhost:3002"
NEXT_PUBLIC_SOCKET_URL="http://localhost:3001"
SOCKET_PORT=3001
```

4. Set up the database:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Start the development servers:
```bash
# Start the socket server
npm run socket

# In a new terminal, start the Next.js development server
npm run dev
```

The application should now be running at http://localhost:3002

## Usage

1. **Creating a Room**
   - Click "Create Room" on the homepage
   - Enter a room name
   - Select your preferred programming language
   - Choose whether to make the room private
   - Click "Create Room"

2. **Joining a Room**
   - Use the room ID shared by another user
   - Navigate to `/room/[room-id]`
   - Start collaborating immediately

3. **Collaborative Features**
   - Write and edit code in real-time
   - See other users' cursors
   - Chat with collaborators (coming soon)
   - Share code snippets

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [Socket.io](https://socket.io/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
