import React, { useState } from 'react';
import "../styles/custom.css";

const CustomSelectSearch = ({ options, idField, labelField}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSearchOptions(getSearchOptions(value));
  };

  const getSearchOptions = (value) => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (value !== '') {
      setSearchTerm(value);
    }
  }

  return (
    <div className="form-inline mt-1">
      <input
        type="text"
        className={`form-control mr-2 ${selectedValue && searchOptions.find(option => option.label === selectedValue) ? 'green-border' : ''}`}
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <select className="form-control mr-2" onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {searchOptions.map((option) => (
          <option key={option[idField]} value={option[idField]}>
            {option[labelField]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelectSearch;
