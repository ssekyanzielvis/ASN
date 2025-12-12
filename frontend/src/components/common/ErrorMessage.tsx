import React from 'react';
import { AxiosError } from 'axios';

interface ErrorMessageProps {
  message?: string;
  error?: any;
  showDetails?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message = 'Something went wrong', 
  error,
  showDetails = true 
}) => {
  // Extract detailed error information
  const getErrorDetails = () => {
    if (!error) return null;

    // Check if it's an Axios error
    if (error.isAxiosError || error.response) {
      const axiosError = error as AxiosError;
      const status = axiosError.response?.status;
      const statusText = axiosError.response?.statusText;
      const errorData = axiosError.response?.data;
      
      return {
        type: 'API Error',
        status: status || 'No Response',
        statusText: statusText || 'Connection Failed',
        message: typeof errorData === 'string' ? errorData : JSON.stringify(errorData, null, 2),
        isNetworkError: !axiosError.response,
        code: axiosError.code
      };
    }

    // Generic error
    return {
      type: 'Error',
      message: error.message || String(error)
    };
  };

  const errorDetails = getErrorDetails();

  return (
    <div className="container-custom py-12">
      <div className="bg-red-50 border-2 border-red-300 text-red-900 px-6 py-6 rounded-lg shadow-sm">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-red-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <p className="font-bold text-lg mb-2">{message}</p>
            
            {showDetails && errorDetails && (
              <div className="mt-4 space-y-3">
                {/* Error Type */}
                <div>
                  <span className="font-semibold">Type: </span>
                  <span className="font-mono text-sm bg-red-100 px-2 py-1 rounded">
                    {errorDetails.type}
                  </span>
                </div>

                {/* Network Error */}
                {errorDetails.isNetworkError && (
                  <div className="bg-red-100 border border-red-200 rounded p-3">
                    <p className="font-semibold">🔌 Network Connection Issue</p>
                    <ul className="mt-2 text-sm space-y-1 ml-4">
                      <li>• Backend server may be offline</li>
                      <li>• Check if server is running at: {process.env.REACT_APP_API_URL}</li>
                      <li>• Error Code: {errorDetails.code}</li>
                    </ul>
                  </div>
                )}

                {/* HTTP Status */}
                {errorDetails.status && !errorDetails.isNetworkError && (
                  <div>
                    <span className="font-semibold">Status: </span>
                    <span className="font-mono text-sm bg-red-100 px-2 py-1 rounded">
                      {errorDetails.status} - {errorDetails.statusText}
                    </span>
                  </div>
                )}

                {/* Status-specific messages */}
                {errorDetails.status === 500 && (
                  <div className="bg-red-100 border border-red-200 rounded p-3">
                    <p className="font-semibold">🔧 Server Error (500)</p>
                    <ul className="mt-2 text-sm space-y-1 ml-4">
                      <li>• Backend server encountered an error</li>
                      <li>• Database connection may have failed</li>
                      <li>• Check backend server logs for details</li>
                    </ul>
                  </div>
                )}

                {errorDetails.status === 404 && (
                  <div className="bg-red-100 border border-red-200 rounded p-3">
                    <p className="font-semibold">🔍 Not Found (404)</p>
                    <ul className="mt-2 text-sm space-y-1 ml-4">
                      <li>• API endpoint not found</li>
                      <li>• Check API URL configuration</li>
                    </ul>
                  </div>
                )}

                {/* Error Message */}
                {errorDetails.message && (
                  <details className="mt-3">
                    <summary className="cursor-pointer font-semibold text-sm hover:text-red-700">
                      View Technical Details ▼
                    </summary>
                    <pre className="mt-2 text-xs bg-red-100 border border-red-200 p-3 rounded overflow-x-auto">
                      {errorDetails.message}
                    </pre>
                  </details>
                )}

                {/* Troubleshooting */}
                <div className="mt-4 pt-4 border-t border-red-200">
                  <p className="font-semibold text-sm mb-2">🔍 Troubleshooting Steps:</p>
                  <ol className="text-sm space-y-1 ml-5 list-decimal">
                    <li>Check browser console (F12) for more details</li>
                    <li>Verify backend server is running</li>
                    <li>Confirm database is connected and migrations are applied</li>
                    <li>Check CORS settings if it's a cross-origin error</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
