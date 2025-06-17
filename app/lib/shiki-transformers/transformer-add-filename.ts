import type { ShikiTransformer } from 'shiki';

const transformerAddFilename = (filename?: string): ShikiTransformer => {
  return {
    name: 'transformer-add-filename',
    pre(node) {
      if (!filename) return;

      const span = {
        type: 'element' as const,
        tagName: 'span',
        properties: {
          class: 'filename',
        },
        children: [
          {
            type: 'text' as const,
            value: filename,
          },
        ],
      };

      node.children.push(span);
    },
  };
};

export { transformerAddFilename };
