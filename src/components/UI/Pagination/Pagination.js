import React, { useState } from 'react'
import Pagination from "react-js-pagination";

const Paginationpage = (props) => {
    const length = props.task.length
    const [currentPage, setCurrentPage] = useState(1);
    // console.log(currentPage, setCurrentPage)
    const recordPerPage = 4;
    const totalRecords = length;
    const pageRange = 4;
    const handlePageChange = pageNumber => {
        setCurrentPage(pageNumber);
        // call API to get data based on pageNumber
        if (pageNumber === 1) {

        }
    }
    return (
        <div>
            <Pagination
                itemClass="page-item" // add it for bootstrap 4
                linkClass="page-link" // add it for bootstrap 4
                activePage={currentPage}
                itemsCountPerPage={recordPerPage}
                totalItemsCount={totalRecords}
                pageRangeDisplayed={pageRange}
                onChange={handlePageChange}
            />
        </div>
    )
}

export default Paginationpage