import { Navigate } from 'react-router-dom';
import DefaultLayout from '../../layout/default';


const ProtectedRoute = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }
    
    return <DefaultLayout />;
};

export default ProtectedRoute;
