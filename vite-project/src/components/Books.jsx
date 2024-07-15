import { useState,useEffect } from 'react';
import styles from './books.module.css'
import AddBook from './AddBook';
import BookTable from './BookTable';
import Pagination from './Pagination';
import useFetch from './useFetch';
import ExcelDownload from './ExcelDownload';
import NavBar from './NavBar';

const Books = ({loginSuccessState, setLoginSuccessState}) => {
    
    const [addModalShow, setAddModalShow] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [books ,setBooks] = useState([]);
    const [bookError, setBookError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(0);
    const [searchBookList, setSearchBookList] = useState([])
    const [filterBookList, setFilterBookList] = useState([])
    const [sort, setSort] = useState(0);
    const [sortField, setSortField] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("");
    let itemsPerPage = 15;
    // const [bookFunc, setBookFunc] = useState([]);
    // const [entry, setEntry] = useState(15);

    // itemsPerPage = entry;

    useEffect(()=>{
        async function init(){
            try{
                setBookError("");
                const response = await fetch(`http://localhost:3000/api/books`);
                if(response.ok){
                    let json = await response.json();
                    // json = JSON.parse(json)
                    console.log(JSON.stringify(json));
                    console.log(json.length);
                    setBooks(json);
                    // setBookFunc(json);
                    setBookError("");
                    let totalPages = Math.ceil(json.length / itemsPerPage)
                    setTotalPage(totalPages);
                    console.log(`${totalPages}`)
                }
                else{
                    throw response;
                }
            }
            catch (e){
                setBookError("Error fetching books details using API");
            }
        }
        init();
    },[addModalShow])

    useEffect(()=>{
        function handleFilter(){
            const filteredBooks =  books.filter(book => book.Genre.genre_name.toLowerCase() === selectedFilter.toLowerCase());
            console.log(`filter: ${JSON.stringify(filteredBooks)}`)
            setFilterBookList(filteredBooks)
            // setBookFunc(filteredBooks);
        }
        handleFilter();
    },[selectedFilter])

    const {data: genresData, genresLoading, genresApiError} = useFetch("genres");
    if (genresLoading) return "Loading...";
    if(genresApiError) setGenreError("Error fetching genres using API");

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // console.log(`current page: ${currentPage}`)
    };

    console.log(loginSuccessState);

    function sortAescBook(){
        if(sortField === 'title'){
            const sorted = books.slice().sort((a,b)=>{
                return a.title.localeCompare(b.title);
            });
            return sorted;
        }
        else if(sortField === 'price'){
            const sorted = books.slice().sort((a,b)=>{
                return Number(a.price)-Number(b.price);
            });
            return sorted;
        }
        else if(sortField === 'publication_date'){
            const sorted = books.slice().sort((a,b)=>{
                return (new Date(a.publication_date) - new Date(b.publication_date));
            });
            return sorted;
        }
        else if(sortField === 'author'){
            const sorted = books.slice().sort((a,b)=>{
                return a.Author.name.localeCompare(b.Author.name);
            });
            return sorted;
        }
        else if(sortField === 'genre'){
            const sorted = books.slice().sort((a,b)=>{
                return a.Genre.genre_name.localeCompare(b.Genre.genre_name);
            });
            return sorted;
        }
    }

    function sortDescBook(){
        if(sortField === 'title'){
            const sorted = books.slice().sort((a,b)=>{
                return b[sortField].localeCompare(a[sortField]);
            });
            return sorted;
        }
        else if(sortField === 'price'){
            const sorted = books.slice().sort((a,b)=>{
                return Number(b.price)-Number(a.price);
            });
            return sorted;
        }
        else if(sortField === 'publication_date'){
            const sorted = books.slice().sort((a,b)=>{
                return new Date(b.publication_date) - new Date(a.publication_date);
            });
            return sorted;
        }
        else if(sortField === 'author'){
            const sorted = books.slice().sort((a,b)=>{
                return b.Author.name.localeCompare(a.Author.name);
            });
            return sorted;
        }
        else if(sortField === 'genre'){
            const sorted = books.slice().sort((a,b)=>{
                return b.Genre.genre_name.localeCompare(a.Genre.genre_name);
            });
            return sorted;
        }
    }

    const getDisplayedItems = () => {
        let startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        if(!searchInput){
            if(!selectedFilter){
                if(sort === 1){
                    console.log(`${sortField}`);
                    let sortedBook = sortAescBook(sortField)
                    let booksList = sortedBook.slice(startIndex, endIndex)
                    return {booksList,startIndex};
                }
                else if(sort === 2){
                    console.log(`${sortField}`);
                    let sortedBook = sortDescBook(sortField)
                    let booksList = sortedBook.slice(startIndex, endIndex)
                    return {booksList,startIndex};
                }
                else{
                    let booksList = books.slice(startIndex, endIndex)
                    return {booksList,startIndex};
                }
            }else if(selectedFilter){
                let booksList = filterBookList.slice(startIndex, endIndex)
                // startIndex = startIndex + 1;
                console.log(filterBookList.slice(startIndex, endIndex));
                return {booksList,startIndex};
            }
        }
        else if(searchInput){
            // console.log(searchBookList.slice(startIndex, endIndex));
            let booksList = searchBookList.slice(startIndex, endIndex);

            // startIndex = startIndex + 1;
            return {booksList,startIndex};
        }
    };
    
    const displayedItems = getDisplayedItems();

    const getIndexCount = () => {
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        let totalPages = 0;
        let length ;
        // setTotalPage(totalPages);
        if(!searchInput && !selectedFilter){
            length = books.length;
            if(books.slice(startIndex, endIndex).length !== itemsPerPage){
                endIndex = startIndex + books.slice(startIndex, endIndex).length;
            }
            totalPages = Math.ceil(books.length / itemsPerPage)
            
            // return {startIndex, endIndex, length};
        }
        else if(!searchInput && selectedFilter){
            length = filterBookList.length;
            if(filterBookList.slice(startIndex, endIndex).length !== itemsPerPage){
                endIndex = startIndex + filterBookList.slice(startIndex, endIndex).length;
            }
            totalPages = Math.ceil(filterBookList.length / itemsPerPage)
            // return {startIndex, endIndex, length};
        }else{
            length = searchBookList.length;
            if(searchBookList.slice(startIndex, endIndex).length !== itemsPerPage){
                endIndex = startIndex + searchBookList.slice(startIndex, endIndex).length;
            }
            totalPages = Math.ceil(searchBookList.length / itemsPerPage)
            
        }
        startIndex = startIndex + 1;
        return {startIndex, endIndex, length, totalPages};
    };
    
    const indexPagination = getIndexCount();

    function addBook(){
        setAddModalShow(true);
    }

    function handleSearch(e){
        setSearchInput(e.target.value);
    }

    function getFilterSelect(genre){
        genre = genre.charAt(0).toUpperCase() + genre.slice(1);
        setSelectedFilter(genre);
    }

    function handleCancelClick(){
        setSelectedFilter("")
    }
    // function handleEntryBlur(e){
    //     setEntry(e.target.value)
    // }

    return(
        <>
         <div className="container-fluid">
            <div className="row flex-nowrap">
                <NavBar setLoginSuccessState={setLoginSuccessState} active="books"/>
                
                <div className={`col py-3 ${styles.content}`}>
                    <div className = "row">
                        <div className ="col-6 p-2">
                            <h5 className={styles.summary}>Books Summary&nbsp;</h5>
                        </div>
                        
                        <div className={`col-6`}>
                            <div className="row">
                                <div className={`col-8 ${styles.searchContainer}`}>
                                    <div className={`input-group ${styles.searchSize} rounded-3 mb-3 `}>
                                        <span className={`input-group-text ${styles.searchLabel} rounded-3`} id="basic-addon1"><i className={`bi bi-search ${styles.searchIncon}`}></i></span>
                                        <input type="text" className={`form-control ${styles.searchBar} rounded-3`} placeholder="Search by book title" aria-label="search" value={searchInput} aria-describedby="basic-addon1" onChange={handleSearch}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button className={`btn ${styles.addBookBtnClass} rounded-1`} onClick={()=>addBook()}><i className={`bi bi-plus-square ${styles.plusIcon}`}></i>Add Books</button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-4 border border-dark"> */}
                            {/* <button className={`btn fw-bold ${styles.dwnldBtnClass} rounded-1`} type="button"><i className={`bi bi-arrow-down-square-fill ${styles.download}`}></i>Download</button> */}
                            {/* <ExcelDownload data={books} fileName="book_data"/> */}
                        {/* </div> */}
                    {/* <hr/> */}
                    </div>
                    
                    <div className={`row ${styles.spaceAbv} bg-light rounded-2 `}>
                        <div className="col-2">
                        {/* <div><i class="fa fa-download"></i> &nbsp;Download</div> */}
                            <div className={styles.alignEntry}>
                                <span className={styles.entryText}>Showing entries: &nbsp;<input type="number" value={itemsPerPage} className={`${styles.inputEntry} rounded-1` }/></span>
                            </div>
                        
                        </div>
                        <div className="col-4">
                            <div className="row p-2">
                                <div className="col-5">
                                    <div className="btn-group">
                                        <button className={`btn  btn-sm dropdown-toggle ${styles.btnFilter}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className={`bi bi-funnel-fill ${styles.filterIcon}`}></i>&nbsp;<span className={styles.filterIcon}>Filter Genre</span>
                                        </button>
                                        <ul className={`dropdown-menu ${styles.filterBtn}`}>
                                                {genresData && genresData.map(genre =>{
                                                    return(
                                                    <li className={styles.dropdownList} onClick={()=>getFilterSelect(genre.genre_name)}>{genre.genre_name.charAt(0).toUpperCase() + genre.genre_name.slice(1)}</li>
                                                )})}
                                        </ul>
                                    </div>
                                </div>
                                { selectedFilter && <div className="col-5">
                                    <div className={`${styles.selectFilter} rounded-3`}>
                                        <span className={styles.displayFilter}>{selectedFilter}<i className={`bi bi-x ${styles.filterCancel}`} onClick={handleCancelClick}></i></span>
                                    </div>
                                </div>}
                            </div>
                        </div>
                        <div className="col-6">
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} indexPagination={indexPagination}/>
                        </div>
                        <BookTable books={books} setBooks={setBooks} displayedItems={displayedItems} searchInput={searchInput} searchBookList={searchBookList} setSearchBookList={setSearchBookList} sort={sort} setSort={setSort} sortField={sortField} setSortField={setSortField} filterBookList={filterBookList}/>

                    </div>
                    <AddBook addModalShow={addModalShow} setAddModalShow={setAddModalShow} books={books} setBooks={setBooks}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Books