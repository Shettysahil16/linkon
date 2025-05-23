// components/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useSelector(state => state.user?.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
    allowedRoles : PropTypes.array
}

export default ProtectedRoute;
