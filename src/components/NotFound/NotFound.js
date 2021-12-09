import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="container">
            <div className="notFound">
                <h2 className="notFound__title">404</h2>
                <h3 className="notFound__subtitle">Page not found</h3>
                <Link to="/" className="btn btn__primary">Back to homepage</Link>
            </div>
        </div>
    );
};

export default NotFound;