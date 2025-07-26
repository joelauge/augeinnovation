import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useApprovalStatus } from '../hooks/useApprovalStatus';
import ApprovalPending from './ApprovalPending';
import { 
  Target, 
  Shield, 
  Bot, 
  Zap,
  User,
  LogOut,
  ArrowRight,
  Cpu
} from 'lucide-react';

// Check if Clerk is properly configured
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = clerkPubKey && clerkPubKey !== 'pk_test_your_clerk_key_here';

// Fallback Dashboard component when Clerk is not configured
const FallbackDashboard = () => {
  const navigate = useNavigate();
  
  const handleSignOut = () => {
    navigate('/');
  };

  const products = [
    {
      id: 'law-enforcement-targets',
      title: 'Law Enforcement - Live Fire AI Targets',
      price: 1000,
      period: 'per day',
      description: 'Advanced AI-powered targets designed specifically for law enforcement training scenarios',
      features: [
        'Real-time threat assessment',
        'Adaptive response patterns',
        'Safe live fire environment',
        'Comprehensive training analytics',
        'Modular target configurations'
      ],
      icon: <Target className="w-12 h-12" />,
      category: 'law-enforcement',
      color: 'from-cyber-blue to-cyber-purple'
    },
    {
      id: 'military-targets',
      title: 'Military - Live Fire AI Targets',
      price: 1000,
      period: 'per day',
      description: 'Military-grade AI targets for advanced combat training and tactical scenarios',
      features: [
        'Heavy weapons simulation',
        'Tactical movement patterns',
        'Multi-threat scenarios',
        'Combat readiness assessment',
        'Advanced AI algorithms'
      ],
      icon: <Shield className="w-12 h-12" />,
      category: 'military',
      color: 'from-cyber-red to-cyber-orange'
    },
    {
      id: 'armored-robots',
      title: 'Armored Modular Indoor/Outdoor Robots',
      price: 50000,
      period: 'one-time',
      description: 'Heavy-duty modular robots for both military and law enforcement applications',
      features: [
        'All-weather operation',
        'Modular weapon systems',
        'Advanced mobility',
        'Remote control capabilities',
        'Real-time video feed'
      ],
      icon: <Bot className="w-12 h-12" />,
      category: 'robots',
      color: 'from-cyber-green to-cyber-teal'
    },
    {
      id: 'training-systems',
      title: 'Next Generation Training Systems',
      price: 25000,
      period: 'one-time',
      description: 'Comprehensive training systems with AI-driven scenarios and analytics',
      features: [
        'AI-powered scenarios',
        'Performance analytics',
        'Customizable training modules',
        'Real-time feedback',
        'Multi-user support'
      ],
      icon: <Zap className="w-12 h-12" />,
      category: 'training',
      color: 'from-cyber-yellow to-cyber-orange'
    }
  ];

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
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 bg-cyber-red hover:bg-cyber-red/80 text-white rounded-md transition-all duration-200 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>SIGN OUT</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
            Welcome to Auge Innovation
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced Firearms Training Robots and AI-Powered Training Solutions
          </p>
          <div className="mt-6 p-4 bg-cyber-blue/10 border border-cyber-blue/20 rounded-lg">
            <p className="text-cyber-blue">
              ⚠️ Demo Mode: Clerk authentication is not configured. Please contact support for full access.
            </p>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyber-blue/20 rounded-lg p-6 hover:border-cyber-blue/40 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${product.color}`}>
                  {product.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyber-blue">${product.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">{product.period}</div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white">{product.title}</h3>
              <p className="text-gray-300 mb-4">{product.description}</p>
              
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-blue text-white font-bold py-3 px-6 rounded-md transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>VIEW DETAILS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Main Dashboard component with Clerk integration
const ClerkDashboard = () => {
  // Always call hooks (React rule), but handle null cases
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { isApproved, isLoading } = useApprovalStatus();

  // Fallback user data if Clerk is not configured
  const fallbackUser = { firstName: 'Demo', lastName: 'User', email: 'demo@augeinnovation.com' };
  const currentUser = user ? {
    firstName: user.firstName || 'User',
    lastName: user.lastName || '',
    email: user.emailAddresses?.[0]?.emailAddress || 'user@example.com'
  } : fallbackUser;

  // Determine user role (admin if email matches one of the two admin emails)
  const isAdmin = currentUser.email === 'joelauge@gmail.com' || currentUser.email === 'pierre@augeinnovation.com';

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut();
      }
      // Always navigate to home page after sign out
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      // Still navigate to home page even if sign out fails
      navigate('/');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyber-blue mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show approval pending page if user is not approved
  if (!isApproved) {
    return <ApprovalPending />;
  }

  const products = [
    {
      id: 'law-enforcement-targets',
      title: 'Law Enforcement - Live Fire AI Targets',
      price: 1000,
      period: 'per day',
      description: 'Advanced AI-powered targets designed specifically for law enforcement training scenarios',
      features: [
        'Real-time threat assessment',
        'Adaptive response patterns',
        'Safe live fire environment',
        'Comprehensive training analytics',
        'Modular target configurations'
      ],
      icon: <Target className="w-12 h-12" />,
      category: 'law-enforcement',
      color: 'from-cyber-blue to-cyber-purple'
    },
    {
      id: 'military-targets',
      title: 'Military - Live Fire AI Targets',
      price: 1000,
      period: 'per day',
      description: 'Military-grade AI targets for advanced combat training and tactical scenarios',
      features: [
        'Heavy weapons simulation',
        'Tactical movement patterns',
        'Multi-threat scenarios',
        'Combat readiness assessment',
        'Advanced AI algorithms'
      ],
      icon: <Shield className="w-12 h-12" />,
      category: 'military',
      color: 'from-cyber-red to-cyber-orange'
    },
    {
      id: 'armored-robots',
      title: 'Armored Modular Indoor/Outdoor Robots',
      price: 50000,
      period: 'one-time',
      description: 'Heavy-duty modular robots for both military and law enforcement applications',
      features: [
        'All-weather operation',
        'Modular weapon systems',
        'Advanced mobility',
        'Remote control capabilities',
        'Real-time video feed'
      ],
      icon: <Bot className="w-12 h-12" />,
      category: 'robots',
      color: 'from-cyber-green to-cyber-teal'
    },
    {
      id: 'training-systems',
      title: 'Next Generation Training Systems',
      price: 25000,
      period: 'one-time',
      description: 'Comprehensive training systems with AI-driven scenarios and analytics',
      features: [
        'AI-powered scenarios',
        'Performance analytics',
        'Customizable training modules',
        'Real-time feedback',
        'Multi-user support'
      ],
      icon: <Zap className="w-12 h-12" />,
      category: 'training',
      color: 'from-cyber-yellow to-cyber-orange'
    }
  ];

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
                <User className="w-4 h-4" />
                <span>{currentUser.firstName} {currentUser.lastName}</span>
              </div>
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className="px-4 py-2 bg-cyber-purple hover:bg-cyber-purple/80 text-white rounded-md transition-all duration-200 hover:scale-105"
                >
                  ADMIN PANEL
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 bg-cyber-red hover:bg-cyber-red/80 text-white rounded-md transition-all duration-200 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span>SIGN OUT</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent">
            Welcome, {currentUser.firstName}!
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Access our advanced firearms training robots and AI-powered training solutions
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyber-blue/20 rounded-lg p-6 hover:border-cyber-blue/40 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${product.color}`}>
                  {product.icon}
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyber-blue">${product.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">{product.period}</div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold mb-2 text-white">{product.title}</h3>
              <p className="text-gray-300 mb-4">{product.description}</p>
              
              <ul className="space-y-2 mb-6">
                {product.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                    <div className="w-2 h-2 bg-cyber-blue rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="w-full bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-purple hover:to-cyber-blue text-white font-bold py-3 px-6 rounded-md transition-all duration-200 hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>VIEW DETAILS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Main Dashboard component that chooses between Clerk and Fallback
const Dashboard = () => {
  if (isClerkConfigured) {
    return <ClerkDashboard />;
  } else {
    return <FallbackDashboard />;
  }
};

export default Dashboard; 