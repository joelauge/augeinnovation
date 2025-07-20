import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import useApprovalStatus from '../hooks/useApprovalStatus';
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

const Dashboard = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { isApproved, isLoading } = useApprovalStatus();

  // Check if Clerk is properly configured
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = clerkPubKey && clerkPubKey !== 'pk_test_your_clerk_key_here';

  // Fallback user data if Clerk is not configured
  const fallbackUser = { firstName: 'Demo', lastName: 'User', email: 'demo@augeinnovation.com' };
  const currentUser = isClerkConfigured && user ? {
    firstName: user.firstName || 'User',
    lastName: user.lastName || '',
    email: user.emailAddresses?.[0]?.emailAddress || 'user@example.com'
  } : fallbackUser;

  // Determine user role (admin if email contains 'admin')
  const userRole = currentUser.email?.includes('admin') ? 'admin' : 'user';

  const handleSignOut = async () => {
    try {
      if (isClerkConfigured && signOut) {
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
        'Customizable configurations'
      ],
      icon: <Bot className="w-12 h-12" />,
      category: 'robots',
      color: 'from-cyber-green to-cyber-blue'
    },
    {
      id: 'heavy-weapons-robots',
      title: 'Heavy Weapons Resistant Robot',
      price: 200000,
      period: 'one-time',
      description: 'Ultra-resistant robotic platforms designed for extreme combat environments',
      features: [
        'Heavy weapons resistance',
        'Advanced armor systems',
        'High-capacity weapon mounts',
        'Extended operational range',
        'Multi-environment deployment'
      ],
      icon: <Zap className="w-12 h-12" />,
      category: 'robots',
      color: 'from-cyber-purple to-cyber-red'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: <Cpu className="w-5 h-5" /> },
    { id: 'law-enforcement', name: 'Law Enforcement', icon: <Shield className="w-5 h-5" /> },
    { id: 'military', name: 'Military', icon: <Target className="w-5 h-5" /> },
    { id: 'robots', name: 'Robotic Systems', icon: <Bot className="w-5 h-5" /> }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  if (isLoading) {
    return <div className="min-h-screen bg-carbon flex items-center justify-center">
      <p className="text-white text-2xl">Loading approval status...</p>
    </div>;
  }

  if (!isApproved) {
    return <ApprovalPending />;
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
                <span className="font-tech">{currentUser?.firstName} {currentUser?.lastName}</span>
              </div>
              {userRole === 'admin' && (
                <button 
                  onClick={() => navigate('/admin')}
                  className="px-4 py-2 border border-cyber-purple/30 text-cyber-purple hover:border-cyber-purple/50 hover:bg-cyber-purple/10 transition-all duration-300 rounded-lg font-cyber font-bold text-sm"
                >
                  ADMIN PANEL
                </button>
              )}
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
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cyber-card mb-8"
        >
          <h2 className="text-3xl font-cyber font-bold neon-text mb-2">
            WELCOME BACK, {currentUser?.firstName?.toUpperCase()}
          </h2>
          <p className="text-titanium text-lg">
            Explore our advanced firearms training solutions and robotic systems
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'border-cyber-blue bg-cyber-blue/20 text-cyber-blue'
                  : 'border-cyber-blue/30 text-titanium hover:border-cyber-blue/50 hover:bg-cyber-blue/10'
              }`}
            >
              {category.icon}
              <span className="font-tech">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="cyber-card group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-cyber-dark border border-cyber-blue/30 rounded-lg flex items-center justify-center text-cyber-blue">
                  {product.icon}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-cyber font-bold text-white">
                    ${product.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-titanium">{product.period}</div>
                </div>
              </div>
              
              <h3 className="text-xl font-cyber font-bold text-white mb-3">
                {product.title}
              </h3>
              
              <p className="text-titanium mb-4">
                {product.description}
              </p>
              
              <div className="mb-6">
                <h4 className="text-sm font-cyber font-bold text-cyber-blue mb-2 uppercase tracking-wide">
                  Key Features
                </h4>
                <ul className="space-y-1">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-titanium flex items-center">
                      <div className="w-1.5 h-1.5 bg-cyber-blue rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="cyber-button w-full group-hover:animate-cyber-pulse"
              >
                VIEW DETAILS <ArrowRight className="inline ml-2 w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-2xl font-cyber font-bold text-white mb-2">
              NO PRODUCTS FOUND
            </h3>
            <p className="text-titanium">
              Try selecting a different category or contact us for custom solutions.
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard; 