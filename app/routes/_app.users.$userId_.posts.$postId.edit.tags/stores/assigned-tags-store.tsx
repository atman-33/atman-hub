import type { Tag } from '@prisma/client';
import { create } from 'zustand';

interface AssignedTagsStore {
  initialTags: Tag[];
  currentTags: Tag[];

  setInitialTags: (tags: Tag[]) => void;
  setCurrentTag: (tag: Tag) => void;
  setCurrentTags: (tags: Tag[]) => void;
  removeCurrentTag: (tagId: string) => void;
  resetCurrentTags: () => void;
  isDirty: () => boolean;
}

export const useAssignedTagsStore = create<AssignedTagsStore>((set, get) => ({
  initialTags: [],
  currentTags: [],

  setInitialTags: (tags) =>
    set(() => ({
      initialTags: tags,
      currentTags: tags,
    })),

  setCurrentTag: (tag) =>
    set((state) => {
      // すでに同じIDのタグが存在する場合は追加しない
      if (state.currentTags.some((t) => t.id === tag.id)) {
        return { currentTags: state.currentTags };
      }
      return { currentTags: [...state.currentTags, tag] };
    }),

  setCurrentTags: (tags) =>
    set(() => ({
      currentTags: tags,
    })),

  removeCurrentTag: (tagId) =>
    set((state) => ({
      currentTags: state.currentTags.filter((tag) => tag.id !== tagId),
    })),

  resetCurrentTags: () =>
    set((state) => ({
      currentTags: state.initialTags,
    })),

  isDirty: () => {
    const { initialTags, currentTags } = get();
    if (initialTags.length !== currentTags.length) {
      return true;
    }
    return !initialTags.every((tag) =>
      currentTags.some((t) => t.id === tag.id),
    );
  },
}));
