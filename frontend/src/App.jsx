import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import LoginComponent from './components/LoginComponent';

function App() {
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    return (
        <div>
            <Router>
                <HeaderComponent />
                <div className="container" style={{ marginBottom: "100px" }}>
                    <Routes>
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/" element={isAdmin ? <ListEmployeeComponent /> : <Navigate to="/login" />} />
                        <Route path="/employees" element={isAdmin ? <ListEmployeeComponent /> : <Navigate to="/login" />} />
                        <Route path="/add-employee" element={isAdmin ? <CreateEmployeeComponent /> : <Navigate to="/login" />} />
                        <Route path="/edit-employee/:id" element={isAdmin ? <CreateEmployeeComponent /> : <Navigate to="/login" />} />
                    </Routes>
                </div>
                <FooterComponent />
            </Router>
        </div>
    );
}

export default App;
