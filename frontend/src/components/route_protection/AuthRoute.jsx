// components/AuthRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const user = useSelector((state) => state.user?.user);

  if (user) {
    // If logged in, redirect to homepage or dashboard
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
