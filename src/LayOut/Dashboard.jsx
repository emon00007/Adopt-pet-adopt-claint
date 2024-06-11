import { ListItem,  Typography } from "@material-tailwind/react";
import {  NavLink, Outlet } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { SiMercadopago } from "react-icons/si";
import { FaDonate } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineFeed } from "react-icons/md";



const Dashboard = () => {
    return (


        <div className="flex">
            <div className="w-72 main-h-full bg-deep-orange-100">
                <Typography variant="h5" className="p-4" color="blue-gray">
                    Adopts
                </Typography>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box ">
                    <li ><ListItem className=" gap-2"> <MdOutlinePostAdd className=" text-2xl"> </MdOutlinePostAdd><NavLink className="  font-semibold" to="Addapet">Add a Pet</NavLink></ListItem></li>

                    <li> <ListItem className=" gap-2"> <FaTableList className=" text-lg"></FaTableList><NavLink className="  font-semibold" to="MyAddSection">My Add Page</NavLink></ListItem></li>

                    <li> <ListItem className=" gap-2"> <SiMercadopago className="text-2xl"></SiMercadopago><NavLink className="  font-semibold" to="CreateDonation">Create Donation Campaign</NavLink></ListItem></li>

                    <li> <ListItem className=" gap-2"> <MdOutlineFeed className="text-2xl"></MdOutlineFeed><NavLink className="  font-semibold" to="CreateDonation">Adoption Request</NavLink></ListItem></li>

                    <li> <ListItem className=" gap-2"> <FaDonate></FaDonate><NavLink className="  font-semibold" to="MyAddSection">My Donation Campaign</NavLink></ListItem></li>

                    <li> <ListItem className="gap-2" > <AiOutlineHome className="text-xl"></AiOutlineHome><NavLink className="  font-semibold" to="/">Go to Page</NavLink></ListItem></li>

                    <li> <ListItem className="gap-2"> <IoIosLogOut className="text-xl"></IoIosLogOut><NavLink className="  font-semibold" to="MyAddSection">Log Out</NavLink></ListItem></li>
                </ul>
            </div>
            <div className="flex-1 bg-blue-gray-200"><Outlet></Outlet></div>


        </div>

    );
};

export default Dashboard;