import Link from 'next/link';
import { SUPPORTED_LANGUAGES } from '@/lib/utils';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-20 relative z-10">
          <h1 className="gradient-text text-6xl font-bold mb-6">
            CodeCollab
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Real-time collaborative code editor with powerful features
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          {/* Create and Join Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card group h-full">
              <h2 className="text-2xl font-semibold mb-4">Create Room</h2>
              <p className="text-muted mb-6">
                Start a new collaborative coding session
              </p>
              <div className="mt-auto">
                <Link
                  href="/new"
                  className="button button-primary w-full"
                >
                  Create Room
                </Link>
              </div>
            </div>

            <div className="card group h-full">
              <h2 className="text-2xl font-semibold mb-4">Join Room</h2>
              <p className="text-muted mb-6">
                Join an existing collaborative session
              </p>
              <div className="mt-auto">
                <Link
                  href="/join"
                  className="button button-secondary w-full"
                >
                  Join Room
                </Link>
              </div>
            </div>
          </div>

          {/* Features Card */}
          <div className="card group">
            <h2 className="text-2xl font-semibold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">✨</span>
                  <span className="text-muted">Real-time collaboration</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🎨</span>
                  <span className="text-muted">Syntax highlighting</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">👥</span>
                  <span className="text-muted">Multiple cursors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🔒</span>
                  <span className="text-muted">Private rooms</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">🌍</span>
                  <span className="text-muted">{SUPPORTED_LANGUAGES.length} languages supported</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
