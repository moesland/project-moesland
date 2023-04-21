import Navbar from "./navbar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

const DefaultLayout = (props) => {

    return (
        <div className="layout">
            <Navbar/>
                <Outlet/>
            <Footer/>
        </div>
    )
}

export default DefaultLayout;