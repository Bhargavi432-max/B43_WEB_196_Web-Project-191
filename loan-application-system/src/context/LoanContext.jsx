import { createContext, useContext, useState, useEffect } from "react";
import axios from "../config/axios";

const LoanContext = createContext();

export const useLoans = () => useContext(LoanContext);

export const LoanProvider = ({ children }) => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get("/loans/my-loans");
                setLoans(response.data);
            } catch (error) {
                console.error("Error fetching loans:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLoans();
    }, []);

    return (
        <LoanContext.Provider value={{ loans, setLoans, loading }}>
            {children}
        </LoanContext.Provider>
    );
};
