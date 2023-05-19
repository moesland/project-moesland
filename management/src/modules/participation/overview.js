import AddModal from "./add";

const Overview = ({ data }) => {

    const toggleAddModal = () => {
    };

    const toggleEditModal = () => {
    };

    const toggleDeleteModal = () => {
    };

    return <>
        <h1 className="font-moesland">Deelnames</h1>

        <div className="float-start mb-3">
            <button className="btn btn-moesland" onClick={toggleAddModal}>Nieuwe Deelnames</button>
        </div>

        <table className="table table-striped">
            <thead>
                <tr className="bg-moesland text-white">
                    <th scope="col">Event</th>
                    <th scope="col">Category</th>
                    <th scope="col">deelname</th>
                    <th scope="col">Nr.</th>
                    <th scope="col"></th>
                </tr>
            </thead>

            <tbody id="tableBody">
                {data.map(participation => (
                    <tr key={participation._id} onClick={toggleEditModal} >
                        <th className="event-title">{participation.event.title}</th>
                        <th className="category-name">{participation.category.name}</th>
                        <th className="name">{participation.name}</th>
                        <th className="startnumber">{participation.startnumber}</th>
                        <th>
                            <button onClick={toggleDeleteModal} className="btn btn-danger mx-2">Verwijderen</button>
                        </th>
                    </tr>
                ))}
            </tbody>
        </table>

        <AddModal/>
    </>
}

export default Overview;