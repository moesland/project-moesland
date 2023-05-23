import CustomModal from "../../components/customModal";
import { BackendFetch } from "../../services/ApiClient";

const ModalDelete = ({ onClose, data }) => {
    const handleSubmit = async () => {
        const method = 'DELETE';
        const endpoint = `/api/participation/${data._id}`;

        await BackendFetch(endpoint, method, (d) => {
            onClose(true);
        });
    };

    return <CustomModal title={"Verwijderen"} onClose={onClose}>
        <div className="modal-body">
            <h3>Weet u zeker dat u deelname "{data.name}" wilt verwijderen?</h3>
        </div>

        <div className="modal-footer mt-3">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Annuleren</button>
            <button type="button" className="btn btn btn-danger" onClick={handleSubmit}> Verwijderen </button>
        </div>
    </CustomModal>
}

export default ModalDelete;