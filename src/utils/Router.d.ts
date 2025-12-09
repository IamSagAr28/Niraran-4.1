import React from 'react';

export interface RouteProps {
  path: string;
  component: React.ComponentType<any>;
}

export const Router: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}>;

export const Route: React.FC<RouteProps>;

export const useRouter: () => {
  currentPath: string;
  navigateTo: (path: string) => void;
};
