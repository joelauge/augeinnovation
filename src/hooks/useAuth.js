import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Check for existing user data on app load
    const savedUser = localStorage.getItem('augeinnovation_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsSignedIn(true);
      setIsApproved(userData.approved || false);
      setUserRole(userData.role || 'pending');
    }
  }, []);

  const signIn = async (email, password) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user data with approval status
    const mockUser = {
      id: 'user_' + Date.now(),
      email,
      firstName: email.split('@')[0],
      lastName: 'User',
      role: 'pending', // pending, approved, admin
      approved: false, // Will be set to true by admin
      approvedBy: null,
      approvedAt: null,
      createdAt: new Date().toISOString(),
      // Admin users are pre-approved
      ...(email.includes('admin') && {
        role: 'admin',
        approved: true,
        approvedBy: 'system',
        approvedAt: new Date().toISOString()
      })
    };

    setUser(mockUser);
    setIsSignedIn(true);
    setIsApproved(mockUser.approved);
    setUserRole(mockUser.role);

    // Save to localStorage
    localStorage.setItem('augeinnovation_user', JSON.stringify(mockUser));

    return { success: true, user: mockUser };
  };

  const signUp = async (email, password, firstName, lastName) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock user data for new signup
    const mockUser = {
      id: 'user_' + Date.now(),
      email,
      firstName,
      lastName,
      role: 'pending',
      approved: false,
      approvedBy: null,
      approvedAt: null,
      createdAt: new Date().toISOString()
    };

    setUser(mockUser);
    setIsSignedIn(true);
    setIsApproved(false);
    setUserRole('pending');

    // Save to localStorage
    localStorage.setItem('augeinnovation_user', JSON.stringify(mockUser));

    return { success: true, user: mockUser };
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
    setIsApproved(false);
    setUserRole(null);
    localStorage.removeItem('augeinnovation_user');
  };

  // Admin functions
  const approveUser = (userId) => {
    if (userRole !== 'admin') return false;
    
    // In a real app, this would be an API call
    const updatedUser = { ...user, approved: true, approvedBy: user.id, approvedAt: new Date().toISOString() };
    setUser(updatedUser);
    setIsApproved(true);
    localStorage.setItem('augeinnovation_user', JSON.stringify(updatedUser));
    return true;
  };

  const rejectUser = (userId) => {
    if (userRole !== 'admin') return false;
    
    // In a real app, this would be an API call
    const updatedUser = { ...user, approved: false, approvedBy: null, approvedAt: null };
    setUser(updatedUser);
    setIsApproved(false);
    localStorage.setItem('augeinnovation_user', JSON.stringify(updatedUser));
    return true;
  };

  return {
    user,
    isSignedIn,
    isApproved,
    userRole,
    signIn,
    signUp,
    signOut,
    approveUser,
    rejectUser
  };
}; 