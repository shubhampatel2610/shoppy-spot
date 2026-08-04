import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/authStore';

// Route guard - redirects to /login unless a session exists, and to /unauthorized
// if allowedRoles is given and the logged-in user's role isn't in it.
// Wrap any route that requires the user to be logged in with this.
const ProtectedRoute = observer((props) => {
  const { children, allowedRoles } = props;

  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authStore.currentUser?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
})

export default ProtectedRoute;
