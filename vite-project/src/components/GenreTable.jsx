import { useState, useEffect } from 'react';
import styles from './genretable.module.css'
import Genre from './Genre';

const GenreTable = ({genres, setGenres, displayedItems, searchInput, searchGenreList, setSearchGenreList, sort, setSort, sortField, setSortField}) => {


    let index = displayedItems.startIndex;
    useEffect(()=>{
        function filterSearchList(searchInput){
            console.log(searchInput)
            const filteredGenres = genres.filter(genre => genre.genre_name.toLowerCase().includes(searchInput.toLowerCase()));
            console.log(`filter: ${JSON.stringify(filteredGenres)}`)
            setSearchGenreList(filteredGenres)
            console.log(`filter: ${filteredGenres.length}`)
        }
        filterSearchList(searchInput);
    },[searchInput])
    
    function handleSort(field){
        if(sortField === field){
            sort === 0 ? setSort(1) :
            sort === 1 ? setSort(2) :
            setSort(0);
            console.log(`sort ${sort}`);
            setSortField(field)
        }else{
            setSort(1);
            setSortField(field);
        }
    }

    // console.log(`in Table ${JSON.stringify(searchGenreList)} ${searchGenreList.length}`)
    return(
        
        <div className={`table-responsive ${styles.tableResponsive}`}>
            <table className={`table table-hover ${styles.table}`}>
                <thead>
                    {/* <colgroup>
                        <col className="#"></col>
                        <col className="Genre Name"></col>
                        <col className="No. of Books in Genre"></col>
                        <col className="Genre - Book List"></col>
                        <col className="Edit"></col>
                    </colgroup> */}
                    <tr>
                        <th scope="col" className={styles.genreCol1}>#</th>
                        <th scope="col" className={styles.genreCol2}>Genre Name&nbsp;<i className={`fa ${(sortField==='genre_name'|| sortField==='') ? (sort === 0?'fa-sort':sort === 1?'fa-sort-up':'fa-sort-down'): 'fa-sort'} ${styles.mousehover}`} onClick={()=>handleSort('genre_name')}></i></th>
                        <th scope="col" className={styles.genreCol3}>Genre-Books&nbsp;<i className={`fa ${(sortField==='count'|| sortField==='') ? (sort === 0?'fa-sort':sort === 1?'fa-sort-up':'fa-sort-down'): 'fa-sort'} ${styles.mousehover}`} onClick={()=>handleSort('count')}></i></th>
                        <th scope="col" className={styles.genreCol4}>Genre - Book List</th>
                        <th scope="col" className={styles.genreCol5}>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {( displayedItems.genresList )&& displayedItems.genresList.map((genre)=>{
                        // console.log(book);
                        // console.log(typeof book)
                        
                        index ++;
                        return(
                            <Genre genre={genre} index={index} genres={genres} setGenres={setGenres} searchInput={searchInput}/>
                        )
                    })}
                    {/* {searchInput && searchBookList.map((book)=>{
                        // console.log(book);
                        // console.log(typeof book)
                        
                        index ++;
                        return(
                            <Book book={book} index={index} books={books} setBooks={setBooks} searchInput={searchInput}/>
                        )
                    })} */}
                </tbody>
            </table>
        </div>
        
    )
}

export default GenreTable