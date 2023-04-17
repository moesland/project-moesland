import React, { useEffect, useState } from "react";
import ModalAdd from "../modules/user/modalAdd";
import ModalDelete from "../modules/user/modalDelete";
import ModalUpdate from "../modules/user/modalUpdate";

export default function Management() {
  const [selectedItem, setSelectedItem] = useState(undefined);
  const [userData, setUserData] = useState();
  const [addModalShow, setAddModalShow] = useState(false);
  const [modalDeleteShow, setModalDeleteShow] = useState(false);
  const [modalUpdateShow, setModalUpdateShow] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/user/get-list/", { method: "GET" })
      .then(response => response.json())
      .then(data => { setUserData(data) });
  };

  const ToggleShowModalAdd = () => {
    setAddModalShow(!addModalShow);
  };

  const ToggleShowModalDelete = (user) => {
    setModalDeleteShow(!modalDeleteShow);
    setSelectedItem(user);
  };

  const ToggleShowModalUpdate = (user) => {
    setModalUpdateShow(!modalUpdateShow);
    setSelectedItem(user);
  };

  return (
    <>
      {userData &&
        <div className="row">
          <div className="pt-5 col-md-8 mx-auto text-center">
            <div className="float-end col-md-3 pb-3">
              <button onClick={ToggleShowModalAdd} type="button" className="btn btn-moesland">Nieuwe beheerder</button>
            </div>
            <table className="table table-striped">
              <thead>
                <tr className="bg-moesland text-white">
                  <th scope="col">#</th>
                  <th scope="col">Email</th>
                  <th scope="col">Gebruikersnaam</th>
                  <th scope="col">Rol</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody id="tableBody">
                {userData.map(user => (
                  <tr key={user.id} >
                    <th className="id" >{user.id}</th>
                    <td className="email">{user.email}</td>
                    <td className="userName">{user.username}</td>
                    <td className="role">{user.roleId.rolename}</td>
                    <td>
                      <button className="btn btn-moesland mx-2" onClick={() => ToggleShowModalUpdate(user)}>Aanpassen</button>
                      {user.roleId.rolename !== "SuperAdmin" && <button className="btn btn-danger" onClick={() => ToggleShowModalDelete(user)}>Verwijderen</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }

      {addModalShow && <ModalAdd toggleModal={ToggleShowModalAdd} refreshOverview={refreshData} />}
      {modalUpdateShow && <ModalUpdate toggleModal={ToggleShowModalUpdate} selectedItem={selectedItem} refreshOverview={refreshData} />}
      {modalDeleteShow && <ModalDelete toggleModal={ToggleShowModalDelete} selectedItem={selectedItem} refreshOverview={refreshData} />}
    </>
  );
}