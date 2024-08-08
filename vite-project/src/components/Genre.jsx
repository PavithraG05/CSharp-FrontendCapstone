import { useEffect, useState } from "react"
import styles from './book.module.css'
import EditGenre from "./EditGenre"
import { useToken } from "./TokenProvider"

const Genre = ({genre, index, genres, setGenres, searchInput}) => {
    
    const [oneGenre, setOneGenre] = useState({})
    const [activeIndex, setActiveIndex] = useState(null)
    const [editModal, setEditModal] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [expandIndex, setExpandIndex] = useState(false);
    const {authToken} = useToken();

    useEffect(()=>{
        setOneGenre(genre);
    },[genre])

    function handleEdit(){
        setEditModal(true)
    }

    function expandCell(){
        setExpandIndex(!expandIndex)
    }

    function highlightTask(genre_Name, searchInput){
        // console.log(`desc ${desc}`);
        if(genre_Name){
            const parts = genre_Name.split(new RegExp(`(${searchInput})`,`gi`));
            console.log(`Search parts ${parts}`);
            return parts.map((part,i) => part.toLowerCase() === searchInput.toLowerCase()? <mark key={i}>{part}</mark>:part);
        }
    }

    return(
        <>
            {
                console.log(oneGenre)
            }

            <tr className={`${index === activeIndex ? 'table-active' : ''}`}>
                <th scope="align-middle row">{index}</th>
                {searchInput && <td className="text-capitalize">{highlightTask(genre.genre_Name, searchInput)}</td>}
                {!searchInput && <td className="text-capitalize">{genre.genre_Name}</td>}
                <td className={`${styles.genreCol}`}>{genre.books.length}</td>
                {!expandIndex && <td className={`${styles.truncate} align-middle`} onClick={()=>expandCell()}>
                    {genre.books.map((book,index) => {
                                        return(
                                            <span >{book.title}</span> 
                                        )
                    })}
                    {!genre.books.length &&
                       <span>-</span> 
                    }
                </td>
                }
                {expandIndex && <td className={`${styles.expanded}`} onClick={()=>expandCell()}>
                    {genre.books.map((book,index) => {
                                        return(
                                            <>
                                                {index+1}. &nbsp;<span className={styles.genreBooks}>{book.title} </span><br/>
                                            </>
                                        )
                                    })}
                    {!genre.books.length &&
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