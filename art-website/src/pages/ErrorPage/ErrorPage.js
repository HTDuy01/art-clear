import React from 'react';
import './ErrorPage.css'; // Import stylesheet for ErrorPage

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__title">This page is not available</h1>
      <p className="error-page__message">Sorry, this page cannot be access</p>
    </div>
  );
};

export default ErrorPage;