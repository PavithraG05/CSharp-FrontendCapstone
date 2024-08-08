import styles from './addbook.module.css'
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useFetch from './useFetch';
import { useToken } from './TokenProvider';

const AddBook = ({addModalShow, setAddModalShow, books, setBooks}) => {
    const book = {
        title:"",
        publication_date:"",
        price:"",
        author_id:"",
        genre_id:"",
        description:""
    }

    const [addBook, setAddBook] = useState(book);
    const [titleError, setTitleError] = useState("");
    const [publicationError, setPublicationError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [authorError, setAuthorError] = useState("");
    const [genreError, setGenreError] = useState("");
    const [descError, setDescError] = useState("");
    const [apiErr, setApiError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    //const {authToken} = useToken();
    let authToken = sessionStorage.getItem("authToken");

    useEffect(()=>{
        setAddBook(book);
        setSuccessMessage("")
        setTitleError("")
        setPublicationError("")
        setPriceError("")
        setAuthorError("")
        setGenreError("")
        setDescError("")
    },[addModalShow])

    const {data: authors, authorsLoading, authorsApiError} = useFetch("authors",authToken);
    const {data: genres, genresLoading, genresApiError} = useFetch("genres",authToken);

    // console.log(authors);
    if (authorsLoading) return "Loading...";
    if(authorsApiError) setAuthorError("Error fetching authors using API");

    // console.log(genres);
    if (genresLoading) return "Loading...";
    if(genresApiError) setGenreError("Error fetching genres using API");

    function handleClose(){
        setAddModalShow(false);
    }

    function addBookDetails(){
        console.log(addBook);
        fetch('https://localhost:7226/api/v1/books',
            {
                method: "POST",
                headers:{Authorization: `Bearer ${authToken}`,"content-type":"application/json"},
                body: JSON.stringify(addBook)
            }
        )
        .then((response) => response.json())
        .then((data) => {
            // alert("Todo added successfully");
            setSuccessMessage("Book added successfully!!");
            // setBooks()
            console.log(books)
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
        
        if(addBook.title && addBook.publication_date && addBook.price && addBook.author_id && addBook.genre_id && addBook.description){
            // console.log(addBook)
            addBookDetails()
            //setAddBook(book);
            
        }
        else{
            !addBook.title ? setTitleError("Book title should not be empty") : setTitleError("");
            !addBook.publication_date ? setPublicationError("Date should not be empty") : setPublicationError("");
            !addBook.price ? setPriceError("Price should not be empty") : setPriceError("");
            !addBook.author_id ? setAuthorError("Author should not be empty") : setAuthorError("");
            !addBook.genre_id ? setGenreError("Genre should not be empty") : setGenreError("");
            !addBook.description ? setDescError("Description should not be empty") : setDescError("");

        }
    }

    function handleChange(e){
        setSuccessMessage("")
        const name = e.target.name;
        const value = e.target.value;
        setAddBook((addBook) => ({
        ...addBook,
        [name]: value,
        })
        );
        console.log(addBook)
    }

    function handleTitle(){
        !addBook.title ? setTitleError("Book title should not be empty") : setTitleError("");
    }

    function handlePublicationDate(){
        !addBook.publication_date ? setPublicationError("Date should not be empty") : setPublicationError("");
    }

    function handlePrice(){
        !addBook.price ? setPriceError("Price should not be empty") : setPriceError("");
    }

    function handleAuthor(){
        !addBook.author_id ? setAuthorError("Author should not be empty") : setAuthorError("");
    }

    function handleGenre(){
        !addBook.genre_id ? setGenreError("Genre should not be empty") : setGenreError("");
    }

    function handleDescription(){
        !addBook.description ? setDescError("Description should not be empty") : setDescError("");
    }

    return(
        <>
        <Modal show={addModalShow} onHide={handleClose} centered className={`${styles.font} modal-lg`}>
            <Modal.Header closeButton>
                <Modal.Title><span className={styles.modalHeading}>&nbsp;<i class="bi bi-plus-square"></i>&nbsp; &nbsp;Add Book</span></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group p-2">
                                <label>Book Title*</label>
                                <input type="text" className={`form-control ${styles.inputHover}`} name="title" value={addBook.title} onChange={handleChange} onBlur={handleTitle}/>
                                {titleError && <div className={`${styles.errorFormField}`}>
                                        {titleError}
                                </div>}
                            </div>
                            <div className="form-group p-2">
                                <label className="form-label">Publication Date*</label>
                                <input type="date" className={`form-control ${styles.inputHover}`} name="publication_date" value={addBook.publication_date} onChange={handleChange} onBlur={handlePublicationDate}/>
                                {publicationError && <div className={`${styles.errorFormField}`}>
                                        {publicationError}
                                </div>}
                            </div>
                            <div className="form-group p-2">
                                <label className="form-label">Price*</label>
                                <div className="input-group">
                                    <span class="input-group-text" id="basic-addon1"><i class="bi bi-currency-rupee"></i></span>
                                    <input type="number" className={`form-control ${styles.inputHover}`} name="price" value={addBook.price} onChange={handleChange} onBlur={handlePrice}/>
                                </div>
                                {priceError && <div className={`${styles.errorFormField}`}>
                                        {priceError}
                                </div>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group p-2">
                                <label>Author*</label>
                                <select className={`form-select ${styles.inputHover}`} size="3" name="author_id" value={addBook.author_id} onChange={handleChange} onBlur={handleAuthor}>
                                    <option value="">Choose an option</option>
                                    {authors && authors.map((option) => {
                                        return (
                                            <option key={option.author_Name} value={option.author_Id}>
                                            {option.author_Name}
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
                                <select className={`form-select ${styles.inputHover}`} name="genre_id" value={addBook.genre_id} onChange={handleChange} onBlur={handleGenre}>
                                    <option value="" >Choose an option</option>
                                    
                                    {genres && genres.map((option) => {
                                        return (
                                            <option key={option.genre_Name} value={option.genre_Id}>
                                            {option.genre_Name.charAt(0).toUpperCase() + option.genre_Name.slice(1)}
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
                        <div>
                            <div className="form-group p-2">
                            <label className="form-label">Description*</label>
                            <textarea className={`form-control`} rows="3"  name="description" value={addBook.description} onChange={handleChange} onBlur={handleDescription}></textarea>
                            {descError && <div className={`${styles.errorFormField}`}>
                                    {descError}
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
                <Button className={`btn ${styles.btnColor}`} onClick={handleSubmit}>
                    Add Book
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default AddBook;