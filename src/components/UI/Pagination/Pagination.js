import React, {useState} from 'react'
import Pagination from "react-js-pagination";

const Paginationpage = () => {
    const [currentPage, setCurrentPage] = useState(1);
        console.log(currentPage,setCurrentPage)
        const recordPerPage = 10;
        const totalRecords = 850;
        const pageRange = 10;
        const handlePageChange = pageNumber => {
            setCurrentPage(pageNumber);
            // call API to get data based on pageNumber
        }
        return (
            <div>
                <Pagination
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