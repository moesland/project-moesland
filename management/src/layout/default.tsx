import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import React from "react"

const DefaultLayout = () => {
    return (
        <div className="layout">
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default DefaultLayout;