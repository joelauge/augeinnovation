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
console.log('Clerk Key (first 20 chars):', publishableKey?.substring(0, 20));

if (!publishableKey) {
  console.error("Missing Publishable Key");
  // Don't throw error, render app without Clerk
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <BrowserRouter basename="/augeinnovation">
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <ClerkProvider publishableKey={publishableKey}>
          <BrowserRouter basename="/augeinnovation">
            <App />
          </BrowserRouter>
        </ClerkProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
} 