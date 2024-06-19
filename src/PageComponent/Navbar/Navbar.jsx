import { useContext, useEffect, useState } from "react";
import {
  Navbar as MTNavbar,
  MobileNav,
  Typography,
  IconButton,
  ListItem,
} from "@material-tailwind/react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";

import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuList
} from "@material-tailwind/react";
import useAdmin from "../../Hooks/useAdmin";
import useUser from "../../Hooks/useUser";
// import {} from "@material-tailwind/react";





function AvatarWithUserDropdown() {
  const [isAdmin, isAdminLoading] = useAdmin()
  const [isUser] = useUser()
  const { LogOut, user } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const handleLogOut = () => {
    LogOut()
      .then(() => { })
      .catch((error) => console.log(error));
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center rounded-full p-0"
        >
          <div className=" border-2 rounded-full">
            <Avatar
              variant="circular"
              size="md"
              alt="user profile"
              withBorder={true}
              color="blue-gray"
              className="p-0.5"
              src={user?.photoURL}
            />
          </div>
        </Button>
      </MenuHandler>
      <MenuList className="p-1">

        {
          isAdmin && !isAdminLoading && <NavLink to="/dashboard/allUsers">
            <ListItem>Dashboard</ListItem>
          </NavLink>
        }
        {

          !isAdmin && <NavLink to="/dashboard/Addapet">
            <ListItem>User Dashboard </ListItem>
          </NavLink>
        }



        <ListItem onClick={handleLogOut}>
          <>Log Out</>
        </ListItem>

      </MenuList>
    </Menu>
  );
}

const CustomNavbar = () => {
  const [openNav, setOpenNav] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const navList = (
    <ul
      tabIndex={0}
      className="mt-2 mb-4 flex flex-col gap-2 bg-base-100 dropdown-content rounded-box lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"
    >
      <li>
        <NavLink to="/">
          <ListItem>Home</ListItem>
        </NavLink>
      </li>
      <li>
        <NavLink to="/Petlisting">
          <ListItem>Pet Listing</ListItem>
        </NavLink>
      </li>
      <li>
        <NavLink to="/donationCampaignPage">
          <ListItem>Donation Campaign</ListItem>
        </NavLink>
      </li>



    </ul>
  );

  return (
    <div className="max-h-[768px]">
      <MTNavbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-medium"
          >
            <div className="flex items-center">
              <img
                className="w-28 h-24"
                src="https://i.ibb.co/HFmCpTx/Screenshot-2024-06-02-202539.png"
                alt="Adopets logo"
              />
              <h3 className="md:text-2xl">Adopets</h3>
            </div>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList} </div>
            <div>

              {
                user ? (
                  <>
                    <AvatarWithUserDropdown></AvatarWithUserDropdown>
                  </>
                ) : (
                  <div className="grid gap-2 md:grid-cols-2">
                    <Link className="border  border-black rounded-2xl px-2" to='/Login'>
                      <ListItem>
                        Login
                      </ListItem>
                    </Link>
                    <Link className="border  border-black rounded-2xl px-2" to='/SignUp'>
                      <ListItem>
                        Register
                      </ListItem>
                    </Link>
                  </div>

                )
              }



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
