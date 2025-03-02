import { create } from 'zustand';
import { Language } from '@/lib/utils';

interface EditorState {
  code: string;
  language: Language;
  connected: boolean;
  collaborators: Array<{
    id: string;
    name: string;
    color: string;
  }>;
  setCode: (code: string) => void;
  setLanguage: (language: Language) => void;
  setConnected: (connected: boolean) => void;
  addCollaborator: (collaborator: { id: string; name: string; color: string }) => void;
  removeCollaborator: (id: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  code: '',
  language: 'javascript',
  connected: false,
  collaborators: [],
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setConnected: (connected) => set({ connected }),
  addCollaborator: (collaborator) =>
    set((state) => ({
      collaborators: [...state.collaborators, collaborator],
    })),
  removeCollaborator: (id) =>
    set((state) => ({
      collaborators: state.collaborators.filter((c) => c.id !== id),
    })),
})); 