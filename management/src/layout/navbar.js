import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BackendFetch } from "../services/ApiClient";

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [isSuperadmin, setIsSuperadmin] = useState(false);

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            setUser(`Welkom ${loggedInUser}!`);

            BackendFetch(`/api/user/role/?username=${loggedInUser}`, 'GET', (eventData) => {
                if(eventData.rolename === "SuperAdmin")
                    setIsSuperadmin(true);
            });   
        }
    }, [user]);

    const logout = () => {
        try {
            setUser('');
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <nav className="navbar navbar-expand navbar-light bg-light font-moesland">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Moesland</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link navbar-text-color" aria-current="page" href="/">Home</a>
                        </li>
                        {isSuperadmin && (
                        <li className="nav-item">
                            <a className="nav-link navbar-text-color" href="/users">Beheerders</a>
                        </li>
                        )}
                        <li className="nav-item">
                            <a className="nav-link navbar-text-color" href="/articles">Nieuwsartikelen</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link navbar-text-color" href="/events">Evenementen</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle navbar-text-color" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Gebruikersfoto's
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li className="nav-item">
                                    <a className="dropdown-item" href="/photo-management">Te keuren foto's</a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item" href="/approved-photo-management">Goedgekeurde foto's</a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item" href="/declined-photo-management">Afgekeurde foto's</a>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle navbar-text-color" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Deelnemers
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li className="nav-item">
                                    <a className="dropdown-item" href="/participation">Deelnemers</a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item" href="/participation-category">Deelnemercategorieën</a>
                                </li>
                                <li className="nav-item">
                                    <a className="dropdown-item" href="/voting-overview">Ranglijst</a>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    <input className="nav-link border-0 navbar-text-color n-hover text-right bg-light text-center" type="text" value={user} disabled />
                    <button className="nav-link navbar-text-color bg-light mb-2 mb-lg-0 border-0 n-hover" onClick={logout}>Uitloggen</button>
                </div>
            </div>
        </nav>
    );
}
