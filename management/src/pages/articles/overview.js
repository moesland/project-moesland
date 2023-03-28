import React, { useEffect, useState } from 'react';
import CustomPaginate from '../../modules/CustomPaginate';
import { useNavigate } from "react-router-dom";
import { BackendClientRequest } from "../../services/ApiClient";

const ArticleOverview = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const [articles, setArticles] = useState(undefined);
    const [pagesVisited, setPagesVisited] = useState(undefined);
    const [pageCount, setPageCount] = useState(undefined);
    
    const navigate = useNavigate();
    const articlesPerPage = 10;

    useEffect(() => {
        const fetchArticleData = async () => {
            await fetch(process.env.REACT_APP_BACKEND_ROOT_URL + "/api/news-article/", { method: "GET" })
                .then(response => response.json())
                .then(data => { setArticles(data)});
        }

        fetchArticleData()
    }, [])

    useEffect(() => {
        if (articles) {
            setPagesVisited(pageNumber * articlesPerPage);
            setPageCount(Math.ceil(articles.length / articlesPerPage));
        }

    }, [articles, pagesVisited, pageCount])

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    //https://stackoverflow.com/questions/69714423/how-do-you-pass-data-when-using-the-navigate-function-in-react-router-v6
    const openEdit = (article) => {
        navigate('/articles/update/' + article._id, { state: { article } });
    }

    const deleteArticle = async (e, article) => {
        e.stopPropagation();

        const url = "/api/newsArticle/delete";
        const body = { _id: article._id }
        const headers = new Headers({
            'Content-Type': 'application/json'
        })
        const method = "POST"

        const data = await BackendClientRequest(url, body, headers, method);
        if (data && data.authToken) {
            localStorage.setItem('token', data.authToken.token);
            //navigate('/', { replace: true });
        }
    }

    const openCreate = () => {
        navigate('/articles/create');
    }

    return (
        <>
            {articles &&
                <div className="container mt-3">
                    <div className="mb-3">
                        <button className="btn btn-moesland" onClick={openCreate}> Nieuw artikel</button>
                    </div>

                    <table class="table table-striped table-hover">
                        <thead>
                            <tr className="bg-moesland text-white">
                                <th scope="col">Aanmaak datum</th>
                                <th scope="col" colspan="2">Titel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.slice(pagesVisited, pagesVisited + articlesPerPage).map(article => (
                                <tr key={article._id} onClick={() => openEdit(article)}>
                                    <td>{ new Date(article.date).toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                    <td>{article.title}</td>
                                    <td><button className="btn btn-moesland" onClick={(e) => deleteArticle(e, article)}>verwijderen</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <CustomPaginate pageCount={pageCount} changePage={changePage} />
                </div>
            }
        </>
    )
}

export default ArticleOverview;
