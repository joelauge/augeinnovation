import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import ProductPage from './components/ProductPage';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App min-h-screen bg-carbon">
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
          path="/dashboard" 
          element={
            isSignedIn ? <Dashboard /> : <LandingPage />
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            isSignedIn ? <ProductPage /> : <LandingPage />
          } 
        />
      </Routes>
    </div>
  );
}

export default App; 