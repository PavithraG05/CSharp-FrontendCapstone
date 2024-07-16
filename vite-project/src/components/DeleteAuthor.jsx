import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './deleteauthor.module.css';
import { useState } from 'react';

const DeleteAuthor = ({deleteAuthorModalShow, setDeleteAuthorModalShow, oneAuthor, authors, setAuthors, author}) =>{

    const [deleteErr, setDeleteErr] = useState("");

    function deleteBook(){
        let filter_authors = [];
        filter_authors = authors.filter((author)=> author.id !== oneAuthor.id);
        console.log(filter_authors);
        console.log(filter_authors.length);
        
        fetch(`http://localhost:3000/api/authors/${oneAuthor.id}`,{
            method:"DELETE"
            })
            .then(response => {
                response.json();
                
                setAuthors(filter_authors);
                setDeleteAuthorModalShow(false);
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
        setDeleteAuthorModalShow(false);
    }

    return(
        <>
        {/* {console.log(author.Books.length)} */}
        <Modal show={deleteAuthorModalShow} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>Are you sure you want to delete the author: <span className="fw-bold">"{oneAuthor.name}"</span> and his/her book(s)?<br/>
            {author.Books.length>0 && author.Books.map((book,index) => {
                return(
                <div className={styles.booklist}>
                    {/* {console.log(book.title)} */}
                    {index+1}.&nbsp;{book.title}&nbsp; 
                </div>
                )
            })}
            {/* <span>{author.name}</span> */}
            <span className={styles.noteText}>(Kindly note the delete action is irreversible and deleting the author will also delete the corresponding author book(s) data)</span>
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
        
        </>
    )
}

export default DeleteAuthor