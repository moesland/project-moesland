import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from "react-router-dom";
import "./overview.css"
import ModalAdd from "../../modules/events/modalAdd";
// import ModalDelete from "../modules/events/modalDelete";
// import ModalUpdate from "../modules/events/modalUpdate";

const EventOverview = () => {

    const [date, setDate] = useState(new Date());
    const [ShowAddEventModal, setShowAddEventModal] = useState(false);
    const navigate = useNavigate();

    const ToggleShowAddEventModal = () => {
        setShowAddEventModal(!ShowAddEventModal);
    }

    const openCreate = () => {
        navigate('/events/create');
    }

    const createEvent = () => {
        ToggleShowAddEventModal();
    }

    return (
        <>
            <h1 className='text-center'>Overzicht evenementen</h1>

            <div className='d-flex justify-content-center'>
                <Calendar
                    onChange={setDate}
                    onClickDay={createEvent}
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
                    <span className='bold'>Default selected date:</span>{' '}
                    {date.toDateString()}
                </p>
            )}
            {ShowAddEventModal && <ModalAdd toggleModal={ToggleShowAddEventModal} />}
        </>
    );

}

export default EventOverview;