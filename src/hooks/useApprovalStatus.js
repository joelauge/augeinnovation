import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
// import { sendUserSignupNotification } from '../services/emailService';

export const useApprovalStatus = () => {
  const { user } = useUser();
  const [approvalStatus, setApprovalStatus] = useState('pending');
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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