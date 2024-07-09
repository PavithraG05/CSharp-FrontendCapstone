import styles from './authors.module.css'
import { useState, useEffect } from 'react';
import AuthorTable from './AuthorTable';
import AddAuthor from './AddAuthor';
import Pagination from './Pagination';

const Authors = () => {

    // const [searchInput, setsearchInput]
    const [addAuthorModalShow, setAddAuthorModalShow] = useState(false);
    const [authorSearchInput, setAuthorSearchInput] = useState("");
    const [authors ,setAuthors] = useState([]);
    const [authorError, setAuthorError] = useState("");
    const [searchAuthorList, setSearchAuthorList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(0);
    const [sort, setSort] = useState(0);
    const [sortField, setSortField] = useState("");

    let itemsPerPage = 15;

    useEffect(()=>{
        async function init(){
            try{
                setAuthorError("");
                const response = await fetch(`http://localhost:3000/api/authors`);
                if(response.ok){
                    let authorsData = await response.json();
                    // json = JSON.parse(json)
                    console.log(JSON.stringify(authorsData));
                    console.log(authorsData);
                    setAuthors(authorsData);
                    setAuthorError("");
                    let totalPages = Math.ceil(authorsData.length / itemsPerPage)
                    setTotalPage(totalPages);
                }
                else{
                    throw response;
                }
            }
            catch (e){
                setAuthorError("Error fetching authors details using API");
            }
        }
        init();
    },[addAuthorModalShow, setAuthors])

    function addAuthor(){
        setAddAuthorModalShow(true);
    }

    function handleSearch(e){
        setAuthorSearchInput(e.target.value);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
        console.log(`current page: ${currentPage}`)
    };

    function sortAescAuthor(){
        const sorted = authors.slice().sort((a,b)=>{
            return a[sortField].localeCompare(b[sortField]);
        });
        return sorted;
    }

    function sortDescAuthor(){
        
        const sorted = authors.slice().sort((a,b)=>{
            return b[sortField].localeCompare(a[sortField]);
        });
        return sorted;
        
        
    }

    const getDisplayedItems = () => {
        let startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        if(!authorSearchInput){
            // console.log(books.slice(startIndex, endIndex));
            console.log(`sort ${sort}`)
            if(sort === 1){
                let sortedArray = sortAescAuthor();
                console.log(sortedArray);
                let authorsList = sortedArray.slice(startIndex, endIndex)
                return {authorsList,startIndex};
            }
            else if(sort===2){
                let sortedArray = sortDescAuthor();
                console.log(sortedArray);
                let authorsList = sortedArray.slice(startIndex, endIndex)
                return {authorsList,startIndex};
            }
            else{
                let authorsList = authors.slice(startIndex, endIndex)
                // startIndex = startIndex + 1;
                return {authorsList,startIndex};
            }
        }
        else{
            // console.log(searchBookList.slice(startIndex, endIndex));
            let authorsList = searchAuthorList.slice(startIndex, endIndex)
            // startIndex = startIndex + 1;
            return {authorsList,startIndex};
        }
    };
    
    const displayedItems = getDisplayedItems();

    const getIndexCount = () => {
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        if(!authorSearchInput){
            const length = authors.length;
            if(authors.slice(startIndex, endIndex).length !== itemsPerPage){
                endIndex = startIndex + authors.slice(startIndex, endIndex).length;
            }
            startIndex = startIndex + 1;
            return {startIndex, endIndex, length};
        }
        else{
            const length = searchAuthorList.length;
            if(searchAuthorList.slice(startIndex, endIndex).length !== itemsPerPage){
                endIndex = startIndex + searchAuthorList.slice(startIndex, endIndex).length;
            }
            startIndex = startIndex + 1;
            return {startIndex, endIndex, length};
        }
    };
    
    const indexPagination = getIndexCount();


    return(
        <>
            <div className = "row">
                <div className ="col-6">
                    <h5>Authors Summary</h5>
                </div>
                <div className="col-sm-12 col-md-3 col-xl-6">
                    <button className={`btn fw-bold ${styles.addAuthorBtnClass} rounded-1`} type="button" onClick={()=>addAuthor()}><i className={`bi bi-plus-square-fill ${styles.plusIcon}`}></i>Add Authors</button>
                </div>
            </div>
            <div className={`row justify-content-between`}>
                <div className={`col-md-6 col-xl-6 ${styles.searchContainer}`}>
                    <div className={`input-group ${styles.searchSize} mb-3`}>
                    <span className={`input-group-text ${styles.searchLabel}`} id="basic-addon1"><i className="bi bi-search"></i></span>
                    <input type="text" className={`form-control ${styles.searchBar}`} placeholder="Search based on author name" aria-label="search" value={authorSearchInput} aria-describedby="basic-addon1" onChange={handleSearch}/>
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
            <AddAuthor addAuthorModalShow={addAuthorModalShow} setAddAuthorModalShow={setAddAuthorModalShow} authors={authors} setAuthors={setAuthors}/>
            <AuthorTable authors={authors} setAuthors={setAuthors} authorSearchInput={authorSearchInput} displayedItems={displayedItems} setSearchAuthorList={setSearchAuthorList} sort={sort} setSort={setSort} sortField={sortField} setSortField={setSortField}/>
        </>
    )
}

export default Authors