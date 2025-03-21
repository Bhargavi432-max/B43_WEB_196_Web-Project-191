const PersonalInfo = ({ formData, setFormData, nextStep }) => {
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="loan-app-section">
            <h2 className="loan-app-heading">Step 1: Personal Information</h2>
            <input className="loan-app-input" type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input className="loan-app-input" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input className="loan-app-input" type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            <button className="loan-app-button loan-app-button-next" onClick={nextStep}>Next</button>
        </div>
    );
};

export default PersonalInfo;
