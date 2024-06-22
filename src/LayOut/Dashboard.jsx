import { ListItem, Typography } from "@material-tailwind/react";
import { NavLink, Outlet } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { SiMercadopago } from "react-icons/si";
import { FaDonate } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineFeed } from "react-icons/md";
import { Helmet } from "react-helmet";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";




const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const {LogOut}=useContext(AuthContext)
    const handleLogOut = () => {
        LogOut()

      };
    // console.log(isAdmin)
    return (


        <div className="flex">
            <Helmet><title>DashBoard</title></Helmet>
            <div className="w-72 main-h-full bg-deep-orange-100">
                <Typography variant="h5" className="p-4" color="blue-gray">
                    Adopts
                </Typography>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box ">
                    {
                        isAdmin && <>
                            <li ><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'}  to="/dashboard/allUsers"> <MdOutlinePostAdd className=" text-2xl"> </MdOutlinePostAdd>All Users</NavLink></li>

                            <li ><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/allPets"> <MdOutlinePostAdd className=" text-2xl"> </MdOutlinePostAdd>All Pets</NavLink></li>
                            <li ><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/allDonates"> <MdOutlinePostAdd className=" text-2xl"> </MdOutlinePostAdd>All Donation Campaign</NavLink></li>
                            <li ><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/Addapet"> <MdOutlinePostAdd className=" text-2xl"> </MdOutlinePostAdd>Add a Pet</NavLink></li>

                            <li><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/MyAddSection">  <FaTableList className=" text-lg"></FaTableList>My Add Pat</NavLink></li>

                            <li><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/CreateDonation">  <SiMercadopago className="text-2xl"></SiMercadopago>Create Donation Campaign</NavLink></li>

                            <li><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/adoptRequest">  <MdOutlineFeed className="text-2xl"></MdOutlineFeed>Adoption Request</NavLink></li>

                            <li> <NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/MyDonationCampaign">  <FaDonate></FaDonate>My Donation Campaign</NavLink></li>

                            <li><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/">  <AiOutlineHome className="text-xl"></AiOutlineHome>Go to Page</NavLink></li>

                            <li><NavLink to='/' onClick={handleLogOut } className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} >  <IoIosLogOut className="text-xl"></IoIosLogOut>Log Out</NavLink></li>

                        </>} 
                           {
                            !isAdmin&& <>
                            <li  ><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/Addapet"> <MdOutlinePostAdd className=" text-2xl"> </MdOutlinePostAdd>Add a Pet</NavLink></li>

                            <li><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/MyAddSection"><FaTableList className=" text-lg"></FaTableList>My Add Pat</NavLink></li>

                            <li><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/CreateDonation">  <SiMercadopago className="text-2xl"></SiMercadopago>Create Donation Campaign</NavLink></li>

                            <li><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/adoptRequest">  <MdOutlineFeed className="text-2xl"></MdOutlineFeed>Adoption Request</NavLink></li>

                            <li> <NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/dashboard/MyDonationCampaign">  <FaDonate></FaDonate>My Donation Campaign</NavLink></li>

                            <li><NavLink className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} to="/">  <AiOutlineHome className="text-xl"></AiOutlineHome>Go to Page</NavLink></li>

                            <li><NavLink to='/' onClick={handleLogOut } className={({isActive})=>isActive?'text-blue-800 gap-2 border-black border flex rounded-xl px-5 py-3 bg-blue-gray-200 font-semibold':'flex  font-semibold px-5 py-3 gap-2'} >  <IoIosLogOut className="text-xl"></IoIosLogOut>Log Out</NavLink></li>
                        </>
                           }
                    
                </ul>
            </div>
            <div className="flex-1 bg-blue-gray-200"><Outlet></Outlet></div>


        </div>

    );
};

export default Dashboard;