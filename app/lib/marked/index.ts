import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
} from '@shikijs/transformers';
import { Marked, type Tokens } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { highlighter } from '~/lib/highlighter';
import { transformerAddCopyButton } from '~/lib/shiki-transformers/transformer-add-copy-button';

// NOTE:
// store側では、getMarked()でインスタンス化したMarkedを扱うこと。
// 仮に、const marked = new Marked(...) とした場合のmarkedを扱うと、transformersの処理が画面に反映されないため。

/**
 * Creates and returns a configured instance of the `Marked` class.
 *
 * The instance is configured with GitHub Flavored Markdown (GFM) and line breaks enabled.
 * It also uses a custom highlight function to syntax highlight code blocks.
 *
 * The highlight function uses a highlighter to convert code to HTML, applying the 'github-dark' theme.
 * It also includes several transformers for additional functionality:
 * - `transformerNotationDiff()`: Handles diff notation.
 * - `transformerNotationHighlight()`: Handles highlight notation.
 * - `transformerNotationFocus()`: Handles focus notation.
 * - `transformerAddCopyButton()`: Adds a copy button to code blocks.
 *
 * @returns {Marked} A configured instance of the `Marked` class.
 */
const getMarked = () => {
  const marked = new Marked({
    gfm: true,
    breaks: true,
    renderer: {
      heading(this, token: Tokens.Heading) {
        const slug = slugify(token.raw || token.text);

        // バッククォートを除去して中身だけ取り出し
        const text = (token.text || '').replace(/`(.*?)`/g, '$1');
        // HTMLエスケープする（タグっぽい文字列を文字列として表示）
        const cleanText = escapeHtml(text);

        return `<h${token.depth} id="${slug}">${cleanText}</h${token.depth}>`;
      },
    },
  });

  marked.use(
    markedHighlight({
      highlight(code, lang) {
        const language = highlighter.getLoadedLanguages().includes(lang)
          ? lang
          : 'plaintext';
        return highlighter.codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
          transformers: [
            transformerNotationDiff(),
            transformerNotationHighlight(),
            transformerNotationFocus(),
            transformerAddCopyButton(),
          ],
        });
      },
    }),
  );

  return marked;
};

export { getMarked };

const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // 記号を除去
    .replace(/\s+/g, '-'); // 空白をハイフンに

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
