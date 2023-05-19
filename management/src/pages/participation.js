import React, { useEffect, useState } from 'react';
import Overview from '../modules/participation/overview';

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
        .then(data => setparticipationData(data));
    }

    return <div className="container mt-3 text-center">
        {!participationData &&
            <div>
                <h1>DATA LOADING...</h1>
            </div>
        }
        {participationData &&
            <Overview data={participationData}/>
        }
    </div>
}

export default Participation;