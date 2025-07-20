import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useClerkAuth';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProductPage from './components/ProductPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import ContactPage from './components/ContactPage';
import PendingApprovalPage from './components/PendingApprovalPage';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

function App() {
  const { isSignedIn, isApproved, isLoaded } = useAuth();

  console.log('App render:', { isSignedIn, isApproved, isLoaded });

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="App min-h-screen bg-carbon flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
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
          element={
            isSignedIn ? (isApproved ? <Dashboard /> : <PendingApprovalPage />) : <LandingPage />
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            isSignedIn ? (isApproved ? <ProductPage /> : <PendingApprovalPage />) : <LandingPage />
          } 
        />
        <Route 
          path="/admin" 
          element={
            isSignedIn ? <AdminDashboard /> : <LandingPage />
          } 
        />
      </Routes>
    </div>
  );
}

export default App; 