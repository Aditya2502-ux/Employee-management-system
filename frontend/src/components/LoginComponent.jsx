import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';

const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        EmployeeService.login(username.trim(), password)
            .then(res => {
                // Save login status to localStorage
                localStorage.setItem("isAdmin", "true");
                navigate('/employees');
                window.location.reload(); // Refresh to update header
            })
            .catch(err => {
                const status = err.response?.status;
                if (status === 404) {
                    setError('The server on port 8080 does not expose login (404). Stop the old backend and start a fresh one: in the backend folder run mvn spring-boot:run, then try again. Use admin / admin123.');
                    return;
                }
                const msg = err.response?.data?.message;
                if (msg) {
                    setError(`${msg} (Username: admin, Password: admin123)`);
                } else if (err.code === 'ERR_NETWORK') {
                    setError('Cannot reach the API at http://localhost:8080. Start the backend (mvn spring-boot:run) and ensure port 8080 is free.');
                } else {
                    setError('Login failed. Check username/password (admin / admin123) or browser console for CORS/network errors.');
                }
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="card col-md-5">
                    <h3 className="text-center mt-3">Admin Login</h3>
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label>Username:</label>
                                <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label>Password:</label>
                                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
