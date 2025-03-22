import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setToken, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const API_BASE_URL = "https://loanbackend-1.onrender.com";
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
                email,
                password
            });
    
            const { token, user } = response.data; // Get token and user info from backend
            setToken(token);
            setUser(user);
    
            alert("Login successful!");
    
            // Redirect based on user role
            if (user.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/user-dashboard");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data);
            alert(error.response?.data?.message || "Login failed");
        }
    };
    

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>

            <div> New user? <span onClick={() => navigate("/signup")}>Signup!</span> </div>
        </div>

        
    );
};

export default Login;
