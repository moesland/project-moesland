import React, { useEffect, useState } from 'react';
import { BackendFetch } from "../../services/ApiClient";

const Overview = ({toggleEditModal, toggleDeleteModal}) => {
    const [participationData, setparticipationData] = useState(undefined);

    useEffect(() => {
        BackendFetch('/api/participation', 'GET', (data) => {
            setparticipationData(data);
        });
    }, []);


    return <>
        {!participationData &&
            <div>
                <h1>DATA LOADING...</h1>
            </div>
        }
        {participationData &&
            <>
                <table className="table table-striped">
                    <thead>
                        <tr className="bg-moesland text-white">
                            <th scope="col">Event</th>
                            <th scope="col">Category</th>
                            <th scope="col">deelname</th>
                            <th scope="col">Nr.</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody id="tableBody">
                        {participationData.map(participation => (
                            <tr key={participation._id} onClick={toggleEditModal()} >
                                <th className="event-title">{participation.event.title}</th>
                                <th className="category-name">{participation.category.name}</th>
                                <th className="name">{participation.name}</th>
                                <th className="startnumber">{participation.startnumber}</th>
                                <th>
                                    <button onClick={toggleDeleteModal()} className="btn btn-danger mx-2">Verwijderen</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table> 
            </>
        }
    </>
}

export default Overview;