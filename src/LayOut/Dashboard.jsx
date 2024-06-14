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



const Dashboard = () => {
    const isAdmin =false
    return (


        <div className="flex">
            <Helmet><title>DashBoard</title></Helmet>
            <div className="w-72 main-h-full bg-deep-orange-100">
                <Typography variant="h5" className="p-4" color="blue-gray">
                    Adopts
                </Typography>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box ">
                    {
                        isAdmin ? <>
                            <li ><NavLink className="  font-semibold" to="allUsers"><ListItem className=" gap-2"> <MdOutlinePostAdd className=" text-2xl"> </MdOutlinePostAdd>All Users</ListItem></NavLink></li>

                            <li ><NavLink className="  font-semibold" to="allPets"><ListItem className=" gap-2"> <MdOutlinePostAdd className=" text-2xl"> </MdOutlinePostAdd>All Pets</ListItem></NavLink></li>
                            <li ><NavLink className="  font-semibold" to="allDonates"><ListItem className=" gap-2"> <MdOutlinePostAdd className=" text-2xl"> </MdOutlinePostAdd>All Pets</ListItem></NavLink></li>
                        </> : <>
                            <li ><NavLink className="  font-semibold" to="Addapet"><ListItem className=" gap-2"> <MdOutlinePostAdd className=" text-2xl"> </MdOutlinePostAdd>Add a Pet</ListItem></NavLink></li>

                            <li><NavLink className="  font-semibold" to="MyAddSection"> <ListItem className=" gap-2"> <FaTableList className=" text-lg"></FaTableList>My Add Page</ListItem></NavLink></li>

                            <li><NavLink className="  font-semibold" to="CreateDonation"> <ListItem className=" gap-2"> <SiMercadopago className="text-2xl"></SiMercadopago>Create Donation Campaign</ListItem></NavLink></li>

                            <li><NavLink className="  font-semibold" to="adoptRequest"> <ListItem className=" gap-2"> <MdOutlineFeed className="text-2xl"></MdOutlineFeed>Adoption Request</ListItem></NavLink></li>

                            <li> <NavLink className="  font-semibold" to="MyDonationCampaign"> <ListItem className=" gap-2"> <FaDonate></FaDonate>My Donation Campaign</ListItem></NavLink></li>

                            <li><NavLink className="  font-semibold" to="/"> <ListItem className="gap-2" > <AiOutlineHome className="text-xl"></AiOutlineHome>Go to Page</ListItem></NavLink></li>

                            <li><NavLink className="  font-semibold" > <ListItem className="gap-2"> <IoIosLogOut className="text-xl"></IoIosLogOut>Log Out</ListItem></NavLink></li>
                            </>
                    }
                </ul>
            </div>
            <div className="flex-1 bg-blue-gray-200"><Outlet></Outlet></div>


        </div>

    );
};

export default Dashboard;