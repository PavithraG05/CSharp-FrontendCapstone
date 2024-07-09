import { useState,useEffect } from 'react';
import styles from './books.module.css'
import AddBook from './AddBook';
import BookTable from './BookTable';
import Pagination from './Pagination';

const Books = () => {
    
    const [addModalShow, setAddModalShow] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [books ,setBooks] = useState([]);
    const [bookError, setBookError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(0);
    let itemsPerPage = 15;
    const [searchBookList, setSearchBookList] = useState([])
    const [sort, setSort] = useState(0);
    const [sortField, setSortField] = useState("");
    

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
                    setBookError("");
                    let totalPages = Math.ceil(json.length / itemsPerPage)
                    setTotalPage(totalPages);
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // console.log(`current page: ${currentPage}`)
    };

    function sortAescAuthor(){
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

    function sortDescAuthor(){
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
            if(sort === 1){
                console.log(`${sortField}`);
                let sortedBook = sortAescAuthor(sortField)
                let booksList = sortedBook.slice(startIndex, endIndex)
                return {booksList,startIndex};
            }
            else if(sort === 2){
                console.log(`${sortField}`);
                let sortedBook = sortDescAuthor(sortField)
                let booksList = sortedBook.slice(startIndex, endIndex)
                return {booksList,startIndex};
            }
            else{
                let booksList = books.slice(startIndex, endIndex)
                return {booksList,startIndex};
            }
            
        }
        else{
            // console.log(searchBookList.slice(startIndex, endIndex));
            let booksList = searchBookList.slice(startIndex, endIndex)
            // startIndex = startIndex + 1;
            return {booksList,startIndex};
        }
    };
    
    const displayedItems = getDisplayedItems();

    const getIndexCount = () => {
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        if(!searchInput){
            const length = books.length;
            if(books.slice(startIndex, endIndex).length !== itemsPerPage){
                endIndex = startIndex + books.slice(startIndex, endIndex).length;
            }
            startIndex = startIndex + 1;
            return {startIndex, endIndex, length};
        }
        else{
            const length = searchBookList.length;
            if(searchBookList.slice(startIndex, endIndex).length !== itemsPerPage){
                endIndex = startIndex + searchBookList.slice(startIndex, endIndex).length;
            }
            startIndex = startIndex + 1;
            return {startIndex, endIndex, length};
        }
    };
    
    const indexPagination = getIndexCount();

    function addBook(){
        setAddModalShow(true);
    }

    function handleSearch(e){
        setSearchInput(e.target.value);
    }

    function handleSort(){

    }

    return(
        <>
        <div>
            <div className = "row">
                <div className ="col-6">
                    <h5>Books Summary&nbsp;<i class="fa fa-download"></i></h5>
                </div>
                {/* <div className={`col-md-6 col-xl-6 ${styles.searchContainer}`}>
                    <div className={`input-group ${styles.searchSize} mb-3`}>
                    <span className={`input-group-text ${styles.searchLabel}`} id="basic-addon1"><i className="bi bi-search"></i></span>
                    <input type="text" className={`form-control ${styles.searchBar}`} placeholder="Search based on book title" aria-label="search" value={searchInput} aria-describedby="basic-addon1" onChange={handleSearch}/>
                    </div>
                </div> */}
                <div className="col-sm-12 col-md-3 col-xl-6">
                    <button className={`btn fw-bold ${styles.addBookBtnClass} rounded-1`} type="button" onClick={()=>addBook()}><i className={`bi bi-plus-square-fill ${styles.plusIcon}`}></i>Add Books</button>
                </div>
            </div>
            <div className={`row justify-content-between ${styles.spaceAbv}`}>
                <div className={`col-md-6 col-xl-6 ${styles.searchContainer}`}>
                    <div className={`input-group ${styles.searchSize} mb-3`}>
                    <span className={`input-group-text ${styles.searchLabel}`} id="basic-addon1"><i className="bi bi-search"></i></span>
                    <input type="text" className={`form-control ${styles.searchBar}`} placeholder="Search based on book title" aria-label="search" value={searchInput} aria-describedby="basic-addon1" onChange={handleSearch}/>
                    </div>
                </div>
                <div className="col-sm-12 col-md-3 col-xl-3">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} indexPagination={indexPagination}/>
                </div>
                {/* <div className="col-sm-12 col-md-3 col-xl-3">
                    <input type="checkbox" className={`btn-check `} id="btn-check-2-outlined" onClick={handleSort} autocomplete="off" />
                    <label className={`btn btn-outline-secondary ${styles.filter}`} for="btn-check-2-outlined"><i className={`bi bi-funnel-fill ${styles.funnel}`}></i>Filter</label><br/> */}
                    {/* <button className={`btn ${styles.todoSortPriority} ${styles.filterColor} `}  onClick={handleSort} type="button" id="addTodosBtn"><i className={`bi bi-funnel-fill ${styles.funnel}`}></i>Sort by Priority</button> */}
                {/* </div> */}
            </div>
            <AddBook addModalShow={addModalShow} setAddModalShow={setAddModalShow} books={books} setBooks={setBooks}/>
            <BookTable books={books} setBooks={setBooks} displayedItems={displayedItems} searchInput={searchInput} searchBookList={searchBookList} setSearchBookList={setSearchBookList} sort={sort} setSort={setSort} sortField={sortField} setSortField={setSortField}/>
        </div>
        <div>

        </div>
        </>
    )
}

export default Books