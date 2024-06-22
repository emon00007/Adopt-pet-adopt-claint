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
import UpdatePage from "../PageComponent/UpdatePage/UpdatePage";
import Catagory_dog from "../PageComponent/HomePetCategorys/Catagory_dog";
import Rabbit_category from "../PageComponent/HomePetCategorys/Rabbit_category";
import Bird_category from "../PageComponent/HomePetCategorys/Bird_category";
import Cat_category from "../PageComponent/HomePetCategorys/Cat_category";
import All_Category from "../PageComponent/HomePetCategorys/All_Category";
import Dashboard from "../LayOut/Dashboard";
import Addapet from "../PageComponent/Addapet/Addapet";
import MyAddSection from "../PageComponent/MyAddPetSection/MyAddSection";
import CreateDonation from "../PageComponent/DonationSection/CreateDonation/CreateDonation";
import DonationCampain from "../PageComponent/DonationSection/DonationCampain";
import DonationDetails from "../PageComponent/DonationSection/DonationCampaigns/DonationDetails";
import MyDonationCampaign from "../PageComponent/MyDonationCampaign/MyDonationCampaign";
import AllUsers from "../PageComponent/AdminPanel/AllUsers";
import AllPets from "../PageComponent/AdminPanel/AllPets";
import ErrorPage from "../PageComponent/ErrorPage/ErrorPage";
import AllDonates from "../PageComponent/AdminPanel/AllDonates";
import AdopRequest from "../PageComponent/AdopRequest/AdopRequest";
import UpdateDonation from "../PageComponent/UpdatePage/UpdateDonation";
import AdminRoutes from "./AdminRoutes";


export const  router = createBrowserRouter([
    
    {
        path: "/",
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/Login',
                element: <LogIn></LogIn>

            }, 
            {
                path: '/SignUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/Petlisting',
                element: <Petlisting></Petlisting>
            },
            {
                path: '/pet/:id',
                element: <PrivateRoute><PetDetails></PetDetails></PrivateRoute>
            },
            
            
            {
                path: '/pet/category/dogs',
                element: <Catagory_dog></Catagory_dog>
            },
            {
                path: '/pet/category/cat',
                element: <Cat_category></Cat_category>
            },
            {
                path: '/pet/category/rabbit',
                element: <Rabbit_category></Rabbit_category>
            },
            {
                path: '/pet/category/bird',
                element: <Bird_category></Bird_category>
            },
            {
                path: '/pet/Allcategory',
                element: <All_Category></All_Category>

            },
            {
                path:'/donationCampaignPage',
                element:<DonationCampain></DonationCampain>

            }
            ,
            {
                path:'/donation/:id',
                element:<PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>

            }
        ]
    },
    {
        path: "/dashboard",
        element:<Dashboard></Dashboard>,
        errorElement:<ErrorPage></ErrorPage>,
        children:[
            {
                path: 'MyAddSection',
                element: <PrivateRoute><MyAddSection></MyAddSection></PrivateRoute>
            
            },
            {
                path: 'CreateDonation',
                element: <PrivateRoute><CreateDonation></CreateDonation></PrivateRoute>
            },
            {
                path: 'Addapet',
                element: <Addapet></Addapet>
            },
            {
                path: 'MyDonationCampaign',
                element: <PrivateRoute><MyDonationCampaign></MyDonationCampaign></PrivateRoute>
            },
            {
                path:'allUsers',
                element:<AdminRoutes><AllUsers></AllUsers></AdminRoutes>
            }
            ,
            {
                path:'allPets',
                element:<AdminRoutes><AllPets></AllPets></AdminRoutes>
            }
            ,
            {
                path:'allDonates',
                element:<AdminRoutes><AllDonates></AllDonates></AdminRoutes>
            }
            ,
            {
                path:'adoptRequest',
                element:<PrivateRoute><AdopRequest></AdopRequest></PrivateRoute>
            },
            {
                path: 'UpdatePage/:id',
                element: <PrivateRoute><UpdatePage></UpdatePage></PrivateRoute>,
                loader: ({params}) => fetch(`https://adope-pates-sarver-site.vercel.app/petlisting/${params.id}`)
               
            },
            {
                path: '/dashboard/allPets/UpdatePage/:id',
                element: <AdminRoutes><UpdatePage></UpdatePage></AdminRoutes>,
                loader: ({params}) => fetch(`https://adope-pates-sarver-site.vercel.app/petlisting/${params.id}`)
               
            },
            {
                path:"donationUpdate/:id",
                element:<PrivateRoute><UpdateDonation></UpdateDonation></PrivateRoute>,
                loader: ({params}) => fetch(`https://adope-pates-sarver-site.vercel.app/donationUpdate/${params.id}`)
            },
            {
                path:"/dashboard/allDonates/UpdatePage/:id",
                element:<AdminRoutes><UpdateDonation></UpdateDonation></AdminRoutes>,
                loader: ({params}) => fetch(`https://adope-pates-sarver-site.vercel.app/donationUpdate/${params.id}`)
            }
           
        ]
    }
]);