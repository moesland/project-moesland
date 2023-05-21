import CustomSelectSearch from "../../components/customSelectSearch";
import CustomModal from "../../components/customModal";
import { useEffect, useState } from "react";
import { BackendFetch } from "../../services/ApiClient";

const ModalForm = ({onClose, isUpdate = false, data = null}) => {
    const [eventOptions, seteventOptions] = useState([]);
    const [categorieOptions, setcategorieOptions] = useState([]);

    console.log(data);

    useEffect(() => {
        BackendFetch('/api/event', 'GET', (eventData) => {
            seteventOptions(eventData);
        });

        BackendFetch('/api/parade-category', 'GET', (categoryData) => {
            setcategorieOptions(categoryData);
        });
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());

        const endpoint = isUpdate ? 'PUT' : 'POST';

        await BackendFetch('/api/participation', endpoint, (d) => {
            onClose(true);
        }, formValues);
    };

    return <CustomModal title={isUpdate ? "Deelname aanpassen" : "Deelnames toevoegen"} onClose={onClose}>
        <form onSubmit={handleSubmit}>
            <div className="mx-auto col-md-10">
                <div className="form-group pt-3">
                    <label className="float-start">Evenement</label>
                    <CustomSelectSearch 
                        name={'event'} 
                        options={eventOptions} 
                        idField={'_id'} 
                        labelField={'title'} 
                        defaultValue={data ? data.event._id : ''}
                        defaultValueName={data ? data.event.title : null}
                    />
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Category</label>
                    <CustomSelectSearch 
                        name={'category'} 
                        options={categorieOptions} 
                        idField={'_id'} 
                        labelField={'name'} 
                        defaultValue={data ? data.category._id : ''}
                        defaultValueName={data ? data.category.name : null}
                    />
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Naam</label>
                    <input className="form-control" placeholder="Naam" name="name" defaultValue={data ? data.name : ""}></input>
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Startnummer</label>
                    <input className="form-control" placeholder="Startnummer" name="startnumber" type="number" defaultValue={data ? data.startnumber : ''}></input>
                </div>
            </div>
            <div className="modal-footer mt-3">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Annuleren</button>
                <input type="submit" className="btn btn btn-moesland" value={isUpdate ? "Bijwerken" : "Aanmaken"}></input>
            </div>
        </form>
    </CustomModal>
}

export default ModalForm;