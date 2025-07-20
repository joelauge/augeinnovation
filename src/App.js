import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProductPage from './components/ProductPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import ContactPage from './components/ContactPage';
import AdminPanel from './components/AdminPanel';
import { InvoiceProvider } from './contexts/InvoiceContext';
import { initializeEmailJS } from './services/emailService';
import './App.css';

function App() {
  console.log('App rendering full version...');

  // Initialize EmailJS
  useEffect(() => {
    initializeEmailJS();
  }, []);

  return (
    <InvoiceProvider>
      <div className="App min-h-screen bg-carbon flex flex-col">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/sign-in" 
            element={<SignInPage />} 
          />
          <Route 
            path="/sign-up" 
            element={<SignUpPage />} 
          />
          <Route 
            path="/contact" 
            element={<ContactPage />} 
          />
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
          <Route 
            path="/product/:id" 
            element={<ProductPage />} 
          />
          <Route 
            path="/admin" 
            element={<AdminPanel />} 
          />
        </Routes>
      </div>
    </InvoiceProvider>
  );
}

export default App; 