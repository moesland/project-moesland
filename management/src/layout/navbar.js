import '../assets/FredokaOne-Regular.ttf';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState("");

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    const removeStorage = () => {
        try {
            setUser("");
            localStorage.clear();
            navigate('/login/');
        } catch (error) {
            console.error(error);
        }
    }    

    return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Moesland</a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link navbar-text-color" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link navbar-text-color" href="#">Beheerders</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link navbar-text-color" href="/articles">Artikels</a>
                    </li>
                </ul>
                <input class="nav-link border-0 navbar-text-color n-hover text-right bg-light text-center" type="text" value={'Welkom ' + user + '!'} disabled />
                <button class="nav-link navbar-text-color bg-light mb-2 mb-lg-0 border-0 n-hover" onClick={removeStorage}>Uitloggen</button>
            </div>
        </div>
    </nav>
    )
}

export default Navbar;