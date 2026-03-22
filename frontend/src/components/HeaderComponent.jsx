import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const logout = () => {
        localStorage.removeItem("isAdmin");
        navigate('/login');
        window.location.reload(); // Force update UI
    };

    return (
        <div className="mb-4">
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a href="/" className="navbar-brand px-3">Employee Management App</a>
                        {isAdmin && (
                            <button className="btn btn-outline-danger btn-sm" onClick={logout}>Logout</button>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
