import { createBrowserRouter } from "react-router-dom"
import Login from "../Auth/Login"
import Register from "../Auth/Register"
import Layout from "../Layout/Layout"
import HomePage from "../Pages/HomePage"
import AboutPage from "../Pages/AboutPage"
import ContactPage from "../Pages/ContactPage"

export const router = createBrowserRouter([
    {
        path:"login",
        element:<Login/>
    },
    {
        path:"register",
        element:<Register/>
    },
    {
        path:"",
        element:<Layout/>,
        children:[
            {
                path:"",
                element:<HomePage/>
            },
            {
                path:"about",
                element:<AboutPage/>
            },
            {
                path:"contact",
                element:<ContactPage/>
            }
        ]
    }
])