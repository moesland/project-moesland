import Navbar from "./navbar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
    return (
        <div className="layout">
            <Navbar/>
                <Outlet/>
            <Footer/>
        </div>
    );
}