import React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { BackendClientRequest } from "../../services/ApiClient";


const ModalUpdate = ({ toggleModal, selectedItem, refreshOverview }) => {
    const schema = yup.object().shape({
        username: yup.string().min(2, "Het gebruikersnaam moet minimaal twee karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn."),
        password: yup.string().min(6, "het wachtwoord moet minimaal 6 karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn.")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        if (selectedItem.roleId.rolename == "SuperAdmin") return;
        const path = "/api/user/update"
        const body = {
            username: data.username,
            email: selectedItem.email,
            password: data.password
        };
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })

        await BackendClientRequest(
            path, body, headers, "POST"
        )

        refreshOverview();
        toggleModal();
    }


    return (
        <>
            <div className="modal show custom-modal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-moesland text-white">
                            <h5 className="modal-title ">Evenement aanpassen</h5>
                        </div>
                        <form name="EditManagers" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mx-auto  col-md-10">
                                <div className="form-group pt-3">
                                    <label>Nieuwe titel</label>
                                    <input className="form-control" id="edit-event-title-id" name="edit-event-title-name" placeholder="Titel" {...register("title")} ></input>
                                    <small id="edit-event-title-error" className="form-text text-danger mt-3 edit-event-title-error">{errors.title?.message}</small>
                                </div>

                                <div className="form-group pt-3">
                                    <label>Nieuwe omschrijving</label>
                                    <textarea id="edit-event-desc-id" className="form-control" placeholder="Omschrijving" name="edit-event-desc-name" {...register("description")}></textarea>
                                    <small id="edit-event-desc-error" className="form-text text-danger edit-event-desc-error" >{errors.description?.message}</small>
                                </div>

                                <div className="form-group pt-3">
                                    <label>Nieuwe startdatum</label>
                                    <input type="date" id="edit-event-start-date-id" className="form-control" name="edit-event-start-date-name" {...register("startdate")}></input>
                                    <small id="edit-event-start-date-error" className="form-text text-danger edit-event-start-date-error" >{errors.startdate?.message}</small>
                                </div>

                                <div className="form-group pt-3">
                                    <label>Nieuwe einddatum</label>
                                    <input type="date" id="edit-event-end-date-id" className="form-control" name="edit-event-end-date-name" {...register("enddate")}></input>
                                    <small id="edit-event-end-date-error" className="form-text text-danger edit-event-end-date-error" >{errors.enddate?.message}</small>
                                </div>

                                <div className="form-group pt-3">
                                    <label>Nieuwe locatie</label>
                                    <input id="edit-event-location-id" className="form-control" placeholder="Locatie" name="edit-event-location-name" {...register("location")}></input>
                                    <small id="edit-event-location-error" className="form-text text-danger edit-event-location-error" >{errors.location?.message}</small>
                                </div>

                                <div className="form-check">
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

export default ModalUpdate