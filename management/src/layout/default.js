import Navbar from "./navbar";
import Footer from "./footer";

const DefaultLayout = (props) => {
    return (
        <div className="layout">
            <Navbar/>
                {props.children}
            <Footer/>
        </div>
    )
}

export default DefaultLayout;