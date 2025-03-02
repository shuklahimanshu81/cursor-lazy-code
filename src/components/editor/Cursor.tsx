'use client';

interface CursorProps {
  color: string;
  name: string;
  position: {
    lineNumber: number;
    column: number;
  };
}

export function Cursor({ color, name, position }: CursorProps) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        transform: `translate(${position.column * 8}px, ${position.lineNumber * 20}px)`,
      }}
    >
      <div
        className="w-[2px] h-[20px] relative"
        style={{ backgroundColor: color }}
      >
        <div
          className="absolute left-0 top-0 px-1.5 py-0.5 text-xs text-white rounded whitespace-nowrap"
          style={{ backgroundColor: color, transform: 'translateY(-100%)' }}
        >
          {name}
        </div>
      </div>
    </div>
  );
} 