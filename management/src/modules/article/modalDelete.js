import React from "react";
import { BackendClientRequest } from "../../services/ApiClient";

export default function ModalDelete({ toggleModal, selectedItem, refreshOverview }) {
    const deleteArticle = async () => {
        const path = "/api/news-article/delete";
        const body = {
            _id: selectedItem._id
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
                            <h5 className="modal-title">Nieuwsartikel verwijderen</h5>
                        </div>
                        <form>
                            <div className="modal-body">
                                <p className="deleteModalText">Weet u zeker dat u dit nieuwsartikel wilt verwijderen?</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={deleteArticle} type="button" className="btn btn btn-danger">Verwijderen</button>
                                <button onClick={toggleModal} type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}