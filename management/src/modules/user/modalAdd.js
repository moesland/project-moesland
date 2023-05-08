import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { BackendClientRequest } from "../../services/ApiClient";

// const ModalAdd = ({ toggleModal, refreshOverview }) => {
const ModalAdd = ({ toggleModal }) => {

    const schema = yup.object().shape({
        email: yup.string().email("Dit veld moet een legitieme email zijn.").required("Dit veld mag niet leeg zijn."),
        username: yup.string().min(2, "Het gebruikersnaam moet minimaal twee karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn."),
        password: yup.string().min(6, "het wachtwoord moet minimaal 6 karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn.")
        
    })
    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        console.log(data.password)

        pushManager(4, data.email, data.username, data.password)
        
    }
    async function pushManager(id, email, username, password)
    {
        console.log("Adding manager")

        const path = "/api/user/add"
        const body = {
            username: username,
            email: email,
            password: password
        }
        console.log(body)

        const token = localStorage.getItem('token');
        const headers = new Headers({
            'Authorization': 'Bearer ' + token,
            'Content-Type':'application/json'
        })
        await  BackendClientRequest(
            path, body, headers, "POST"
        )
        //refreshOverview();
        toggleModal();
    }
    

    return (
        <>
            <div className="modal show custom-modal" tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header bg-moesland text-white">
                            <h5 className="modal-title">Nieuwe Beheerder</h5>
                        </div>
                        <form  onSubmit={handleSubmit(onSubmit)}>
                            <div className="mx-auto  col-md-10">
                                <div className="form-group pt-3">
                                    <label>Email</label>
                                    <input className="form-control" id="exampleInputEmail1" name="modalAddManagerEmailName" aria-describedby="emailHelp" placeholder="Email" {...register("email")}></input>
                                    <small id="modalAddManagerEmailError" className="form-text text-danger  modalAddManagerEmailError">{errors.email?.message}</small>
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
                                <small id="modalAddManagerPasswordError" className="form-text text-danger  modalAddManagerPasswordError" >{errors.password?.message}</small>
                                <div className="form-check">
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button onClick={toggleModal} type="button" className="btn btn-secondary" data-dismiss="modal">Anuleren</button>
                                <input type = "submit"  className="btn btn btn-moesland" value="Aanmaken"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAdd