import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AdminProtectedRouteRouteProps {
  requiredRole: boolean;
}

const AdminProtectedRoute: React.FC<AdminProtectedRouteRouteProps> = ({
  requiredRole,
}) => {
  if (!requiredRole) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default AdminProtectedRoute;
