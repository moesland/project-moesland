import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { useNavigate } from "react-router-dom";
import "./overview.css"
import ModalAdd from "../../modules/events/modalAdd";
import ModalDelete from "../../modules/events/modalDelete";
import ModalUpdate from "../../modules/events/modalUpdate";

const EventOverview = () => {
    const userData = []
    const [date, setDate] = useState(new Date());
    const [ShowAddEventModal, setShowAddEventModal] = useState(false);
    const navigate = useNavigate();

    const ToggleShowAddEventModal = () => {
        setShowAddEventModal(!ShowAddEventModal);
    }

    const createEvent = () => {
        ToggleShowAddEventModal(date);
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

            {true &&
                <div className="row">
                    <div className="pt-5 col-md-8 mx-auto text-center">
                        <div className="float-end col-md-3 pb-3">
                            <button onClick={createEvent} type="button" className="btn btn-moesland">
                                Nieuw Evenement
                            </button>
                        </div>
                        <table className=" table table-striped " >
                            <thead>
                                <tr className="bg-moesland text-white">
                                    <th scope="col">Datum</th>
                                    <th scope="col">Titel</th>
                                    <th scope="col">Locatie</th>
                                    <th scope="col">Acties</th>
                                </tr>
                            </thead>
                            <tbody id="tableBody">
                                {userData.map(user => (
                                    <tr key={user.id} >
                                        <td className="email">{user.email}</td>
                                        <td className="userName">{user.username}</td>
                                        <td className="role">{user.roleId.rolename}</td>
                                        <td >
                                            <div className="row">
                                                <div className="">
                                                </div>
                                                <div className="pr-3">
                                                </div>
                                            </div>
                                            <button className="btn btn-danger" >Verwijderen </button>
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
                </div>

            }

            {ShowAddEventModal && <ModalAdd toggleModal={ToggleShowAddEventModal} date={date} />}
        </>
    );

}

export default EventOverview;