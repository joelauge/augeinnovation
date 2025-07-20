import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-carbon flex items-center justify-center p-4">
          <div className="bg-gray-100 shadow-xl rounded-lg p-6 max-w-md">
            <h2 className="text-gray-800 font-cyber text-xl mb-4">Something went wrong</h2>
            <p className="text-gray-600 mb-4">
              An error occurred while loading the application. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-cyber-blue hover:bg-cyber-purple text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4">
                <summary className="text-gray-700 cursor-pointer">Error Details</summary>
                <pre className="text-xs text-gray-600 mt-2 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 