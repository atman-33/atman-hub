import { useEffect } from 'react';
import tocbot from 'tocbot';
import './toc.css';
interface TocProps {
  className?: string;
}

export const Toc = ({ className }: TocProps) => {
  useEffect(() => {
    const tocbotInit = () => {
      tocbot.destroy(); // 既存のtocbotインスタンスを削除
      tocbot.init({
        tocSelector: '.toc', // 目次を追加する class 名
        contentSelector: '.content', // 目次を取得するコンテンツの class 名
        headingSelector: 'h1, h2, h3, h4, h5, h6', // 目次として取得する見出しタグ
        // ヘッダーの高さ分ズレてしまうため調整
        headingsOffset: 70,
        scrollSmoothOffset: -70,
      });
    };
    // .contentのDOM変化を監視
    const contentEl = document.querySelector('.content');
    let observer: MutationObserver | null = null;
    if (contentEl) {
      observer = new MutationObserver(() => {
        tocbotInit();
      });
      observer.observe(contentEl, { childList: true, subtree: true });
      // 初回も呼ぶ
      tocbotInit();
    }

    window.addEventListener('resize', tocbotInit);

    return () => {
      window.removeEventListener('resize', tocbotInit);
      tocbot.destroy();
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      className={`items-start rounded-md bg-white p-2 dark:bg-zinc-700 ${className}`}
    >
      <h3 className="mb-1 flex items-center space-x-2 border-b p-2 font-semibold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className=" text-teal-400"
        >
          <title>Table of Contents Icon</title>
          <path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
          <path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
        </svg>
        <span>Contents</span>
      </h3>
      <nav className="toc mt-1 mb-1" />
    </div>
  );
};
