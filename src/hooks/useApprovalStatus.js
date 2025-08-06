import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { sendUserSignupNotification } from '../services/emailService';

export const useApprovalStatus = () => {
  const [isApproved, setIsApproved] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(true);

  // Always call hooks (React rule), but handle null cases
  const { user } = useUser();

  // Check if Clerk is properly configured
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = clerkPubKey && clerkPubKey !== 'pk_test_your_clerk_key_here';

  useEffect(() => {
    const checkApprovalStatus = async () => {
      if (!user) return;

      const userEmail = user.emailAddresses?.[0]?.emailAddress;
      console.log('🔍 DEBUG: useApprovalStatus - userEmail:', userEmail);

      // Only auto-approve if user is one of the two admins
      let status;
      let approved;
      if (userEmail === 'pierre@augeinnovation.com' || userEmail === 'joelauge@gmail.com') {
        status = 'approved';
        approved = true;
      } else {
        status = 'pending';
        approved = false;
      }
      setApprovalStatus(status);
      setIsApproved(approved);
      setIsLoading(false);

      // Email notifications disabled for now
    };

    checkApprovalStatus();
  }, [user]);

  const approveUser = async (userId) => {
    // In production, this would make an API call to approve the user
    console.log('Approving user:', userId);
    
    // For demo purposes, immediately approve
    setApprovalStatus('approved');
    setIsApproved(true);
    
    return { success: true };
  };

  const rejectUser = async (userId) => {
    // In production, this would make an API call to reject the user
    console.log('Rejecting user:', userId);
    
    setApprovalStatus('rejected');
    setIsApproved(false);
    
    return { success: true };
  };

  return {
    isApproved,
    isLoading,
    approvalStatus,
    approveUser,
    rejectUser,
    user
  };
}; 