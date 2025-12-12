import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ServerStatus {
  backend: 'online' | 'offline' | 'checking';
  database: 'connected' | 'disconnected' | 'unknown';
  apiUrl: string;
  responseTime?: number;
  errorDetails?: string;
}

const NetworkStatus: React.FC = () => {
  const [status, setStatus] = useState<ServerStatus>({
    backend: 'checking',
    database: 'unknown',
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000/api'
  });
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    checkServerStatus();
    // Check every 30 seconds
    const interval = setInterval(checkServerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkServerStatus = async () => {
    const startTime = Date.now();
    
    try {
      // Try to reach the API
      const response = await axios.get(`${status.apiUrl}/`, {
        timeout: 5000,
        validateStatus: (status) => status < 500 // Accept any status < 500
      });
      
      const responseTime = Date.now() - startTime;
      
      setStatus({
        ...status,
        backend: 'online',
        database: 'connected', // If API responds, assume DB is connected
        responseTime,
        errorDetails: undefined
      });
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        setStatus({
          ...status,
          backend: 'offline',
          database: 'unknown',
          responseTime,
          errorDetails: 'Cannot reach backend server. Server may be offline or URL is incorrect.'
        });
      } else if (error.response?.status === 500) {
        setStatus({
          ...status,
          backend: 'online',
          database: 'disconnected',
          responseTime,
          errorDetails: 'Server is online but database connection failed.'
        });
      } else {
        setStatus({
          ...status,
          backend: 'offline',
          database: 'unknown',
          responseTime,
          errorDetails: error.message || 'Unknown error'
        });
      }
    }
  };

  // Don't show if everything is working fine
  if (status.backend === 'online' && status.database === 'connected') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <div className="bg-white border-2 border-red-500 rounded-lg shadow-2xl overflow-hidden">
        {/* Header - Always Visible */}
        <div 
          className="bg-red-500 text-white px-4 py-3 cursor-pointer flex items-center justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-white rounded-full animate-ping absolute"></div>
              <div className="w-3 h-3 bg-white rounded-full relative"></div>
            </div>
            <span className="font-semibold">Connection Issue Detected</span>
          </div>
          <svg 
            className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="p-4 bg-white">
            {/* Status Grid */}
            <div className="space-y-3 mb-4">
              {/* Backend Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Backend Server:</span>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  status.backend === 'online' 
                    ? 'bg-green-100 text-green-800' 
                    : status.backend === 'checking'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status.backend === 'online' && '✓ Online'}
                  {status.backend === 'offline' && '✗ Offline'}
                  {status.backend === 'checking' && '⟳ Checking...'}
                </span>
              </div>

              {/* Database Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Database:</span>
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  status.database === 'connected' 
                    ? 'bg-green-100 text-green-800' 
                    : status.database === 'unknown'
                    ? 'bg-gray-100 text-gray-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {status.database === 'connected' && '✓ Connected'}
                  {status.database === 'disconnected' && '✗ Disconnected'}
                  {status.database === 'unknown' && '? Unknown'}
                </span>
              </div>

              {/* Response Time */}
              {status.responseTime !== undefined && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Response Time:</span>
                  <span className="text-sm text-gray-600">{status.responseTime}ms</span>
                </div>
              )}

              {/* API URL */}
              <div className="border-t pt-3">
                <p className="text-xs font-medium text-gray-700 mb-1">API URL:</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded block break-all">
                  {status.apiUrl}
                </code>
              </div>
            </div>

            {/* Error Details */}
            {status.errorDetails && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                <p className="text-xs font-semibold text-red-900 mb-1">Error:</p>
                <p className="text-xs text-red-800">{status.errorDetails}</p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={checkServerStatus}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
              >
                🔄 Check Again
              </button>
              
              <details className="text-xs">
                <summary className="cursor-pointer text-gray-600 hover:text-gray-900 mb-2">
                  Troubleshooting Steps
                </summary>
                <ul className="space-y-1 ml-4 text-gray-700">
                  <li>1. Open browser console (F12) and check for errors</li>
                  <li>2. Verify backend server is running at: <strong>{status.apiUrl}</strong></li>
                  <li>3. Check if database migrations are applied</li>
                  <li>4. Ensure CORS settings allow your frontend domain</li>
                  <li>5. Check .env file has correct REACT_APP_API_URL</li>
                </ul>
              </details>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkStatus;
