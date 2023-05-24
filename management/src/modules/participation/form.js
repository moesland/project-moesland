import CustomSelectSearch from "../../components/customSelectSearch";
import CustomModal from "../../components/customModal";
import { useEffect, useState } from "react";
import { BackendFetch } from "../../services/ApiClient";

const ModalForm = ({ onClose, isUpdate = false, data = null }) => {
    const [eventOptions, seteventOptions] = useState([]);
    const [categorieOptions, setcategorieOptions] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        BackendFetch('/api/event?isParade=true', 'GET', (eventData) => {
            const currentDate = new Date();
            const unfinishedEvents = eventData.filter(event => new Date(event.enddate) > currentDate);
            seteventOptions(unfinishedEvents);
        });

        BackendFetch('/api/participation-category', 'GET', (categoryData) => {
            setcategorieOptions(categoryData);
        });
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formValues = Object.fromEntries(formData.entries());

        if (validateForm(formValues)) {
            const method = isUpdate ? 'PUT' : 'POST';
            const endpoint = data ? `/api/participation/${data._id}` : '/api/participation';

            await BackendFetch(endpoint, method, (d) => {
                onClose(true);
            }, formValues);

            setErrors({ general: "Er zijn wat fouten" });
        }
    };

    const validateForm = (formValues) => {
        const { name, startnumber, event, category } = formValues;
        console.log(formValues);
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Naam zijn verplicht";
        }

        if (!startnumber) {
            newErrors.startnumber = "Startnummer zijn verplicht";
        }

        if (startnumber <= 0) {
            newErrors.startnumber = "Startnummer moet groter zijn dan 0";
        }

        if (!event) {
            newErrors.event = "Evenement zijn verplicht";
        }

        if (!category) {
            newErrors.category = "Categorie zijn verplicht";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return <CustomModal title={isUpdate ? "Deelname aanpassen" : "Deelnames toevoegen"} onClose={onClose}>
        <form onSubmit={handleSubmit}>
            {errors.general && <p className="text-danger mb-0">{errors.general}</p>}
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
                    {errors.event && <p className="text-danger mb-0">{errors.event}</p>}
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Categorie</label>
                    <CustomSelectSearch
                        name={'category'}
                        options={categorieOptions}
                        idField={'_id'}
                        labelField={'name'}
                        defaultValue={data ? data.category._id : ''}
                        defaultValueName={data ? data.category.name : null}
                    />
                    {errors.category && <p className="text-danger mb-0">{errors.category}</p>}
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Naam</label>
                    <input className="form-control" placeholder="Naam" name="name" defaultValue={data ? data.name : ""}></input>
                    {errors.name && <p className="text-danger mb-0">{errors.name}</p>}
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Startnummer</label>
                    <input className="form-control" placeholder="Startnummer" name="startnumber" type="number" min={1} defaultValue={data ? data.startnumber : ''}></input>
                    {errors.startnumber && <p className="text-danger mb-0">{errors.startnumber}</p>}
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
