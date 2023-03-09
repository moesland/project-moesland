import { FC } from 'react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import DefaultLayout from '../../layout/default';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ isAuthenticated }) => {
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }
    
    return <DefaultLayout />;
};

export default ProtectedRoute;
