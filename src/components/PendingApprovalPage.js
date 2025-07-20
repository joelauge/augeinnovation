import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useAuth } from '../hooks/useClerkAuth';
import { Clock, Mail, ArrowLeft } from 'lucide-react';
import Footer from './Footer';

const PendingApprovalPage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-carbon flex flex-col">
      {/* Header */}
      <header className="cyber-gradient border-b border-cyber-blue/30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={handleSignOut}
              className="cyber-button"
            >
              <ArrowLeft className="inline mr-2 w-4 h-4" />
              SIGN OUT
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
              <p className="text-sm text-titanium">Account Pending</p>
            </div>
            
            <div className="w-24"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="cyber-card mb-8">
            {/* Status Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="mx-auto mb-6 w-24 h-24 bg-cyber-blue/20 border-2 border-cyber-blue rounded-full flex items-center justify-center"
            >
              <Clock className="w-12 h-12 text-cyber-blue" />
            </motion.div>

            <h1 className="text-4xl font-cyber font-bold neon-text mb-6">
              ACCOUNT PENDING APPROVAL
            </h1>

            <p className="text-xl text-titanium mb-8 leading-relaxed">
              Thank you for your interest in Augé Innovations. Your account is currently under review by our administrative team.
            </p>

            <div className="bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-cyber font-bold text-white mb-4">
                ACCOUNT DETAILS
              </h2>
              <div className="space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-titanium">Name:</span>
                  <span className="text-white font-cyber">{user?.firstName} {user?.lastName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-titanium">Email:</span>
                  <span className="text-white font-cyber">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-titanium">Status:</span>
                  <span className="text-cyber-orange font-cyber font-bold">PENDING</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-titanium">Submitted:</span>
                  <span className="text-white font-cyber">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="cyber-card">
                <h3 className="text-xl font-cyber font-bold text-white mb-4">
                  WHAT HAPPENS NEXT?
                </h3>
                <div className="space-y-3 text-titanium text-left">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p>Our administrative team will review your account information</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p>You will receive an email notification once your account is approved</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mt-2 flex-shrink-0"></div>
                    <p>Upon approval, you'll have full access to our product catalog and services</p>
                  </div>
                </div>
              </div>

              <div className="cyber-card">
                <h3 className="text-xl font-cyber font-bold text-white mb-4">
                  NEED ASSISTANCE?
                </h3>
                <p className="text-titanium mb-4">
                  If you have any questions about your account status or need immediate assistance, please contact our team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => navigate('/contact')}
                    className="cyber-button"
                  >
                    <Mail className="inline mr-2 w-4 h-4" />
                    CONTACT SUPPORT
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="px-6 py-3 border border-cyber-blue/30 text-cyber-blue hover:border-cyber-blue/50 hover:bg-cyber-blue/10 transition-all duration-300 rounded-lg font-cyber font-bold"
                  >
                    <ArrowLeft className="inline mr-2 w-4 h-4" />
                    SIGN OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default PendingApprovalPage; 