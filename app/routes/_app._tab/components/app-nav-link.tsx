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
      className={({ isActive, isPending }) =>
        cn(
          'flex items-center justify-center px-4 py-2 text-sm font-medium transition-colors',
          'border-b-2 border-transparent',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
          {
            'text-muted-foreground hover:text-foreground': !isActive,
            'border-primary text-foreground font-semibold': isActive,
            'cursor-wait opacity-50': isPending,
          },
        )
      }
    >
      {children}
    </NavLink>
  );
};
