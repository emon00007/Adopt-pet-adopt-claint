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
import MyAddSection from "../PageComponent/MyAddPetSection/MyAddSection";
import UpdatePage from "../PageComponent/UpdatePage/UpdatePage";
import Catagory_dog from "../PageComponent/HomePetCategorys/Catagory_dog";
import Rabbit_category from "../PageComponent/HomePetCategorys/Rabbit_category";
import Bird_category from "../PageComponent/HomePetCategorys/Bird_category";
import Cat_category from "../PageComponent/HomePetCategorys/Cat_category";
import All_Category from "../PageComponent/HomePetCategorys/All_Category";


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
            },
            {
                path:'/MyAddSection',
                element:<MyAddSection></MyAddSection>
            },
            {
                path:'/UpdatePage',
                element:<UpdatePage></UpdatePage>
            },
            {
                path:'/pet/category/dogs',
                element:<Catagory_dog></Catagory_dog>
            },
            {
                path:'/pet/category/cat',
                element:<Cat_category></Cat_category>
            },
            {
                path:'/pet/category/rabbit',
                element:<Rabbit_category></Rabbit_category>
            },
            {
                path:'/pet/category/bird',
                element:<Bird_category></Bird_category>
            },
            {
                path:'/pet/Allcategory',
                element:<All_Category></All_Category>

            }
        ]
    },
]);