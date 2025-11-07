import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

// Safe wrappers for Clerk hooks
// These assume ClerkProvider is always present (handled in index.js)
export const useSafeUser = () => {
  const result = useUser();
  return result || { user: null, isLoaded: true, isSignedIn: false };
};

export const useSafeAuth = () => {
  const result = useClerkAuth();
  return result || { isSignedIn: false, isLoaded: true, signOut: async () => {} };
};

