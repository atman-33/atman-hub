import { NavLink } from 'react-router';

import { cn } from '~/lib/utils';

export const AppNavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      preventScrollReset
      className={({ isActive, isPending }) =>
        cn(
          'relative flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 rounded-xl',
          'focus:!ring-transparent overflow-hidden',
          {
            'text-white/70 hover:text-white hover:bg-white/10': !isActive,
            'text-white bg-white/20 shadow-lg backdrop-blur-md border border-white/30':
              isActive,
            'cursor-wait opacity-50': isPending,
          },
        )
      }
    >
      {/* Background glow effect for active state */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 transition-opacity duration-300" />

      <span className="relative z-10 font-semibold tracking-wide">
        {children}
      </span>
    </NavLink>
  );
};
