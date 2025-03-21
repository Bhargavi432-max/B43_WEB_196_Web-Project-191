import "../styles/modal.css";

const Modal = ({ onClose, children }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {children}
                <button className="modal-close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
