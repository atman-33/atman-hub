import type { MarkedExtension, Tokens } from 'marked';

export const messageExtension: MarkedExtension = {
  renderer: {
    paragraph(token: Tokens.Paragraph) {
      const rule = /^:::\s*message\s*\n([\s\S]+?)\n:::/;
      const match = rule.exec(token.raw);
      if (match) {
        const messageText = match[1].trim();
        return `<div class="message-box"><span class="icon-message"></span><p class="message-content">${messageText}</p></div>`;
      }
      return `<p>${token.text}</p>`;
    },
  },
};
