import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from '../utils/Router';

const MemberRoute = ({ component: Component }) => {
  const { isMember, isLoading, isAuthenticated } = useAuth();
  const { navigateTo } = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        navigateTo('/login');
      } else if (!isMember) {
        navigateTo('/membership');
      }
    }
  }, [isLoading, isAuthenticated, isMember, navigateTo]);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return isMember ? <Component /> : null;
};

export default MemberRoute;
