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
    <div className="flex flex-col items-center gap-8 py-12">
      {/* Profile Image with floating animation and glow */}
      <div className="relative float">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full blur-lg opacity-75 animate-pulse"></div>
        <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-white/30 shadow-2xl">
          <img
            src={imageUrl}
            alt="User profile avatar"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        {/* Decorative ring */}
        <div
          className="absolute inset-0 rounded-full border-2 border-white/20 animate-spin"
          style={{ animationDuration: '8s' }}
        ></div>
      </div>

      {/* Bio with enhanced typography */}
      <div className="max-w-2xl text-center">
        <p className="text-lg leading-relaxed text-white/90 dark:text-white/90 font-light tracking-wide">
          {bio}
        </p>
      </div>

      {/* Social Links with modern glass buttons */}
      <div className="flex gap-6">
        {socialLinks.map((link) => (
          <Button
            key={link.name}
            variant="ghost"
            className="glass glow-on-hover rounded-2xl p-4 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110 backdrop-blur-md"
            asChild
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white transition-colors duration-300"
            >
              {link.icon}
              <span className="sr-only">{link.name}</span>
            </a>
          </Button>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
    </div>
  );
}
