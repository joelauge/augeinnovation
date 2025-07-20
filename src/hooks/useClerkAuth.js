import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const { isSignedIn, isLoaded } = useClerkAuth();
  const { user } = useUser();
  const [isApproved, setIsApproved] = useState(false);
  const [userRole, setUserRole] = useState('pending');

  useEffect(() => {
    console.log('Clerk Auth State:', { isSignedIn, isLoaded, user: user?.id });
    
    if (isSignedIn && user) {
      // Check if user is admin (email contains 'admin')
      const isAdmin = user.emailAddresses?.[0]?.emailAddress?.includes('admin') || false;
      
      console.log('User email:', user.emailAddresses?.[0]?.emailAddress, 'isAdmin:', isAdmin);
      
      if (isAdmin) {
        setUserRole('admin');
        setIsApproved(true);
      } else {
        // For now, all non-admin users are pending approval
        // In production, you'd check Clerk user metadata for approval status
        setUserRole('pending');
        setIsApproved(false);
      }
    } else {
      setUserRole('pending');
      setIsApproved(false);
    }
  }, [isSignedIn, user]);

  const signOut = async () => {
    try {
      await user?.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    user: user ? {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses?.[0]?.emailAddress,
      fullName: user.fullName,
      imageUrl: user.imageUrl,
      createdAt: user.createdAt
    } : null,
    isSignedIn,
    isLoaded,
    isApproved,
    userRole,
    signOut
  };
}; 