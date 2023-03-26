import React, { useState } from "react";


const ModalUpdate = ({toggleModal}) => {

    function editManager(manager) {
        toggleModal()
    }


    return (
        <>
            <div class="modal show" tabindex="-1" role="dialog" style={{ display: "block" }}>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Beheerder aanpassen</h5>
                        </div>
                        <form name="EditManagers">
                            <div className="mx-auto  col-md-10">
                                <div class="form-group pt-3">
                                    <label for="exampleInputEmail1">Nieuwe Email address</label>
                                    <input type="email" class="form-control" id="EditModalEmailInput" name="EditManagersEmailName" aria-describedby="emailHelp" placeholder="Email"></input>
                                    <small id="EditModalEmailError" class="form-text text-danger invisible"  >_GENERIC_ERROR_EMAIL</small>
                                </div>
                                <div class="form-group pt-3">
                                    <label for="exampleInputPassword1">Nieuwe Wachtwoord</label>
                                    <input id="EditModalPasswordInput" class="form-control" placeholder="Wachtwoord" name="modalEditManagerPasswordName"></input>
                                </div>
                                <small id="EditModalPasswordError" class="form-text text-danger invisible" >_GENERIC_ERROR_PASSWORD</small>
                                <div class="form-check">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={toggleModal} type="button" class="btn btn-secondary" data-dismiss="modal">Anuleren</button>
                                <button onClick={editManager} type="button" class="btn btn btn-success">Opslaan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalUpdate