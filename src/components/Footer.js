import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = () => {
    console.log('Contact button clicked, navigating to /contact');
    navigate('/contact');
  };

  return (
    <footer className="bg-gray-800 border-t border-cyber-blue/30">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Copyright */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-4 mb-4 md:mb-0"
          >
            <img 
              src={process.env.PUBLIC_URL + "/images/augeinnovation_logo_512px.png"} 
              alt="Auge Innovation Logo" 
              className="w-12 h-12 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => navigate('/')}
              onError={(e) => {
                console.error('Logo failed to load:', e.target.src);
                e.target.style.display = 'none';
              }}
            />
            <div className="text-titanium">
              <p className="text-sm font-cyber">Copyright © 2025, Augé Innovations</p>
            </div>
          </motion.div>

          {/* Contact Link */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <button 
              onClick={handleContactClick}
              className="text-cyber-blue hover:text-cyber-purple transition-colors font-cyber font-bold text-lg cursor-pointer px-4 py-2 rounded hover:bg-cyber-blue/10 active:scale-95"
              style={{ userSelect: 'none' }}
            >
              CONTACT US
            </button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 