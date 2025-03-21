import { useLoans } from "../context/LoanContext";

const LoanList = () => {
    const { loans, loading } = useLoans();

    if (loading) return <p>Loading...</p>;

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Your Loan Applications</h2>
            {loans.length === 0 ? (
                <p>No loan applications found.</p>
            ) : (
                <ul className="border p-4 rounded">
                    {loans.map((loan) => (
                        <li key={loan._id} className="p-2 border-b">
                            <p><strong>Type:</strong> {loan.loanType}</p>
                            <p><strong>Amount:</strong> ₹{loan.loanAmount}</p>
                            <p><strong>Duration:</strong> {loan.duration} months</p>
                            <p><strong>Status:</strong> <span className={`text-${loan.status === "Approved" ? "green" : loan.status === "Rejected" ? "red" : "yellow"}-500`}>{loan.status}</span></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LoanList;
