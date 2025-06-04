import { createBrowserRouter } from "react-router-dom";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Layout from "../Layout/Layout";
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import ContactPage from "../Pages/ContactPage";
import ForgotPassword from "../Auth/forgetpassword";
import ResetPassword from "../Auth/resetpassword";
import Userlayout from "../Layout/userlayout";

export const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "forgetpassword",
    element: <ForgotPassword />,
  },
  {
    path: "resetpassword",
    element: <ResetPassword />,
  },
  {
    path: "",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },

  {
    path: "user",
    element: <Userlayout />,
  },
]);
