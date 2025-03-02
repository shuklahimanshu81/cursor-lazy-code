'use client';

import { useEffect, useRef, useState } from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { useEditorStore } from '@/store/editor-store';
import { Cursor } from './Cursor';
import type { Socket } from 'socket.io-client';
import { Language } from '@/lib/utils';

interface EditorProps {
  socket?: any;
  roomId: string;
}

interface CursorPosition {
  lineNumber: number;
  column: number;
}

interface CollaboratorCursor {
  userId: string;
  position: CursorPosition;
}

export function Editor({ socket, roomId }: EditorProps) {
  const { code, language, setCode, collaborators } = useEditorStore();
  const isTyping = useRef(false);
  const skipNextChange = useRef(false);
  const editorRef = useRef<any>(null);
  const [cursors, setCursors] = useState<Record<string, CursorPosition>>({});

  useEffect(() => {
    if (!socket) return;

    socket.on('code-change', (newCode: string) => {
      if (!isTyping.current) {
        skipNextChange.current = true;
        setCode(newCode);
      }
    });

    socket.on('cursor-move', ({ userId, position }: CollaboratorCursor) => {
      setCursors(prev => ({
        ...prev,
        [userId]: position
      }));
    });

    return () => {
      socket.off('code-change');
      socket.off('cursor-move');
    };
  }, [socket, setCode]);

  const handleEditorChange = (value: string = '') => {
    if (skipNextChange.current) {
      skipNextChange.current = false;
      return;
    }

    setCode(value);
    socket?.emit('code-change', { roomId, code: value });
  };

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();

    editor.onDidChangeCursorPosition((e: any) => {
      const position = {
        lineNumber: e.position.lineNumber,
        column: e.position.column
      };
      socket?.emit('cursor-move', { roomId, position });
    });
  };

  return (
    <div className="h-full w-full relative">
      <MonacoEditor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        onMount={handleEditorMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderWhitespace: 'selection',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
      {Object.entries(cursors).map(([userId, position]) => {
        const collaborator = collaborators.find(c => c.id === userId);
        if (!collaborator) return null;

        return (
          <Cursor
            key={userId}
            color={collaborator.color}
            name={collaborator.name}
            position={position}
          />
        );
      })}
    </div>
  );
} 