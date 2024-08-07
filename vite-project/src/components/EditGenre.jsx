import { useState,useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './editgenre.module.css';

const EditGenre = ({oneGenre, genre, editModal, setEditModal, genres , setGenres}) => {

    const [nameError, setNameError] = useState("");
    const [editGenreForm, setEditGenreForm] = useState({})
    const [editFormErr, setEditFormErr] = useState("");
    const [apiError, setApiError] = useState("");

    const editData = {
        id: oneGenre.genre_Id,
        genre_name: oneGenre.genre_Name
    }
    useEffect(()=>{
        setEditGenreForm(editData)
    },[oneGenre])

    function handleClose(){
        setEditModal(false)
    }

    function handleSubmit(event){
        event.preventDefault();
        console.log(editGenreForm);

        if(editGenreForm.genre_name){
            const exist = checkGenreNameExist();
            //updateGenre();
            // console.log(status);
        }
        else{
            !editGenreForm.genre_name ? setNameError("Genre name should not be empty"): setNameError("");
        }
          
    }

    function updateGenre(){
        console.log("updating")
        console.log(editGenreForm);
            // setEditFormErr("");
        const token = localStorage.getItem('authToken');
        fetch(`https://localhost:7226/api/v1/genres/${editGenreForm.id}`,{
            method:"PUT",
            headers:{'Authorization': `Bearer ${token}`,"content-type":"application/json"},
            body: JSON.stringify({
                genre_name:editGenreForm.genre_name
            })
            })
            .then(response => {
                if(!response.ok) throw new Error(response.status)
                else{
                //$('.toast').toast('show');
                // alert('Todo status has been updated successfully');
                    const updated_genre = genres.map((genre) => genre.genre_Id === editGenreForm.id ? 
                                            {...genre,genre_Name:editGenreForm.genre_name
                                            }:genre)
                    setGenres(updated_genre);
                    setEditModal(false);
                    setEditFormErr("");
                }
            })
            .catch(error => {
                console.log(error);
                setApiError("Error fetching details using API");
            });
    }

    function checkGenreNameExist(){
        const token = localStorage.getItem('authToken');
        fetch(`https://localhost:7226/api/v1/genres/name/${editGenreForm.genre_name}`,{
            method:"GET",
            headers:{'Authorization': `Bearer ${token}`}
        })
        .then((response) =>  response.json())
        .then((data) => {
            console.log(data);
            if(data){
                console.log(data);
                setNameError("Genre name already exists")
                return data.genre_Id;
            }
            else{
                setNameError("")
                updateGenre(editGenreForm);
                return "";
            }
        })
        .catch((error) => {
            console.log(error);
            setApiError("Error fetching details using API");
        });
    }

    function handleGenreName(){
        !editGenreForm.genre_name ? setNameError("Genre name should not be empty"): setNameError("");
    }

    function handleChange(e){
        // setSuccessMessage("")
        const name = e.target.name;
        const value = e.target.value;
        setEditGenreForm((editGenreForm) => ({
        ...editGenreForm,
        [name]: value,
        })
        );
    }
    return(
        <>
            {console.log(`${JSON.stringify(editGenreForm)}`)}
            <Modal show={editModal} onHide={handleClose} centered className={`${styles.font} modal-md`}>
                <Modal.Header closeButton>
                    <Modal.Title><span className={styles.modalHeading}>&nbsp;<i class="bi bi-pencil-square"></i>&nbsp; &nbsp;Edit Genre</span></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="form-group p-2">
                            <label>Genre Name*</label>
                            <input type="text" className={`form-control ${styles.inputHover}`} name="genre_name" value={editGenreForm.genre_name} onChange={handleChange} onBlur={handleGenreName}/>
                            {nameError && <div className={`${styles.errorFormField}`}>
                                    {nameError}
                            </div>}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={`btn ${styles.btnColor}`} onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditGenre