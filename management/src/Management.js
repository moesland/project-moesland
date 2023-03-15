import React, { useState } from "react";
import { Modal, Button } from 'bootstrap';



export default function Management() {
  //Add managers modal
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  //delete managers modal
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDeleteModal = () => {
    setDeleteModal(!deleteModal);
  };

  if (deleteModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  //delete managers modal
  const [EditModal, setEditModal] = useState(false);
  const toggleEditModal = () => {
    setEditModal(!EditModal);
  };

  if (EditModal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }



  function addManager() {

    var modalEmail = document.forms["modalAddManager"]["modalAddManagerEmailName"].value;
    var modalPassword = document.forms["modalAddManager"]["modalAddManagerPasswordName"].value;

    var modalEmailError = document.getElementById("modalAddManagerEmailError")
    var modalPasswordError = document.getElementById("modalAddManagerPasswordError")
    
    modalPasswordError.classList.add("invisible")
    var errorCount = 0;
    //TODO meer condities, ffe navragen bij de boys
    if (modalEmail == "") {
      modalEmailError.textContent = "Het email veld mag niet leeg zijn."
      modalEmailError.classList.remove("invisible")
      errorCount++
    }

    if (modalPassword == "") {
      modalPasswordError.textContent = "Het wachtwoord veld mag niet leeg zijn."
      modalPasswordError.classList.remove("invisible")
      errorCount++
    }

    if (errorCount == 0) {
      console.log("Adding manager")
      toggleModal()
    }
  }

  function deleteManager() {
    toggleDeleteModal()
    console.log("Deleteing manager")

  }

  function editManager() {

    //var modalEmail = document.forms["modalEditManager"]["modalEditManagerEmailName"].value;
    //var modalPassword = document.forms["modalEditManager"]["modalEditManagerPasswordName"].value;
    var modalEmail = document.getElementById("EditModalEmailInput").value

    var modalEmailError = document.getElementById("EditModalEmailError")
    var modalPasswordError = document.getElementById("EditModalPasswordError")

    if (modalEmail == "") {
      modalEmailError.value = "dit veld mag niet leeg zijn"
      modalEmailError.classList.remove("invisible")
    }
    

    toggleEditModal()

  }


  return (
    <>
      <div class="row">
        <div class="pt-5 col-md-8 mx-auto text-center">
          <div class="float-end col-md-4 pb-3">
            <button onClick={toggleModal} type="button" class="btn btn-success " data-toggle="modal" data-target="#myModal">
              Nieuwe Beheerder
            </button>
          </div>
          <table class=" table table-borderless">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Wachtwoord</th>
                <th scope="col">Rol</th>
                <th scope="col">Acties</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark@gmail.com</td>
                <td>123123a</td>
                <td>Beheerder</td>
                <td>
                  <button onClick={deleteManager} class="btn btn-danger">Verwijderen</button>
                  <button onClick={editManager} class="btn btn-success">Aanpassen</button>
                </td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>Beheerder</td>
                <td>
                  <button onClick={deleteManager} class="btn btn-danger">Verwijderen</button>
                  <button onClick={editManager} class="btn btn-success">Aanpassen</button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

      {modal && (
        <div class="modal show" tabindex="-1" role="dialog" style={{ display: "block" }}>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Nieuwe Beheerder</h5>
              </div>
              <form name="modalAddManager">
                <div className="mx-auto  col-md-10">
                  <div class="form-group pt-3">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" name="modalAddManagerEmailName" aria-describedby="emailHelp" placeholder="Email"></input>
                    <small id="modalAddManagerEmailError" class="form-text text-danger invisible">_GENERIC_ERROR_EMAIL</small>
                  </div>
                  <div class="form-group pt-3">
                    <label for="exampleInputPassword1">Wachtwoord</label>
                    <input class="form-control" id="exampleInputPassword1" placeholder="Wachtwoord" name="modalAddManagerPasswordName"></input>
                  </div>
                  <small id="modalAddManagerPasswordError" class="form-text text-danger invisible" >_GENERIC_ERROR_PASSWORD</small>
                  <div class="form-check">
                  </div>
                </div>
                <div class="modal-footer">
                  <button onClick={toggleModal} type="button" class="btn btn-secondary" data-dismiss="modal">Anuleren</button>
                  <button onClick={addManager} type="button" class="btn btn btn-success">Opslaan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {deleteModal && (
        <div class="modal show" tabindex="-1" role="dialog" style={{ display: "block" }}>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Beheerder verwijderen </h5>
              </div>
              <form>
                <div class="modal-body">
                  <p>Weet U zeker dat u dit beheerder wilt verwijderen?</p>
                </div>
                <div class="modal-footer">
                  <button onClick={deleteManager} type="button" class="btn btn btn-danger">Verwijderen</button>
                  <button onClick={toggleDeleteModal} type="button" class="btn btn-secondary" data-dismiss="modal">Anuleren</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {EditModal && (
        <div class="modal show" tabindex="-1" role="dialog" style={{ display: "block" }}>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Beheerder aanpassen</h5>
              </div>
              <form name="modalEditManager">
                <div className="mx-auto  col-md-10">
                  <div class="form-group pt-3">
                    <label for="exampleInputEmail1">Nieuwe Email address</label>
                    <input type="email" class="form-control" id="EditModalEmailInput" name="modalEditManagerEmailName" aria-describedby="emailHelp" placeholder="Email"></input>
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
                  <button onClick={toggleEditModal} type="button" class="btn btn-secondary" data-dismiss="modal">Anuleren</button>
                  <button onClick={editManager} type="button" class="btn btn btn-success">Opslaan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
