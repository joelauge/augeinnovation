import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Trash2 } from 'lucide-react';
import { sendUserApprovalNotification, sendUserRejectionNotification } from '../services/emailService';
import { fetchUsers, approveUser, rejectUser, deleteUser } from '../services/adminApi';

// Check if Clerk is properly configured
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = clerkPubKey && clerkPubKey !== 'pk_test_your_clerk_key_here';

// Fallback AdminPanel component when Clerk is not configured
const FallbackAdminPanel = () => {
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-cyber-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img 
                src="/images/augeinnovation_logo_words512px.png" 
                alt="Auge Innovation" 
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-white rounded-md transition-all duration-200 hover:scale-105"
              >
                DASHBOARD
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-cyber-red hover:bg-cyber-red/80 text-white rounded-md transition-all duration-200 hover:scale-105"
              >
                SIGN OUT
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
            Admin Panel
          </h1>

        </motion.div>
      </main>
    </div>
  );
};

// Main AdminPanel component with Clerk integration
const ClerkAdminPanel = () => {
  // Always call hooks (React rule), but handle null cases
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  // Get user email for admin verification
  const userEmail = user?.emailAddresses?.[0]?.emailAddress || '';
  const isAdmin = userEmail === 'joelauge@gmail.com' || userEmail === 'pierre@augeinnovation.com';

  console.log('🔍 DEBUG: AdminPanel component loaded');
  console.log('🔍 DEBUG: user object:', user);
  console.log('🔍 DEBUG: userEmail:', userEmail);
  console.log('🔍 DEBUG: isAdmin:', isAdmin);
  console.log('🔍 DEBUG: user.emailAddresses:', user?.emailAddresses);

  // Redirect non-admin users
  useEffect(() => {
    if (user && !isAdmin) {
      console.log('Non-admin user attempting to access admin panel, redirecting...');
      navigate('/dashboard');
    }
  }, [user, isAdmin, navigate]);

  // Load users when component mounts
  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  const loadUsers = async () => {
    try {
      console.log('AdminPanel: loadUsers called with userEmail:', userEmail);
      const users = await fetchUsers(userEmail);
      console.log('🔍 DEBUG: Fetched users:', users);
      
      const pending = users.filter(user => 
        user.public_metadata?.approvalStatus === 'pending'
      );
      const approved = users.filter(user => 
        user.public_metadata?.approvalStatus === 'approved'
      );
      
      setPendingUsers(pending);
      setApprovedUsers(approved);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId, userEmail);
      await loadUsers(); // Reload the list
    } catch (error) {
      console.error('Failed to approve user:', error);
    }
  };

  const handleReject = async (userId) => {
    try {
      await rejectUser(userId, userEmail);
      await loadUsers(); // Reload the list
    } catch (error) {
      console.error('Failed to reject user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId, userEmail);
      await loadUsers(); // Reload the list
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut();
      }
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      navigate('/');
    }
  };

  // Show loading state
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-blue mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Show access denied for non-admin users
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-cyber-red mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-6">You don't have permission to access the admin panel.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-cyber-blue hover:bg-cyber-blue/80 text-white rounded-md transition-all duration-200 hover:scale-105"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const filteredPendingUsers = pendingUsers.filter(user => 
    user.emailAddresses?.[0]?.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApprovedUsers = approvedUsers.filter(user => 
    user.emailAddresses?.[0]?.emailAddress?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-cyber-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img 
                src="/images/augeinnovation_logo_words512px.png" 
                alt="Auge Innovation" 
                className="h-8 w-auto"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <span>Admin: {userEmail}</span>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 bg-cyber-blue hover:bg-cyber-blue/80 text-white rounded-md transition-all duration-200 hover:scale-105"
              >
                DASHBOARD
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-cyber-red hover:bg-cyber-red/80 text-white rounded-md transition-all duration-200 hover:scale-105"
              >
                SIGN OUT
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
            Admin Panel
          </h1>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 bg-gray-800 border border-cyber-blue/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue/40"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-6 py-3 rounded-md transition-all duration-200 ${
                activeTab === 'pending'
                  ? 'bg-cyber-blue text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Pending ({filteredPendingUsers.length})
            </button>
            <button
              onClick={() => setActiveTab('approved')}
              className={`px-6 py-3 rounded-md transition-all duration-200 ${
                activeTab === 'approved'
                  ? 'bg-cyber-blue text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Approved ({filteredApprovedUsers.length})
            </button>
          </div>

          {/* Debug Information */}
          <div className="mb-6 p-4 bg-gray-800 border border-gray-600 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong>Debug Info:</strong> Active Tab: {activeTab}, Pending: {pendingUsers.length}, Approved: {approvedUsers.length}
            </p>
          </div>

          {/* Pending Users Tab */}
          {activeTab === 'pending' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-cyber-blue mb-4">Pending Approvals</h2>
              {filteredPendingUsers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No pending users found.</p>
                </div>
              ) : (
                filteredPendingUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyber-blue/20 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-cyber-blue mb-2">
                          {user.emailAddresses?.[0]?.emailAddress}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Registration Date: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="px-4 py-2 bg-cyber-green hover:bg-cyber-green/80 text-white rounded-md transition-all duration-200 hover:scale-105"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(user.id)}
                          className="px-4 py-2 bg-cyber-red hover:bg-cyber-red/80 text-white rounded-md transition-all duration-200 hover:scale-105"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Approved Users Tab */}
          {activeTab === 'approved' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-cyber-green mb-4">Approved Users</h2>
              {filteredApprovedUsers.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No approved users found.</p>
                </div>
              ) : (
                filteredApprovedUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyber-green/20 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-cyber-blue mb-2">
                          {user.emailAddresses?.[0]?.emailAddress}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Registration Date: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                        <p className="text-gray-400 text-sm">
                          Approved Date: {user.public_metadata?.approvedAt ? new Date(user.public_metadata.approvedAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="px-4 py-2 bg-cyber-red hover:bg-cyber-red/80 text-white rounded-md transition-all duration-200 hover:scale-105 flex items-center space-x-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

// Main AdminPanel component that chooses between Clerk and Fallback
const AdminPanel = () => {
  if (isClerkConfigured) {
    return <ClerkAdminPanel />;
  } else {
    return <FallbackAdminPanel />;
  }
};

export default AdminPanel; 