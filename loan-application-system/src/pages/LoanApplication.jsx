import { useState } from "react";
import PersonalInfo from "../components/loanApplication/PersonalInfo";
import FinancialInfo from "../components/loanApplication/FinancialInfo";
import UploadDocuments from "../components/loanApplication/UploadDocuments";
import ReviewSubmit from "../components/loanApplication/ReviewSubmit";
import ProgressBar from "../components/loanApplication/ProgressBar";
import "../styles/LoanApplication.css"; 

const LoanApplication = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        income: "",
        loanAmount: "",
        documents: [],
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    
    return (
        <div className="loan-app-container">
            <ProgressBar step={step} />
            {step === 1 && <PersonalInfo formData={formData} setFormData={setFormData} nextStep={nextStep} />}
            {step === 2 && <FinancialInfo formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <UploadDocuments formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
            {step === 4 && <ReviewSubmit formData={formData} prevStep={prevStep} />}
        </div>
    );
};

export default LoanApplication;
