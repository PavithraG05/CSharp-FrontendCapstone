import { useState,useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './editauthor.module.css';

const EditAuthor = ({editAuthorModal, setEditAuthorModal, oneAuthor, setOneAuthor, authors , setAuthors}) => {

    const [nameError, setNameError] = useState("");
    const [biographyError, setBiographyError] = useState("");
    const [editAuthorForm, setEditAuthorForm] = useState({})
    const [editFormErr, setEditFormErr] = useState("");

    const editData = {
        id: oneAuthor.id,
        name: oneAuthor.name,
        biography: oneAuthor.biography
    }
    useEffect(()=>{
        setEditAuthorForm(editData)
    },[oneAuthor])

    function handleClose(){
        setEditAuthorModal(false)
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(editAuthorForm);

        if(editAuthorForm.name && editAuthorForm.biography){
            updateAuthor(editAuthorForm);
            // console.log(status);
        }
        else{
            !editAuthorForm.name ? setNameError("Author name should not be empty"): setNameError("");
            !editAuthorForm.biography ? setBiographyError("Biography should not be empty") : setBiographyError("");
        }
          
    }

    function updateAuthor(){
        console.log("updating")
        
            // setEditFormErr("");
        fetch(`http://localhost:3000/api/authors/${editAuthorForm.id}`,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body: JSON.stringify({
                name:editAuthorForm.name,
                biography:editAuthorForm.biography
            })
            })
            .then(response => response.json())
            .then (json => {
                //$('.toast').toast('show');
                // alert('Todo status has been updated successfully');
                const updated_author = authors.map((author) => author.id === editAuthorForm.id ? 
                                        {...author,name:editAuthorForm.name,
                                        biography:editAuthorForm.biography
                                        }:author)
                setAuthors(updated_author);
                setEditAuthorModal(false);
                setEditFormErr("");
            })
            .catch(err => {
                console.log(err);
                setEditFormErr("Error in updating the author details");
            });
    }

    function handleName(){
        !editAuthorForm.name ? setNameError("Author name should not be empty"): setNameError("")
    }

    function handleBiography(){
        !editAuthorForm.biography ? setBiographyError("Biography should not be empty") : setBiographyError("")
    }

    function handleChange(e){
        // setSuccessMessage("")
        const name = e.target.name;
        const value = e.target.value;
        setEditAuthorForm((editAuthorForm) => ({
        ...editAuthorForm,
        [name]: value,
        })
        );
    }
    return(
        <>
            {console.log(`${JSON.stringify(editAuthorForm)}`)}
            <Modal show={editAuthorModal} onHide={handleClose} centered className={`${styles.font} modal-lg`}>
                <Modal.Header closeButton>
                    <Modal.Title>&nbsp;<i class="bi bi-pencil-square"></i>&nbsp; &nbsp;Edit Author</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row">
                            <div className="col-12">
                                <div className="form-group p-2">
                                    <label>Author Name*</label>
                                    <input type="text" className={`form-control ${styles.inputHover}`} name="name" value={editAuthorForm.name} onChange={handleChange} onBlur={handleName}/>
                                    {nameError && <div className={`${styles.errorFormField}`}>
                                            {nameError}
                                    </div>}
                                </div>
                                <div className="form-group p-2">
                                    <label className="form-label">Biography*</label>
                                    <textarea className={`form-control`} rows="4"  name="biography" value={editAuthorForm.biography} onChange={handleChange} onBlur={handleBiography}></textarea>
                                    {biographyError && <div className={`${styles.errorFormField}`}>
                                            {biographyError}
                                    </div>}
                                </div>
                            </div>
                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={`btn-dark ${styles.btnColor}`} onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditAuthor