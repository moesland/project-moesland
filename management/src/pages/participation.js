import React, { useEffect, useState } from 'react';
import Overview from '../modules/participation/overview';
import ModalForm from "../modules/participation/form";

const Participation = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [dataUpdated, setDataUpdated] = useState(false);
    const [selectValue, setSelectValue] = useState(undefined)
 
    const handleDataUpdate = (updating) => {
        if(updating === true) {
            setDataUpdated(prevState => !prevState);
            console.log("updating overview")
        }
    };

    const toggleAddModal = (updating) => {
        setShowAddModal(!showAddModal);
        handleDataUpdate(updating);
    };

    const toggleEditModal = (updating, value) => {
        setSelectValue(value)
        setShowEditModal(!showEditModal);
        handleDataUpdate(updating);
    };

    const toggleDeleteModal = (updating, value) => {
        setSelectValue(value)
        setShowDeleteModal(!showDeleteModal);
        handleDataUpdate(updating);
    };

    return (
        <>
            <div className="container mt-3 text-center">
                <h1 className="font-moesland">Deelnames</h1>

                <div className="float-start mb-3">
                    <button className="btn btn-moesland" onClick={toggleAddModal}>Nieuwe Deelnames</button>
                </div>
                <Overview key={dataUpdated} toggleEditModal={toggleEditModal} toggleDeleteModal={toggleDeleteModal} />
            </div>

            {showAddModal && <ModalForm onClose={toggleAddModal} />}
            {showEditModal && <ModalForm onClose={toggleEditModal} isUpdate={true} data={selectValue} />}
            {showDeleteModal && <div />}
        </>


    )
}

export default Participation;