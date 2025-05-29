import '~/lib/shiki-transformers/transformer-add-copy-button.css';
import './preview.css';

import { ClientOnly } from '~/components/shared/client-only';
import { useDocStore } from '../stores/doc-store';

interface PreviewProps {
  className?: string;
}

export const Preview = ({ className }: PreviewProps) => {
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
