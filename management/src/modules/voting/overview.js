import React, { useEffect, useState } from 'react';
import { BackendFetch } from "../../services/ApiClient";

const Overview = () => {
    const [votingData, setVotingData] = useState(undefined);

    useEffect(() => {
        BackendFetch('/api/vote', 'GET', (data) => {
            setVotingData(data);
        });
    }, []);
    // Group participants and count the number of participants
    const participants = votingData?.reduce((acc, voting) => {
    const participantName = voting.participant.name;
    acc[participantName] = (acc[participantName] || 0) + 1;
    return acc;
    }, {});


    return <>
        {!votingData &&
            <div>
                <h1>DATA LOADING...</h1>
            </div>
        }
        {votingData &&
            <>
                <table className="table table-striped">
                    <thead>
                        <tr className="bg-moesland text-white">
                            <th scope="col">Deelnemer</th>
                            <th scope="col">Categorie</th>
                            <th scope="col">Evenement</th>
                            <th scope="col">Aantal stemmen</th>
                        </tr>
                    </thead>

                    <tbody id="tableBody">
                        {votingData.map(voting => (
                            <tr key={voting._id} >
                                <th className="participant-name">{voting.participant.name}</th>
                                <th className="category-name">{voting.category?.name}</th>
                                <th className="event-name">{voting.event.title}</th>
                                <th className="vote-count">{participants[voting.participant.name]}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        }
    </>
}

export default Overview;
