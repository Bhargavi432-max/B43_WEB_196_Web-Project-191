const UploadDocuments = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleFileUpload = (e) => {
        setFormData({ ...formData, documents: e.target.files});
    };

    return (
        <div className="loan-app-section">
            <h2 className="loan-app-heading">Step 3: Upload Documents</h2>
            <input className="loan-app-file-input" type="file" multiple onChange={handleFileUpload} required />
            <button className="loan-app-button loan-app-button-back" onClick={prevStep}>Back</button>
            <button className="loan-app-button loan-app-button-next" onClick={nextStep}>Next</button>
        </div>
    );
};

export default UploadDocuments;
