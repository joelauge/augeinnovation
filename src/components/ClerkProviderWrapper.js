import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

/**
 * Wrapper component that conditionally provides ClerkProvider
 * Only renders ClerkProvider if a valid key is provided
 */
const ClerkProviderWrapper = ({ children, publishableKey }) => {
  // Check if we have a valid Clerk key
  const isValidKey = publishableKey && 
    publishableKey !== 'pk_test_your_clerk_key_here' && 
    publishableKey.startsWith('pk_') && 
    publishableKey.length > 20;

  if (!isValidKey) {
    // No valid key, render children without ClerkProvider
    // Components using Clerk hooks will need to handle this gracefully
    return <>{children}</>;
  }

  // Valid key, wrap with ClerkProvider
  return (
    <ClerkProvider 
      publishableKey={publishableKey}
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
      {children}
    </ClerkProvider>
  );
};

export default ClerkProviderWrapper;

