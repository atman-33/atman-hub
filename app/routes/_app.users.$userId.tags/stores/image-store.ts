import { create } from 'zustand';

interface ImageStore {
  /**
   * 現在選択されている画像ファイル
   */
  file: File | null;
  /**
   * 画像ファイルを設定する
   * @param file - 設定する画像ファイル
   */
  setFile: (file: File) => void;
  /**
   * 画像ファイルをリセットする
   */
  resetFile: () => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  file: null,
  setFile: (file) => set({ file }),
  resetFile: () => set({ file: null }),
}));
