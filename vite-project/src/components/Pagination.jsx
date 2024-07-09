import styles from './pagination.module.css'

const Pagination = ({currentPage, totalPages, onPageChange, indexPagination}) => {

    const getPageNumbers = () => {
        const pageNumbers = [];
        console.log(totalPages)
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        console.log(pageNumbers)
        return pageNumbers;
    };

    const handlePageChange = (page) => {
        // console.log()
        onPageChange(page);
    };

    const pageNumbers = getPageNumbers();

    return(
        <> 
        <nav className={styles.alignPagination}>
            <ul className="pagination pagination-sm">
                <li className={styles.alignPageText}>&nbsp;Viewing <span className={styles.indexText}>{indexPagination.startIndex}</span>-<span className={styles.indexText}>{indexPagination.endIndex}</span> of <span className={styles.indexText}>{indexPagination.length}</span>&nbsp;</li>&nbsp;
                <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <button
                    className={`page-link ${styles.btnLayout}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <i className={`bi bi-caret-left-fill ${styles.PageIcon}`}></i>
                </button>
                </li> &nbsp;&nbsp;
                
                {/* <li className={`page-item ${page === currentPage && 'active'}`} onClick={() => handlePageChange(page)}>{page}</li> */}
                {/* {pageNumbers.map((page) => (
                <li
                    key={page}
                    className={`page-item ${page === currentPage && 'active'}`}
                >
                    <button
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                    >
                    {page}
                    </button>
                </li>
                ))} */}
                <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                <button
                    className={`page-link ${styles.btnLayout}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}>
                   <i className={`bi bi-caret-right-fill ${styles.PageIcon}`}></i>
                </button>
                </li>
            </ul>
        </nav>
        </>
    )
}

export default Pagination