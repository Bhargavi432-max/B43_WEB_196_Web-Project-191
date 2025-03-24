import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
    const { user, setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleDashboardRedirect = () => {
        if (user?.role === "admin") {
            navigate("/admin-dashboard");
        } else {
            navigate("/user-dashboard");
        }
    };

    return (
        <nav className="navbar">
            <div className="nav-left">
                <img src="/logo_loan.png" alt="Logo" className="nav-logo" />
                <h2>Loan Management System</h2>
            </div>
            <div className="nav-buttons">
                <button onClick={handleDashboardRedirect}>Dashboard</button>
                <button onClick={() => navigate("/repayments")}>Repayment Calendar</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
