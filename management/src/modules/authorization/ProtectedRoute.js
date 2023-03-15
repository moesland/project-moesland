import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react'

const useAuth = () => { 
    const [isAuth, setIsAuth] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {

      };          
      
     fetchData();
    }, []);      
  
    return isAuth;
}


const ProtectedRoute = ({ isAuthenticated = true, redirectPath = "/", children }) => {
    if (isAuthenticated) {
        return <Navigate to={redirectPath} />;
    }
    
    return children ? children : <Outlet/>;
};

export default ProtectedRoute;
