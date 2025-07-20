import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const publishableKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

console.log('Clerk Key Type:', publishableKey?.startsWith('pk_live_') ? 'LIVE' : 'TEST');

if (!publishableKey) {
  throw new Error("Missing Publishable Key");
}

// Add error boundary for Clerk
const handleClerkError = (error) => {
  console.error('Clerk Error:', error);
};

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ClerkProvider 
        publishableKey={publishableKey}
        onError={handleClerkError}
      >
        <BrowserRouter basename="/augeinnovation">
          <App />
        </BrowserRouter>
      </ClerkProvider>
    </ErrorBoundary>
  </React.StrictMode>
); 