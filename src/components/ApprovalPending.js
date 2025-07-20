import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Shield, User, LogOut } from 'lucide-react';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const ApprovalPending = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-carbon flex flex-col">
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
                <p className="text-sm text-titanium">Client Portal</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <div className="flex items-center space-x-2 text-titanium">
                <User className="w-5 h-5" />
                <span className="font-tech">{user?.firstName} {user?.lastName}</span>
              </div>
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
      <main className="flex-1 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="cyber-card max-w-2xl w-full text-center"
        >
          {/* Approval Status Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center">
                <Clock className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyber-orange rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-cyber font-bold neon-text mb-4"
          >
            ACCOUNT PENDING APPROVAL
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-titanium text-lg mb-8 leading-relaxed"
          >
            Thank you for registering with Auge Innovation! Your account is currently under review by our security team. 
            This process typically takes 24-48 hours during business days.
          </motion.p>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/50 border border-cyber-blue/30 rounded-lg p-6 mb-8"
          >
            <h3 className="text-cyber-blue font-cyber font-bold text-lg mb-4">ACCOUNT DETAILS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <p className="text-titanium text-sm">Name</p>
                <p className="text-white font-tech">{user?.firstName} {user?.lastName}</p>
              </div>
              <div>
                <p className="text-titanium text-sm">Email</p>
                <p className="text-white font-tech">{user?.emailAddresses?.[0]?.emailAddress}</p>
              </div>
              <div>
                <p className="text-titanium text-sm">Registration Date</p>
                <p className="text-white font-tech">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-titanium text-sm">Status</p>
                <p className="text-cyber-orange font-tech font-bold">PENDING APPROVAL</p>
              </div>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 border border-cyber-blue/30 rounded-lg p-6 mb-8"
          >
            <h3 className="text-cyber-blue font-cyber font-bold text-lg mb-4">WHAT HAPPENS NEXT?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyber-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <p className="text-titanium">Our security team will review your registration details</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyber-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="text-titanium">You'll receive an email notification once approved</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-cyber-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <p className="text-titanium">Access to our advanced training systems will be granted</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-titanium"
          >
            <p className="mb-2">Questions about your account status?</p>
            <p className="text-cyber-blue font-tech">
              Contact: <span className="text-white">support@augeinnovation.com</span>
            </p>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default ApprovalPending; 