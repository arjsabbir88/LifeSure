import { AuthContext } from '@/authProvider/AuthProvider';
import Loader from '@/components/Custom/loader/Loader';
import React, { useContext } from 'react';
import { Navigate } from 'react-router';

const PrivetRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default PrivetRoute;
