import { AuthContext } from '@/authProvider/AuthProvider';
import Loader from '@/components/Custom/loader/Loader';
import useUserRole from '@/hooks/useUserRole';
import React, { useContext } from 'react';
import { Navigate } from 'react-router';


const AdminRouter = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();

  if (loading || roleLoading) {
    return <Loader />;
  }

  if (!user || role?.toLowerCase() !== 'admin') {
    return <Navigate state={{ from: location.pathname }} to="/forbidden" replace />;
  }

  return children;
};

export default AdminRouter;
