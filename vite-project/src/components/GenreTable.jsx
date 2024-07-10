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
            <table className={`table table-hover`}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Genre Name&nbsp;<i className={`fa fa-sort ${styles.mousehover}`} onClick={()=>handleSort('genre_name')}></i></th>
                        <th scope="col">No. of Books in Genre&nbsp;<i className={`fa fa-sort ${styles.mousehover}`} onClick={()=>handleSort('count')}></i></th>
                        <th scope="col">Genre - Book List</th>
                        <th scope="col">Edit</th>
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