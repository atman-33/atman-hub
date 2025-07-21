import { Link } from 'react-router';
import { siteConfig } from '~/config/site-config';

const Footer = () => {
  const handleContactClick = () => {
    window.location.href = `mailto:${siteConfig.contactEmail}`;
  };

  return (
    <footer className="relative mt-16 py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        {/* Glass container */}
        <div className="glass rounded-3xl p-8 border-white/10 text-center">
          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
            <Link
              to="/"
              className="glass rounded-2xl px-6 py-3 text-white/80 hover:text-white border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-md"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={handleContactClick}
              className="glass rounded-2xl px-6 py-3 text-white/80 hover:text-white border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 hover:shadow-lg backdrop-blur-md cursor-pointer"
            >
              Contact
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-8"></div>

          {/* Made with love section */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="text-white/70 text-sm">Made with</span>
            <div className="relative">
              <span className="text-red-400 text-lg animate-pulse">♥</span>
              <div className="absolute inset-0 text-red-400 text-lg animate-ping opacity-75">
                ♥
              </div>
            </div>
            <span className="text-white/70 text-sm">by</span>
            <span className="gradient-text font-semibold">Atman</span>
            <a
              href={siteConfig.xUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 glass rounded-xl border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110 hover:rotate-12 backdrop-blur-md"
              aria-label="Atman on X"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white/80 hover:text-white transition-colors duration-300"
              >
                <title>X (formerly Twitter) icon</title>
                <path d="M18.901 1.144h3.68l-8.58 9.873 9.479 11.083h-7.795l-6.398-7.093-7.29 7.093h-3.68l8.948-10.36L0 1.144h8.178l5.242 6.136L18.901 1.144zm-1.161 17.52h1.65L7.989 3.01H6.13l11.609 15.654z" />
              </svg>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-white/50 text-xs">
            &copy; {new Date().getFullYear()} AtmanHub. All Rights Reserved.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-1/4 w-px h-8 bg-gradient-to-t from-white/20 to-transparent"></div>
      <div className="absolute bottom-0 right-1/4 w-px h-8 bg-gradient-to-t from-white/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;
