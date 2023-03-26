import React, { useState } from "react";


const ModalDelete = ({toggleModal}) => {
    function deleteManager(manager) {

        //var myTableBody = document.getElementById("tableBody")
        //var myDiv = document.getElementsByClassName(manager.email)
        let myText = document.querySelector("deleteModalText")
        myText.textContent = "asd"
        console.log("Deleteing manager")
        toggleModal()
    
      }

    return (
        <>
            <div class="modal show" tabindex="-1" role="dialog" style={{ display: "block" }}>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Beheerder verwijderen </h5>
                        </div>
                        <form>
                            <div class="modal-body">
                                <p class="deleteModalText">Weet U zeker dat u dit beheerder wilt verwijderen?</p>
                            </div>
                            <div class="modal-footer">
                                <button onClick={deleteManager} type="button" class="btn btn btn-danger">Verwijderen</button>
                                <button onClick={toggleModal} type="button" class="btn btn-secondary" data-dismiss="modal">Anuleren</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalDelete