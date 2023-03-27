import React, { useState } from 'react';
import CustomPaginate from '../../modules/CustomPaginate';

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
    const articlesPerPage = 10;
    const pagesVisited = pageNumber * articlesPerPage;

    const pageCount = Math.ceil(testData.articles.length / articlesPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const openEdit = () => {
        alert("edit");
    }

    const deleteArticle = (e) => {
        e.stopPropagation();
        alert("delete");
    }

    const openCreate = () => {
        alert("create");
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
                                <td><button className="btn btn-moesland" onClick={deleteArticle}>verwijderen</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <CustomPaginate pageCount={pageCount} changePage={changePage}/>       
            </div>
        </>
    )
}

export default ArticleOverview;