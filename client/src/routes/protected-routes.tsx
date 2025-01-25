import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteRouteProps {
  requiredRole: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteRouteProps> = ({
  requiredRole,
}) => {
  if (!requiredRole) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
