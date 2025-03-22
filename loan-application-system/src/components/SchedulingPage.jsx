import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ScheduleRepayments.css";  
const ScheduleRepayments = () => {
  const { loanId } = useParams();
  const navigate = useNavigate();
  const [loan, setLoan] = useState(null);
  const [tenure, setTenure] = useState(12);
  const [interestRate, setInterestRate] = useState(10);
  const [startDate, setStartDate] = useState("");
  const API_BASE_URL = "https://loanbackend-1.onrender.com"; 
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/loans/${loanId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then((res) => setLoan(res.data))
    .catch((err) => console.error("Error fetching loan:", err));
  }, [loanId]);

  const handleSchedule = () => {
    axios.post(`${API_BASE_URL}/api/repayments/schedule/${loanId}`, { tenure, interestRate, startDate }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(() => {
      alert("Repayments scheduled successfully!");
      navigate("/admin/dashboard");
    })
    .catch((err) => alert(err.response.data.message));
  };

  if (!loan) return <p>Loading...</p>;

  return (
    <div className="schedule-repayments-container">
      <h2>Schedule Repayments</h2>
      <p><strong>Loan Amount:</strong> {loan.loanAmount} Rupees</p>
      
      <label>Tenure (months)</label>
      <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} />

      <label>Interest Rate (%)</label>
      <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />

      <label>Start Date</label>
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <button onClick={handleSchedule}>Confirm Schedule</button>
    </div>
  );
};

export default ScheduleRepayments;
