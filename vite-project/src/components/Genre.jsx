import { useEffect, useState } from "react"
import styles from './book.module.css'
import EditGenre from "./EditGenre"

const Genre = ({genre, index, genres, setGenres, searchInput}) => {
    
    const [oneGenre, setOneGenre] = useState({})
    const [activeIndex, setActiveIndex] = useState(null)
    const [editModal, setEditModal] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [expandIndex, setExpandIndex] = useState(false)
    useEffect(()=>{
        setOneGenre(genre);
    },[genre])

    function handleEdit(){
        setEditModal(true)
    }

    function expandCell(){
        setExpandIndex(!expandIndex)
    }

    function highlightTask(genre_name, searchInput){
        // console.log(`desc ${desc}`);
        if(genre_name){
            const parts = genre_name.split(new RegExp(`(${searchInput})`,`gi`));
            console.log(`Search parts ${parts}`);
            return parts.map((part,i) => part.toLowerCase() === searchInput.toLowerCase()? <mark key={i}>{part}</mark>:part);
        }
    }

    return(
        <>
            {
                console.log(oneGenre)
            }

            <tr className={index === activeIndex ? 'table-active' : ''}>
                <th scope="align-middle row">{index}</th>
                {searchInput && <td className="text-capitalize">{highlightTask(genre.genre_name, searchInput)}</td>}
                {!searchInput && <td className="text-capitalize">{genre.genre_name}</td>}
                <td>{genre.Books.length}</td>
                {!expandIndex && <td className={`${styles.truncate} align-middle`} onClick={()=>expandCell()}>
                    {genre.Books.map((book,index) => {
                                        return(
                                            <span >{book.title} - {book.Author.name}</span> 
                                        )
                    })}
                    {!genre.Books.length &&
                       <span>-</span> 
                    }
                </td>
                }
                {expandIndex && <td className={`${styles.expanded}`} onClick={()=>expandCell()}>
                    {genre.Books.map((book,index) => {
                                        return(
                                            <>
                                                <span className={styles.genreBooks}>{book.title} - {book.Author.name} </span><br/>
                                            </>
                                        )
                                    })}
                    {!genre.Books.length &&
                        <span>-</span>
                    }
                </td>
                }
                <td className="text-center"><i className={`bi bi-pencil-square ${styles.biPencilSquare}`} onClick={()=>handleEdit()}></i></td>
            </tr>
            
                {editModal && <EditGenre oneGenre={oneGenre} genre={genre} editModal={editModal} setEditModal={setEditModal} genres={genres} setGenres={setGenres}/>}
        </>
    )
}

export default Genre