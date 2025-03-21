import LoanForm from "../components/LoanForm";
import LoanList from "../components/LoanList";

const LoanPage = () => {
    return (
        <div className="max-w-lg mx-auto mt-10">
            <LoanForm />
            <LoanList />
        </div>
    );
};

export default LoanPage;
