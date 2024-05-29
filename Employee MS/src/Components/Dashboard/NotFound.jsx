import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div
            className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <h1 className="display-1">404</h1>
            <p className="lead">The page you are looking for does not exist.</p>
            <Link to="/dashboard" className="btn btn-primary mt-3">Go back to Home</Link>
        </div>
    );
}

export default NotFound;
