import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useAuth } from '../hooks/useClerkAuth';
import { 
  ArrowLeft, 
  Check, 
  X, 
  Users, 
  Clock, 
  Shield,
  Mail
} from 'lucide-react';
import Footer from './Footer';

const AdminDashboard = () => {
  // const { userRole } = useAuth();
  const userRole = 'admin';
  const navigate = useNavigate();
  const [pendingUsers, setPendingUsers] = useState([]);

  // Mock pending users data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate loading pending users
    const mockPendingUsers = [
      {
        id: 'user_1',
        email: 'john.doe@police.gov',
        firstName: 'John',
        lastName: 'Doe',
        role: 'pending',
        approved: false,
        createdAt: '2025-01-15T10:30:00Z',
        organization: 'LAPD'
      },
      {
        id: 'user_2',
        email: 'sarah.smith@military.gov',
        firstName: 'Sarah',
        lastName: 'Smith',
        role: 'pending',
        approved: false,
        createdAt: '2025-01-14T14:20:00Z',
        organization: 'US Army'
      },
      {
        id: 'user_3',
        email: 'mike.johnson@swat.gov',
        firstName: 'Mike',
        lastName: 'Johnson',
        role: 'pending',
        approved: false,
        createdAt: '2025-01-13T09:15:00Z',
        organization: 'SWAT Team'
      }
    ];
    setPendingUsers(mockPendingUsers);
  }, []);

  const handleApprove = (userId) => {
    // In a real app, this would be an API call
    setPendingUsers(prev => prev.filter(user => user.id !== userId));
    // You could also update the user's status in your backend
  };

  const handleReject = (userId) => {
    // In a real app, this would be an API call
    setPendingUsers(prev => prev.filter(user => user.id !== userId));
    // You could also update the user's status in your backend
  };

  const handleSendEmail = (userEmail) => {
    // In a real app, this would trigger an email notification
    window.open(`mailto:${userEmail}?subject=Account Approval Update`);
  };

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-carbon flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-cyber font-bold text-white mb-4">ACCESS DENIED</h2>
          <p className="text-titanium mb-4">You don't have permission to access the admin dashboard.</p>
          <button onClick={() => navigate('/dashboard')} className="cyber-button">
            <ArrowLeft className="inline mr-2 w-4 h-4" />
            BACK TO DASHBOARD
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-carbon flex flex-col">
      {/* Header */}
      <header className="cyber-gradient border-b border-cyber-blue/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate('/dashboard')}
              className="cyber-button"
            >
              <ArrowLeft className="inline mr-2 w-4 h-4" />
              BACK TO DASHBOARD
            </button>
            
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <img 
                  src={process.env.PUBLIC_URL + "/images/augeinnovation_logo_512px.png"} 
                  alt="Auge Innovation Logo" 
                  className="w-16 h-16 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                  onClick={() => navigate('/')}
                  onError={(e) => {
                    console.error('Logo failed to load:', e.target.src);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <p className="text-sm text-titanium">Admin Dashboard</p>
            </div>
            
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <h1 className="text-4xl font-cyber font-bold neon-text mb-4">
              ADMIN DASHBOARD
            </h1>
            <p className="text-xl text-titanium">
              Manage user approvals and system access
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="cyber-card"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyber-blue/20 border border-cyber-blue rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-cyber-blue" />
                </div>
                <div>
                  <p className="text-titanium text-sm">Pending Approvals</p>
                  <p className="text-2xl font-cyber font-bold text-white">{pendingUsers.length}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="cyber-card"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyber-green/20 border border-cyber-green rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-cyber-green" />
                </div>
                <div>
                  <p className="text-titanium text-sm">Total Users</p>
                  <p className="text-2xl font-cyber font-bold text-white">24</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="cyber-card"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyber-purple/20 border border-cyber-purple rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyber-purple" />
                </div>
                <div>
                  <p className="text-titanium text-sm">Active Admins</p>
                  <p className="text-2xl font-cyber font-bold text-white">3</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Pending Users Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="cyber-card"
          >
            <h2 className="text-2xl font-cyber font-bold neon-text mb-6">
              PENDING USER APPROVALS
            </h2>

            {pendingUsers.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-16 h-16 text-cyber-blue mx-auto mb-4" />
                <p className="text-titanium text-lg">No pending approvals</p>
                <p className="text-titanium">All users have been processed</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cyber-blue/30">
                      <th className="text-left py-3 px-4 text-titanium font-cyber font-bold">User</th>
                      <th className="text-left py-3 px-4 text-titanium font-cyber font-bold">Organization</th>
                      <th className="text-left py-3 px-4 text-titanium font-cyber font-bold">Submitted</th>
                      <th className="text-left py-3 px-4 text-titanium font-cyber font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.map((pendingUser, index) => (
                      <motion.tr
                        key={pendingUser.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="border-b border-cyber-blue/10 hover:bg-cyber-blue/5"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-white font-cyber font-bold">
                              {pendingUser.firstName} {pendingUser.lastName}
                            </p>
                            <p className="text-titanium text-sm">{pendingUser.email}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-cyber-blue font-cyber">{pendingUser.organization}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-titanium">
                            {new Date(pendingUser.createdAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApprove(pendingUser.id)}
                              className="p-2 bg-cyber-green/20 border border-cyber-green/30 rounded-lg hover:bg-cyber-green/30 transition-colors"
                              title="Approve User"
                            >
                              <Check className="w-4 h-4 text-cyber-green" />
                            </button>
                            <button
                              onClick={() => handleReject(pendingUser.id)}
                              className="p-2 bg-red-600/20 border border-red-600/30 rounded-lg hover:bg-red-600/30 transition-colors"
                              title="Reject User"
                            >
                              <X className="w-4 h-4 text-red-400" />
                            </button>
                            <button
                              onClick={() => handleSendEmail(pendingUser.email)}
                              className="p-2 bg-cyber-blue/20 border border-cyber-blue/30 rounded-lg hover:bg-cyber-blue/30 transition-colors"
                              title="Send Email"
                            >
                              <Mail className="w-4 h-4 text-cyber-blue" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard; 