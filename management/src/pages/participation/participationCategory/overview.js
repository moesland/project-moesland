import React, { useEffect, useState } from 'react';
import ModalAdd from '../../../modules/participationCategory/modalAdd';
import ModalUpdate from '../../../modules/participationCategory/modalUpdate';
import ModalDelete from '../../../modules/participationCategory/modalDelete';

const ParticipationCategoryOverview = () => {
  const [participationCategoryData, setParticipationCategoryData] = useState();

  const [allParticipationCategories] = useState();

  const [selectedItem, setSelectedItem] = useState(undefined);
  const [ShowAddParticipationCategoryModal, setShowAddParticipationCategoryModal] = useState(false);
  const [ShowDeleteParticipationCategoryModal, setShowModalDelete] = useState(false);
  const [ShowUpdateParticipationCategoryModal, setShowModalUpdate] = useState(false);

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = async () => {
    await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + '/api/participation-category', { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        setParticipationCategoryData(data);
      });
  };

  const ToggleShowAddParticipationCategoryModal = () => {
    setShowAddParticipationCategoryModal(!ShowAddParticipationCategoryModal);
  };

  const ToggleShowDeleteParticipationCategoryModal = (participationCategory) => {
    setShowModalDelete(!ShowDeleteParticipationCategoryModal);
    setSelectedItem(participationCategory);
  };

  const ToggleShowUpdateParticipationCategoryModal = (participationCategory) => {
    setShowModalUpdate(!ShowUpdateParticipationCategoryModal);
    setSelectedItem(participationCategory);
  };

  const createParticipationCategory = () => {
    ToggleShowAddParticipationCategoryModal();
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center font-moesland">Deelnamecategorieën</h1>

        <div className="row">
          <div className="col">
            <div className="mb-3">
              <button onClick={createParticipationCategory} type="button"
                      className="btn btn-moesland">
                Nieuwe deelnamecategorie
              </button>
            </div>
            {participationCategoryData &&
              <div className="col-md-12 mx-auto text-center">
                {participationCategoryData.length > 0 ?
                  (<table className="table table-striped">
                    <thead>
                    <tr className="bg-moesland text-white">
                      <th scope="col">Naam</th>
                      <th scope="col">Omschrijving</th>
                      <th scope="col">Kleur</th>
                      <th scope="col">Acties</th>
                    </tr>
                    </thead>
                    <tbody id="tableBody">
                    {participationCategoryData.map(participationCategory => (
                      <tr key={participationCategory.id}>
                        <td className="name">{participationCategory.name}</td>
                        <td className="description">{participationCategory.description}</td>
                        <td className="color"><span className="color-display-square" style={{background: participationCategory.color}}></span></td>
                        <td>
                          <button
                            onClick={() => ToggleShowDeleteParticipationCategoryModal(participationCategory)}
                            className="btn btn-danger mx-2">
                            <i className="bi bi-trash"></i>
                          </button>
                          <button
                            onClick={() => ToggleShowUpdateParticipationCategoryModal(participationCategory)}
                            className="btn btn-moesland">
                            <i className="bi bi-pencil"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>) :
                  (<table><p>Geen deelnamecategorieën.</p></table>)
                }
              </div>
            }
          </div>
        </div>

        {ShowAddParticipationCategoryModal &&
          <ModalAdd toggleModal={ToggleShowAddParticipationCategoryModal}
                    refreshOverview={refreshData}/>}
        {ShowDeleteParticipationCategoryModal &&
          <ModalDelete toggleModal={ToggleShowDeleteParticipationCategoryModal}
                       selectedItem={selectedItem} refreshOverview={refreshData}/>}
        {ShowUpdateParticipationCategoryModal &&
          <ModalUpdate toggleModal={ToggleShowUpdateParticipationCategoryModal}
                       selectedItem={selectedItem} refreshOverview={refreshData}/>}
      </div>
    </>
  );
};

export default ParticipationCategoryOverview;
