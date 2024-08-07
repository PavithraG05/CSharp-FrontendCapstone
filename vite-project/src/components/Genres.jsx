import { useEffect, useState } from "react";
import styles from './genres.module.css'
import AddGenre from "./AddGenre";
import Pagination from './Pagination';
import GenreTable from "./GenreTable";
import NavBar from "./NavBar";

const Genres = ({loginSuccessState, setLoginSuccessState, token}) => {
    
    const [addGenreModalShow, setAddGenreModalShow] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [genres ,setGenres] = useState([]);
    const [genreError, setGenreError] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPage] = useState(0);
    let itemsPerPage = 15;
    const [searchGenreList, setSearchGenreList] = useState([])
    const [sort, setSort] = useState(0);
    const [sortField, setSortField] = useState("");

    // const [filterSort, setFilterSort] = useState([]);

    useEffect(()=>{
        async function init(){
            try{
                let token1 = localStorage.getItem("authToken");
                //console.log(token);
                console.log(token1);
                setGenreError("");
                const response = await fetch(`https://localhost:7226/api/v1/genres`,{
                    headers: {
                      Authorization: `Bearer ${token1}`,
                    },
                  });
                if(response.ok){
                    let json = await response.json();
                    // json = JSON.parse(json)
                    console.log(JSON.stringify(json));
                    console.log(json.length);
                    setGenres(json);
                    setGenreError("");
                    let totalPages = Math.ceil(json.length / itemsPerPage)
                    setTotalPage(totalPages);
                }
                else{
                    throw response;
                }
            }
            catch (e){
                setGenreError("Error fetching books details using API");
            }
        }
        init();
    },[addGenreModalShow])

    useEffect(()=>{
        
    })

    // console.log()
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    function sortAescGenre(){
        // const sortlist = (searchInput && (sort === 1 || sort === 2))? filterSort : genres;
        if(sortField === 'genre_name'){
            const sorted = genres.slice().sort((a,b)=>{
                return a.genre_Name.localeCompare(b.genre_Name);
            });
            // setFilterSort(sorted);
            return sorted;
        }
        else if(sortField === 'count'){
            const sorted = genres.slice().sort((a,b)=>{
                return Number(a.books.length)- Number(b.books.length);
            });
            // setFilterSort(sorted);
            return sorted;
        }
    }

    function sortDescGenre(){
        // const sortlist = (searchInput && (sort === 1 || sort === 2))? filterSort : genres;
        if(sortField === 'genre_name'){
            const sorted = genres.slice().sort((a,b)=>{
                return b.genre_Name.localeCompare(a.genre_Name);
            });
            // setFilterSort(sorted);
            return sorted;
        }else if(sortField === 'count'){
            const sorted = genres.slice().sort((a,b)=>{
                return Number(b.books.length)- Number(a.books.length);
            });
            // setFilterSort(sorted);
            return sorted;
        }
    }

    const getDisplayedItems = () => {
        let startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        let sortedGenre = [];
        if(!searchInput && (sort===0 || sort===1 || sort ===2)){
            // setFilterSort(sortedGenre);
            if(sort === 1){
                console.log(`${sortField}`);
                sortedGenre = sortAescGenre(sortField)
                
                let genresList = sortedGenre.slice(startIndex, endIndex)
                return {genresList,startIndex};
            }
            else if(sort === 2){
                console.log(`${sortField}`);
                sortedGenre = sortDescGenre(sortField)
                let genresList = sortedGenre.slice(startIndex, endIndex)
                return {genresList,startIndex};
            }
            else{
                let genresList = genres.slice(startIndex, endIndex)
                // setSort(0)
                console.log(sort);
                return {genresList,startIndex};
            }
            
        }
        else if(searchInput && ( sort !==1 && sort !==2)){
            // console.log(searchBookList.slice(startIndex, endIndex));
            let genresList = searchGenreList.slice(startIndex, endIndex)
            // startIndex = startIndex + 1;
            return {genresList, startIndex};
        }
        else if(searchInput && (sort === 1 || sort === 2)){
            let genresList = filterSort.slice(startIndex, endIndex)
            // startIndex = startIndex + 1;
            return {genresList, startIndex};
        }
    };
    
    const displayedItems = getDisplayedItems();

    const getIndexCount = () => {
        let startIndex = (currentPage - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        let totalPages = 0;
        let length;
        if(!searchInput){
            length = genres.length;
            if(genres.slice(startIndex, endIndex).length !== itemsPerPage){
                endIndex = startIndex + genres.slice(startIndex, endIndex).length;
            }
            totalPages = Math.ceil(genres.length / itemsPerPage)
        }
        else{
            length = searchGenreList.length;
            if(searchGenreList.slice(startIndex, endIndex).length !== itemsPerPage){
                endIndex = startIndex + searchGenreList.slice(startIndex, endIndex).length;
            }
            totalPages = Math.ceil(searchGenreList.length / itemsPerPage)
        }
        startIndex = startIndex + 1;
        return {startIndex, endIndex, length, totalPages};
    };
    
    const indexPagination = getIndexCount();

    function addGenre(){
        setAddGenreModalShow(true);
    }

    function handleSearch(e){
        setSearchInput(e.target.value);
    }
    
    console.log(loginSuccessState);
    return(
        <>
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <NavBar setLoginSuccessState = {setLoginSuccessState} active="genres"/>
                
                <div className={`col py-3 ${styles.content}`}>
                    <div className = "row">
                        <div className ="col-6 p-2">
                            <h5>Genres Summary&nbsp;</h5>
                        </div>
                        <div className={`col-6`}>
                            <div className="row">
                                <div className={`col-8 ${styles.searchContainer}`}>
                                    <div className={`input-group ${styles.searchSize} rounded-3 mb-3`}>
                                        <span className={`input-group-text ${styles.searchLabel} rounded-3`} id="basic-addon1"><i className="bi bi-search"></i></span>
                                        <input type="text" className={`form-control ${styles.searchBar} rounded-3`} placeholder="Search based on Genre" aria-label="search" value={searchInput} aria-describedby="basic-addon1" onChange={handleSearch}/>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <button className={`btn ${styles.addGenreBtnClass} rounded-1`} type="button" onClick={()=>addGenre()}><i className={`bi bi-plus-square ${styles.plusIcon}`}></i>Add Genres</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`row ${styles.spaceAbv} bg-light`}>
                        <div className='col-6'>
                            <div className={styles.alignEntry}>
                                <span className={styles.entryText}>Showing entries: &nbsp;<input type="number" value={itemsPerPage} className={`${styles.inputEntry}`}/></span>
                            </div>
                        </div>
                        <div className="col-6">
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} indexPagination={indexPagination}/>
                        </div>
                        <GenreTable genres={genres} setGenres={setGenres} displayedItems={displayedItems} searchInput={searchInput} searchGenreList={searchGenreList} setSearchGenreList={setSearchGenreList} sort={sort} setSort={setSort} sortField={sortField} setSortField={setSortField}/>

                    </div>
                    <AddGenre addGenreModalShow={addGenreModalShow} setAddGenreModalShow={setAddGenreModalShow} genres={genres} setGenres={setGenres}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default Genres;