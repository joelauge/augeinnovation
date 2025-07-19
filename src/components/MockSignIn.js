import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMockAuth } from './MockAuthProvider';
import { User, Lock, Mail } from 'lucide-react';

const MockSignIn = ({ mode = 'signin', onClose, onSwitchMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, signUp } = useMockAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        await signIn(formData.email, formData.password);
      } else {
        await signUp(formData.email, formData.password);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="cyber-card max-w-md w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <img 
                              src="/images/augeinnovation_logo_512px.png" 
              alt="Auge Innovation Logo" 
              className="w-8 h-8 object-contain"
            />
            <h2 className="text-2xl font-cyber font-bold neon-text">
              {mode === 'signin' ? 'SIGN IN' : 'SIGN UP'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-cyber-gray hover:text-cyber-blue transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-titanium font-tech mb-2">First Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-gray" />
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="cyber-input w-full pl-10"
                    placeholder="Enter first name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-titanium font-tech mb-2">Last Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-gray" />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="cyber-input w-full pl-10"
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-titanium font-tech mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-gray" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="cyber-input w-full pl-10"
                placeholder="Enter email address"
              />
            </div>
          </div>

          <div>
            <label className="block text-titanium font-tech mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-gray" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="cyber-input w-full pl-10"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="cyber-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                {mode === 'signin' ? 'SIGNING IN...' : 'SIGNING UP...'}
              </div>
            ) : (
              mode === 'signin' ? 'SIGN IN' : 'SIGN UP'
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={onSwitchMode}
            className="text-cyber-blue hover:text-cyber-purple transition-colors"
          >
            {mode === 'signin' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        <div className="mt-4 p-3 bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg">
          <p className="text-sm text-titanium text-center">
            🔧 <strong>Mock Mode:</strong> This is a development environment. 
            Authentication is simulated for testing purposes.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MockSignIn; 