import type { MarkedExtension, Tokens } from 'marked';

export const messageExtension: MarkedExtension = {
  extensions: [
    {
      name: 'message',
      level: 'block',
      tokenizer(src: string) {
      const rule = /^:::\s*message\s*\n([\s\S]+?)\n:::/;
      const match = rule.exec(src);
      if (match) {
        return {
            type: 'message',
            raw: match[0],
            text: match[1].trim(),
          };
        }
      },
      renderer(token: Tokens.Generic) {
        return `<div class="message-box"><span class="icon-message"></span><div class="message-content">${token.text}</div></div>`;
    },
  },
],
};
