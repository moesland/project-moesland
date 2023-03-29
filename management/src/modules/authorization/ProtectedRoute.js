import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/default';

const useAuth = (token) => {
    const [isAuth, setIsAuth] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'http://localhost:5000/api/auth/validate';
            const requestOptions = {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + token
                })
            };
            try {
                await fetch(url, requestOptions)
                    .then(response => response.json())
                    .then(data => setIsAuth(data))
                    .catch((err) => setIsAuth(false))
            } catch (error) {
                setIsAuth(false);
            }
        };

        fetchData();
    }, [token]);

    return isAuth;
}


const ProtectedRoute = ({ isAuthenticated = true, redirectPath = "/login", children }) => {
    const token = localStorage.getItem('token');

    if (window.location.pathname === "/login") {
        if (token && redirectPath === "/login") {
            return <Navigate to="/" />;
        }

        return children ? children : <Outlet />;
    }

    return <AuthenticateRoute token={token} isAuthenticated={isAuthenticated} redirectPath={redirectPath} children={children} />;
};

const AuthenticateRoute = ({ token, isAuthenticated, redirectPath, children }) => {
    const isAuth = useAuth(token);
    
    if (!isAuthenticated) {
        return <Navigate to={redirectPath} />;
    }

    if (!isAuth) {
        return <>loading</>;
    }

    if (isAuth.error == "Invalid authorization token"){
        localStorage.clear()
        return <Navigate to={redirectPath} />; 
    }

    if (!isAuth.authorized) {
        return <Navigate to={redirectPath} />;
    }

    return children ? children : <DefaultLayout />; //THIS
};

export default ProtectedRoute;
