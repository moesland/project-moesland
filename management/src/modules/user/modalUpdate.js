import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'


const ModalUpdate = ({ toggleModal, selectedItem }) => {
    console.log(selectedItem)
    
    const schema = yup.object().shape({
        username: yup.string().min(2, "Het gebruikersnaam moet minimaal twee karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn."),
        password: yup.string().min(6, "het wachtwoord moet minimaal 6 karakters bevatten.").max(30).required("Dit veld mag niet leeg zijn.")
    })
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        console.log(data.password)

        toggleModal()
    }


    return (
        <>
            <div class="modal show" tabindex="-1" role="dialog" style={{ display: "block" }}>
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-moesland text-white">
                            <h5 class="modal-title ">Beheerder aanpassen</h5>
                        </div>
                        <form name="EditManagers" onSubmit={handleSubmit(onSubmit)}>
                            <div className="mx-auto  col-md-10">
                                <div class="form-group pt-3">
                                    <label for="exampleInputEmail1">Nieuwe gebruikersnaam</label>
                                    <input  class="form-control" id="EditModalEmailInput" name="EditManagersEmailName" aria-describedby="emailHelp" placeholder="Email" {...register("username")}></input>
                                    <small id="modalAddManagerUserError" class="form-text text-danger mt-3 modalAddManagerUserError">{errors.username?.message}</small>
                                </div>
                                <div class="form-group pt-3">
                                    <label for="exampleInputPassword1">Nieuwe wachtwoord</label>
                                    <input id="EditModalPasswordInput" class="form-control" placeholder="Wachtwoord" name="modalEditManagerPasswordName" {...register("password")}></input>
                                </div>
                                    <small id="modalAddManagerPasswordError" class="form-text text-danger  modalAddManagerPasswordError" >{errors.password?.message}</small>
                                    <div class="form-check">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button onClick={toggleModal} type="button" class="btn btn-secondary" data-dismiss="modal">Anuleren</button>
                                <input type = "submit"  class="btn btn-moesland" value="Opslaan"></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalUpdate