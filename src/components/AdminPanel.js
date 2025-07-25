import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { sendUserApprovalNotification, sendUserRejectionNotification } from '../services/emailService';
import { 
  User, 
  LogOut, 
  Shield, 
  Check, 
  X, 
  Clock, 
  Users, 
  Search
} from 'lucide-react';
import { fetchUsers, approveUser, rejectUser } from '../services/adminApi';

const AdminPanel = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  // Check if user is admin
  const isAdmin = user?.emailAddresses?.[0]?.emailAddress === 'pierre@augeinnovation.com' || user?.emailAddresses?.[0]?.emailAddress === 'joelauge@gmail.com';

  // Fetch users from backend API
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setPendingUsers(users.filter(u => u.approvalStatus === 'pending'));
        setApprovedUsers(users.filter(u => u.approvalStatus === 'approved'));
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };
    loadUsers();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      navigate('/');
    }
  };

  const handleApprove = async (userId) => {
    try {
      await approveUser(userId);
      // Refresh user list
      const users = await fetchUsers();
      setPendingUsers(users.filter(u => u.approvalStatus === 'pending'));
      setApprovedUsers(users.filter(u => u.approvalStatus === 'approved'));
    } catch (err) {
      console.error('Failed to approve user:', err);
    }
  };

  const handleReject = async (userId) => {
    try {
      await rejectUser(userId);
      // Refresh user list
      const users = await fetchUsers();
      setPendingUsers(users.filter(u => u.approvalStatus === 'pending'));
      setApprovedUsers(users.filter(u => u.approvalStatus === 'approved'));
    } catch (err) {
      console.error('Failed to reject user:', err);
    }
  };

  const filteredPendingUsers = pendingUsers.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredApprovedUsers = approvedUsers.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-carbon flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="cyber-card max-w-md text-center"
        >
          <Shield className="w-16 h-16 text-cyber-red mx-auto mb-4" />
          <h2 className="text-2xl font-cyber font-bold text-white mb-4">ACCESS DENIED</h2>
          <p className="text-titanium mb-6">You don't have permission to access the admin panel.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="cyber-button"
          >
            RETURN TO DASHBOARD
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-carbon">
      {/* Header */}
      <header className="cyber-gradient border-b border-cyber-blue/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <img 
                src={process.env.PUBLIC_URL + "/images/augeinnovation_logo_512px.png"} 
                alt="Auge Innovation Logo" 
                className="w-24 h-24 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => navigate('/')}
                onError={(e) => {
                  console.error('Logo failed to load:', e.target.src);
                  e.target.style.display = 'none';
                }}
              />
              <div>
                <p className="text-sm text-titanium">Admin Panel</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2 text-titanium">
                <Shield className="w-5 h-5 text-cyber-purple" />
                <span className="font-tech">{user?.firstName} {user?.lastName}</span>
              </div>
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-cyber-blue/30 text-cyber-blue hover:border-cyber-blue/50 hover:bg-cyber-blue/10 transition-all duration-300 rounded-lg font-cyber font-bold text-sm"
              >
                DASHBOARD
              </button>
              <button 
                onClick={handleSignOut}
                className="cyber-button text-sm px-3 py-2 whitespace-nowrap"
              >
                <LogOut className="w-4 h-4 mr-1" />
                SIGN OUT
              </button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cyber-card mb-8"
        >
          <h1 className="text-4xl font-cyber font-bold neon-text mb-2">
            ADMIN PANEL
          </h1>
          <p className="text-titanium">Manage user approvals and access control</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="cyber-card">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-cyber-orange rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-titanium text-sm">Pending Approval</p>
                <p className="text-2xl font-cyber font-bold text-white">{pendingUsers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="cyber-card">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-cyber-green rounded-lg flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-titanium text-sm">Approved Users</p>
                <p className="text-2xl font-cyber font-bold text-white">{approvedUsers.length}</p>
              </div>
            </div>
          </div>
          
          <div className="cyber-card">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-cyber-blue rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-titanium text-sm">Total Users</p>
                <p className="text-2xl font-cyber font-bold text-white">{pendingUsers.length + approvedUsers.length}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="cyber-card mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-titanium w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 pl-10 pr-4 py-2 bg-gray-800 border border-cyber-blue/30 rounded-lg text-white placeholder-titanium focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent"
              />
            </div>

            {/* Tabs */}
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-lg font-cyber font-bold text-sm transition-all duration-300 ${
                  activeTab === 'pending'
                    ? 'bg-cyber-orange text-white'
                    : 'bg-gray-800 text-titanium hover:bg-gray-700'
                }`}
              >
                <Clock className="w-4 h-4 inline mr-2" />
                PENDING ({pendingUsers.length})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-4 py-2 rounded-lg font-cyber font-bold text-sm transition-all duration-300 ${
                  activeTab === 'approved'
                    ? 'bg-cyber-green text-white'
                    : 'bg-gray-800 text-titanium hover:bg-gray-700'
                }`}
              >
                <Check className="w-4 h-4 inline mr-2" />
                APPROVED ({approvedUsers.length})
              </button>
            </div>
          </div>
        </motion.div>

        {/* User List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="cyber-card"
        >
          {activeTab === 'pending' ? (
            <div>
              <h3 className="text-xl font-cyber font-bold text-white mb-6">PENDING APPROVALS</h3>
              {filteredPendingUsers.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="w-16 h-16 text-titanium mx-auto mb-4" />
                  <p className="text-titanium">No pending users found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPendingUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-800/50 border border-cyber-orange/30 rounded-lg p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <User className="w-5 h-5 text-cyber-blue" />
                            <h4 className="text-lg font-cyber font-bold text-white">
                              {user.firstName} {user.lastName}
                            </h4>
                            <span className="px-2 py-1 bg-cyber-orange text-white text-xs font-bold rounded">
                              PENDING
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-titanium">Email</p>
                              <p className="text-white font-tech">{user.email}</p>
                            </div>
                            <div>
                              <p className="text-titanium">Organization</p>
                              <p className="text-white font-tech">{user.organization}</p>
                            </div>
                            <div>
                              <p className="text-titanium">Registration Date</p>
                              <p className="text-white font-tech">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApprove(user.id)}
                            className="px-4 py-2 bg-cyber-green hover:bg-cyber-green/80 text-white rounded-lg font-cyber font-bold text-sm transition-all duration-300 flex items-center space-x-2"
                          >
                            <Check className="w-4 h-4" />
                            <span>APPROVE</span>
                          </button>
                          <button
                            onClick={() => handleReject(user.id)}
                            className="px-4 py-2 bg-cyber-red hover:bg-cyber-red/80 text-white rounded-lg font-cyber font-bold text-sm transition-all duration-300 flex items-center space-x-2"
                          >
                            <X className="w-4 h-4" />
                            <span>REJECT</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-cyber font-bold text-white mb-6">APPROVED USERS</h3>
              {filteredApprovedUsers.length === 0 ? (
                <div className="text-center py-8">
                  <Check className="w-16 h-16 text-titanium mx-auto mb-4" />
                  <p className="text-titanium">No approved users found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredApprovedUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-800/50 border border-cyber-green/30 rounded-lg p-6"
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <User className="w-5 h-5 text-cyber-green" />
                        <h4 className="text-lg font-cyber font-bold text-white">
                          {user.firstName} {user.lastName}
                        </h4>
                        <span className="px-2 py-1 bg-cyber-green text-white text-xs font-bold rounded">
                          APPROVED
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-titanium">Email</p>
                          <p className="text-white font-tech">{user.email}</p>
                        </div>
                        <div>
                          <p className="text-titanium">Organization</p>
                          <p className="text-white font-tech">{user.organization}</p>
                        </div>
                        <div>
                          <p className="text-titanium">Registration Date</p>
                          <p className="text-white font-tech">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-titanium">Approved Date</p>
                          <p className="text-white font-tech">
                            {new Date(user.approvedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default AdminPanel; 