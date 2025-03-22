import { useContext, useEffect, useState } from "react"; 
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/UserDashboard.css";
import axios from "axios";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [repayments, setRepayments] = useState([]);
    const API_BASE_URL = "https://loanbackend-1.onrender.com";
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_BASE_URL}/api/loans/my-applications`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching applications:", error.response?.data);
            }
        };

        if (user) fetchApplications();
    }, [user]);


    return (
        <div className="dashboard-container">
            <div className="section">
                <h3>Your Loan Applications</h3>
                <button className="apply-loan-btn" onClick={() => navigate("/loan-application")}>
                    Apply for Loan
                </button>

                {applications.length === 0 ? (
                    <p>No loan applications found.</p>
                ) : (
                    <div className="loan-cards">
                        {applications.map((app) => (
                            <div key={app._id} className="loan-card" onClick={() => navigate(`/loan-details/${app._id}`)}>
                                <h4>₹{app.loanAmount}</h4>
                                <p>Status: <span className={`status ${app.status.toLowerCase()}`}>{app.status}</span></p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDashboard;
