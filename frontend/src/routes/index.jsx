import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/forgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProtectedRoute from '../components/route_protection/ProtectedRoute';
import Unauthorized from '../pages/Unauthorized';
import AuthRoute from '../components/route_protection/AuthRoute';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "login",
        element: (
          <AuthRoute>
            <Login />
          </AuthRoute>
        ),
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "signUp",
        element: (
          <AuthRoute>
            <SignUp />
          </AuthRoute>
        ),
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        element: <ProtectedRoute allowedRoles={['ADMIN']} />,
        children: [
          {
            path: "admin-panel",
            element: <AdminPanel />,
            children: [
              { path: "all-users", element: <AllUsers /> },
              { path: "all-products", element: <AllProducts /> },
            ]
          }
        ]
      },
      {
        path: "unauthorized",
        element: <Unauthorized />
      },
      {
        path: "/product-details/:id",
        element: <ProductDetails/>
      },
      {
        path: "/cart",
        element: <Cart/>
      },
      {
        path: "search",
        element: <SearchProduct/>,
      },
    ]
  },
]);

export default router;

