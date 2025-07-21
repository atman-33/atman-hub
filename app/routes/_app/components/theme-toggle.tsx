import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '~/stores/theme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="glass glow-on-hover rounded-2xl p-3 border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-110 hover:rotate-12 backdrop-blur-md group"
    >
      <div className="relative">
        {theme === 'light' ? (
          <Sun className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-300" />
        ) : (
          <Moon className="h-5 w-5 text-white/80 group-hover:text-white transition-colors duration-300" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </button>
  );
}
