import React from 'react';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/authStore';

// Route guard - redirects to /login unless a session exists.
// Wrap any route that requires the user to be logged in with this.
const ProtectedRoute = observer((props) => {
  const { children } = props;

  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
})

export default ProtectedRoute;
