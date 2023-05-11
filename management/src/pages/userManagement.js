import React, { useEffect, useState } from 'react';
import ModalAdd from '../modules/user/modalAdd';
import ModalDelete from '../modules/user/modalDelete';
import ModalUpdate from '../modules/user/modalUpdate';

export default function Management() {
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [userData, setUserData] = useState();
    const [addModalShow, setAddModalShow] = useState(false);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);
    const [modalUpdateShow, setModalUpdateShow] = useState(false);
    const [loggedInUserRole, setLoggedInUserRole] = useState();

    useEffect(() => {
        getLoggedInUser();
        refreshData();
    }, []);

    const getLoggedInUser = async () => {
        const userToken = localStorage.getItem('user');
        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + `/api/user/role?username=${userToken}`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => setLoggedInUserRole(data.rolename));
    }

    const refreshData = async () => {
        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/user/get-list/', { method: 'GET' })
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
                <div className="container mt-3 text-center">
                    <h1 className="font-moesland">Beheerders</h1>

                    <div className="float-start mb-3">
                        <button className="btn btn-moesland" onClick={ToggleShowModalAdd}>Nieuwe beheerder</button>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr className="bg-moesland text-white">
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">Gebruikersnaam</th>
                                <th scope="col">Rol</th>
                                {loggedInUserRole === 'SuperAdmin' &&
                                <th scope="col"></th>
                                }
                            </tr>
                        </thead>

                        <tbody id="tableBody">
                            {userData.map(user => (
                                <tr key={user.id} >
                                    <th className="id">{user.id}</th>
                                    <td className="email">{user.email}</td>
                                    <td className="userName">{user.username}</td>
                                    <td className="role">{user.roleId.rolename}</td>
                                    {loggedInUserRole === 'SuperAdmin' &&
                                    <td className="text-end">
                                        {user.roleId.rolename !== "SuperAdmin" &&
                                            <button className={`btn btn-moesland ${user.roleId.rolename !== 'SuperAdmin' ? " mx-2" : ""}`} onClick={() => ToggleShowModalUpdate(user)}>Aanpassen</button>}
                                        {user.roleId.rolename !== "SuperAdmin" &&
                                            <button className="btn btn-danger" onClick={() => ToggleShowModalDelete(user)}>Verwijderen</button>}
                                    </td>
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {addModalShow && <ModalAdd toggleModal={ToggleShowModalAdd} refreshOverview={refreshData} />}
            {modalUpdateShow && <ModalUpdate toggleModal={ToggleShowModalUpdate} selectedItem={selectedItem} refreshOverview={refreshData} />}
            {modalDeleteShow && <ModalDelete toggleModal={ToggleShowModalDelete} selectedItem={selectedItem} refreshOverview={refreshData} />}
        </>
    );
}