import React, { useEffect, useState } from 'react';
import Overview from '../modules/participation/overview';
import AddModal from "../modules/participation/add";

const Participation = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [dataUpdated, setDataUpdated] = useState(false);

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

    const toggleEditModal = (updating) => {
        setShowEditModal(!showEditModal);
        handleDataUpdate(updating);
    };

    const toggleDeleteModal = (updating) => {
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
                <Overview key={dataUpdated} toggleEditModal={() => toggleEditModal} toggleDeleteModal={() => toggleDeleteModal} />
            </div>

            {showAddModal && <AddModal onClose={toggleAddModal} />}
            {showEditModal && <AddModal />}
            {showDeleteModal && <AddModal />}
        </>


    )
}

export default Participation;