    import React, { useState} from "react";
    import { useForm } from 'react-hook-form';
    import * as yup from 'yup';
    import { yupResolver } from '@hookform/resolvers/yup'
    import { BackendClientRequest } from "../../services/ApiClient";
    import MapContainer from "../../components/map";

    const ModalAdd = ({ toggleModal, refreshOverview, date, isParade }) => {
        const [showLocationInputs, setShowLocationInputs] = useState(!isParade);
        const [circleRadius, setCircleRadius] = useState(200);

        const [markerPosition, setMarkerPosition] = useState({ 
            lat: 51.74583, 
            lng: 5.63194 
        });
        
        let startDateString;
        let endDateString;

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
            title: yup.string().min(3, "De titel moet minimaal 3 karakters bevatten.").max(40).required("Dit veld mag niet leeg zijn.").required("Dit veld mag niet leeg zijn."),
            description: yup.string().min(5, "De omschrijving moet minimaal 5 karakters bevatten.").max(300).required("Dit veld mag niet leeg zijn."),
            startdate: yup.date(),
            enddate: yup.date(),
            location: yup.string(),
            isParade: yup.boolean(),
            latitude: yup.string(),
            longitude: yup.string(),
            radius: yup.string(),
        });

        const { register, handleSubmit, formState: { errors }, setValue } = useForm({
            resolver: yupResolver(schema),
        });

        const onSubmit = (data) => {
            const startingDate = new Date(startDateString);
            const [shours, sminutes] = data.starttime.split(":");
            startingDate.setUTCHours((shours));
            startingDate.setUTCMinutes(sminutes);

            const endingDate = new Date(endDateString);
            const [ehours, eminutes] = data.endtime.split(":");
            endingDate.setUTCHours((ehours));
            endingDate.setUTCMinutes(eminutes);

            pushManager(
                data.title, 
                data.description, 
                startingDate, 
                endingDate, 
                data.location, 
                data.isParade, 
                data.latitude, 
                data.longitude, 
                data.radius)
        }

        async function pushManager(title, description, startdate, enddate, location, isParade, latitude, longitude, radius) {
            const path = "/api/event/add";
            const body = {
                title: title,
                description: description,
                startdate: startdate,
                enddate: enddate,
                location: location,
                isParade: isParade,
                latitude: latitude,
                longitude: longitude,
                radius: radius
            };

            const token = localStorage.getItem('token');
            const headers = new Headers({
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            });

            await BackendClientRequest(
                path, body, headers, "POST"
            );

            refreshOverview();
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
                                            <input disabled type="date" defaultValue={startDateString} className="form-control" id="event-start-date-id" name="event-start-date-name" {...register("startdate")}></input>
                                            <small id="event-start-date-error" className="form-text text-danger event-start-date-error" >{errors.startdate?.message}</small>
                                        </div>

                                        <div className="col-md-6">
                                            <label>Starttijd</label>
                                            <input required type="time" className="form-control" id="event-start-time-id" name="event-start-time-name" {...register("starttime")}></input>
                                            <small id="event-start-time-error" className="form-text text-danger event-start-time-error" >{errors.starttime?.message}</small>
                                        </div>
                                    </div>

                                    <div className="row pt-3">
                                        <div className="col-md-6">
                                            <label>Einddatum</label>
                                            <input disabled type="date" defaultValue={endDateString} className="form-control" id="event-end-date-id" name="event-end-date-name" {...register("enddate")}></input>
                                            <small id="event-end-date-error" className="form-text text-danger event-end-date-error" >{errors.enddate?.message}</small>
                                        </div>

                                        <div className="col-md-6">
                                            <label>Eindtijd</label>
                                            <input required type="time" className="form-control" id="event-end-time-id" name="event-end-time-name" {...register("endtime")}></input>
                                            <small id="event-end-time-error" className="form-text text-danger event-end-time-error" >{errors.endtime?.message}</small>
                                        </div>
                                    </div>
                                    <div className="form-check pt-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input custom-checkbox"
                                            id="parade-checkbox"
                                            name="parade-checkbox"
                                            {...register("isParade")}
                                            onChange={() => setShowLocationInputs(!showLocationInputs)}
                                        />
                                        <label htmlFor="parade-checkbox">Optocht</label>
                                    </div>                         
                                {showLocationInputs ? (
                                <div className="form-group">
                                    <label>Locatie</label>
                                    <input
                                        className="form-control"
                                        id="event-location-id"
                                        name="event-location-name"
                                        placeholder="Locatie"
                                        {...register("location")}
                                        required
                                    ></input>
                                    <small id="event-location-error" className="form-text text-danger event-location-error">
                                        {errors.location?.message}
                                    </small>
                                </div>
                                ) : (
                                <>
                                    <MapContainer markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} setValue={setValue} circleRadius={circleRadius}/> 
                                    <div className="form-group">
                                        <label>Latitude</label>
                                        <input className="form-control" id="event-latitude-id" name="event-latitude-name" placeholder="51.74583" {...register("latitude")} type="text" required/>
                                    </div>
                                    <div className="form-group pt-2">
                                        <label>Longitude</label>
                                        <input className="form-control" id="event-longitude-id" name="event-longitude-name" placeholder="5.63194" {...register("longitude")} type="text" required/>
                                    </div>
                                    <div className="form-group pt-2 pb-2">
                                        <label>Radius ( in meters )</label>
                                        <input className="form-control" id="event-radius-id" name="event-radius-name" placeholder="200" {...register("radius")} type="text" onChange={(e) => setCircleRadius(Number(e.target.value))} required />
                                    </div>
                                </>
                                )}
                                <div className="modal-footer">
                                    <button onClick={toggleModal} type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                                    <input type="submit" className="btn btn-moesland" value="Aanmaken"></input>
                                </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    export default ModalAdd;