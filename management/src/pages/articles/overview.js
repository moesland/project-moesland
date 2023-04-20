import React, { useEffect, useState } from 'react';
import ModalDelete from '../../modules/article/modalDelete.js';
import CustomPaginate from '../../modules/CustomPaginate';
import { useNavigate } from "react-router-dom";

export default function ArticleOverview() {
    const [pageNumber, setPageNumber] = useState(0);
    const [articles, setArticles] = useState(undefined);
    const [pagesVisited, setPagesVisited] = useState(undefined);
    const [pageCount, setPageCount] = useState(undefined);
    const [selectedItem, setSelectedItem] = useState(undefined);
    const [modalDeleteShow, setModalDeleteShow] = useState(false);

    const navigate = useNavigate();
    const articlesPerPage = 10;

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = async () => {
        await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/news-article", { method: "GET" })
            .then(response => response.json())
            .then(data => { setArticles(data) });
    }

    useEffect(() => {
        if (articles) {
            setPagesVisited(pageNumber * articlesPerPage);
            setPageCount(Math.ceil(articles.length / articlesPerPage));
        }
    }, [articles, pagesVisited, pageCount]);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

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
                            {articles.slice(pagesVisited, pagesVisited + articlesPerPage).map(article => (
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

                    <CustomPaginate pageCount={pageCount} changePage={changePage} />
                </div>
            }

            {modalDeleteShow && <ModalDelete toggleModal={ToggleShowModalDelete} selectedItem={selectedItem} refreshOverview={refreshData} />}
        </>
    );
}