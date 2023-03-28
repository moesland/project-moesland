import React, { useEffect, useState } from "react";
import ModalAdd from "../modules/user/modalAdd";
import ModalDelete from "../modules/user/modalDelete";
import ModalUpdate from "../modules/user/modalUpdate";
import { useForm } from 'react-hook-form';


export default function Management() {
  const [selectedItem, setSelectedItem] = useState(undefined)
  const [userData, setUserData] = useState()

  const [addModalShow, setAddModalShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalUpdateShow, setModalUpdateShow] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/user/getList/", { method: "GET" })
        .then(response => response.json())
        .then(data => { console.log(data); setUserData(data) });
    }

    fetchUserData()
  }, [])

  useEffect(() => {

    if (userData) {
      console.log(userData)
    }
  }, [userData])

  //call back op de select item


  const ToggleShowModalAdd = () => {
    setAddModalShow(!addModalShow);
  }
  const ToggleShowModalDelete = (user) => {

    setModalDeleteShow(!modalDeleteShow);
    setSelectedItem(user)
  }
  const ToggleShowModalUpdate = (user) => {
    setModalUpdateShow(!modalUpdateShow);

    setSelectedItem(user)
  }





  return (
    <>
      {userData &&
        <div class="row">
          <div class="pt-5 col-md-8 mx-auto text-center">
            <div class="float-end col-md-3 pb-3">
              <button onClick={ToggleShowModalAdd} type="button" class="btn btn-moesland ">
                Nieuwe Beheerder
              </button>
            </div>
            <table class=" table table-striped " >
              <thead>
                <tr class="bg-moesland text-white">
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gebruikersnaam</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Acties</th>
                </tr>
              </thead>
              <tbody id="tableBody">
                {userData.map(user => (
                  <tr key={user.id} >
                    <th class="id" >{user.id}</th>
                    <td class="email">{user.email}</td>
                    <td class="userName">{user.username}</td>
                    <td class="role">Beheerder</td>
                    <td >
                      <div class="row">
                        <div class="">
                        </div>
                        <div class="pr-3">
                        </div>
                      </div>
                      <button class="btn btn-danger" onClick={() => ToggleShowModalDelete(user)}>Verwijderen </button>
                      <button class="btn btn-moesland" onClick={() => ToggleShowModalUpdate(user)}>Aanpassen</button>
                    </td>
                  </tr>
                ))

                }
              </tbody>
            </table>
          </div>
        </div>

      }
      {addModalShow && <ModalAdd toggleModal={ToggleShowModalAdd} />}
      {modalDeleteShow && <ModalDelete toggleModal={ToggleShowModalDelete} selectedItem={selectedItem} />}
      {modalUpdateShow && <ModalUpdate toggleModal={ToggleShowModalUpdate} selectedItem={selectedItem} />}

    </>
  )

}