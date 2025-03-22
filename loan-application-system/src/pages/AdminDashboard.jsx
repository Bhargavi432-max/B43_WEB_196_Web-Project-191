import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Adminstyles.css";  

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const API_BASE_URL = "https://loanbackend-1.onrender.com";
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/loans/all-applications`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, []);

    const handleApprove = async (id) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`${API_BASE_URL}/api/loans/${id}/approve`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setApplications(applications.map(app => app._id === id ? { ...app, status: "Approved" } : app));
        } catch (error) {
            console.error("Approval error:", error.response?.data);
            alert(error.response?.data?.message || "Approval failed");
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <p>Welcome, {user?.name}!</p>

            <h3>Loan Applications</h3>
            <div className="loan-cards-container">
                {applications.map((loan) => (
                    <div key={loan._id} className="loan-card">
                        <h3>{loan.name}</h3>
                        <p><strong>Loan Amount:</strong> {loan.loanAmount} rupees</p>
                        <p>
                            <strong>Status:</strong>
                            <span className={`loan-status ${loan.status === "Approved" ? "status-approved" : "status-pending"}`}>
                                {loan.status}
                            </span>
                        </p>

                        {loan.document && (
                            <div className="document-preview">
                                {loan.document.endsWith(".pdf") ? (
                                    <a href={loan.documentURL} target="_blank" rel="noopener noreferrer" className="btn btn-view">
                                        View Document
                                    </a>
                                ) : (
                                    <img src={loan.documentURL} alt="Loan Document" className="document-image" />
                                )}
                            </div>
                        )}

                        {loan.status === "Pending" ? (
                            <button className="btn btn-approve" onClick={() => handleApprove(loan._id)}>Approve</button>
                        ) : loan.status === "Approved" && !loan.hasRepaymentSchedule ? (
                            <button className="btn btn-schedule" onClick={() => navigate(`/schedule-repayments/${loan._id}`)}>
                                Schedule Repayments
                            </button>
                        ) : (
                            <span className="scheduled">Scheduled</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
