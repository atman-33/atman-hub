import type { ElementContent } from 'hast';
import type { ShikiTransformer } from 'shiki';

interface TransformerAddCopyButtonOptions {
  toggle?: number;
}

const transformerAddCopyButton = (
  options: TransformerAddCopyButtonOptions = {},
): ShikiTransformer => {
  const toggleMs = options.toggle || 2000;

  return {
    name: 'transformer-add-copy-button',

    pre(node) {
      const button: ElementContent = {
        type: 'element',
        tagName: 'button',
        properties: {
          className: ['copy'],
          dataCode: this.source,
          type: 'button',
        },
        children: [
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['ready'] },
            children: [],
          },
          {
            type: 'element',
            tagName: 'span',
            properties: { className: ['success'] },
            children: [],
          },
        ],
      };

      node.children.push(button);

      // MutationObserverを使用してボタンにイベントをバインド
      const observer = new MutationObserver(() => {
        const buttons = document.querySelectorAll('button.copy');
        for (const btn of buttons) {
          if (!btn.hasAttribute('data-bound')) {
            btn.setAttribute('data-bound', 'true'); // 二重バインド防止
            btn.addEventListener('click', () => {
              // console.log('clicked!');
              const code = btn.getAttribute('data-code');
              if (code) {
                navigator.clipboard.writeText(code);
                btn.classList.add('copied');
                setTimeout(() => btn.classList.remove('copied'), toggleMs);
              }
            });
          }
        }
      });

      // 監視対象のノードを指定
      // NOTE: 監視対象のノードを指定しないと、ページ遷移した直後にボタンがクリックできない
      observer.observe(document.body, { childList: true, subtree: true });
    },
  };
};

export { transformerAddCopyButton };
