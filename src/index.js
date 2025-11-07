import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import ClerkProviderWrapper from './components/ClerkProviderWrapper';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Get Clerk publishable key from environment variables
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

console.log('Starting app...', clerkPubKey ? 'with Clerk key' : 'without Clerk key');

// Always render with ClerkProviderWrapper which handles invalid/missing keys gracefully
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ClerkProviderWrapper publishableKey={clerkPubKey}>
        <HashRouter>
          <App />
        </HashRouter>
      </ClerkProviderWrapper>
    </ErrorBoundary>
  </React.StrictMode>
); 