import type { MarkedExtension, Tokens } from 'marked';

export const headingExtention: MarkedExtension = {
  renderer: {
    heading(token: Tokens.Heading) {
      const slug = slugify(token.raw || token.text);

      // バッククォートを除去して中身だけ取り出し
      const text = (token.text || '').replace(/`(.*?)`/g, '$1');
      // HTMLエスケープする（タグっぽい文字列を文字列として表示）
      const cleanText = escapeHtml(text);

      return `<h${token.depth} id="${slug}">${cleanText}</h${token.depth}>`;
    },
  },
};

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
