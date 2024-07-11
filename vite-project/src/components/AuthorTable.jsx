import { useState, useEffect } from 'react';
import styles from './authortable.module.css'
import Author from './Author';

const AuthorTable = ({authors, setAuthors, authorSearchInput, displayedItems, setSearchAuthorList, sort, setSort, sortField, setSortField}) => {

    let index = displayedItems.startIndex;

    useEffect(()=>{
        function filterSearchList(searchInput){
            console.log(searchInput)
            const filteredAuthors = authors.filter(author => author.name.toLowerCase().includes(searchInput.toLowerCase()));
            console.log(`filter: ${JSON.stringify(filteredAuthors)}`)
            setSearchAuthorList(filteredAuthors)
            console.log(`filter: ${filteredAuthors.length}`)
        }
        filterSearchList(authorSearchInput);
    },[authorSearchInput])

    function handleSort(field){
        if(sortField === field){
            sort === 0 ? setSort(1) :
            sort === 1 ? setSort(2) :
            setSort(0);
            console.log(`sort ${sort}`)
            setSortField(field)
        }else{
            setSort(1);
            setSortField(field);
        }
    }
    return(
        
        <div className={`table-responsive ${styles.tableResponsive}`}>
            <table className={`table table-hover`}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Author Name&nbsp;<i className={`fa ${(sortField==='name'|| sortField==='') ? (sort === 0?'fa-sort':sort === 1?'fa-sort-up':'fa-sort-down'): 'fa-sort'} ${styles.mousehover}`} onClick={()=>handleSort('name')}></i></th>
                        <th scope="col">Biography&nbsp;<i className={`fa ${(sortField==='biography'|| sortField==='') ? (sort === 0?'fa-sort':sort === 1?'fa-sort-up':'fa-sort-down'): 'fa-sort'} ${styles.mousehover}`} onClick={()=>handleSort('biography')}></i></th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                        <th scope="col">View</th>
                    </tr>
                </thead>
                <tbody>
                    { displayedItems.authorsList && displayedItems.authorsList.map((author)=>{
                        // console.log(book);
                        // console.log(typeof book)
                        
                        index ++;
                        return(
                            <Author author={author} index={index} authors={authors} setAuthors={setAuthors} authorSearchInput={authorSearchInput}/>
                        )
                    })}
                </tbody>
            </table>
        </div>
        
    )
}

export default AuthorTable