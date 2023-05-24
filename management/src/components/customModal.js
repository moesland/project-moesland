import "../styles/custom.css";

const CustomModal = ({ children, title, onClose }) => {
  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal show custom-modal" tabIndex={-1} role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-moesland text-white">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              onClick={closeModal}
              aria-label="Close"
            >
              <span aria-hidden="true" className="close-icon">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;