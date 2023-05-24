import React, { useState } from "react";
import { SketchPicker } from 'react-color';
import { useForm } from 'react-hook-form';

const ModalUpdate = ({ toggleModal, selectedItem, refreshOverview }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    });

    const [color, setColor] = useState(selectedItem.color);

    const handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
        setValue("color", color.hex);
    };

    const onSubmit = async (data) => {
        // If data doesn't contain a color, set the color to the current color.
        // (When not hanging the color, the color in data will not be set)
        if (!data.color) {
            data.color = selectedItem.color;
        }

        const path = "/api/participation-category/update";
        const body = JSON.stringify({
            id: selectedItem._id,
            name: data.name,
            description: data.description,
            color: data.color
        });

        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        });

        await fetch(`${process.env.REACT_APP_BACKEND_ROOT_URL}${path}`, { headers: headers, body: body, method: 'POST' });

        refreshOverview();
        toggleModal();
    }

    return (
        <>
            <div className="modal show custom-modal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-moesland text-white">
                            <h5 className="modal-name ">Deelnamecategorie aanpassen</h5>
                        </div>
                        <form name="EditManagers" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mx-auto  col-md-10">
                                <div className="form-group pt-3">
                                    <label>Nieuwe categorienaam</label>
                                    <input defaultValue={selectedItem.name} className="form-control" id="edit-participation-category-name-id" name="edit-participation-category-name-name" placeholder="Titel" {...register("name")} ></input>
                                    <small id="edit-participation-category-name-error" className="form-text text-danger mt-3 edit-participation-category-name-error">{errors.name?.message}</small>
                                </div>

                                <div className="form-group pt-3">
                                    <label>Nieuwe omschrijving</label>
                                    <textarea defaultValue={selectedItem.description} id="edit-participation-category-desc-id" className="form-control" placeholder="Omschrijving" name="edit-participation-category-desc-name" {...register("description")}></textarea>
                                    <small id="edit-participation-category-desc-error" className="form-text text-danger edit-participation-category-desc-error" >{errors.description?.message}</small>
                                </div>

                                <div className="form-group pt-3 pb-3">
                                    <label>Nieuwe kleur</label>
                                    <SketchPicker color={color}
                                                  // onChangeComplete={ handleChangeComplete } />
                                                  onChangeComplete={(color) => setColor(color.hex)}
                                                  onChange={(color) => setValue("color", color.hex)}
                                    />
                                    {/* <textarea defaultValue={selectedItem.color} id="edit-participation-category-color-id" className="form-control" placeholder="Omschrijving" name="edit-participation-category-color-name" {...register("color")}></textarea> */}
                                    <small id="edit-participation-category-color-error" className="form-text text-danger edit-participation-category-color-error" >{errors.color?.message}</small>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={toggleModal} type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                                <input type="submit" className="btn btn-moesland" value="Opslaan"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalUpdate;
