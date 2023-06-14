import React, { useEffect, useState } from 'react';
import "../styles/custom.css";

const CustomPagination = ({ source, setPagination, maxPerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inputPage, setInputPage] = useState("");
    const [showInput, setShowInput] = useState(false);
    const totalPages = Math.ceil(source.length / maxPerPage);

    useEffect(() => {
        const start = (currentPage - 1) * maxPerPage;
        const end = start + maxPerPage;
        setPagination({ start, end });
        setShowInput(false);
        setInputPage("");
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
        setShowInput(false);
    };

    const handleInput = e => {
        setInputPage(e.target.value);
    };

    const submitInput = (e) => {
        if(e.key === "Enter") {
            const page = parseInt(inputPage);
            if (page > 0 && page <= totalPages) {
                setCurrentPage(page);
                setShowInput(false);
            }
        }
    };

    const isInBetween = () => {
        return currentPage > 5 && currentPage < totalPages - 4;
    }

    return (
        <>
            <nav className=''>
                <ul className="pagination all-pointer justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <div className="page-link" onClick={prevPage}>Vorige</div>
                    </li>
                    {[...Array(totalPages > 10 ? 5 : totalPages).keys()].map((page) =>
                        <li key={page} className={`page-item ${currentPage === page + 1 ? 'custom-active' : ''}`}>
                            <div className="page-link" onClick={() => changePage(page + 1)}>{page + 1}</div>
                        </li>
                    )}
                    {totalPages > 10 &&
                        <>
                            {(currentPage > 6 && currentPage < totalPages - 4) &&
                                <li className="page-item">
                                    <div className={`page-link`} onClick={() => setShowInput(!showInput)}>
                                        <> ... </>
                                    </div>
                                </li>
                            }

                            <li className={`page-item ${isInBetween() ? 'custom-active' : ''}`}>
                                <div className={`page-link`} onClick={() => setShowInput(!showInput)}>
                                    {isInBetween() ? (<> {currentPage} </>) : (<>...</>)}
                                </div>
                                {showInput &&
                                    <input className='page-search' type="number" onChange={handleInput} onKeyDown={submitInput} autoFocus />
                                }
                            </li>

                            {(currentPage < totalPages - 4 && currentPage > 5) &&
                                <li className="page-item">
                                    <div className={`page-link`} onClick={() => setShowInput(!showInput)}>
                                        <> ... </>
                                    </div>
                                </li>
                            }


                            {[...Array(5).keys()].map((page) =>
                                <li key={page} className={`page-item ${currentPage === totalPages - 4 + page ? 'custom-active' : ''}`}>
                                    <div className="page-link" onClick={() => changePage(totalPages - 4 + page)}>{totalPages - 4 + page}</div>
                                </li>
                            )}
                        </>
                    }
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <div className="page-link" onClick={nextPage}>Volgende</div>
                    </li>
                </ul>
            </nav>

        </>
    )
}

export default CustomPagination;
