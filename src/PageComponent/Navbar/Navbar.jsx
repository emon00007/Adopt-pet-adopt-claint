import  { useContext, useEffect, useState,} from "react";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
 
  IconButton,
  ListItem,

} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const CustomNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const { user, LogOut } = useContext(AuthContext);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleLogOut = () => {
    LogOut()
        .then(() => { })
        .catch(error => console.log(error));
}


  const navList = (
    <ul tabIndex={0} className="mt-2 mb-4 flex flex-col gap-2 bg-base-100 dropdown-content rounded-box lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <li><NavLink to='/'> <ListItem>Home</ListItem></NavLink></li>
      <li><NavLink to='/Petlisting'><ListItem>Pet Listing</ListItem></NavLink></li>
      <li><NavLink to='/donationCampaignPage'><ListItem>Donation Campaign</ListItem></NavLink></li>
      <li><NavLink to='/dashboard'><ListItem> Dashboard</ListItem></NavLink></li>
      <li><img className="rounded-full w-14 h-14 border-2 border-blue-700" src={user?.photoURL} alt="" /></li>

      {
                user ? <>
                    {/* <span>{user?.displayName}</span> */}
                    <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
                </> : <>
                    <li><ListItem><Link to="/Login">Login</Link></ListItem></li>
                </>
            }
      <li><ListItem><NavLink to='/SignUp'> Sign Up</NavLink></ListItem></li>
 
    </ul>
  );

  return (
    <div className=" max-h-[768px]   ">
      <MTNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium">
                <div className="flex items-center">
                <img className="  w-28 h-24 " src="https://i.ibb.co/HFmCpTx/Screenshot-2024-06-02-202539.png" alt="" />
            <h3 className="md:text-2xl">Adopets</h3>
                </div>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">
                {navList}
                </div>

            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav className="text-black pl-3" open={openNav}>
          {navList}

        </MobileNav>
      </MTNavbar>
      

    </div>
  );
};

export default CustomNavbar;
