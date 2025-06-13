import '~/lib/shiki-transformers/transformer-add-copy-button.css';
import './post-preview.css';

import { ClientOnly } from '~/components/shared/client-only';

interface PostPreviewProps {
  html: string;
  className?: string;
}

export const PostPreview = ({ html, className }: PostPreviewProps) => {
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
