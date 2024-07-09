import styles from './editbook.module.css'
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFetch from './useFetch';

const EditBook = (editModal, setEditModal, oneBook, setOneBook, book) => {
    

    // const bookValue = {
    //     title: oneBook.title,
    //     publication_date : oneBook.publication_date
    // }
    const [editBookForm, setEditBookForm] = useState({});
    const bookEdit = {
        title: book.title,
        publication_date:book.publication_date,
        price:book.price,
        genre: book.Genre.genre_name,
        author: book.Author.name
    }
    useEffect(()=>{
        setEditBookForm(bookEdit);
    },[book])

    const [titleError, setTitleError] = useState("");
    const [publicationError, setPublicationError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [genreError, setGenreError] = useState("");
    const {data: authors, authorsLoading, authorsApiError} = useFetch("authors");
    const {data: genres, genresLoading, genresApiError} = useFetch("genres");

    // console.log(authors);
    if (authorsLoading) return "Loading...";
    if(authorsApiError) setAuthorError("Error fetching authors using API");

    // console.log(genres);
    if (genresLoading) return "Loading...";
    if(genresApiError) setGenreError("Error fetching genres using API");

    function handleClose(){
        setEditModal(false)
    }

    function handleTitle(){
        !editBookForm.title ? setTitleError("Book title should not be empty") : setTitleError("");
    }

    function handlePublicationDate(){
        !editBookForm.publication_date ? setPublicationError("Date should not be empty") : setPublicationError("");
    }

    function handlePrice(){
        !editBookForm.price ? setPriceError("Price should not be empty") : setPriceError("");
    }

    function handleAuthor(){
        !editBookForm.author ? setAuthorError("Author should not be empty") : setAuthorError("");
    }

    function handleGenre(){
        !editBookForm.genre ? setGenreError("Genre should not be empty") : setGenreError("");
    }

    function handleSubmit(event){
        event.preventDefault
        console.log(editBookForm);
    }

    function handleChange(e){
        // setSuccessMessage("")
        // const name = e.target.name;
        // const value = e.target.value;
        // setEditBookForm((editBookForm) => ({
        // ...editBookForm,
        // [name]: value,
        // })
        // );
        console.log(editBookForm)
    }

    return(
        <>
            {console.log(`edit ${editBookForm}`)}
            {editBookForm && 
            <Modal show={editModal} onHide={handleClose} centered className={`${styles.font} modal-lg`}>
            <Modal.Header closeButton>
                <Modal.Title>&nbsp;<i class="bi bi-pencil-square"></i>&nbsp; &nbsp;Edit Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group p-2">
                                <label>Book Title*</label>
                                <input type="text" className={`form-control ${styles.inputHover}`} name="title" value={editBookForm.title} onChange={handleChange} onBlur={handleTitle}/>
                                {titleError && <div className={`${styles.errorFormField}`}>
                                        {titleError}
                                </div>}
                            </div>
                            <div className="form-group p-2">
                                <label className="form-label">Publication Date*</label>
                                <input type="date" className={`form-control ${styles.inputHover}`} name="publication_date" value={editBookForm.publication_date} onChange={handleChange} onBlur={handlePublicationDate}/>
                                {publicationError && <div className={`${styles.errorFormField}`}>
                                        {publicationError}
                                </div>}
                            </div>
                            <div className="form-group p-2">
                                <label className="form-label">Price*</label>
                                <div className="input-group">
                                    <span class="input-group-text" id="basic-addon1"><i class="bi bi-currency-rupee"></i></span>
                                    <input type="number" className={`form-control ${styles.inputHover}`} name="price" value={editBookForm.price} onChange={handleChange} onBlur={handlePrice}/>
                                </div>
                                {priceError && <div className={`${styles.errorFormField}`}>
                                        {priceError}
                                </div>}
                            </div>
                        </div>
                         <div className="col-6">
                            <div className="form-group p-2">
                                <label>Author*</label>
                                <select className={`form-select ${styles.inputHover}`} size="3" name="author" value={editBookForm.author} onChange={handleChange} onBlur={handleAuthor}>
                                    
                                    {authors && authors.map((option) => {
                                        return (
                                            <option key={option.name} value={option.id}>
                                            {option.name}
                                            </option>
                                        );
                                        })}
                                </select>
                                <div id="authorHelp" className="form-text">Note: If author doesn't exist, add new author in authors page</div>
                                {authorError && <div className={`${styles.errorFormField}`}>
                                        {authorError}
                                </div>}
                            </div>
                            <div className="form-group p-2">
                                <label>Genre*</label>
                                <select className={`form-select ${styles.inputHover}`} name="genre" value={editBookForm.genre} onChange={handleChange} onBlur={handleGenre}>
                                    
                                    {genres && genres.map((option) => {
                                        return (
                                            <option key={option.genre_name} value={option.id}>
                                            {option.genre_name}
                                            </option>
                                            
                                        );
                                        })}
                                    
                                </select>
                                <div className="form-text">Note: If genre doesn't exist, please navigate to the genre page to add new genre.</div>
                                {genreError && <div className={`${styles.errorFormField}`}>
                                        {genreError}
                                </div>}
                            </div>
                        </div>
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
                <Button className={`btn-dark ${styles.btnColor}`} onClick={handleSubmit}>
                    Add Book
                </Button>
            </Modal.Footer>
        </Modal>
        }
        </>
    )
}

export default EditBook
        
        
