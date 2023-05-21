import CustomSelectSearch from "../../components/customSelectSearch";
import CustomModal from "../../components/customModal";
import { useEffect, useState } from "react";
import { BackendFetch } from "../../services/ApiClient";

const ModalForm = ({onClose}) => {
    const [eventOptions, seteventOptions] = useState([]);
    const [categorieOptions, setcategorieOptions] = useState([]);

    useEffect(() => {
        BackendFetch('/api/event', 'GET', (data) => {
            seteventOptions(data);
        });

        BackendFetch('/api/parade-category', 'GET', (data) => {
            setcategorieOptions(data);
        });
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());

        await BackendFetch('/api/participation', 'POST', (data) => {
            onClose(true);
        }, formValues);
    };

    return <CustomModal title={"Deelnames toevoegen"} onClose={onClose}>
        <form onSubmit={handleSubmit}>
            <div className="mx-auto col-md-10">
                <div className="form-group pt-3">
                    <label className="float-start">Evenement</label>
                    <CustomSelectSearch name={'event'} options={eventOptions} idField={'_id'} labelField={'title'} />
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Category</label>
                    <CustomSelectSearch name={'category'} options={categorieOptions} idField={'_id'} labelField={'name'} />
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Naam</label>
                    <input className="form-control" placeholder="Naam" name="name"></input>
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Startnummer</label>
                    <input className="form-control" placeholder="Startnummer" name="startnumber" type="number"></input>
                </div>
            </div>
            <div className="modal-footer mt-3">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Annuleren</button>
                <input type="submit" className="btn btn btn-moesland" value="Aanmaken"></input>
            </div>
        </form>
    </CustomModal>
}

export default AddModal;