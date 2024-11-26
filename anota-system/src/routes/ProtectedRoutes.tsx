import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  const session = localStorage.getItem("userSession");
  return !!session;
};

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
