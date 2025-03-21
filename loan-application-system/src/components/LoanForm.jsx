import { useState } from "react";
import { useLoans } from "../context/LoanContext";
import axios from "../config/axios";

const LoanForm = () => {
    const { setLoans } = useLoans();
    const [formData, setFormData] = useState({
        loanAmount: "",
        loanType: "Personal",
        duration: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/loans", formData);
            setLoans((prevLoans) => [...prevLoans, response.data]);
            setFormData({ loanAmount: "", loanType: "Personal", duration: "" });
        } catch (error) {
            console.error("Error submitting loan:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded">
            <h2 className="text-xl font-bold mb-4">Apply for a Loan</h2>
            <input
                type="number"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                placeholder="Loan Amount"
                className="w-full p-2 border mb-2"
                required
            />
            <select
                name="loanType"
                value={formData.loanType}
                onChange={handleChange}
                className="w-full p-2 border mb-2"
            >
                <option value="Personal">Personal Loan</option>
                <option value="Home">Home Loan</option>
                <option value="Car">Car Loan</option>
                <option value="Education">Education Loan</option>
            </select>
            <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="Duration (months)"
                className="w-full p-2 border mb-2"
                required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 w-full">Apply</button>
        </form>
    );
};

export default LoanForm;
