import { useState,useEffect } from "react"
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './editgenre.module.css';

const EditGenre = ({oneGenre, genre, editModal, setEditModal, genres , setGenres}) => {

    const [nameError, setNameError] = useState("");
    const [editGenreForm, setEditGenreForm] = useState({})
    const [editFormErr, setEditFormErr] = useState("");

    const editData = {
        id: oneGenre.id,
        genre_name: oneGenre.genre_name
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
            // console.log(status);
        }
        else{
            !editGenreForm.genre_name ? setNameError("Genre name should not be empty"): setNameError("");
        }
          
    }

    function updateGenre(){
        console.log("updating")
        
            // setEditFormErr("");
        fetch(`http://localhost:3000/api/genres/${editGenreForm.id}`,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body: JSON.stringify({
                genre_name:editGenreForm.genre_name
            })
            })
            .then(response => response.json())
            .then (json => {
                //$('.toast').toast('show');
                // alert('Todo status has been updated successfully');
                const updated_genre = genres.map((genre) => genre.id === editGenreForm.id ? 
                                        {...genre,genre_name:editGenreForm.genre_name
                                        }:genre)
                setGenres(updated_genre);
                setEditModal(false);
                setEditFormErr("");
            })
            .catch(err => {
                console.log(err);
                setEditFormErr("Error in updating the genre details");
            });
    }

    function checkGenreNameExist(){
        fetch(`http://localhost:3000/api/genres/name/${editGenreForm.genre_name}`,{
            method:"GET"
        })
        .then((response) => response.json())
        .then((data) => {
            if(data.id){
                console.log(data);
                setNameError("Genre name already exists")
                return data.id;
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
                    <Modal.Title>&nbsp;<i class="bi bi-pencil-square"></i>&nbsp; &nbsp;Edit Genre</Modal.Title>
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
                    <Button className={`btn-dark ${styles.btnColor}`} onClick={handleSubmit}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditGenre