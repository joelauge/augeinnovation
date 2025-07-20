import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
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
  const { isSignedIn, isApproved } = useAuth();

  // Temporarily bypass loading check for debugging
  // if (!isLoaded) {
  //   return <LoadingSpinner />;
  // }

  return (
    <div className="App min-h-screen bg-carbon flex flex-col">
              <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/sign-in" 
            element={
              <SignInPage />
            } 
          />
          <Route 
            path="/sign-up" 
            element={
              <SignUpPage />
            } 
          />
          <Route 
            path="/contact" 
            element={
              <ContactPage />
            } 
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