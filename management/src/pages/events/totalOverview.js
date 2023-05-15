import React, { useEffect, useState } from "react";
import "../../styles/calendar.css";
import ModalDelete from "../../modules/events/modalDelete";
import ModalUpdate from "../../modules/events/modalUpdate";
import { getUsableDatesAndTimes } from "./utils.js"

const EventTotalOverview = () => {
    const [eventData, setEventData] = useState();
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [ShowDeleteEventModal, setShowModalDelete] = useState(false);
    const [ShowUpdateEventModal, setShowModalUpdate] = useState(false);

    useEffect(() => {
        refreshData();
    }, []);

    const ToggleShowDeleteEventModal = (event) => {
        setShowModalDelete(!ShowDeleteEventModal);
        setSelectedItem(event)
    }

    const ToggleShowUpdateEventModal = (event) => {
        setShowModalUpdate(!ShowUpdateEventModal);
        setSelectedItem(event)
    }

    const refreshData = async () => {
        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/event", { method: "GET" })
            .then(response => response.json())
            .then(data => {
                // Sort the data by start date
                const sortedData = data.sort((b, a) => new Date(a.startdate) - new Date(b.startdate));
                setEventData(sortedData);
            });
    }

    return (
        <>
            <div className="container mt-3">
                <h1 className="text-center font-moesland">Alle evenementen</h1>

                {eventData &&
                    <div className="pt-5 col-md-11 mx-auto text-center">
                        <table className="table table-striped">
                            <thead>
                                <tr className="bg-moesland text-white">
                                    <th scope="col">Titel</th>
                                    <th scope="col">Start</th>
                                    <th scope="col">Eind</th>
                                    <th scope="col">Locatie</th>
                                    <th scope="col">Acties</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">
                                {eventData.map(event => (
                                    <tr key={event.id} >
                                        <td className="title">{event.title}</td>
                                        <td className="startdate">
                                            {getUsableDatesAndTimes(event.startdate).altDate} {getUsableDatesAndTimes(event.startdate).time}
                                        </td>
                                        <td className="enddate">
                                            {getUsableDatesAndTimes(event.enddate).altDate} {getUsableDatesAndTimes(event.enddate).time}
                                        </td>
                                        <td className="location">{event.location}</td>
                                        <td>
                                            <button onClick={() => ToggleShowDeleteEventModal(event)} className="btn btn-danger mx-2">Verwijderen</button>
                                            <button onClick={() => ToggleShowUpdateEventModal(event)} className="btn btn-moesland">Aanpassen</button>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                }

                {ShowDeleteEventModal && <ModalDelete toggleModal={ToggleShowDeleteEventModal} selectedItem={selectedItem} refreshOverview={refreshData} />}
                {ShowUpdateEventModal && <ModalUpdate toggleModal={ToggleShowUpdateEventModal} selectedItem={selectedItem} refreshOverview={refreshData} />}
            </div>
        </>
    );
}

export default EventTotalOverview;