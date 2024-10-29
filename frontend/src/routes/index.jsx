import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Login from "../pages/Login";
import ForgetPassword from "../pages/forgetPassword";
import Signup from "../pages/Signup";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children : [
        {
          path : "",
          element : <Home/>
        },
        {
          path : "login",
          element : <Login/>
        },
        {
          path : "forget-password",
          element : <ForgetPassword/>
        },
        {
          path : "signup",
          element : <Signup/>
        },
        {
          path : "admin-panel",
          element : <AdminPanel/>,
          children : [
            {
              path : "all-users",
              element : <AllUsers/>
            },
            {
              path : "products",
              element : <AllProducts/>
            },
          ]
        },
        
      ]
    },
  ]);
  export default router