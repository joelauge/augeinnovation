import React, { createContext, useContext, useState, useEffect } from 'react';

const MockAuthContext = createContext();

export const useMockAuth = () => {
  const context = useContext(MockAuthContext);
  if (!context) {
    throw new Error('useMockAuth must be used within a MockAuthProvider');
  }
  return context;
};

export const MockAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email, password) => {
    // Mock successful sign in
    const mockUser = {
      id: 'mock_user_123',
      emailAddresses: [{ emailAddress: email }],
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      imageUrl: 'https://via.placeholder.com/150',
      createdAt: new Date().toISOString(),
    };
    
    setUser(mockUser);
    return { status: 'complete' };
  };

  const signUp = async (email, password) => {
    // Mock successful sign up
    return signIn(email, password);
  };

  const signOut = async () => {
    setUser(null);
    return { status: 'complete' };
  };

  const value = {
    user,
    isLoaded,
    isSignedIn: !!user,
    signIn,
    signUp,
    signOut,
  };

  return (
    <MockAuthContext.Provider value={value}>
      {children}
    </MockAuthContext.Provider>
  );
}; 