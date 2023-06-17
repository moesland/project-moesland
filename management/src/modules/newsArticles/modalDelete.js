import React from "react";
import { deleteNewsArticle } from "../../services/newsArticle";

export default function ModalDelete({ toggleModal, selectedItem, refreshOverview }) {
    const deleteArticle = async () => {
        await deleteNewsArticle(selectedItem._id)
            .then(() => {
                refreshOverview();
                toggleModal();
            });
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