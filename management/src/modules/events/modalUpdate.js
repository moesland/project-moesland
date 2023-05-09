import React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { BackendClientRequest } from "../../services/ApiClient";
import { getUsableDatesAndTimes } from "../../pages/events/utils";


const ModalUpdate = ({ toggleModal, selectedItem, refreshOverview }) => {
    const schema = yup.object().shape({
        username: yup.string().min(2, "Het gebruikersnaam moet minimaal twee karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn."),
        password: yup.string().min(6, "het wachtwoord moet minimaal 6 karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn.")
    })

    const startingDateAndTime = getUsableDatesAndTimes(selectedItem.startdate);
    const endingDateAndTime = getUsableDatesAndTimes(selectedItem.enddate);
    
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        console.log('updating')

        const path = "/api/event/update"
        const body = {
            title: data.title,
            description: data.description,
            startdate: data.startdate,
            enddate: data.enddate,
            location: data.location
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
                                    <input defaultValue={selectedItem.title} className="form-control" id="edit-event-title-id" name="edit-event-title-name" placeholder="Titel" {...register("title")} ></input>
                                    <small id="edit-event-title-error" className="form-text text-danger mt-3 edit-event-title-error">{errors.title?.message}</small>
                                </div>

                                <div className="form-group pt-3">
                                    <label>Nieuwe omschrijving</label>
                                    <textarea defaultValue={selectedItem.description} id="edit-event-desc-id" className="form-control" placeholder="Omschrijving" name="edit-event-desc-name" {...register("description")}></textarea>
                                    <small id="edit-event-desc-error" className="form-text text-danger edit-event-desc-error" >{errors.description?.message}</small>
                                </div>

                                <div className="row pt-3">
                                    <div className="col-md-6">
                                        <label>Nieuwe Startdatum</label>
                                        <input defaultValue={startingDateAndTime.date} type="date" className="form-control" id="edit-event-start-date-id" name="edit-event-start-date-name" {...register("startdate")}></input>
                                        <small id="edit-event-start-date-error" className="form-text text-danger edit-event-start-date-error" >{errors.startdate?.message}</small>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Nieuwe Starttijd</label>
                                        <input defaultValue={startingDateAndTime.time} type="time" className="form-control" id="edit-event-start-time-id" name="edit-event-start-time-name" {...register("starttime")}></input>
                                        <small id="edit-event-start-time-error" className="form-text text-danger edit-event-start-time-error" >{errors.starttime?.message}</small>
                                    </div>
                                </div>

                                <div className="row pt-3">
                                    <div className="col-md-6">
                                        <label>Nieuwe Einddatum</label>
                                        <input defaultValue={endingDateAndTime.date} type="date" className="form-control" id="edit-event-end-date-id" name="edit-event-end-date-name" {...register("enddate")}></input>
                                        <small id="edit-event-end-date-error" className="form-text text-danger edit-event-end-date-error" >{errors.enddate?.message}</small>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Nieuwe Eindtijd</label>
                                        <input defaultValue={endingDateAndTime.time} type="time" className="form-control" id="edit-event-end-time-id" name="edit-event-end-time-name" {...register("endtime")}></input>
                                        <small id="edit-event-end-time-error" className="form-text text-danger edit-event-end-time-error" >{errors.endtime?.message}</small>
                                    </div>
                                </div>

                                <div className="form-group pt-3">
                                    <label>Nieuwe locatie</label>
                                    <input defaultValue={selectedItem.location} id="edit-event-location-id" className="form-control" placeholder="Locatie" name="edit-event-location-name" {...register("location")}></input>
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