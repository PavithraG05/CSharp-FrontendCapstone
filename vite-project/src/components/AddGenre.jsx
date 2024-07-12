import styles from './addgenre.module.css'
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFetch from './useFetch';

const AddGenre = ({addGenreModalShow, setAddGenreModalShow, genres, setGenres}) => {
    const genre = {
        genre_name:""
    }

    const [addGenre, setAddGenre] = useState(genre);
    const [genrenameError, setGenrenameError] = useState("");
    const [apiErr, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(()=>{
        setAddGenre(genre);
        setSuccessMessage("")
        setGenrenameError("")
        setApiError("");
    },[addGenreModalShow])


    function handleClose(){
        setAddGenreModalShow(false);
    }

    function addGenreDetails(){
        setApiError("");
        fetch('http://localhost:3000/api/genres',
            {
                method: "POST",
                headers:{"content-type":"application/json"},
                body: JSON.stringify(addGenre)
            }
        )
        .then((response) => response.json())
        .then((data) => {
            // alert("Todo added successfully");
            setSuccessMessage("Genre added successfully!!");
            // setBooks()
            console.log(genres)
            // toast.success('Todo added successfully!',{
            //     position: toast.POSITION.TOP_CENTER
            // });
        })
        .catch((error) => {
            console.log(error);
            setApiError("Error adding details to API");
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        
        if(addGenre.genre_name){
            const exist = checkGenreNameExist();
        }
        else{
            !addGenre.genre_name ? setGenrenameError("Genre name should not be empty") : setGenrenameError("");
        }
    }

    function handleChange(e){
        setSuccessMessage("")
        setGenrenameError("")
        const name = e.target.name;
        const value = e.target.value;
        setAddGenre((addGenre) => ({
        ...addGenre,
        [name]: value,
        })
        );
        console.log(addGenre)
    }

    function checkGenreNameExist(){
        fetch(`http://localhost:3000/api/genres/name/${addGenre.genre_name}`,{
            method:"GET"
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.id){
                console.log(data);
                setGenrenameError("Genre name already exists")
                return data.id;
            }
            else{
                setGenrenameError("")
                addGenreDetails()
                setAddGenre(genre);
                console.log(data);
                return "";
            }
        })
        .catch((error) => {
            console.log(error);
            setApiError("Error fetching details using API");
        });
    }

    function handleGenre(){
        !addGenre.genre_name ? setGenrenameError("Genre name should not be empty") : setGenrenameError("");
    }

    return(
        <>
        <Modal show={addGenreModalShow} onHide={handleClose} centered className={`${styles.font} modal-md`}>
            <Modal.Header closeButton>
                <Modal.Title><span className={styles.modalHeading}>&nbsp;<i class="bi bi-plus-square"></i>&nbsp; &nbsp;Add Genre</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="form-group p-2">
                        <label>Genre Name*</label>
                        <input type="text" className={`form-control ${styles.inputHover}`} name="genre_name" value={addGenre.genre_name} onChange={handleChange} onBlur={handleGenre}/>
                        {genrenameError && <div className={`${styles.errorFormField}`}>
                                {genrenameError}
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
                    Add Genre
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}


export default AddGenre