import DOMPurify from 'dompurify';
import { create } from 'zustand';
import { getMarked } from '~/lib/marked';

interface DocStore {
  /**
   * Markdownの内容
   */
  doc: string;
  /**
   * Markdownの内容をHTMLに変換したもの
   */
  docHtml: string;
  /**
   * Markdownの内容を更新する
   * @param doc - Markdownエディタの内容
   */
  setDoc: (doc: string) => void;
  /**
   * Markdownの内容をHTMLに変換する
   */
  updateDocHtml: () => void;
  /**
   * Markdownの内容をリセットする
   */
  resetDoc: () => void;
}

export const useDocStore = create<DocStore>((set, get) => {
  // Marked インスタンスを取得
  const marked = getMarked();

  return {
    doc: '',
    docHtml: '',
    setDoc: (doc) => {
      set({ doc });
      get().updateDocHtml();
    },
    updateDocHtml: () => {
      const { doc } = get();
      if (doc) {
        const rawHtml = marked.parse(doc);
        const sanitizedHtml = DOMPurify.sanitize(rawHtml as string);
        set({ docHtml: sanitizedHtml });
        return;
      }
      set({ docHtml: '' });
    },
    resetDoc: () => {
      set({ doc: '', docHtml: '' });
    },
  };
});
