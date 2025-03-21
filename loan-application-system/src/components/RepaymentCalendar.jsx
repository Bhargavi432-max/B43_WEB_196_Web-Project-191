import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RepaymentCalendar.css"; 

const RepaymentCalendar = () => {
    const [repayments, setRepayments] = useState([]);

    useEffect(() => {
        const fetchRepaymentSchedule = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/repayments", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRepayments(response.data);
            } catch (error) {
                console.error("Error fetching repayment schedule:", error);
            }
        };

        fetchRepaymentSchedule();
    }, []);

    return (
        <div className="repayment-calendar-container">
            <h2>Repayment Calendar</h2>
            {repayments.length > 0 ? (
                <ul className="repayment-list">
                    {repayments.map((payment, index) => (
                        <li key={index} className={payment.status === "Paid" ? "paid" : "due"}>
                            <strong>Due Date:</strong> {payment.dueDate} | 
                            <strong> Amount:</strong> ₹{payment.amount} | 
                            <strong> Status:</strong> {payment.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No repayment schedule available.</p>
            )}
        </div>
    );
};

export default RepaymentCalendar;
