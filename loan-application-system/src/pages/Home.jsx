import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-blue-600">Welcome to Loan Portal</h1>
      <p className="text-gray-600 mt-4">Easily apply for loans and manage repayments.</p>
      <div className="mt-6 space-x-4">
        <Link to="/apply" className="px-6 py-2 bg-blue-500 text-white rounded-lg">Apply for a Loan</Link>
        <Link to="/status" className="px-6 py-2 bg-green-500 text-white rounded-lg">Check Loan Status</Link>
      </div>
    </div>
  );
}

export default Home;
