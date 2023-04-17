import React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BackendClientRequest } from "../../services/ApiClient";

export default function ModalAdd({ toggleModal, refreshOverview }) {
    const schema = yup.object().shape({
        email: yup.string().email("Het e-mailadres moet geldig zijn.").required("Dit veld mag niet leeg zijn."),
        username: yup.string().min(2, "De gebruikersnaam moet minimaal twee karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn."),
        password: yup.string().min(6, "Het wachtwoord moet minimaal 6 karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn.")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        addManager(data.email, data.username, data.password);
    };

    async function addManager(email, username, password) {
        const path = "/api/user/add";
        const body = {
            username: username,
            email: email,
            password: password
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
            <div className="modal show custom-modal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-moesland text-white">
                            <h5 className="modal-title">Nieuwe beheerder</h5>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mx-auto col-md-10">
                                <div className="form-group pt-3">
                                    <label>E-mailadres</label>
                                    <input className="form-control" id="exampleInputEmail1" name="modalAddManagerEmailName" aria-describedby="emailHelp" placeholder="E-mailadres" {...register("email")}></input>
                                    <small id="modalAddManagerEmailError" className="form-text text-danger modalAddManagerEmailError">{errors.email?.message}</small>
                                </div>
                                <div className="form-group pt-3">
                                    <label>Gebruikersnaam</label>
                                    <input className="form-control" id="exampleInputEmail1" name="modalAddManagerUserName" aria-describedby="emailHelp" placeholder="Gebruikersnaam" {...register("username")}></input>
                                    <small id="modalAddManagerUserError" className="form-text text-danger mt-3 modalAddManagerUserError">{errors.username?.message}</small>
                                </div>
                                <div className="form-group pt-3">
                                    <label>Wachtwoord</label>
                                    <input className="form-control" id="exampleInputPassword1" placeholder="Wachtwoord" name="modalAddManagerPasswordName" {...register("password")}></input>
                                </div>
                                <small id="modalAddManagerPasswordError" className="form-text text-danger modalAddManagerPasswordError" >{errors.password?.message}</small>
                                <div className="form-check">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={toggleModal} type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                                <input type="submit" className="btn btn btn-moesland" value="Aanmaken"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}