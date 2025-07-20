import React from 'react';

import { motion } from 'framer-motion';
import { SignUp } from '@clerk/clerk-react';
import Footer from './Footer';

const SignUpPage = () => {

  return (
    <div className="min-h-screen bg-carbon flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
      {/* Large Logo */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-8"
      >
        <img 
          src={process.env.PUBLIC_URL + "/images/augeinnovation_logo_words512px.png"} 
          alt="Auge Innovation Logo" 
          className="w-48 h-48 object-contain"
          onError={(e) => {
            console.error('Logo failed to load:', e.target.src);
            e.target.style.display = 'none';
          }}
        />
      </motion.div>

                {/* Clerk Sign Up Component */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-gray-100 shadow-xl rounded-lg w-full p-6">
              <div className="text-center mb-6">
                <h2 className="text-gray-800 font-cyber text-xl mb-2">Create Account</h2>
                <p className="text-gray-600">Join Auge Innovation today</p>
              </div>

              <SignUp 
                routing="path" 
                path="/sign-up"
                signInUrl="/sign-in"
                redirectUrl="/dashboard"
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-cyber-blue hover:bg-cyber-purple text-white font-bold py-2 px-4 rounded w-full transition-colors',
                    card: 'bg-transparent shadow-none',
                    headerTitle: 'text-gray-800 font-cyber text-xl',
                    headerSubtitle: 'text-gray-600',
                    formFieldInput: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent text-gray-900 placeholder-gray-500',
                    formFieldLabel: 'text-gray-700 font-medium block mb-1',
                    footerActionLink: 'text-cyber-blue hover:text-cyber-purple transition-colors'
                  }
                }}
              />
            </div>
          </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage; 