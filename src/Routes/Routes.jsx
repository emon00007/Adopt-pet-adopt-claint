import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../LayOut/Main";
import Home from "../PageComponent/Home/Home";
import LogIn from "../PageComponent/Login/LogIn";
import SignUp from "../PageComponent/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Petlisting from "../PageComponent/Petlisting/Petlisting";
import PetDetails from "../PageComponent/PetDetails/PetDetails";
import Addapet from "../PageComponent/Addapet/Addapet";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/Login',
                element: <LogIn></LogIn>

            }, {
                path: '/SignUp',
                element: <SignUp></SignUp>
            },
            {
                path:'/Petlisting',
                element:<PrivateRoute><Petlisting></Petlisting></PrivateRoute>
            },
            {
                path:'/Addapet',
                element:<PrivateRoute><Addapet></Addapet></PrivateRoute>
            },
            {
                path:'/pet/:id',
                element:<PetDetails></PetDetails>
            }
        ]
    },
]);