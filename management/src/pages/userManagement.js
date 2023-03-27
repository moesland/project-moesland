import React, { useState } from "react";
import ModalAdd from "../modules/user/modalAdd";
import ModalDelete from "../modules/user/modalDelete";
import ModalUpdate from "../modules/user/modalUpdate";
import { useForm } from 'react-hook-form';
import { BackendClientRequest } from "../services/ApiClient";


export default function Management() {
  const testData = {
    "data": [{
      "id": 1,
      "email": "Mark@gmail.com",
      "username": "Marko",
      "password": "123123a",
    },
    {
      "id": 2,
      "email": "pol@gmail.com",
      "username": "Polo",
      "password": "123123a",
    },
    {
      "id": 3,
      "email": "teun@gmail.com",
      "username": "teuntje",
      "password": "112233",
    }
    ]
  }
  


  const [addModalShow, setAddModalShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalUpdateShow, setModalUpdateShow] = useState(false);

  const ToggleShowModalAdd = () => {
    setAddModalShow(!addModalShow);
  }
  const ToggleShowModalDelete = () => {
    setModalDeleteShow(!modalDeleteShow);
  }
  const ToggleShowModalUpdate = () => {
    setModalUpdateShow(!modalUpdateShow);
  }

  function renderManagers() {
    
    let myTableBody = document.getElementById("tableBody")
    console.log(testData.data[0])
    for (var x = 0; x < testData.data.length; x++) {
      
      var myElement = document.getElementById("dummyTr").cloneNode(true)
      myElement.classList.add(testData.data[x].email)
      myElement.querySelector('.email').textContent = testData.data[x].email
      myElement.querySelector('.userName').textContent = testData.data[x].username
      myElement.querySelector('.id').textContent = testData.data[x].id
      var myManager = testData.data[x]
      myElement.querySelector('.deleteManager').addEventListener("click", function () {
        ToggleShowModalDelete()
      }, false)
      myElement.querySelector('.editManager').addEventListener("click", function () {
        ToggleShowModalUpdate()
      }, false)

      myTableBody.appendChild(myElement)
    }

    document.getElementById("dummyTr").remove()
  }

  return (
    <>
      <div class="row">
        <div class="pt-5 col-md-8 mx-auto text-center">
          <div class="float-end col-md-3 pb-3">
            <button onClick={ToggleShowModalAdd} type="button" class="btn btn-success ">
              Nieuwe Beheerder
            </button>
          </div>
          <table class=" table table-borderless" id="managerTable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Gebruikersnaam</th>
                <th scope="col">Rol</th>
                <th scope="col">Acties</th>
              </tr>
            </thead>
            <tbody id="tableBody">
              <tr id="dummyTr">
                <th class="id" >0</th>
                <td class="email">Mark@gmail.com</td>
                <td class="userName">MarkoftheBeast</td>
                <td class="role">Beheerder</td>
                <td >
                  <div class="row">
                    <div class="">
                    </div>
                    <div class="pr-3">
                    </div>
                  </div>
                  <button class="btn btn-danger deleteManager" onClick={ToggleShowModalDelete}>Verwijderen </button>
                  <button class="btn btn-success editManager" onClick={ToggleShowModalUpdate}>Aanpassen</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>


      {addModalShow && <ModalAdd toggleModal={ToggleShowModalAdd} />}
      {modalDeleteShow && <ModalDelete toggleModal={ToggleShowModalDelete} />}
      {modalUpdateShow && <ModalUpdate toggleModal={ToggleShowModalUpdate} />}
      <button class="btn btn-success editManager" onClick={renderManagers}>Aanpassen</button>


    </>
  )
}