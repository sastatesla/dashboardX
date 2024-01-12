import React from 'react';
import { Route, Outlet, Navigate } from 'react-router-dom';
import { auth } from './firebase'; // Firebase configuration

const PrivateRoute = ({ element: Element, ...rest }) => {
  const user = auth.currentUser;

  return (
    <Route
      {...rest}
      element={user ? <Element /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
