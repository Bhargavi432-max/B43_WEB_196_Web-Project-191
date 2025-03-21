const ProgressBar = ({ step }) => {
    const steps = ["Personal Info", "Financial Info", "Upload Documents", "Review & Submit"];

    return (
        <div className="loan-app-progress-bar">
            {steps.map((label, index) => (
                <div key={index} className={`loan-app-step ${index + 1 <= step ? "active" : ""}`}>
                    {label}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
