import "../styles/customfilter.css";
import React, { useEffect, useState } from 'react';


const CustomTableSelectFilter = ({ inputText, list, listSelector, setFiltering }) => {
    const [listDisplay, setListDisplay] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([])

    const toggleList = () => {
        setListDisplay(!listDisplay);
    }

    const handleCheckboxChange = (id, isChecked) => {
        if (isChecked) {
            setSelectedOptions(prev => [...prev, id]);
        } else {
            setSelectedOptions(prev => prev.filter(option => option !== id));
        }
    }

    useEffect(() => {
        setFiltering(selectedOptions);
    }, [selectedOptions, setFiltering]);

    return (
        <div className="d-flex">
            <div className="dropdown custom-filter-container">
                <div className="btn dropdown-toggle custom-filter-input" onClick={toggleList}>{inputText}</div>
                {listDisplay &&
                    <div className="custom-toggle-list dropdown-menu show d-flex flex-column rounded-0 overflow-auto">
                        {list.map((data) => (
                            <div key={data[listSelector.id]} className="d-flex flex-row">
                                <input
                                    className="form-check-input mx-2"
                                    type="checkbox"
                                    id={data[listSelector.id]}
                                    onChange={(e) => handleCheckboxChange(data[listSelector.id], e.target.checked)}
                                />
                                <label className="form-check-label flex-grow-1" htmlFor={data[listSelector.id]}>
                                    {data[listSelector.text]}
                                </label>
                            </div>
                        ))}
                    </div>
                }

            </div>
        </div>
    )

}

export default CustomTableSelectFilter;