import React, { useState, useEffect } from 'react';

// Custom event for navigation
const PUSH_STATE_EVENT = 'pushstate';

// Simple Router Hook
export const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener(PUSH_STATE_EVENT, handleLocationChange);
    
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener(PUSH_STATE_EVENT, handleLocationChange);
    };
  }, []);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event(PUSH_STATE_EVENT));
  };

  return {
    currentPath,
    navigateTo
  };
};

// Simple Router Component
export const Router = ({ children, fallback = null }) => {
  const { currentPath } = useRouter();

  const childArray = React.Children.toArray(children);
  const matchedChild = childArray.find(child => {
    return React.isValidElement(child) && child.props.path === currentPath;
  });

  if (matchedChild) {
    return matchedChild;
  }

  // Return fallback component for 404 pages
  return fallback;
};

// Route Component
export const Route = ({ path, component: Component }) => {
  return <Component />;
};