import React, { useEffect, useState } from 'react';
import { BackendFetch } from "../../services/ApiClient";
import FilterBar from './filterbar';

const Overview = ({ toggleEditModal, toggleDeleteModal }) => {
    const [participationData, setParticipationData] = useState(undefined);
    const [displayData, setDisplayData] = useState();


    useEffect(() => {
        BackendFetch('/api/participation', 'GET', (data) => {
            setParticipationData(data);
        });
    }, []);

    useEffect(() => {
        if (participationData) {
            setDisplayData(participationData)
        }
    }, [participationData])

    return <>
        {!displayData &&
            <div>
                <h1>DATA LOADING...</h1>
            </div>
        }
        {displayData &&
            <>
                <FilterBar sourceData={participationData} setDisplayData={setDisplayData} />
                <table className="table table-striped">
                    <thead>
                        <tr className="bg-moesland text-white">
                            <th scope="col">Evenement</th>
                            <th scope="col">Categorie</th>
                            <th scope="col">Deelnemer</th>
                            <th scope="col">Nr.</th>
                            <th scope="col">Acties</th>
                        </tr>
                    </thead>

                    <tbody id="tableBody">
                        {displayData.map(participation => (
                            <tr key={participation._id} >
                                <th className="event-title">{participation.event.title}</th>
                                <th className="category-name">{participation.category?.name || "Geen categorie"}</th>
                                <th className="name">{participation.name}</th>
                                <th className="startnumber">{participation.startnumber}</th>
                                <th className="w-25">
                                    <div className="btn-group" role="group">
                                        <button onClick={() => toggleEditModal(false, participation)} className="btn btn-moesland">
                                            Aanpassen
                                        </button>
                                        <button onClick={() => toggleDeleteModal(false, participation)} className="btn btn-danger">
                                            Verwijderen
                                        </button>
                                    </div>
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
