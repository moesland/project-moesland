import React from "react";
import { BackendClientRequest } from "../../services/ApiClient";

export default function ModalDelete({ toggleModal, selectedItem, refreshOverview }) {
    const deleteManager = async () => {
        if (selectedItem.roleId.rolename === "SuperAdmin") return;

        const path = "/api/user/delete";
        const body = {
            email: selectedItem.email
        };
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        await BackendClientRequest(
            path, body, headers, "POST"
        );

        refreshOverview();
        toggleModal();
    }

    return (
        <>
            <div className="modal show custom-modal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-moesland text-white">
                            <h5 className="modal-title">Beheerder verwijderen</h5>
                        </div>
                        <form>
                            <div className="modal-body">
                                <p className="deleteModalText">Weet u zeker dat u deze beheerder wilt verwijderen?</p>
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
    );
}