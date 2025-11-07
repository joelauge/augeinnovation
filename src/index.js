import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Get Clerk publishable key from environment variables
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = clerkPubKey && clerkPubKey !== 'pk_test_your_clerk_key_here' && clerkPubKey.startsWith('pk_');

console.log('Starting app...', isClerkConfigured ? 'with Clerk authentication' : 'without Clerk (using safe wrappers)');

// Always use ClerkProvider to prevent hook errors
// Use a minimal valid key format if not configured (Clerk will handle invalid keys gracefully)
const effectiveKey = isClerkConfigured ? clerkPubKey : 'pk_test_minimal_key_for_hook_support';

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ClerkProvider 
        publishableKey={effectiveKey}
        appearance={{
          baseTheme: undefined,
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
        routerPush={(to) => window.location.hash = to}
        routerReplace={(to) => window.location.hash = to}
      >
        <HashRouter>
          <App />
        </HashRouter>
      </ClerkProvider>
    </ErrorBoundary>
  </React.StrictMode>
); 