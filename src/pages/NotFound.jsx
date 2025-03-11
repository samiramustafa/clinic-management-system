import React from "react";

function NotFound() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <h2 className="text-muted">Oops! Page Not Found</h2>
      <p className="text-center ">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
    
    </div>
  );
}

export default NotFound;