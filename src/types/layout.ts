import { ReactNode } from 'react';

export interface ILayoutProps {
  children: ReactNode;
}

export interface INavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface IHeaderProps {
  navItems: INavItem[];
  currentPath: string;
}

export interface IFooterProps {
  showAttribution?: boolean;
} 