import styles from './addauthor.module.css'
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useToken } from './TokenProvider';

const AddAuthor = ({addAuthorModalShow, setAddAuthorModalShow, authors, setAuthors}) => {
    const author = {
        author_name:"",
        biography:"",
    }

    const [addAuthor, setAddAuthor] = useState(author);
    const [nameError, setNameError] = useState("");
    const [biographyError, setbiographyError] = useState("");
    const [apiErr, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    //const {authToken} = useToken();
    let authToken = sessionStorage.getItem("authToken");

    useEffect(()=>{
        setAddAuthor(author);
        setSuccessMessage("")
        setApiError("");
        setNameError("")
        setbiographyError("")
    },[addAuthorModalShow])

    function handleClose(){
        setAddAuthorModalShow(false);
    }

    function addAuthorDetails(){
        fetch('https://localhost:7226/api/v1/authors',
            {
                method: "POST",
                headers:{ Authorization: `Bearer ${authToken}`,"content-type":"application/json"},
                body: JSON.stringify(addAuthor)
            }
        )
        .then((response) => response.json())
        .then((data) => {
            // alert("Todo added successfully");
            setSuccessMessage("Author added successfully!!");
            // setBooks()
            console.log(authors)
            // toast.success('Todo added successfully!',{
            //     position: toast.POSITION.TOP_CENTER
            // });
        })
        .catch((error) => {
            console.log(error);
            setApiError("Author with this name already exists");
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        
        if(addAuthor.author_name && addAuthor.biography){
            // console.log(addBook)
            addAuthorDetails()
            //setAddAuthor(author);
            
        }
        else{
            !addAuthor.author_name ? setNameError("Author name should not be empty") : setNameError("");
            !addAuthor.biography ? setbiographyError("Biography should not be empty") : setbiographyError("");
        }
    }

    function handleChange(e){
        setSuccessMessage("")
        const name = e.target.name;
        const value = e.target.value;
        setAddAuthor((addAuthor) => ({
        ...addAuthor,
        [name]: value,
        })
        );
        console.log(addAuthor)
    }

    function handleName(){
        !addAuthor.author_name ? setNameError("Author name should not be empty") : setNameError("");
    }

    function handleBiography(){
        !addAuthor.biography ? setbiographyError("Biography should not be empty") : setbiographyError("");
    }

    return(
        <>
        <Modal show={addAuthorModalShow} onHide={handleClose} centered className={`${styles.font} modal-lg`}>
            <Modal.Header closeButton>
                <Modal.Title><span className={styles.modalHeading}>&nbsp;<i class="bi bi-plus-square"></i>&nbsp; &nbsp;Add Author</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="form-group p-2">
                        <label>Author Name*</label>
                        <input type="text" className={`form-control ${styles.inputHover}`} name="author_name" value={addAuthor.author_name} onChange={handleChange} onBlur={handleName}/>
                        {nameError && <div className={`${styles.errorFormField}`}>
                                {nameError}
                        </div>}
                    </div>
                    <div className="form-group p-2">
                        <label className="form-label">Biography*</label>
                        <textarea className={`form-control`} rows="3"  name="biography" value={addAuthor.biography} onChange={handleChange} onBlur={handleBiography}></textarea>
                        {biographyError && <div className={`${styles.errorFormField}`}>
                                {biographyError}
                        </div>}
                    </div>
                       
                    {apiErr && <div className={`${styles.errorFormField}`}>
                        {apiErr}
                    </div>}
                    <br/>
                    {successMessage && <div className={`${styles.successMsg}`}><i className="bi bi-check-circle-fill text-success"></i> &nbsp;{successMessage}</div>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button className={`btn ${styles.btnColor}`} onClick={handleSubmit}>
                    Add Author
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default AddAuthor;