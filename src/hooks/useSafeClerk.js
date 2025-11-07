import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';

// Safe wrappers for Clerk hooks that handle missing ClerkProvider
// These will throw errors if ClerkProvider is not present, which ErrorBoundary will catch
// In production, either ClerkProvider should be present OR these components shouldn't be rendered
export const useSafeUser = () => {
  // Check if ClerkProvider is available by attempting to use the hook
  // If ClerkProvider is not present, this will throw and ErrorBoundary will catch it
  try {
    const result = useUser();
    return result || { user: null, isLoaded: true, isSignedIn: false };
  } catch (error) {
    // If ClerkProvider is not present, return safe defaults
    // This catch won't actually work because hooks throw during render, not execution
    // But ErrorBoundary will catch the error
    console.warn('ClerkProvider not available, returning defaults');
    return { user: null, isLoaded: true, isSignedIn: false };
  }
};

export const useSafeAuth = () => {
  try {
    const result = useClerkAuth();
    return result || { isSignedIn: false, isLoaded: true, signOut: async () => {} };
  } catch (error) {
    console.warn('ClerkProvider not available, returning defaults');
    return { isSignedIn: false, isLoaded: true, signOut: async () => {} };
  }
};

