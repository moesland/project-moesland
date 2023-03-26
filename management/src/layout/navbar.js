import '../assets/FredokaOne-Regular.ttf';

const Navbar = () => {
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
                        <a class="nav-link navbar-text-color" href="/articles/create">Nieuwsartikels</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )
}

export default Navbar;