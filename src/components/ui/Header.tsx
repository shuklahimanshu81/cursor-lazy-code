import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="gradient-text font-bold text-xl">CodeCollab</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link
              href="/new"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Create Room
            </Link>
            <Link
              href="/"
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              Join Room
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 