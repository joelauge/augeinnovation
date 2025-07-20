import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log('Starting app without Clerk for debugging...');

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename="/augeinnovation">
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
); 