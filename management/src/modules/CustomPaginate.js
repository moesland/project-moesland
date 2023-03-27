
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
            />
        </div>
    </>)
}

export default CustomPaginate;
