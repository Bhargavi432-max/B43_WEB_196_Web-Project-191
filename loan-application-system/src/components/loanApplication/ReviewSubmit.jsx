import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ReviewSubmit = ({ formData, prevStep }) => {
    const navigate = useNavigate();
    const { token, user } = useContext(AuthContext);
    const API_BASE_URL = "https://loanbackend-1.onrender.com";
    const handleSubmit = async () => {
        if (!token || !user) {
            alert("Authentication required. Please log in again.");
            navigate("/login");
            return;
        }

        const loanData = new FormData();
        loanData.append("userId", user.id);
        loanData.append("name", formData.name);
        loanData.append("email", formData.email);
        loanData.append("phone", formData.phone);
        loanData.append("income", formData.income);
        loanData.append("loanAmount", formData.loanAmount);
        loanData.append("status", "Pending");
        if (formData.documents && formData.documents.length > 0) {
            loanData.append("document", formData.documents[0]); 
        }

        try {
            console.log("Sending loan application:", loanData);

            await axios.post(`${API_BASE_URL}/api/loans/apply`, loanData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data", 
                },
            });

            alert("Loan application submitted successfully!");
            navigate("/user-dashboard");
        } catch (error) {
            alert(error.response?.data?.message || "Error submitting loan application.");
        }
    };

    return (
        <div className="loan-app-review">
            <h2 className="loan-app-heading">Step 4: Review & Submit</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Income:</strong> {formData.income}</p>
            <p><strong>Loan Amount:</strong> {formData.loanAmount}</p>
            <button className="loan-app-button loan-app-button-back" onClick={prevStep}>Back</button>
            <button className="loan-app-button loan-app-button-next" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ReviewSubmit;
