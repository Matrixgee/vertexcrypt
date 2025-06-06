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
import ScrollToTop from "../components/scrolltotop";
import Support from "../Clients/Support";
import History from "../Clients/History";
import Packages from "../Clients/Packages";
import Plans from "../Clients/Plans";
import Withdraw from "../Clients/Withdraw";
import Overview from "../Clients/Overview";
import Deposit from "../Clients/Deposit";

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
    element: (
      <>
        <ScrollToTop />
        <Layout />
      </>
    ),

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
    children:[
      {
        path:"overview",
        element:<Overview/>
      },
      {
        path:"deposit",
        element:<Deposit/>
      },
      {
        path:"withdraw",
        element:<Withdraw/>
      },
      {
        path:"support",
        element:<Support/>
      },
      {
        path:"history",
        element:<History/>
      },
      {
        path:"packages",
        element:<Packages/>
      },
      {
        path:"my-plans",
        element:<Plans/>
      }
    ]
  },
]);
