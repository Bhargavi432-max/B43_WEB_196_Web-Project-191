const FinancialInfo = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="loan-app-section">
            <h2 className="loan-app-heading">Step 2: Financial Information</h2>
            <input className="loan-app-input" type="number" name="income" placeholder="Monthly Income" value={formData.income} onChange={handleChange} required />
            <input className="loan-app-input" type="number" name="loanAmount" placeholder="Loan Amount" value={formData.loanAmount} onChange={handleChange} required />
            <button className="loan-app-button loan-app-button-back" onClick={prevStep}>Back</button>
            <button className="loan-app-button loan-app-button-next" onClick={nextStep}>Next</button>
        </div>
    );
};

export default FinancialInfo;
