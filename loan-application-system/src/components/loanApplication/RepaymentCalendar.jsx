import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect,useContext } from "react";
import Modal from "../Modal";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/RepaymentCalendar.css";

const RepaymentCalendar = () => {
    const { user } = useContext(AuthContext);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [payments, setPayments] = useState([]);

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
                const data =await response.json();
                setPayments(data.repayments || []);
                console.log("repaymentdata",data);
            } catch (error) {
                console.error("Error fetching repayments:", error);
            }
        };

        fetchRepayments();
    }, [user.id]);

    const getEventColor = (status) => {
        switch (status) {
            case "Paid": return "green";
            case "Overdue": return "red";
            case "Upcoming": return "yellow";
            default: return "gray";
        }
    };

    const handlePayment = async (repaymentId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/repayments/pay/${repaymentId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
    
            if (response.ok) {
                setPayments(prevPayments => prevPayments.map(payment => 
                    payment._id === repaymentId ? { ...payment, status: "Paid" } : payment
                ));
    
                setTimeout(() => {
                    setSelectedPayment(null);
                }, 300); 
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    };
    

    return (
        <div className="p-6">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={payments.map(payment => ({
                    title: `₹${payment.amount} ${payment.status}`,
                    date: payment.dueDate,
                    backgroundColor: getEventColor(payment.status),
                    textColor: "#fff"
                }))}
                eventClick={(info) => {
                    const clickedPayment = payments.find(p => `₹${p.amount} ${p.status}` === info.event.title);
                    setSelectedPayment(clickedPayment);
                }}
            />

            {selectedPayment && (
                <Modal onClose={() => setSelectedPayment(null)}>
                    <h2 className="text-xl font-bold">{`₹${selectedPayment.amount} ${selectedPayment.status}`}</h2>
                    <p>Date: {new Date(selectedPayment.dueDate).toDateString()}</p>
                    <p>Status: {selectedPayment.status}</p>
                    <div className="mt-4">
                        {selectedPayment.status !== "Paid" && (
                            <button 
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                onClick={() => handlePayment(selectedPayment._id)}
                            >
                                Pay Now
                            </button>
                        )}
                        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setSelectedPayment(null)}>
                            Close
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default RepaymentCalendar;
