import type { Tag } from '@prisma/client';
import { create } from 'zustand';

interface AssignedTagsStore {
  tags: Tag[];
  setTag: (tag: Tag) => void;
  setTags: (tags: Tag[]) => void;
  removeTag: (tagId: string) => void;
  resetTags: () => void;
}

export const useAssignedTagsStore = create<AssignedTagsStore>((set) => ({
  tags: [],

  setTag: (tag) =>
    set((state) => {
      // すでに同じIDのタグが存在する場合は追加しない
      if (state.tags.some((t) => t.id === tag.id)) {
        return { tags: state.tags };
      }
      return { tags: [...state.tags, tag] };
    }),

  setTags: (tags) =>
    set(() => ({
      tags: tags,
    })),

  removeTag: (tagId) =>
    set((state) => ({
      tags: state.tags.filter((tag) => tag.id !== tagId),
    })),

  resetTags: () => set({ tags: [] }),
}));
