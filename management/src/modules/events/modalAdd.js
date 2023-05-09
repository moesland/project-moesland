import React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { BackendClientRequest } from "../../services/ApiClient";


const ModalAdd = ({ toggleModal, date }) => {

    let startDateString;
    let endDateString;

    // turns the calendar data into usable date objects
    // then turns these date objects into strings to set as values for the form
    if (Array.isArray(date)) {
        let startDate = new Date(date[0].getTime() - date[0].getTimezoneOffset() * 60000);
        let endDate = new Date(date[1].getTime() - date[1].getTimezoneOffset() * 60000);

        startDateString = startDate.toISOString().substring(0, 10);
        endDateString = endDate.toISOString().substring(0, 10);
    } else {
        let startDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

        startDateString = startDate.toISOString().substring(0, 10);
        endDateString = startDateString
    }

    const schema = yup.object().shape({
        title: yup.string().min(3, "De titel moet minimaal 3 karakters bevatten.").required("Dit veld mag niet leeg zijn."),
        description: yup.string().min(5, "De omschrijving moet minimaal 5 karakters bevatten.").max(300).required("Dit veld mag niet leeg zijn."),
        startdate: yup.date().required("Dit veld mag niet leeg zijn."),
        enddate: yup.date().required("Dit veld mag niet leeg zijn."),
        location: yup.string().min(2, "de locatie moet minimaal 2 karakters bevatten.").max(50).required("Dit veld mag niet leeg zijn.")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log(data)

        pushManager(data.title, data.description, data.startdate, data.enddate, data.location)
    }
    async function pushManager(title, description, startdate, enddate, location) {
        console.log("Adding event")

        const path = "/api/event/add"
        const body = {
            title: title,
            description: description,
            startdate: startdate,
            enddate: enddate,
            location: location
        }
        console.log(body)

        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        })
        await BackendClientRequest(
            path, body, headers, "POST"
        )
        //refreshOverview();
        toggleModal();
    }


    return (
        <>
            <div className="modal show custom-modal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-moesland text-white">
                            <h5 className="modal-title">Nieuw Evenement</h5>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mx-auto col-md-10">
                                <div className="form-group pt-3">
                                    <label>Titel</label>
                                    <input className="form-control" id="event-title-id" name="event-title-name" placeholder="Titel" {...register("title")}></input>
                                    <small id="event-title-error" className="form-text text-danger event-title-error">{errors.title?.message}</small>
                                </div>

                                <div className="form-group pt-3">
                                    <label>Omschrijving</label>
                                    <textarea className="form-control" id="event-desc-id" name="event-desc-name" placeholder="Omschrijving" {...register("description")}></textarea>
                                    <small id="event-desc-error" className="form-text text-danger mt-3 event-desc-error">{errors.description?.message}</small>
                                </div>

                                <div className="row pt-3">
                                    <div className="col-md-6">
                                        <label>Startdatum</label>
                                        <input type="date" value={startDateString} className="form-control" id="event-start-date-id" name="event-start-date-name" {...register("startdate")}></input>
                                        <small id="event-start-date-error" className="form-text text-danger event-start-date-error" >{errors.startdate?.message}</small>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Starttijd</label>
                                        <input type="time" className="form-control" id="event-start-time-id" name="event-start-time-name" {...register("starttime")}></input>
                                        <small id="event-start-time-error" className="form-text text-danger event-start-time-error" >{errors.starttime?.message}</small>
                                    </div>
                                </div>

                                <div className="row pt-3">
                                    <div className="col-md-6">
                                        <label>Einddatum</label>
                                        <input type="date" value={endDateString} className="form-control" id="event-end-date-id" name="event-end-date-name" {...register("enddate")}></input>
                                        <small id="event-end-date-error" className="form-text text-danger event-end-date-error" >{errors.enddate?.message}</small>
                                    </div>

                                    <div className="col-md-6">
                                        <label>Eindtijd</label>
                                        <input type="time" className="form-control" id="event-end-time-id" name="event-end-time-name" {...register("endtime")}></input>
                                        <small id="event-end-time-error" className="form-text text-danger event-end-time-error" >{errors.endtime?.message}</small>
                                    </div>
                                </div>

                                <div className="form-group pt-3">
                                    <label>Locatie</label>
                                    <input className="form-control" id="event-location-id" name="event-location-name" placeholder="Locatie" {...register("location")}></input>
                                    <small id="event-location-error" className="form-text text-danger event-location-error" >{errors.location?.message}</small>
                                </div>

                                <div className="form-check">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={toggleModal} type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                                <input type="submit" className="btn btn-moesland" value="Aanmaken"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAdd