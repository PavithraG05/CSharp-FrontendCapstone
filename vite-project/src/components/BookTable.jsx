import { useState, useEffect } from 'react';
import Book from './Book';
import styles from './booktable.module.css'

const BookTable = ({books, setBooks, displayedItems, searchInput, searchBookList, setSearchBookList, sort, setSort, sortField, setSortField}) => {


    let index = displayedItems.startIndex;
    let sortIcon = "fa-sort"
    useEffect(()=>{
        function filterSearchList(searchInput){
            console.log(searchInput)
            const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchInput.toLowerCase()));
            console.log(`filter: ${JSON.stringify(filteredBooks)}`)
            setSearchBookList(filteredBooks)
            console.log(`filter: ${filteredBooks.length}`)
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

    // function getSortIcon(){
    //     if(sortField ===)
    // }

    console.log(`in Table ${JSON.stringify(searchBookList)} ${searchBookList.length}`)
    return(
        
        <div className={`table-responsive ${styles.tableResponsive} `}>
            <table className={`table table-hover ${styles.tableRow} `}>
                <thead>
                    <tr className={styles.rowColor}>
                        <th scope="col">#</th>
                        <th scope="col">Book Title&nbsp;<i className={`fa ${(sortField==='title'|| sortField==='') ? (sort === 0?'fa-sort':sort === 1?'fa-sort-up':'fa-sort-down'): 'fa-sort'} ${styles.mousehover}`} onClick={()=>handleSort('title')}></i></th>
                        <th scope="col">Publication Date&nbsp;<i className={`fa ${(sortField==='publication_date'|| sortField==='') ? (sort === 0?'fa-sort':sort === 1?'fa-sort-up':'fa-sort-down'): 'fa-sort'} ${styles.mousehover}`} onClick={()=>handleSort('publication_date')}></i></th>
                        <th scope="col">Price&nbsp;<i className={`fa ${(sortField==='price'|| sortField==='') ? (sort === 0?'fa-sort':sort === 1?'fa-sort-up':'fa-sort-down'): 'fa-sort'} ${styles.mousehover}`} onClick={()=>handleSort('price')}></i></th>
                        <th scope="col">Author&nbsp;<i className={`fa ${(sortField==='author'|| sortField==='') ? (sort === 0?'fa-sort':sort === 1?'fa-sort-up':'fa-sort-down'): 'fa-sort'} ${styles.mousehover}`} onClick={()=>handleSort('author')}></i></th>
                        <th scope="col">Genre&nbsp;<i className={`fa ${(sortField==='genre'|| sortField==='') ? (sort === 0?'fa-sort':sort === 1?'fa-sort-up':'fa-sort-down'): 'fa-sort'} ${styles.mousehover}`} onClick={()=>handleSort('genre')}></i></th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        <th scope="col">View</th>
                    </tr>
                </thead>
                <tbody>
                    {( displayedItems.booksList )&& displayedItems.booksList.map((book)=>{
                        // console.log(book);
                        // console.log(typeof book)
                        
                        index ++;
                        return(
                            <Book book={book} index={index} books={books} setBooks={setBooks} searchInput={searchInput}/>
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

export default BookTable