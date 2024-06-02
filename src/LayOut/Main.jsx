import { Outlet } from "react-router-dom";
import Footer from "../PageComponent/Footer/Footer";
import Navbar from "../PageComponent/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;