import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './deleteauthor.module.css';
import { useState } from 'react';
import { useToken } from './TokenProvider';

const DeleteAuthor = ({deleteAuthorModalShow, setDeleteAuthorModalShow, oneAuthor, authors, setAuthors, author}) =>{

    const [deleteErr, setDeleteErr] = useState("");
    //const {authToken} = useToken();
    let authToken = sessionStorage.getItem("authToken");

    function deleteBook(){
        let filter_authors = [];
        filter_authors = authors.filter((author)=> author.author_Id !== oneAuthor.author_Id);
        console.log(filter_authors);
        console.log(filter_authors.length);
        
        fetch(`https://localhost:7226/api/v1/authors/${oneAuthor.author_Id}`,{
            method:"DELETE",
            headers: {Authorization: `Bearer ${authToken}`}
            })
            .then(response => {
                if(response.ok){
                    setAuthors(filter_authors);
                    setDeleteAuthorModalShow(false);
                    setDeleteErr("");
                }
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
            <Modal.Body>Are you sure you want to delete the author: <span className="fw-bold">"{oneAuthor.author_Name}"</span>?<br/>
            
            {/* <span>{author.name}</span> */}
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
        
        </>
    )
}

export default DeleteAuthor