import React, { useState } from "react";
import ModalAdd from "../modules/user/modalAdd";
import ModalDelete from "../modules/user/modalDelete";
import ModalUpdate from "../modules/user/modalUpdate";
import Manager from "../modules/models/Manager";

import { BackendClientRequest } from "../services/ApiClient";


export default function Management() {
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


    </>
  )
}