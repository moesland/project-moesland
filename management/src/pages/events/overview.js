import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import { useNavigate } from "react-router-dom";
import "../../styles/calendar.css";
import ModalAdd from "../../modules/events/modalAdd";
import ModalDelete from "../../modules/events/modalDelete";
import ModalUpdate from "../../modules/events/modalUpdate";

const EventOverview = () => {
    const [date, setDate] = useState(new Date());
    const [ShowAddEventModal, setShowAddEventModal] = useState(false);
    const navigate = useNavigate();
    const [eventData, setEventData] = useState()

    useEffect(() => {
        refreshData()
      }, [])

    const ToggleShowAddEventModal = () => {
        setShowAddEventModal(!ShowAddEventModal);
    }

    const createEvent = () => {
        ToggleShowAddEventModal(date);
    }

    const refreshData = async () => {
        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/event/", { method: "GET" })
          .then(response => response.json())
          .then(data => { setEventData(data) });
      }
    return (
        <>
            <h1 className='text-center'>Overzicht evenementen</h1>

            <div className='d-flex justify-content-center'>
                <Calendar
                    onChange={setDate}
                    value={date}
                    selectRange={true}
                />
            </div>
            {date.length > 0 ? (
                <p className='text-center'>
                    <span className='bold'>Start:</span>{' '}
                    {date[0].toDateString()}
                    &nbsp;|&nbsp;
                    <span className='bold'>End:</span> {date[1].toDateString()}
                </p>
            ) : (
                <p className='text-center'>
                    {date.toDateString()}
                </p>
            )}

            {eventData &&
                    <div className="pt-5 col-md-8 mx-auto text-center">
                        <div className="float-end col-md-3 pb-3">
                            <button onClick={createEvent} type="button" className="btn btn-moesland">
                                Nieuw Evenement
                            </button>
                        </div>
                        <table className=" table table-striped " >
                            <thead>
                                <tr className="bg-moesland text-white">
                                    <th scope="col">Titel</th>
                                    <th scope="col">Startdatum</th>
                                    <th scope="col">Einddatum</th>
                                    <th scope="col">Locatie</th>
                                    <th scope="col">Acties</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">
                                {eventData.map(event => (
                                    <tr key={event.id} >
                                        <td className="title">{event.title}</td>
                                        <td className="startdate">{event.startdate}</td>
                                        <td className="enddate">{event.enddate}</td>
                                        <td className="location">{event.location}</td>
                                        <td >
                                            <div className="row">
                                                <div className="">
                                                </div>
                                                <div className="pr-3">
                                                </div>
                                            </div>
                                            <button className="btn btn-danger mx-2" >Verwijderen </button>
                                            {/* onClick={() => ToggleShowModalDelete(user)} */}
                                            <button className="btn btn-moesland" >Aanpassen</button>
                                            {/* onClick={() => ToggleShowModalUpdate(user)} */}
                                        </td>
                                    </tr>
                                ))

                                }
                            </tbody>
                        </table>
                    </div>
            }

            {ShowAddEventModal && <ModalAdd toggleModal={ToggleShowAddEventModal} date={date} />}
        </>
    );

}

export default EventOverview;