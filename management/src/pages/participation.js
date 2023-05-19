import React, { useEffect, useState } from 'react';

const Participation = () => {
    const [participationData, setparticipationData] = useState(undefined);

    useEffect(() => {
        loadParticiationData();
    }, []);

    const loadParticiationData = async () => {
        const token = localStorage.getItem('token');
        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + `/api/participation`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => console.log(data));
    }


    return <div className="container mt-3 text-center">
        {!participationData &&
            <div>
                <h1>DATA LOADING...</h1>
            </div>
        }
        {participationData &&
            <>
                <h1 className="font-moesland">Deelnames</h1>

                <div className="float-start mb-3">
                    <button className="btn btn-moesland">Nieuwe Deelnames</button>
                </div>

                <table className="table table-striped">
                    <thead>
                        <tr className="bg-moesland text-white">
                            <th scope="col">Email</th>
                            <th scope="col">Gebruikersnaam</th>
                            <th scope="col">Rol</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody id="tableBody">
                        {participationData.map(participation => (
                            <tr key={participation.id} >
                                <th className="id">{participation.id}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        }
    </div>

}

export default Participation;