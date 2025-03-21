import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import LoanApplication from "./pages/LoanApplication";
import Repayments from "./pages/LoanRepayment";
import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar"; 
import LoanDetails from "./pages/LoanDetails";
import ScheduleRepayments from "./components/SchedulingPage"

const Layout = () => {
    const { token, user } = useContext(AuthContext);
    const location = useLocation();
    
    const hideNavbar = ["/login", "/signup", "/"].includes(location.pathname);

    return (
        <>
            {!hideNavbar && <Navbar />} 
            <Routes>
                <Route 
                    path="/" 
                    element={token ? <Navigate to={user?.role === "admin" ? "/admin-dashboard" : "/user-dashboard"} /> : <Login />} 
                />
                <Route 
                    path="/login" 
                    element={token ? <Navigate to={user?.role === "admin" ? "/admin-dashboard" : "/user-dashboard"} /> : <Login />} 
                />
                <Route 
                    path="/signup" 
                    element={token ? <Navigate to={user?.role === "admin" ? "/admin-dashboard" : "/user-dashboard"} /> : <Signup />} 
                />

                <Route element={<PrivateRoute token={token} />}>
                    <Route path="/user-dashboard" element={<UserDashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                    <Route path="/loan-application" element={<LoanApplication />} />
                    <Route path="/repayments" element={<Repayments />} />
                    <Route path="/loan-details/:loanId" element={<LoanDetails />} />
                    <Route path="/schedule-repayments/:loanId" element={<ScheduleRepayments />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};


function App() {
    return (
        <Router>
            <Layout />
        </Router>
    );
}

export default App;
