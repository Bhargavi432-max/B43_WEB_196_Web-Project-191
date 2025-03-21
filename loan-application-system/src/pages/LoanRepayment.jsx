import RepaymentCalendar from "../components/loanApplication/RepaymentCalendar";
import PaymentReminder from "../components/loanApplication/PaymentReminder";

const Repayments = () => {
    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold text-center my-4">Repayment Schedule</h1>

            <PaymentReminder />

            <RepaymentCalendar />
        </div>
    );
};

export default Repayments;
