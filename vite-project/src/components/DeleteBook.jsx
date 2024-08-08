import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './deletebook.module.css';
import { useState } from 'react';
import { useToken } from './TokenProvider';

const DeleteBook = ({deleteModalShow, setDeleteModalShow, oneBook, books, setBooks}) =>{

    const [deleteErr, setDeleteErr] = useState("");
    //const {authToken} = useToken();
    const authToken = sessionStorage.getItem("authToken");

    function deleteBook(){
        let filter_books = [];
        filter_books = books.filter((book)=> book.id !== oneBook.id);
        console.log(filter_books);
        console.log(filter_books.length);
        fetch(`https://localhost:7226/api/v1/books/${oneBook.id}`,{
            method:"DELETE",
            headers:{authorization:`bearer ${authToken}`}
            })
            .then(response => {
                response.json();
                
                setBooks(filter_books);
                setDeleteModalShow(false);
                setDeleteErr("");
            })
            .catch(err => {
                console.log(err);
                setDeleteErr("Error in deleting book");
            });
    }

    function handleSubmit(event){
        event.preventDefault();
        deleteBook();
    }

    function handleClose(){
        setDeleteModalShow(false);
    }

    return(
        <Modal show={deleteModalShow} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>Are you sure you want to delete the book: <span className="fw-bold">"{oneBook.title}"?</span><br/>
            <span className={styles.noteText}>(Kindly note the delete action is irreversible)</span>
            {deleteErr && <span className={`${styles.errorFormField}`}><br/>{deleteErr}</span>}
            </Modal.Body>
            <Modal.Footer>
            
            <Button variant="secondary" onClick={handleClose}>
                No
            </Button>
            <Button className={styles.btnColor} onClick={handleSubmit}>
                Yes
            </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteBook