import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './deleteauthor.module.css';
import { useState } from 'react';

const RestrictDeleteAuthor = ({deleteAuthorModalShow, setDeleteAuthorModalShow, oneAuthor, authors, setAuthors, author}) =>{

    const [deleteErr, setDeleteErr] = useState("");

    

    function handleClose(){
        setDeleteAuthorModalShow(false);
    }

    return(
        <>
        {/* {console.log(author.Books.length)} */}
        <Modal show={deleteAuthorModalShow} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>Author: <span className="fw-bold">"{oneAuthor.author_Name}"</span>cannot be deleted as this author has below book(s) available.<br/>
            {author.books.length>0 && author.books.map((book,index) => {

                return(
                <div className={styles.booklist}>
                    {/* {console.log(book.title)} */}
                    {index+1}.&nbsp;{book.title}&nbsp; 
                </div>
                )
            })}
            {/* <span>{author.name}</span> */}
            {/* <span className={styles.noteText}>(Kindly note the delete action is irreversible and deleting the author will also delete the corresponding author book(s) data)</span> */}
            {/* {deleteErr && <span className={`${styles.errorFormField}`}><br/>{deleteErr}</span>} */}
            </Modal.Body>
            <Modal.Footer>
            
            <Button variant="secondary" onClick={handleClose}>
                OK
            </Button>
            </Modal.Footer>
        </Modal>
        
        </>
    )
}

export default RestrictDeleteAuthor