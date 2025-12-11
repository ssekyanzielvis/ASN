import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message = 'Something went wrong' }) => {
  return (
    <div className="container-custom py-12">
      <div className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded">
        <p className="font-body">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
