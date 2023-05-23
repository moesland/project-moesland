import React from "react";
import { BackendClientRequest } from "../../services/ApiClient";


const ModalDelete = ({ toggleModal, selectedItem, refreshOverview }) => {
    const deleteManager = async () => {
        const path = "/api/participation-category/delete"
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json'
        })

        await BackendClientRequest(
            path, { "_id" : selectedItem._id }, headers, "POST" // TODO: change email to?
        )

        refreshOverview();
        toggleModal();
    }

    return (
        <>
            <div className="modal show custom-modal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-moesland text-white">
                            <h5 className="modal-title">Deelnamecategorie verwijderen </h5>
                        </div>
                        <form>
                            <div className="modal-body">
                                <p className="deleteModalText">Weet u zeker dat u deze deelnamecategorie wilt verwijderen?</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={deleteManager} type="button" className="btn btn btn-danger">Verwijderen</button>
                                <button onClick={toggleModal} type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalDelete
