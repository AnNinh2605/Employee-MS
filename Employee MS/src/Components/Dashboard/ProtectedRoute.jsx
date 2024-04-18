import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    return localStorage.getItem("access_token") ? children : <Navigate to="/" />
}

export default ProtectedRoute;
