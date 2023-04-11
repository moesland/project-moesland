import Navbar from "./navbar";
import Footer from "./footer";
import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

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