import React from 'react';


const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-carbon">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-cyber-blue/30 border-t-cyber-blue rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyber-purple rounded-full animate-spin" style={{ animationDelay: '-0.5s' }}></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-cyber-green rounded-full animate-spin" style={{ animationDelay: '-1s' }}></div>
        <div className="mt-4 text-cyber-blue font-cyber text-sm animate-pulse">
          INITIALIZING...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 