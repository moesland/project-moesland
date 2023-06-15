import React, { useEffect, useState } from 'react';
import { BackendFetch } from "../../services/ApiClient";
import FilterBar from './filterbar';
import CustomPagination from '../../components/customPagination';

const Overview = () => {
  const [votingData, setVotingData] = useState(undefined);
  const [displayData, setDisplayData] = useState([]);
  const [pagination, setPagination] = useState({ start: 0, end: Number.MAX_SAFE_INTEGER });
  const [counts, setCounts] = useState({});
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    BackendFetch('/api/vote/extra', 'GET', (data) => {
      setVotingData(data);
    });
  }, []);

  useEffect(() => {
    // Calculate counts for each participant
    const participantCounts = {};
    const groupedParticipants = [];

    for (const participant of displayData) {
      const participantId = participant.participant._id;

      if (!participantCounts[participantId]) {
        participantCounts[participantId] = 0;
        groupedParticipants.push(participant);
      }

      participantCounts[participantId]++;
    }

    // Sort the groupedParticipants array based on vote count in descending order
    const sortedGroupedParticipants = groupedParticipants.sort((a, b) => {
      return participantCounts[b.participant._id] - participantCounts[a.participant._id];
    });

    setCounts(participantCounts);
    setGroupedData(sortedGroupedParticipants);
  }, [displayData]);

  return (
    <>
      {!votingData && (
        <div>
          <h1>DATA LOADING...</h1>
        </div>
      )}
      {votingData && (
        <>
          <FilterBar sourceData={votingData} setDisplayData={setDisplayData} />
          <table className="table table-striped mt-2">
            <thead>
              <tr className="bg-moesland text-white">
                <th scope="col">Deelnemer</th>
                <th scope="col">Categorie</th>
                <th scope="col">Evenement</th>
                <th scope="col">Aantal stemmen</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              {groupedData.slice(pagination.start, pagination.end).map((participant, index) => (
                <tr key={index} className={index === 0 ? 'gold' : ''}>
                  <td className="participant-name">
                    {participant.participant.name}
                  </td>
                  <td className="category-name">
                    {participant.category?.name}
                  </td>
                  <td className="event-name">
                    {participant.event.title}
                  </td>
                  <td className="vote-count">
                    {counts[participant.participant._id]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <CustomPagination source={votingData} setPagination={setPagination} maxPerPage={10}/>
        </>
      )}
    </>
  );
};

export default Overview;
