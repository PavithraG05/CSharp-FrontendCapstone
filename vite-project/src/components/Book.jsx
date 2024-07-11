import { useEffect, useState } from "react"
import styles from './book.module.css'
import EditBook from "./EditBook"
import DeleteBook from "./DeleteBook"
import Edit from "./Edit"

const Book = ({book, index, books, setBooks, searchInput}) => {
    
    const [oneBook, setOneBook] = useState({})
    const [activeIndex, setActiveIndex] = useState(null)
    const [editModal, setEditModal] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [expandIndex, setExpandIndex] = useState(false)
    useEffect(()=>{
        setOneBook(book);
        console.log("indide")
    },[book])

    function handleEdit(){
        setEditModal(true)
        // console.log(oneBook)
    }

    function handleDelete(){
        setDeleteModalShow(true)
    }

    function toggleAccordion(index){
        setActiveIndex(index === activeIndex ? null : index)
    }

    function expandCell(){
        setExpandIndex(!expandIndex)
    }

    function highlightTask(title, searchInput){
        // console.log(`desc ${desc}`);
        if(title){
            const parts = title.split(new RegExp(`(${searchInput})`,`gi`));
            console.log(`Search parts ${parts}`);
            return parts.map((part,i) => part.toLowerCase() === searchInput.toLowerCase()? <mark key={i}>{part}</mark>:part);
        }
    }

    return(
        <>
            {
                console.log(oneBook)
            }

            <tr className={`${index === activeIndex ? '' : ''} ${styles.tableRows}`}>
                <th scope="row">{index}</th>
                {!expandIndex && searchInput && <td className={`${styles.truncate} ${styles.justify}`} onClick={()=>expandCell()}>{highlightTask(book.title, searchInput)}</td>}
                {!expandIndex && !searchInput && <td className={`${styles.truncate} ${styles.justify}`} onClick={()=>expandCell()}>{book.title}</td>}
                {expandIndex && searchInput && <td className={`${styles.expand} ${styles.justify}`} onClick={()=>expandCell()}>{highlightTask(book.title, searchInput)}</td>}
                {expandIndex && !searchInput && <td className={`${styles.expand} ${styles.justify}`} onClick={()=>expandCell()}>{book.title}</td>}
                <td>{book.publication_date}</td>
                <td><i class="bi bi-currency-rupee"></i>{book.price}</td>
                <td>{book.Author.name}</td>
                <td className="text-capitalize">{book.Genre.genre_name}</td>
                <td className="text-center"><i className={`bi bi-pencil-square ${styles.biPencilSquare}`} onClick={()=>handleEdit()}></i></td>
                <td className="text-center"><i className={`bi bi-trash ${styles.biTrash}`} onClick={()=>handleDelete()}></i></td>   
                <td className="text-center"><i className={`bi ${styles.biInfo} ${index === activeIndex?`${styles.squareFill} bi-caret-up`:"bi-caret-down-fill"}`} onClick={()=>toggleAccordion(index)}></i></td>
            </tr>
            {index === activeIndex && 
                (
                    <>
                    {/* <div className={`row border ${styles.subTable}`}> */}
                        <tr className={styles.expandHover}>
                            <td colspan="9" className="border">
                                <div className={`row ${styles.content}`}>
                                    <div classsName="col-6">
                                        <div className="fw-bold">
                                            {book.title} by {book.Author.name} &nbsp; &nbsp;
                                        </div>
                                        <span className={`badge text-bg-light border border-dark ${styles.badgesize} text-capitalize`}>
                                            {book.Genre.genre_name}
                                        </span>
                                        <div className={styles.subcontent}>
                                            {/* <br/> */}
                                            Price: <i class="bi bi-currency-rupee"></i>{book.price}
                                        </div>
                                        <div>
                                            Publication Date: {book.publication_date}
                                        </div>
                                    </div>
                                
                                    <div classsName="col-6"> 
                                        <br/>   
                                        <div className="fw-bold">
                                            About {book.Author.name}:
                                        </div>
                                    
                                        <div className={styles.justify}>
                                            {book.Author.biography}
                                        </div>      
                                    </div>
                                </div>
                            </td>
                        </tr>
                    {/* // </div> */}
                    </>
                    
                )}
                {editModal && <Edit oneBook={oneBook} book={book} editModal={editModal} setEditModal={setEditModal} books={books} setBooks={setBooks}/>}
            {/* {editModal && <EditBook editModal={editModal} setEditModal={setEditModal} oneBook={oneBook} setOneBook={setOneBook} book={book}/>} */}
            <DeleteBook deleteModalShow={deleteModalShow} setDeleteModalShow={setDeleteModalShow} oneBook={oneBook} books={books} setBooks={setBooks}/>
        </>
    )
}

export default Book