import React from "react";
import { deleteUserImage } from "../../services/userImage";

export default function ModalDelete({ toggleModal, selectedItem, refreshOverview }) {
    const deleteImage = async () => {
        await deleteUserImage(selectedItem)
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
                            <h5 className="modal-title">Foto verwijderen</h5>
                        </div>
                        <form>
                            <div className="modal-body">
                                <p className="deleteModalText">Weet u zeker dat u deze foto wilt verwijderen?</p>
                            </div>
                            <div className="modal-footer">
                                <button onClick={deleteImage} type="button" className="btn btn btn-danger">Verwijderen</button>
                                <button onClick={toggleModal} type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}