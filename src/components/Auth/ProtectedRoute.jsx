import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import authStore from '../../stores/authStore';

// Route guard - redirects to /login (remembering where the user was headed) unless
// a session exists. Wrap any route that requires the user to be logged in with this.
const ProtectedRoute = observer((props) => {
  const { children } = props;
  const location = useLocation();

  if (!authStore.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
})

export default ProtectedRoute;
