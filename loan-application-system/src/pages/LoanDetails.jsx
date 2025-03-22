import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/LoanDetails.css";

const statusSteps = ["Submitted", "Under Review", "Approved", "Rejected"];

const LoanDetails = () => {
    const { loanId } = useParams();
    const navigate = useNavigate();
    const [loan, setLoan] = useState(null);
    const API_BASE_URL = "https://loanbackend-1.onrender.com"; 
    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${API_BASE_URL}/api/loans/${loanId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setLoan(response.data);
            } catch (error) {
                console.error("Error fetching loan details:", error);
            }
        };

        fetchLoanDetails();
    }, [loanId]);

    if (!loan) return <p>Loading loan details...</p>;

    const currentIndex = statusSteps.indexOf(loan.status);
    const progressPercentage = ((currentIndex + 1) / statusSteps.length) * 100;

    const getProgressColor = () => {
    if (loan.status === "Approved") return "green";
    if (loan.status === "Rejected") return "red";
    if (loan.status === "Pending" || loan.status === "Pending") return "yellow";
    return "#007bff"; 
};


    return (
        <div className="loan-details-container">
            <h2>Loan Details</h2>
            <p><strong>Amount:</strong> ₹{loan.loanAmount}</p>
            <p><strong>Status:</strong> {loan.status}</p>

            <div className="progress-container">
                <div className="progress-bar">
                    <div 
                        className={`progress-fill ${loan.status.toLowerCase().replace(" ", "-")}`}
                        style={{ width: `${progressPercentage}%`, backgroundColor: getProgressColor() }}>
                    </div>

                </div>
                {statusSteps.map((step, index) => (
                    <div 
                        key={index} 
                        className={`progress-step ${index <= currentIndex ? "active" : ""} ${step === "Approved" ? "approved" : step === "Rejected" ? "rejected" : ""}`}>
                        <span>{step}</span>
                    </div>
                ))}
            </div>

            <button className="back-btn" onClick={() => navigate("/user-dashboard")}>Back to Dashboard</button>
        </div>
    );
};

export default LoanDetails;
