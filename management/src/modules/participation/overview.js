import React, { useEffect, useState } from 'react';
import { BackendFetch } from "../../services/ApiClient";
import FilterBar from './filterbar';
import CustomPagination from '../../components/customPagination';

const Overview = ({ toggleEditModal, toggleDeleteModal, toggleAddModal }) => {
    const [participationData, setParticipationData] = useState(undefined);
    const [displayData, setDisplayData] = useState();
    const [pagination, setPagination] = useState({start: 0, end: Number.MAX_SAFE_INTEGER})


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
                <div className='mb-1 d-flex align-items-center align-self-center justify-content-between'>
                    <FilterBar sourceData={participationData} setDisplayData={setDisplayData} />

                    <div className="d-flex">
                        <button className="btn btn-moesland" onClick={toggleAddModal}>Nieuwe Deelnemer</button>
                    </div>
                </div>
                

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
                        {displayData.slice(pagination.start, pagination.end).map(participation => (
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
                
                <CustomPagination source={displayData} setPagination={setPagination} maxPerPage={10}/>
            </>
        }
    </>
}

export default Overview;
