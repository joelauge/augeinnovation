import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const useApprovalStatus = () => {
  const { user } = useUser();
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState('pending');

  useEffect(() => {
    const checkApprovalStatus = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        // In production, this would make an API call to check approval status
        // For now, we'll use mock logic based on email patterns
        
        const userEmail = user.emailAddresses?.[0]?.emailAddress;
        
        if (!userEmail) {
          setApprovalStatus('pending');
          setIsApproved(false);
          setIsLoading(false);
          return;
        }

        // Mock approval logic - in production, this would come from your backend
        let status = 'pending';
        let approved = false;

        // Auto-approve admin users
        if (userEmail.includes('admin')) {
          status = 'approved';
          approved = true;
        }
        // Auto-approve certain domains for demo purposes
        else if (
          userEmail.includes('@lawenforcement.gov') ||
          userEmail.includes('@military.mil') ||
          userEmail.includes('@swat.gov') ||
          userEmail.includes('@marines.mil') ||
          userEmail.includes('@augeinnovation.com')
        ) {
          status = 'approved';
          approved = true;
        }
        // For demo purposes, auto-approve after a short delay
        else {
          // Simulate approval after 5 seconds for demo
          setTimeout(() => {
            setApprovalStatus('approved');
            setIsApproved(true);
          }, 5000);
        }

        setApprovalStatus(status);
        setIsApproved(approved);
        setIsLoading(false);

      } catch (error) {
        console.error('Error checking approval status:', error);
        setApprovalStatus('pending');
        setIsApproved(false);
        setIsLoading(false);
      }
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

export default useApprovalStatus; 