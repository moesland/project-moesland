import React, { useEffect, useState } from 'react';
import { BackendFetch } from "../../services/ApiClient";

const Overview = () => {
  const [votingData, setVotingData] = useState(undefined);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedEventTitle, setSelectedEventTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    BackendFetch('/api/vote', 'GET', (data) => {
      setVotingData(data);
    });
  }, []);

  // Group participants and count the number of participants
  const groupedParticipants = {};
  if (votingData) {
    votingData.forEach(voting => {
      const participantName = voting.participant.name;
      const categoryName = voting.category?.name;
      const eventTitle = voting.event?.title;
      const key = `${participantName}-${categoryName}-${eventTitle}`;
      if (!groupedParticipants[key]) {
        groupedParticipants[key] = {
          participant: voting.participant,
          category: voting.category,
          events: [],
        };
      }
      groupedParticipants[key].events.push(voting.event);
    });
  }

  // Sort participants by the number of votes in descending order
  const sortedParticipants = Object.values(groupedParticipants).sort((a, b) => {
    return b.events.length - a.events.length;
  });

  // Handle category filter change
  const handleCategoryFilterChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset the current page to 1 when the category filter is changed
  };

  // Handle event title filter change
  const handleEventTitleFilterChange = (event) => {
    setSelectedEventTitle(event.target.value);
    setCurrentPage(1); // Reset the current page to 1 when the event title filter is changed
  };


  // Filter participants based on selected category and event title
  const filteredParticipants = sortedParticipants.filter(participant => {   
    const categoryMatch =
      !selectedCategory || participant.category?.name === selectedCategory;
    const eventTitleMatch =
      !selectedEventTitle || participant.events.some(event => event.title === selectedEventTitle);
    return categoryMatch && eventTitleMatch;
  });

  const firstGroups = {};
  filteredParticipants.forEach(participant => {
    const categoryName = participant.category?.name;
    if (!firstGroups[categoryName]) {
      firstGroups[categoryName] = participant;
    }
  });
  // Calculate the index range of items to display for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredParticipants.slice(indexOfFirstItem, indexOfLastItem);

  // Get unique category names for the category filter dropdown
  const uniqueCategories = Array.from(
    new Set(sortedParticipants.map(participant => participant.category?.name))
  );

  // Get unique event titles for the event title filter dropdown
  const uniqueEventTitles = Array.from(
    new Set(sortedParticipants.flatMap(participant => participant.events.map(event => event.title)))
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);

  // Change the current page
  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {!votingData && (
        <div>
          <h1>DATA LOADING...</h1>
        </div>
      )}
      {votingData && (
        <>
          <div className="row my-3">
            <div className="col-md-6">
              <label htmlFor="categoryFilter" className="form-label">
                Filter op categorie:
              </label>
              <select
                className="form-select"
                id="categoryFilter"
                value={selectedCategory}
                onChange={handleCategoryFilterChange}
              >
                <option value="">All</option>
                {uniqueCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="eventTitleFilter" className="form-label">
                Filter op evenement:
              </label>
              <select
                className="form-select"
                id="eventTitleFilter"
                value={selectedEventTitle}
                onChange={handleEventTitleFilterChange}
              >
                <option value="">All</option>
                {uniqueEventTitles.map((eventTitle, index) => (
                  <option key={index} value={eventTitle}>
                    {eventTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
              {currentItems.map((participant, index) => (
                <tr
                  key={index}
                  className={`participant-name ${
                    participant === firstGroups[participant.category?.name] && currentPage === 1 ? 'gold' : ''
                  }`}
                >
                  <td className="participant-name">
                    {index === 0 && currentPage === 1 ? '🥇' : ''}
                    {participant.participant.name}
                  </td>
                  <td className="category-name">
                    {participant.category?.name}
                  </td>
                  <td className="event-name">
                    {participant.events[0]?.title}
                  </td>
                  <td className="vote-count">
                    {participant.events.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            {/* Pagination */}
            {totalPages > 1 && (
              <ul className="pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                  <li
                    key={page}
                    className={`page-item ${page === currentPage ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => changePage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Overview;
