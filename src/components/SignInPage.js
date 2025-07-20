import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import Footer from './Footer';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if Clerk is properly configured
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  const isClerkConfigured = clerkPubKey && clerkPubKey.length > 0 && clerkPubKey.startsWith('pk_');
  
  console.log('SignInPage Clerk Debug:', {
    clerkPubKey: clerkPubKey ? 'configured' : 'not configured',
    isClerkConfigured,
    keyLength: clerkPubKey ? clerkPubKey.length : 0,
    keyStart: clerkPubKey ? clerkPubKey.substring(0, 10) + '...' : 'none'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate sign in process
      console.log('Sign in with:', { email, password });
      // In a real app, this would be an API call
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* Conditional Rendering: Clerk or Custom Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-md mx-auto"
        >
          {isClerkConfigured ? (
            // Clerk Sign In Component
            <SignIn 
              appearance={{
                baseTheme: undefined,
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "bg-gray-100 shadow-xl rounded-lg border border-cyber-blue/30",
                  headerTitle: "text-gray-800 font-cyber text-xl font-bold",
                  headerSubtitle: "text-gray-600 text-sm",
                  formButtonPrimary: "bg-cyber-blue hover:bg-cyber-purple text-white font-bold py-3 px-6 rounded-lg w-full transition-all duration-200 transform hover:scale-105",
                  formButtonSecondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg w-full transition-all duration-200 border border-gray-300",
                  formFieldInput: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent text-gray-900 placeholder-gray-500 bg-white",
                  formFieldLabel: "text-gray-700 font-cyber font-bold text-sm block mb-2",
                  footerActionLink: "text-cyber-blue hover:text-cyber-purple transition-colors font-cyber font-bold",
                  dividerLine: "bg-gray-300",
                  dividerText: "text-gray-600 font-cyber text-sm",
                  formFieldRow: "space-y-4",
                  formField: "mb-4",
                  headerBackRow: "hidden",
                  headerBackLink: "hidden",
                  socialButtonsBlockButton: "bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg w-full transition-all duration-200 border border-gray-300",
                  socialButtonsBlockButtonText: "font-cyber font-bold",
                  formResendCodeLink: "text-cyber-blue hover:text-cyber-purple transition-colors font-cyber font-bold",
                  formFieldAction: "text-cyber-blue hover:text-cyber-purple transition-colors font-cyber font-bold text-sm",
                  formFieldHintText: "text-gray-500 text-xs",
                  formFieldErrorText: "text-red-500 text-sm font-cyber font-bold",
                  formFieldSuccessText: "text-green-500 text-sm font-cyber font-bold",
                  identityPreviewText: "text-gray-700 font-cyber",
                  identityPreviewEditButton: "text-cyber-blue hover:text-cyber-purple transition-colors font-cyber font-bold",
                  pageScrollBox: "p-6",
                  navbar: "hidden",
                  pageHeader: "text-center",
                  pageHeaderTitle: "text-gray-800 font-cyber text-xl font-bold",
                  pageHeaderSubtitle: "text-gray-600 text-sm",
                  profilePage: "bg-gray-100 shadow-xl rounded-lg border border-cyber-blue/30",
                  profileSection: "border-b border-gray-200 pb-4 mb-4",
                  profileSectionTitle: "text-gray-800 font-cyber text-lg font-bold",
                  profileSectionContent: "text-gray-600",
                  profileSectionPrimaryButton: "bg-cyber-blue hover:bg-cyber-purple text-white font-bold py-2 px-4 rounded transition-colors",
                  profileSectionDangerButton: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
                },
                variables: {
                  colorPrimary: '#00d4ff',
                  colorPrimaryHover: '#8b5cf6',
                  colorText: '#1f2937',
                  colorTextSecondary: '#6b7280',
                  colorBackground: '#f3f4f6',
                  colorInputBackground: '#ffffff',
                  colorInputText: '#1f2937',
                  colorInputPlaceholder: '#9ca3af',
                  colorSuccess: '#10b981',
                  colorDanger: '#ef4444',
                  colorWarning: '#f59e0b',
                  borderRadius: '0.5rem',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '14px',
                  fontWeight: {
                    normal: '400',
                    medium: '500',
                    semibold: '600',
                    bold: '700'
                  }
                }
              }}
              afterSignInUrl="/dashboard"
              signUpUrl="/sign-up"
              redirectUrl={window.location.href}
            />
          ) : (
            // Custom Sign In Form
            <div className="bg-gray-100 shadow-xl rounded-lg w-full p-6">
              <div className="text-center mb-6">
                <h2 className="text-gray-800 font-cyber text-xl mb-2">Sign In</h2>
                <p className="text-gray-600">Welcome back to Auge Innovation</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="text-gray-700 font-medium block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="text-gray-700 font-medium block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyber-blue focus:border-transparent text-gray-900 placeholder-gray-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-cyber-blue hover:bg-cyber-purple text-white font-bold py-2 px-4 rounded w-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <a href="/sign-up" className="text-cyber-blue hover:text-cyber-purple transition-colors">
                    Sign up
                  </a>
                </p>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Demo Mode: Any email/password combination will work
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage; 