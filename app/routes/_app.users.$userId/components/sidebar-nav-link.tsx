import { NavLink } from 'react-router';

interface SidebarNavLinkProps {
  to: string;
  children: React.ReactNode;
}

export const SidebarNavLink = ({ to, children }: SidebarNavLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive, isPending }) => {
        return isActive
          ? 'rounded-md font-bold'
          : isPending
            ? 'text-primary-500'
            : 'text-primary-500 hover:text-primary-700';
      }}
    >
      <div>{children}</div>
    </NavLink>
  );
};
