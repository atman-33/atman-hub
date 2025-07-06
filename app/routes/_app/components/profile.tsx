import { Button } from '~/components/ui/button';

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface ProfileProps {
  imageUrl: string;
  bio: React.ReactNode;
  socialLinks: SocialLink[];
}

export function Profile({ imageUrl, bio, socialLinks }: ProfileProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-8">
      <div className="relative h-32 w-32 overflow-hidden rounded-full border-2 border-primary">
        <img
          src={imageUrl}
          alt="User profile avatar"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose dark:prose-invert max-w-none text-center">
        {bio}
      </div>

      <div className="flex gap-4">
        {socialLinks.map((link) => (
          <Button
            key={link.name}
            variant="ghost"
            className="transition-all duration-300 transform hover:scale-110 "
            asChild
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="dark:text-white"
            >
              {link.icon}
              <span className="sr-only">{link.name}</span>
            </a>
          </Button>
        ))}
      </div>
    </div>
  );
}
