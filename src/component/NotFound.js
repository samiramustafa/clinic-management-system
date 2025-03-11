import React from "react";

const NotFound = () => {
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="container text-center my-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Page Not Found</p>
      <button className="btn btn-primary" onClick={goHome}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
