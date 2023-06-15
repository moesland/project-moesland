import React, { useEffect, useState } from 'react';
import ModalDelete from '../../modules/newsArticles/modalDelete.js';
import { useNavigate } from "react-router-dom";
import { getNewsArticles } from '../../services/newsArticle.js';

export default function ArticleOverview() {
    const [articles, setArticles] = useState(undefined);
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = async () => {
        await getNewsArticles()
            .then(response => response.json())
            .then(data => { setArticles(data) });
    }

    const openCreate = () => {
        navigate('/articles/create');
    };

    const openEdit = (article) => {
        navigate('/articles/update/' + article._id, { state: { article } });
    };

    const ToggleShowModalDelete = (article) => {
        setModalDeleteShow(!modalDeleteShow);
        setSelectedItem(article);
    };

    return (
        <>
            {articles &&
                <div className="container mt-3">
                    <h1 className="font-moesland text-center">Nieuwsartikelen</h1>

                    <div className="mb-3">
                        <button className="btn btn-moesland" onClick={openCreate}>Nieuw artikel</button>
                    </div>

                    <table className="table table-striped">
                        <thead>
                            <tr className="bg-moesland text-white">
                                <th scope="col">Aanmaakdatum</th>
                                <th scope="col" colSpan="2">Titel</th>
                            </tr>
                        </thead>

                        <tbody>
                            {articles.map(article => (
                                <tr key={article._id}>
                                    <td>{new Date(article.date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td>{article.title}</td>
                                    <td className='text-end'>
                                        <button className="btn btn-moesland mx-2" onClick={() => openEdit(article)}>Aanpassen</button>
                                        <button className="btn btn-danger" onClick={() => ToggleShowModalDelete(article)}>Verwijderen</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }

            {modalDeleteShow && <ModalDelete toggleModal={ToggleShowModalDelete} selectedItem={selectedItem} refreshOverview={refreshData} />}
        </>
    );
}