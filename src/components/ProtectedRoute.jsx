// src/components/ProtectedRoutes.jsx

import React from "react";
import { Navigate } from "react-router-dom";

// For normal user authentication check
export const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// For admin authentication + user login check
export const AdminProtectedRoute = ({ children, isLoggedIn, isAdmin }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/not-admin" replace />;
  }
  return children;
};
