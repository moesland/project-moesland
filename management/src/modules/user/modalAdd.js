import React, { useState } from "react";
import { BackendClientRequest } from "../services/ApiClient";


const ModalAdd = () => {
    class Manager {
        constructor(id, email, userName, password) {
          this.id = id
          this.email = email
          this.userName = userName
          this.password = password
        }
      }
    
    const [modal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!modal);
    };
    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }


    //faked data
    let mag = new Manager(1, "Mark@gmail.com", "MarkoftheBeast", "123123a")
    let mam = new Manager(2, "theo@gmail.com", "swag", "12313")
    let pam = new Manager(3, "John@gmail.com", "gamer", "12dsad3123a")
    let listOfManagers = [mag, mam, pam]


    async function addManager() {
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

            const path = "/api/user/add"
            const body = {
                username: newManager.userName,
                email: newManager.email,
                password: newManager.password
            }
            const token = localStorage.getItem('token');
            const headers = new Headers({
                'Authorization': 'Bearer ' + token
            })
            await BackendClientRequest(
                path, body, headers, "POST"
            )
        }

        toggleModal()
    }

    return (
        <>
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
        </>
    )
}

export default ModalAdd