import '../assets/FredokaOne-Regular.ttf';

const Navbar = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="/">Moesland</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className="nav-link navbar-text-color" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link navbar-text-color" href="/users">Beheerders</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link navbar-text-color" href="/articles">Artikels</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default Navbar;