import { useEffect, useState } from "react"
import styles from './author.module.css'
import DeleteAuthor from "./DeleteAuthor"
import EditAuthor from "./EditAuthor"
import RestrictDeleteAuthor from "./RestrictDeleteAuthor"

const Author = ({author, index, authors, setAuthors, authorSearchInput}) => {
    
    const [oneAuthor, setOneAuthor] = useState({})
    const [activeAuthorIndex, setActiveAuthorIndex] = useState(null)
    const [expandIndex, setExpandIndex] = useState(false)
    const [editAuthorModal, setEditAuthorModal] = useState(false);
    const [deleteAuthorModalShow, setDeleteAuthorModalShow] = useState(false);
    
    useEffect(()=>{
        setOneAuthor(author);
        console.log("indide")
    },[author])

    function handleEdit(){
        setEditAuthorModal(true)
        console.log(author)
    }

    function handleDelete(){
        setDeleteAuthorModalShow(true)
    }

    function toggleAccordion(index){
        setActiveAuthorIndex(index === activeAuthorIndex ? null : index)
    }

    function expandCell(){
        setExpandIndex(!expandIndex)
    }

    function highlightTask(author_Name, searchInput){
        // console.log(`desc ${desc}`);
        if(author_Name){
            const parts = author_Name.split(new RegExp(`(${searchInput})`,`gi`));
            console.log(`Search parts ${parts}`);
            return parts.map((part,i) => part.toLowerCase() === searchInput.toLowerCase()? <mark key={i}>{part}</mark>:part);
        }
    }

    return(
        <>
            {
                console.log(oneAuthor)
            }

            <tr className={`${styles.tableHover}`}>
                <th scope="row">{index}</th>
                {!authorSearchInput &&<td>{author.author_Name}</td>}
                {authorSearchInput &&<td>{highlightTask(author.author_Name, authorSearchInput)}</td>}
                {!expandIndex && <td className={`${styles.truncate} ${styles.justify}`} onClick={()=>expandCell()}>{author.biography}</td>}
                {expandIndex && <td className={`${styles.expanded} ${styles.justify}`} onClick={()=>expandCell()}>{author.biography}</td>}
                <td className="text-center"><i className={`bi bi-pencil-square ${styles.biPencilSquare}`} onClick={()=>handleEdit()}></i></td>
                <td className="text-center"><i className={`bi bi-trash ${styles.biTrash}`} onClick={()=>handleDelete()}></i></td>   
                <td className="text-center"><i className={`bi ${styles.biInfo} ${index === activeAuthorIndex?`${styles.squareFill} bi-caret-up`:"bi-caret-down-fill"}`} onClick={()=>toggleAccordion(index)}></i></td>
            </tr>
            {index === activeAuthorIndex && 
                (
                    <>
                        <tr className={styles.expandHover}>
                            <td colSpan="9" className="border border-light">
                                <div className={`${styles.content}`}>
                                    <div className="fw-bold">
                                        Book(s) written by {author.author_Name} available in store: {author.books.length}
                                    </div>
                                
                                    {/* <div>
                                        {author.Books[0].title}
                                    </div>        */}
                                    {author.books.map((book,index) => {
                                        return(
                                        <div className={styles.booklist}>
                                            {/* {console.log(book.title)} */}
                                            {index+1}.&nbsp;{book.title}&nbsp; <span className={`badge text-bg-light border border-dark ${styles.badgesize} text-capitalize`}></span>
                                        </div>
                                        // {book.Genre.genre_name}
                                        )
                                    })}
                                </div>
                            </td>
                        </tr>
                    </>
                 )}
            <EditAuthor editAuthorModal={editAuthorModal} setEditAuthorModal={setEditAuthorModal} oneAuthor={oneAuthor} setOneAuthor={setOneAuthor} authors={authors} setAuthors={setAuthors}/>
            {author.books.length <= 0 && <DeleteAuthor deleteAuthorModalShow={deleteAuthorModalShow} setDeleteAuthorModalShow={setDeleteAuthorModalShow} oneAuthor={oneAuthor} authors={authors} setAuthors={setAuthors} author={author}/>}
            {author.books.length > 0 && <RestrictDeleteAuthor deleteAuthorModalShow={deleteAuthorModalShow} setDeleteAuthorModalShow={setDeleteAuthorModalShow} oneAuthor={oneAuthor} authors={authors} setAuthors={setAuthors} author={author}/>}
        </>
    )
}

export default Author