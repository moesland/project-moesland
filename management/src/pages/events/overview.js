import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BackendClientRequest } from "../../services/ApiClient";

const EventOverview = () => {
    const [events, setEvents] = useState(undefined);

    const navigate = useNavigate();

    useEffect(() => {
        // const fetchEventData = async () => {
        //     await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/events/", { method: "GET" })
        //         .then(response => response.json())
        //         .then(data => { setEvents(data)});
        // }

        // fetchEventData()
    }, [])


    const openCreate = () => {
        navigate('/events/create');
    }

    return (
        <div className="container mt-3">
            <div className="mb-3">
                <button className="btn btn-moesland" onClick={openCreate}> Nieuw evenement</button>
            </div>
        </div>
    )
}

export default EventOverview;
