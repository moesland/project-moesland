import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../../styles/calendar.css';
import ModalAdd from '../../modules/events/modalAdd';
import ModalDelete from '../../modules/events/modalDelete';
import ModalUpdate from '../../modules/events/modalUpdate';
import { getUsableDatesAndTimes, isSameDay } from './utils.js';

const EventOverview = () => {
    const [date, setDate] = useState(new Date());
    const [eventData, setEventData] = useState();
    const [allEvents, setAllEvents] = useState();
    const [datesToMark, setDatesToMark] = useState();
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [ShowAddEventModal, setShowAddEventModal] = useState(false);
    const [ShowDeleteEventModal, setShowModalDelete] = useState(false);
    const [ShowUpdateEventModal, setShowModalUpdate] = useState(false);

    useEffect(() => {
        refreshData();
    }, [date]);

    useEffect(() => {
        getAllEvents();
    }, []);

    const refreshData = async () => {
        const startdate = date.toString().split(',')[0];
        const selectedDate = new Date(startdate);
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
        const formattedDate = `${year}-${month}-${day}`;

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/event/?date=' + formattedDate, { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                // Sort the data by start date
                const sortedData = data.sort((b, a) => new Date(a.startdate) - new Date(b.startdate));
                setEventData(sortedData);
            });

        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/event', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                // Sort the data by start date
                const sortedData = data.sort((b, a) => new Date(a.startdate) - new Date(b.startdate));

                // Extract dates from eventData
                const datesToAddContentTo = sortedData.map(event => event.startdate);

                // Set datesToMark to the extracted dates
                setDatesToMark(datesToAddContentTo);
            });
    };

    const getAllEvents = async () => {
        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/event', { method: 'GET' })
            .then(response => response.json())
            .then(data => {
                // Sort the data by start date
                const sortedData = data.sort((b, a) => new Date(a.startdate) - new Date(b.startdate));
                setAllEvents(sortedData);
            });
    };

    const ToggleShowAddEventModal = () => {
        setShowAddEventModal(!ShowAddEventModal);
    }

    const ToggleShowDeleteEventModal = (event) => {
        setShowModalDelete(!ShowDeleteEventModal);
        setSelectedItem(event)
    }

    const ToggleShowUpdateEventModal = (event) => {
        setShowModalUpdate(!ShowUpdateEventModal);
        setSelectedItem(event)
    }

    const createEvent = () => {
        ToggleShowAddEventModal(date);
    }

    function tileClassName({ date, view }) {
        // Add class to tiles in month view only
        if (view === 'month') {
            // Check if a date React-Calendar wants to check is on the list of dates to add class to
            if (datesToMark && datesToMark.find(dDate => isSameDay(dDate, date))) {
                return 'react-calendar__tile--occupied';
            }
        }
    }

    return (
        <>
            <div className="container mt-3">
                <h1 className="text-center font-moesland">Evenementen</h1>

                <div className="row">
                    <div className="col">
                        <div className="d-flex justify-content-center mt-2">
                            <Calendar
                                onChange={setDate}
                                value={date}
                                selectRange={true}
                                tileClassName={tileClassName}
                            />
                        </div>
                    </div>

                    <div className="col">
                        {eventData &&
                            <div className="col-md-11 mx-auto text-center">
                                <div className="float-start">
                                    {date.length > 0 && <h5>{date[0].toDateString()} - {date[1].toDateString()}</h5>}
                                </div>
                                <div className="float-end pb-2">
                                    <button onClick={createEvent} type="button" className="btn btn-moesland">
                                        Nieuw evenement
                                    </button>
                                </div>

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
                    </div>
                </div>

                <hr className="m-4" />

                <div className="row">
                    <h3 className="text-center">Totaaloverzicht</h3>

                    {allEvents &&
                        <div className="col-md-11 mx-auto text-center">
                            <div className="float-start form-check pb-2">
                                <input className="form-check-input" type="checkbox" id="isParade" />
                                <label className="form-check-label" for="isParade">Filteren op optochten</label>
                            </div>
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
                                    {allEvents.map(event => (
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
                </div>

                {ShowAddEventModal && <ModalAdd toggleModal={ToggleShowAddEventModal} date={date} refreshOverview={refreshData} />}
                {ShowDeleteEventModal && <ModalDelete toggleModal={ToggleShowDeleteEventModal} selectedItem={selectedItem} refreshOverview={refreshData} />}
                {ShowUpdateEventModal && <ModalUpdate toggleModal={ToggleShowUpdateEventModal} selectedItem={selectedItem} refreshOverview={refreshData} />}
            </div >
        </>
    );
}

export default EventOverview;