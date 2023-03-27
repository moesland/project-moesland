
import ReactPaginate from 'react-paginate';

const CustomPaginate = ({pageCount, changePage}) => {
    return (<>
        <div className="d-flex justify-content-center">
            <ReactPaginate
                previousLabel={'Vorige'}
                nextLabel={'Volgende'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={'pagination'}
                previousClassName={'page-item'}
                nextClassName={'page-item'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                breakClassName={'page-item disabled'}
                activeClassName={'active'}
                disabledClassName={'disabled'}
                previousLinkClassName={'page-link'}
                nextLinkClassName={'page-link'}
                breakLinkClassName={'page-link'}
                activeLinkClassName={'custom-active-link'}
            />
        </div>
    </>)
}

export default CustomPaginate;
