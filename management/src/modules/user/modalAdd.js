import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'

//import { BackendClientRequest } from "../services/ApiClient";


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

        renderManager()
        pushManager()
        
        toggleModal()
    }
    function renderManager()
    {


    }
    function pushManager()
    {

    }

    return (
        <>
            <div class="modal show" tabindex="-1" role="dialog" style={{ display: "block" }}>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Nieuwe Beheerder</h5>
                        </div>
                        <form  onSubmit={handleSubmit(onSubmit)}>
                            <div className="mx-auto  col-md-10">
                                <div class="form-group pt-3">
                                    <label for="exampleInputEmail1">Email</label>
                                    <input class="form-control" id="exampleInputEmail1" name="modalAddManagerEmailName" aria-describedby="emailHelp" placeholder="Email" {...register("email")}></input>
                                    <small id="modalAddManagerEmailError" class="form-text text-danger  modalAddManagerEmailError">{errors.email?.message}</small>
                                </div>
                                <div class="form-group pt-3">
                                    <label for="exampleInputEmail1">Gebruikersnaam</label>
                                    <input class="form-control" id="exampleInputEmail1" name="modalAddManagerUserName" aria-describedby="emailHelp" placeholder="Gebruikersnaam" {...register("username")}></input>
                                    <small id="modalAddManagerUserError" class="form-text text-danger mt-3 modalAddManagerUserError">{errors.username?.message}</small>
                                </div>
                                <div class="form-group pt-3">
                                    <label for="exampleInputPassword1">Wachtwoord</label>
                                    <input class="form-control" id="exampleInputPassword1" placeholder="Wachtwoord" name="modalAddManagerPasswordName" {...register("password")}></input>
                                </div>
                                <small id="modalAddManagerPasswordError" class="form-text text-danger  modalAddManagerPasswordError" >{errors.password?.message}</small>
                                <div class="form-check">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={toggleModal} type="button" class="btn btn-secondary" data-dismiss="modal">Anuleren</button>
                                <input type = "submit"  class="btn btn btn-success" value="Aanmaken"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalAdd