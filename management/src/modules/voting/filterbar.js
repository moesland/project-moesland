import CustomTableSelectFilter from "../../components/customTableSelectFilter"
import { formatOnCategory, formatOnEvents } from "../../services/participationFormatter";
import React, { useEffect, useState } from 'react';

const FilterBar = ({sourceData, setDisplayData}) => {
    const [eventFilters, setEventFilters] = useState();
    const [categoryFilters, setCategoryFilters] = useState();

    const eventFiltering = (source, filters) => {
        if(!filters || filters.length < 1) return source;

        return source.filter(participate =>  filters.includes(participate.event._id));
    }

    const categoryFiltering = (source, filters) => {
        if(!filters || filters.length < 1) return source;

        return source.filter(participate => filters.includes(participate.category._id));
    }

    useEffect(() => {
        let filteredData = sourceData;

        filteredData = eventFiltering(filteredData, eventFilters); 
        filteredData = categoryFiltering(filteredData, categoryFilters)

        setDisplayData(filteredData);     
    }, [eventFilters, categoryFilters, sourceData, setDisplayData])


    return (
        <div className='d-flex'>
            <div className="text-center d-flex align-items-center me-2 fs-4">
                Filteren:
            </div>
            <CustomTableSelectFilter
                inputText={"Evenement"}
                list={formatOnEvents(sourceData)}
                listSelector={{ id: "_id", text: "title" }}
                setFiltering={setEventFilters}
            />
            <CustomTableSelectFilter
                inputText={"Categorie"}
                list={formatOnCategory(sourceData)}
                listSelector={{ id: "_id", text: "name" }}
                setFiltering={setCategoryFilters}
            />
        </div>
    )
}

export default FilterBar;