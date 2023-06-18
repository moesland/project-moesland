import React, { useState } from 'react';
import Overview from '../modules/participation/overview';
import ModalForm from "../modules/participation/form";
import ModalDelete from '../modules/participation/delete';

const Participation = () => {
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
                <h1 className="font-moesland">Deelnemers</h1>
                
                <Overview key={dataUpdated} toggleAddModal={toggleAddModal} toggleEditModal={toggleEditModal} toggleDeleteModal={toggleDeleteModal} />
            </div>

            {showAddModal && <ModalForm onClose={toggleAddModal} />}
            {showEditModal && <ModalForm onClose={toggleEditModal} isUpdate={true} data={selectedValue} />}
            {showDeleteModal && <ModalDelete onClose={toggleDeleteModal} data={selectedValue} />}
        </>


    )
}

export default Participation;