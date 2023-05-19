import CustomSelectSearch from "../../components/customSelectSearch";
import CustomModal from "../../components/customModal";

const AddModal = () => {
    return <CustomModal title={"Deelnames toevoegen"}>
        <form >
            <div className="mx-auto col-md-10">
                <div className="form-group pt-3">
                    <label className="float-start">Evenement</label>
                    <input className="form-control" name="modalAddManagerEmailName" aria-describedby="emailHelp" placeholder="E-mailadres"></input>
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Category</label>
                    <input className="form-control" name="modalAddManagerUserName" aria-describedby="emailHelp" placeholder="Gebruikersnaam"></input>
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Naam</label>
                    <input className="form-control" placeholder="Naam" name="modalAddManagerPasswordName"></input>
                </div>
                <div className="form-group pt-3">
                    <label className="float-start">Startnummer</label>
                    <input className="form-control" placeholder="Startnummer" name="modalAddManagerPasswordName"></input>
                </div>

                <CustomSelectSearch/>
            </div>
            <div className="modal-footer mt-3">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuleren</button>
                <input type="submit" className="btn btn btn-moesland" value="Aanmaken"></input>
            </div>
        </form>
    </CustomModal>
}

export default AddModal;