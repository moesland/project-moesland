import React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BackendClientRequest } from "../../services/ApiClient";

export default function ModalUpdate({ toggleModal, selectedItem, refreshOverview }) {
    const schema = yup.object().shape({
        username: yup.string().min(2, "De gebruikersnaam moet minimaal twee karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn."),
        password: yup.string().min(6, "Het wachtwoord moet minimaal 6 karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn.")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        if (selectedItem.roleId.rolename === "SuperAdmin") return;

        const path = "/api/user/update";
        const body = {
            username: data.username,
            email: selectedItem.email,
            password: data.password
        };
        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        await BackendClientRequest(
            path, body, headers, "POST"
        );

        refreshOverview();
        toggleModal();
    }

    return (
        <>
            <div className="modal show custom-modal" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-moesland text-white">
                            <h5 className="modal-title ">Beheerder aanpassen</h5>
                        </div>
                        <form name="EditManagers" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mx-auto col-md-10">
                                <div className="form-group pt-3">
                                    <label>Nieuwe gebruikersnaam</label>
                                    <input className="form-control" id="EditModalEmailInput" name="EditManagersEmailName" aria-describedby="emailHelp" placeholder="Gebruikersnaam"
                                    {...register("username")} defaultValue={selectedItem.username}></input>
                                    <small id="modalAddManagerUserError" className="form-text text-danger mt-3 modalAddManagerUserError">{errors.username?.message}</small>
                                </div>
                                <div className="form-group pt-3">
                                    <label>Nieuw wachtwoord</label>
                                    <input id="EditModalPasswordInput" className="form-control" placeholder="Wachtwoord" name="modalEditManagerPasswordName"
                                    {...register("password")} defaultValue={selectedItem.password}></input>
                                </div>
                                <small id="modalAddManagerPasswordError" className="form-text text-danger modalAddManagerPasswordError">{errors.password?.message}</small>
                                <div className="form-check">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={toggleModal} type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                                <input type="submit" className="btn btn-moesland" value="Opslaan"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}