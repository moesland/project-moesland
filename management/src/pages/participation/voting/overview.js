import React, { useState } from 'react';
import Overview from '../../../modules/voting/overview'

const VotingOverview = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [selectedValue, setSelectedValue] = useState(undefined)
 
    const handleDataUpdate = (updating) => {
        if(updating === true) {
            setDataUpdated(prevState => !prevState);
        }
    };

    const toggleAddModal = (updating) => {
        setShowAddModal(!showAddModal);
        handleDataUpdate(updating);
    };

    const toggleEditModal = (updating, value) => {
        setSelectedValue(value)
        setShowEditModal(!showEditModal);
        handleDataUpdate(updating);
    };

    const toggleDeleteModal = (updating, value) => {
        setSelectedValue(value)
        setShowDeleteModal(!showDeleteModal);
        handleDataUpdate(updating);
    };

    return (
        <>
            <div className="container mt-3 text-center">
                <h1 className="font-moesland">Stemmen Ranglijst</h1>
                <Overview key={dataUpdated} toggleEditModal={toggleEditModal} toggleDeleteModal={toggleDeleteModal} />
            </div>
        </>
    )
}

export default VotingOverview;