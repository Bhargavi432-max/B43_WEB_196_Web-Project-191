import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import axios from "axios";

const Signup = () => {
    const [userDetails, setUserDetails] = useState({ name: "", email: "", password: "" });
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const API_BASE_URL = "https://loanbackend-1.onrender.com";
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
    };

    const handleSignup = async () => {
        if (!userDetails.name || !userDetails.email || !userDetails.password) {
            alert("All fields are required!");
            return;
        }

        if (!validateEmail(userDetails.email)) {
            alert("Invalid email format!");
            return;
        }

        if (!validatePassword(userDetails.password)) {
            alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
                ...userDetails,
                role: "user",
            });
            setToken(response.data.token);
            navigate("/login");
        } catch (error) {
            console.error("Signup Error:", error.response?.data);
            alert(error.response?.data?.msg || "Signup failed, try again.");
        }
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <input 
                type="text" 
                placeholder="Full Name" 
                value={userDetails.name}
                onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} 
                required 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={userDetails.password}
                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} 
                required 
            />
            <button onClick={handleSignup}>Signup</button>

            <div>
                Already have an account? <span onClick={() => navigate("/login")}>Login!</span>
            </div>
        </div>
    );
};

export default Signup;
