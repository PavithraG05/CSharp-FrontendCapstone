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
                <td>{book.publication_Date}</td>
                <td><i class="bi bi-currency-rupee"></i>{book.price}</td>
                <td>{book.author.author_Name}</td>
                <td className="text-capitalize">{book.genre.genre_Name}</td>
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
                                {/* <div class="card mb-3">
                                    <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="/book1.jpg" className={`img-fluid rounded-start ${styles.bookImg}`} alt="..."/>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">Card title</h5>
                                                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                                <p classname="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className={`row ${styles.content}`}>
                                    <div classsName="col-6">
                                        <div className = "row">
                                            <div classsName="col-xl-6">
                                                <div className="fw-bold">
                                                    {book.title} by {book.author.author_Name} &nbsp; &nbsp;
                                                </div>
                                                <span className={`badge text-bg-light border border-dark ${styles.badgesize} text-capitalize`}>
                                                    {book.genre.genre_Name}
                                                </span>
                                                <div className={styles.subcontent}>
                                                    
                                                    Price: <i class="bi bi-currency-rupee"></i>{book.price}
                                                </div>
                                                <div>
                                                    Publication Date: {book.publication_Date}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div classsName="col-6"> 
                                        <br/>   
                                        <div className="fw-bold">
                                            About {book.title}:
                                        </div>
                                    
                                        <div className={styles.justify}>
                                            {book.description}
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