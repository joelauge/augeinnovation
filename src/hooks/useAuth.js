import { useUser, useClerk } from '@clerk/clerk-react';

export const useAuth = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  
  return {
    user,
    isLoaded,
    isSignedIn,
    signOut,
  };
}; 