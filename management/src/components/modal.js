
const CustomModal = (props) => {

    

    return <div className="modal show custom-modal" tabIndex={-1} role="dialog">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header bg-moesland text-white">
                    <h5 className="modal-title">{props.title}</h5>
                </div>
                {props.children}
            </div>
        </div>
    </div>
}

export default CustomModal;