import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
// import { useAuth } from './AuthContext';
import { AuthContext } from '../screens/authProvider';

const PrivateRoute = ({ path, element}) => {
  const { isLoggedIn } = useContext(AuthContext);
//   const isLoggedIn = true

  return isLoggedIn ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;