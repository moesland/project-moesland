import React, { useEffect, useState } from 'react';
import "../styles/custom.css";

const CustomSelectSearch = ({ name, options, idField, labelField, defaultValue = '', defaultValueName = null, enableSearch = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  useEffect(() => {
    setSearchOptions(options);
  }, [options]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSearchOptions(getSearchOptions(value));
  };

  const getSearchOptions = (value) => {
    return options.filter((option) =>
      option[labelField].toLowerCase().includes(value.toLowerCase()) || option[idField].includes(selectedValue)
    );
  };

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
  };

  return (
    <div className="form-inline mt-1">
      {enableSearch &&
        <input
          type="text"
          className="form-control mr-2"
          placeholder="Zoeken..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      }
      <input
        type="hidden"
        name={name}
        value={selectedValue}
      />
      <select className="form-control mr-2" defaultValue={""} onChange={handleSelectChange}>
        <option value="" disabled hidden>{defaultValueName ? defaultValueName : "Kies een optie..."}</option>
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
