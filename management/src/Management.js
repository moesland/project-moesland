import React, { useState } from "react";



export default function Management() {
  class Manager {
    constructor(id, email, userName, password) {
      this.id = id
      this.email = email
      this.userName = userName
      this.password = password
    }
  }
  //faked data
  let mag = new Manager(1, "Mark@gmail.com", "MarkoftheBeast", "123123a")
  let mam = new Manager(2, "theo@gmail.com", "swag", "12313")
  let pam = new Manager(3, "John@gmail.com", "gamer", "12dsad3123a")
  let listOfManagers = [mag, mam, pam]

  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

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
    let modalEmail = document.forms["modalAddManager"]["modalAddManagerEmailName"].value;
    let modalUser = document.forms["modalAddManager"]["modalAddManagerUserName"].value;
    let modalPassword = document.forms["modalAddManager"]["modalAddManagerPasswordName"].value;

    let modalUserError = document.getElementById("modalAddManagerUserError")
    let modalEmailError = document.getElementById("modalAddManagerEmailError")
    let modalPasswordError = document.getElementById("modalAddManagerPasswordError")

    modalPasswordError.classList.add("invisible")
    let errorCount = 0;
    
    if (modalEmail === "") {
      modalEmailError.textContent = "Het email veld mag niet leeg zijn."
      modalEmailError.classList.remove("invisible")
      errorCount++
    }

    if (modalUser === "") {
      modalUserError.textContent = "Het gebruikersnaam veld mag niet leeg zijn."
      modalUserError.classList.remove("invisible")
      errorCount++
    }

    if (modalPassword === "") {
      modalPasswordError.textContent = "Het wachtwoord veld mag niet leeg zijn."
      modalPasswordError.classList.remove("invisible")
      errorCount++
    }

    if (errorCount === 0) {
      console.log("Adding manager")
      toggleModal()
    }

    if (errorCount === 0) {
      console.log("Adding manager")
      let myTableBody = document.getElementById("tableBody")
      let myElement = document.getElementById("dummyTr").cloneNode(true)
      let newManager = new Manager(listOfManagers.length + 1, modalEmail, modalUser, modalPassword)

      myElement.classList.add(newManager.email)
      myElement.querySelector('.id').textContent = newManager.id
      myElement.querySelector('.email').textContent = newManager.email
      myElement.querySelector('.userName').textContent = newManager.userName
      myElement.querySelector('.password').textContent = newManager.password
      myElement.querySelector('.deleteManager').addEventListener("click", function () {
        deleteManager(newManager)
      }, false)
      myElement.querySelector('.editManager').addEventListener("click", function () {
        editManager(newManager)
      }, false)
      myTableBody.appendChild(myElement)
      toggleModal()
    }
  }

  function deleteManager(manager) {

    //var myTableBody = document.getElementById("tableBody")
    //var myDiv = document.getElementsByClassName(manager.email)
    let myText = document.querySelector("deleteModalText")
    myText.textContent = "asd"
    console.log("Deleteing manager")
    toggleDeleteModal()
  }


  function getListOfManagers() {
    //faken vervangen door echte fetch van data



    let myTableBody = document.getElementById("tableBody")

    for (var x = 0; x < listOfManagers.length; x++) {
      var myElement = document.getElementById("dummyTr").cloneNode(true)
      myElement.classList.add(listOfManagers[x].email)
      myElement.querySelector('.email').textContent = listOfManagers[x].email
      myElement.querySelector('.userName').textContent = listOfManagers[x].userName
      myElement.querySelector('.password').textContent = listOfManagers[x].password
      myElement.querySelector('.id').textContent = listOfManagers[x].id
      var myManager = listOfManagers[x]
      myElement.querySelector('.deleteManager').addEventListener("click", function () {
        deleteManager(myManager)
      }, false)
      myElement.querySelector('.editManager').addEventListener("click", function () {
        editManager(myManager)
      }, false)

      myTableBody.appendChild(myElement)
    }

    document.getElementById("dummyTr").remove()
  }


  function editManager(manager) {
    toggleEditModal()
  }


  return (
    <>
      <div class="row">
        <div class="pt-5 col-md-8 mx-auto text-center">
          <div class="float-end col-md-3 pb-3">
            <button onClick={toggleModal} type="button" class="btn btn-success " data-toggle="modal" data-target="#myModal">
              Nieuwe Beheerder
            </button>
          </div>
          <table class=" table table-borderless" id="managerTable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Gebruikersnaam</th>
                <th scope="col">Wachtwoord</th>
                <th scope="col">Rol</th>
                <th scope="col">Acties</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              <tr id="dummyTr">
                <th class="id" >0</th>
                <td class="email">Mark@gmail.com</td>
                <td class="userName">MarkoftheBeast</td>
                <td class="password">123123a</td>
                <td class="role">Beheerder</td>
                <td >
                  <div class="row">
                    <div class="">
                    </div>
                    <div class="pr-3">
                    </div>
                  </div>
                  <button class="btn btn-danger deleteManager" >Verwijderen</button>
                  <button class="btn btn-success editManager">Aanpassen</button>
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
                    <label for="exampleInputEmail1">Email</label>
                    <input class="form-control" id="exampleInputEmail1" name="modalAddManagerEmailName" aria-describedby="emailHelp" placeholder="Email"></input>
                    <small id="modalAddManagerEmailError" class="form-text text-danger invisible">_GENERIC_ERROR_USER</small>
                  </div>
                  <div class="form-group pt-3">
                    <label for="exampleInputEmail1">Gebruikersnaam</label>
                    <input class="form-control" id="exampleInputEmail1" name="modalAddManagerUserName" aria-describedby="emailHelp" placeholder="Gebruikersnaam"></input>
                    <small id="modalAddManagerUserError" class="form-text text-danger invisible">_GENERIC_ERROR_USER</small>
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
                  <p class="deleteModalText">Weet U zeker dat u dit beheerder wilt verwijderen?</p>
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
                  <button onClick={toggleEditModal} type="button" class="btn btn-secondary" data-dismiss="modal">Anuleren</button>
                  <button onClick={editManager} type="button" class="btn btn btn-success">Opslaan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {window.onload = getListOfManagers}
    </>
  )
}
