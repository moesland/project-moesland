import React, { useEffect, useState } from 'react';

const CustomPagination = ({source, setPagination, maxPerPage}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(source.length / maxPerPage);

    useEffect(() => {
        const start = (currentPage - 1) * maxPerPage;
        const end = start + maxPerPage;
        setPagination({start, end});
    }, [source, currentPage, maxPerPage, setPagination]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changePage = (page) => {
        setCurrentPage(page);
    };

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <div className="page-link" onClick={prevPage}>Previous</div>
                </li>
                {[...Array(totalPages).keys()].map((page) => 
                    <li key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                        <div className="page-link" onClick={() => changePage(page + 1)}>{page + 1}</div>
                    </li>
                )}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <div className="page-link" onClick={nextPage}>Next</div>
                </li>
            </ul>
        </nav>
    )
}

export default CustomPagination;
