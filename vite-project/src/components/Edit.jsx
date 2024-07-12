import { useState, useEffect } from "react";
import styles from './editbook.module.css'
import useFetch from './useFetch';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Edit = ({oneBook, book, editModal, setEditModal, books, setBooks}) => {

    const [editBookForm, setEditBookForm] = useState({});
    const bookEdit = {
        id: oneBook.id,
        title: oneBook.title,
        publication_date:oneBook.publication_date,
        price:oneBook.price,
        genre: oneBook.Genre.genre_name,
        genre_id: oneBook.Genre.id,
        author: oneBook.Author.name,
        author_id: oneBook.Author.id,
        biography: oneBook.Author.biography
    }
    useEffect(()=>{
        setEditBookForm(bookEdit);
    },[oneBook])

    const [titleError, setTitleError] = useState("");
    const [publicationError, setPublicationError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [genreError, setGenreError] = useState("");
    const {data: authors, authorsLoading, authorsApiError} = useFetch("authors");
    const {data: genres, genresLoading, genresApiError} = useFetch("genres");
    const [editFormErr, setEditFormErr] = useState("")

    console.log(authors);
    if (authorsLoading) return "Loading...";
    if(authorsApiError) setAuthorError("Error fetching authors using API");

    console.log(genres);
    if (genresLoading) return "Loading...";
    if(genresApiError) setGenreError("Error fetching genres using API");

    function handleClose(){
        setEditModal(false)
    }

    function handleSubmit(){
        console.log(editBookForm);
        console.log("updating")
        // getBiography()
        if(editBookForm.title && editBookForm.publication_date && editBookForm.price && editBookForm.genre && editBookForm.author){
            updateBook()
            console.log(`after author bio ${JSON.stringify(editBookForm)}`)
            // console.log(biography)
                
            
            // console.log(status);
        }
        else{
            !editBookForm.title ? setTitleError("Title should not be empty") : setTitleError("");
            !editBookForm.publication_date ? setPublicationError("Publication date should not be empty") : setPublicationError("")
            !editBookForm.price ? setPriceError("Price should not be empty") : setPriceError("")
            !editBookForm.author ? setAuthorError("Author should not be empty") : setAuthorError("")
            !editBookForm.genre ? setGenreError("Genre should not be empty") : setGenreError("")
        }
        
    }

    

    function updateBook(){
        console.log("updating")
        
            // setEditFormErr("");
        fetch(`http://localhost:3000/api/books/${editBookForm.id}`,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body: JSON.stringify({
                title:editBookForm.title,
                publication_date:editBookForm.publication_date,
                price:editBookForm.price,
                genre_id:editBookForm.genre_id,
                author_id:editBookForm.author_id
            })
            })
            .then(response => response.json())
            .then (json => {
                //$('.toast').toast('show');
                // alert('Todo status has been updated successfully');
                const updated_book = books.map((book) => book.id === editBookForm.id ? 
                                    {...book,title:editBookForm.title,
                                        publication_date:editBookForm.publication_date,
                                        price:editBookForm.price,
                                        Genre:{id:editBookForm.genre_id,genre_name:editBookForm.genre},
                                        Author:{id:editBookForm.author_id,name:editBookForm.author,biography:editBookForm.biography}
                                    }:book)
                setBooks(updated_book);
                setEditModal(false);
                setEditFormErr("");
            })
            .catch(err => {
                console.log(err);
                setEditFormErr("Error in updating the author details");
            });
    }

    function handleTitle(){
        !editBookForm.title ? setTitleError("Title should not be empty") : setTitleError("")
    }

    function handlePublicationDate(){
        !editBookForm.publication_date ? setPublicationError("Publication date should not be empty") : setPublicationError("")
    }

    function handlePrice(){
        !editBookForm.price ? setPriceError("Price should not be empty") : setPriceError("")
    }

    function handleAuthor(){
        !editBookForm.author ? setAuthorError("Author should not be empty") : setAuthorError("")
    }

    function handleGenre(){
        !editBookForm.genre ? setGenreError("Genre should not be empty") : setGenreError("")
    }


    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        let genreIndex ;
        let authorIndex;
        let authorbioIndex="";
        if(name === 'genre'){
            const selectedIndex = e.target.options.selectedIndex;
            genreIndex = e.target.options[selectedIndex].getAttribute('get-key');
            setEditBookForm((editBookForm) => ({
                ...editBookForm,
                [name]: value,
                ['genre_id']:genreIndex,
                })
                );  
        }
        else if(name === 'author'){
            const selectedIndex = e.target.options.selectedIndex;
            authorIndex = e.target.options[selectedIndex].getAttribute('data-key');
            authorbioIndex = e.target.options[selectedIndex].getAttribute('bio-key')
            setEditBookForm((editBookForm) => ({
                ...editBookForm,
                [name]: value,
                ['author_id']:authorIndex,
                ['biography']:authorbioIndex
                })
                );  
        }
        else{
            setEditBookForm((editBookForm) => ({
            ...editBookForm,
            [name]: value,
            })
            );
        }
    }

    return(
        <>
            {/* {console.log(`${JSON.stringify(bookEdit)}`)} */}
            {/* {console.log(`${JSON.stringify(editBookForm.title)}`)}
            {console.log(`${JSON.stringify(editBookForm.author)}`)}
            {console.log(`${JSON.stringify(editBookForm.genre)}`)}
            {console.log(`${JSON.stringify(editBookForm.price)}`)}
            {console.log(`${JSON.stringify(editBookForm.publication_date)}`)}
            {console.log(`${JSON.stringify(editBookForm)}`)} */}
            {editBookForm && 
            <Modal show={editModal} onHide={handleClose} centered className={`${styles.font} modal-lg`}>
            <Modal.Header closeButton>
                <Modal.Title><span className={styles.modalHeading}>&nbsp;<i class="bi bi-pencil-square"></i>&nbsp; &nbsp;Edit Book</span></Modal.Title>
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
                                    {priceError && <div className={`${styles.errorFormField}`}>
                                            {priceError}
                                    </div>}
                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="form-group p-2">
                                <label>Author*</label>
                                <select className={`form-select ${styles.inputHover}`} size="3" name="author" value={editBookForm.author} onChange={handleChange} onBlur={handleAuthor}>
            
                                    {authors && authors.map((option) => {
                                        return (
                                            <option value={option.name} key={option.id} data-key={option.id} bio-key={option.biography}>
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
                                            <option className="text-capitalize" value={option.genre_name} key={option.id} get-key={option.id}>
                                            {option.genre_name.charAt(0).toUpperCase() + option.genre_name.slice(1)}
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
                    {/* {apiErr && <div className={`${styles.errorFormField}`}>
                        {apiErr}
                    </div>} */}
                    <br/>
                    {/* {successMessage && <div className={`${styles.successMsg}`}><i className="bi bi-check-circle-fill text-success"></i> &nbsp;{successMessage}</div>} */}
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
        }
            
        </>
    )
}
export default Edit

{/*                      */}
                    
                    
            
                
                    
                