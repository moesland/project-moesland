import React, { useState } from 'react';
import CustomPaginate from '../../modules/CustomPaginate';
import { useNavigate } from "react-router-dom";
import { BackendClientRequest } from "../../services/ApiClient";

const ArticleOverview = () => {
    const testData = {
        "articles": [
            {
                "date": "20-2-2023",
                "title": "first ever",
                "content": "asdfjaopsdifjpoasdf"
            },
            {
                "date": "20-2-2022",
                "title": "second ever",
                "content": "asdfasdf"
            }
        ]
    };

    const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate();
    const articlesPerPage = 10;
    const pagesVisited = pageNumber * articlesPerPage;

    const pageCount = Math.ceil(testData.articles.length / articlesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const openEdit = () => {
        navigate('/');
    }

    const deleteArticle = async (e, title) => {
        e.stopPropagation();

        const url = "/api/newsArticle/delete";
        const body = { title }
        const headers = new Headers({
            'Content-Type': 'application/json'
        })
        const method = "POST"
        
        const data = await BackendClientRequest(url, body, headers, method);
        if (data && data.authToken) {
            localStorage.setItem('token', data.authToken.token);
            navigate('/', { replace: true });
        }
    }

    const openCreate = () => {
        navigate('/');
    }

    return (
        <>
            <div className="container mt-3">
                <div className="mb-3">
                    <button className="btn btn-moesland" onClick={openCreate}> Nieuw artikel</button>
                </div>

                <table class="table table-striped table-hover">
                    <thead>
                        <tr className="bg-moesland text-white">
                            <th scope="col">Aanmaak datum</th>
                            <th scope="col">Titel</th>
                            <th scope="col" colspan="2">Inhoud</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testData.articles.slice(pagesVisited, pagesVisited + articlesPerPage).map(article => (
                            <tr key={article.date} onClick={openEdit}>
                                <td>{article.date}</td>
                                <td>{article.title}</td>
                                <td>{article.content}</td>
                                <td><button className="btn btn-moesland" onClick={(e) => deleteArticle(e, article.title)}>verwijderen</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <CustomPaginate pageCount={pageCount} changePage={changePage} />
            </div>
        </>
    )
}

export default ArticleOverview;