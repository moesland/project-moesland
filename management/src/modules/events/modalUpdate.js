import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { getUsableDatesAndTimes } from "../../pages/events/utils";
import MapContainer from "../../components/map";

const ModalUpdate = ({ toggleModal, selectedItem, refreshOverview }) => {
    const startingDateAndTime = getUsableDatesAndTimes(selectedItem.startdate);
    const endingDateAndTime = getUsableDatesAndTimes(selectedItem.enddate);
    
    const [showLocationInputs, setShowLocationInputs] = useState(!selectedItem.isParade);
    const [circleRadius, setCircleRadius] = useState(selectedItem.radius);
    
    const [markerPosition, setMarkerPosition] = useState({ 
        lat: selectedItem.latitude, 
        lng: selectedItem.longitude 
    });

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    });

    const handleCheckboxChange = () => {
        selectedItem.isParade = !selectedItem.isParade;
        setShowLocationInputs(!showLocationInputs);
      };

    const onSubmit = async (data) => {
        const startingDate = new Date(data.startdate);
        const [shours, sminutes] = data.starttime.split(":");
        startingDate.setUTCHours((shours));
        startingDate.setUTCMinutes(sminutes);

        const endingDate = new Date(data.enddate);
        const [ehours, eminutes] = data.endtime.split(":");
        endingDate.setUTCHours((ehours));
        endingDate.setUTCMinutes(eminutes);

        const path = "/api/event/update";
        const body = JSON.stringify({
            id: selectedItem._id,
            title: data.title,
            description: data.description,
            startdate: startingDate,
            enddate: endingDate,
            location: data.location,
            isParade: data.isParade,
            latitude: data.latitude,
            longitude: data.longitude,
            radius: data.radius
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
                                <div className="form-check pt-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input custom-checkbox"
                                            id="parade-checkbox"
                                            name="parade-checkbox"
                                            {...register("isParade")}
                                            onChange={handleCheckboxChange}
                                            checked={selectedItem.isParade}
                                        />
                                        <label htmlFor="parade-checkbox">Optocht</label>
                                    </div>                         
                                {showLocationInputs ? ( 
                                <div className="form-group">
                                    <label>Nieuwe Locatie</label>
                                    <input defaultValue={selectedItem.location} id="edit-event-location-id" className="form-control" placeholder="Locatie" name="edit-event-location-name" {...register("location")} required></input>
                                    <small id="event-location-error" className="form-text text-danger event-location-error">
                                        {errors.location?.message}
                                    </small>
                                </div>
                                ) : (
                                <>
                                    <MapContainer markerPosition={markerPosition} setMarkerPosition={setMarkerPosition} setValue={setValue} circleRadius={circleRadius}/> 
                                    <div className="form-group">
                                        <label>Nieuwe Latitude</label>
                                        <input defaultValue={selectedItem.latitude} type="text" className="form-control" id="edit-event-latitude" name="edit-event-latitude" {...register("latitude")} required disabled></input>
                                    </div>
                                    <div className="form-group pt-2">
                                        <label>Nieuwe Longitude</label>
                                        <input defaultValue={selectedItem.longitude} type="text" className="form-control" id="edit-event-longitude" name="edit-event-longitude" {...register("longitude")} required disabled></input>
                                    </div>
                                    <div className="form-group pt-2 pb-2">
                                        <label>Nieuwe Radius (in meters)</label>
                                        <input defaultValue={selectedItem.radius} type="number" className="form-control" id="edit-event-radius" name="edit-event-radius" {...register("radius")} onChange={(e) => setCircleRadius(Number(e.target.value))} required></input>
                                    </div>
                                </>
                                )}
                               
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