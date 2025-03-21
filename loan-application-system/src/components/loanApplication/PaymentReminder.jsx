import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/PaymentReminder.css";  

const PaymentReminder = () => {
    const { user } = useContext(AuthContext);
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRepayments = async () => {
            try {
                const userId = user.id; 
                const response = await fetch(`http://localhost:5000/api/repayments/calendar/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch repayments");
                }

                const data = await response.json();
                const formattedReminders = data.repayments.map(rep => ({
                    message: `₹${rep.amount} is due on ${new Date(rep.dueDate).toDateString()}`,
                    date: rep.dueDate
                }));

                setReminders(formattedReminders);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepayments();
    }, []);

    return (
        <div className="payment-reminder-container">
            <h2 className="payment-reminder-title">Payment Reminders</h2>
            {loading ? (
                <p className="payment-reminder-loading">Loading...</p>
            ) : error ? (
                <p className="payment-reminder-error">{error}</p>
            ) : reminders.length > 0 ? (
                reminders.map((reminder, index) => (
                    <p key={index} className="payment-reminder-message">{reminder.message}</p>
                ))
            ) : (
                <p className="payment-reminder-loading">No upcoming payments.</p>
            )}
        </div>
    );
};

export default PaymentReminder;
