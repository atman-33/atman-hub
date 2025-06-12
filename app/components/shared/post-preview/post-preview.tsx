import '~/lib/shiki-transformers/transformer-add-copy-button.css';
import './post-preview.css';

import { ClientOnly } from '~/components/shared/client-only';
import { useDocStore } from '../../../routes/_app.posts.$postId._index/stores/doc-store';

interface PostPreviewProps {
  className?: string;
}

export const PostPreview = ({ className }: PostPreviewProps) => {
  const html = useDocStore((state) => state.docHtml);

  return (
    <ClientOnly>
      {() => (
        <div
          className={`preview h-full overflow-y-auto rounded-md border px-3 py-2 ${className}`}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      )}
    </ClientOnly>
  );
};
