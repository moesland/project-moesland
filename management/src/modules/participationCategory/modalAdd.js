    import React, { useState} from "react";
    import { useForm } from 'react-hook-form';
    import * as yup from 'yup';
    import { yupResolver } from '@hookform/resolvers/yup'
    import { BackendClientRequest } from "../../services/ApiClient";
    import { SketchPicker } from 'react-color';

    const ModalAdd = ({ toggleModal, refreshOverview, date, isParade }) => {
        // color picker
        const [color, setColor] = useState("#fff");

        const schema = yup.object().shape({
            name: yup.string().min(3, "De naam moet minimaal 3 karakters bevatten.").max(40).required("Dit veld mag niet leeg zijn.").required("Dit veld mag niet leeg zijn."),
            description: yup.string().min(5, "De omschrijving moet minimaal 5 karakters bevatten.").max(300).required("Dit veld mag niet leeg zijn."),
            color: yup.string().matches(/^#[0-9A-F]{6}$/i, "Dit veld moet een geldige hexadecimale kleur zijn, een # gevolgd door 6 karakters.").required("Dit veld mag niet leeg zijn."),
        });

        const { register, handleSubmit, formState: { errors }, setValue } = useForm({
            resolver: yupResolver(schema),
        });

        const onSubmit = (data) => {
            pushManager(
                data.name,
                data.description,
                data.color
            );
        }

        async function pushManager(name, description, color) {
            const path = "/api/participation-category/create";
            const body = {
                name: name,
                description: description,
                color: color
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
                              <h5 className="modal-name ">Deelnemercategorie aanmaken</h5>
                          </div>
                          <form name="EditManagers" onSubmit={handleSubmit(onSubmit)}>
                              <div className="mx-auto  col-md-10">
                                  <div className="form-group pt-3">
                                      <label>Nieuwe categorienaam</label>
                                      <input className="form-control" id="edit-participation-category-name-id" name="edit-participation-category-name-name" placeholder="Titel" {...register("name")} ></input>
                                      <small id="edit-participation-category-name-error" className="form-text text-danger mt-3 edit-participation-category-name-error">{errors.name?.message}</small>
                                  </div>

                                  <div className="form-group pt-3 pb-3">
                                      <label>Nieuwe omschrijving</label>
                                      <textarea id="edit-participation-category-desc-id" className="form-control" placeholder="Omschrijving" name="edit-participation-category-desc-name" {...register("description")}></textarea>
                                      <small id="edit-participation-category-desc-error" className="form-text text-danger edit-participation-category-desc-error" >{errors.description?.message}</small>
                                  </div>

                                  <div className="form-group pt-3">
                                      <label>Nieuwe kleur</label>
                                      <SketchPicker color={color}
                                        // onChangeComplete={ handleChangeComplete } />
                                                    onChangeComplete={(color) => setColor(color.hex)}
                                                    onChange={(color) => setValue("color", color.hex)}
                                      />
                                      {/* <textarea defaultValue={selectedItem.color} id="edit-participation-category-color-id" className="form-control" placeholder="Omschrijving" name="edit-participation-category-color-name" {...register("color")}></textarea> */}
                                      <small id="edit-participation-category-color-error" className="form-text text-danger edit-participation-category-color-error" >{errors.color?.message}</small>
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
        )
    }

    export default ModalAdd;
