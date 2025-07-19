import { useState, useEffect } from 'react';

// Mock authentication system that works in both dev and production
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check if user is already signed in (from localStorage)
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsSignedIn(true);
    }
    setIsLoaded(true);
  }, []);

  const signIn = async (email, password) => {
    // Mock sign in - accept any email/password
    const mockUser = {
      id: 'mock-user-123',
      email: email,
      firstName: 'Demo',
      lastName: 'User',
      fullName: 'Demo User',
      imageUrl: null,
      createdAt: new Date().toISOString(),
    };
    
    setUser(mockUser);
    setIsSignedIn(true);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    
    return { success: true };
  };

  const signUp = async (email, password, firstName, lastName) => {
    // Mock sign up
    const mockUser = {
      id: 'mock-user-123',
      email: email,
      firstName: firstName || 'Demo',
      lastName: lastName || 'User',
      fullName: `${firstName || 'Demo'} ${lastName || 'User'}`,
      imageUrl: null,
      createdAt: new Date().toISOString(),
    };
    
    setUser(mockUser);
    setIsSignedIn(true);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem('mockUser');
  };

  return {
    user,
    isLoaded,
    isSignedIn,
    signIn,
    signUp,
    signOut,
  };
}; 