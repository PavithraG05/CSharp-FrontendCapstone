import Home from './Home';
import Login from './Login';
import Authors from "./Authors"
import Books from "./Books"
import Genres from "./Genres"
import PageNotFound from "./PageNotFound"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import styles from './navbar.module.css'

const NavBar = ({setLoginSuccessState}) => {

    // function handleClick(){
    //     setLoginSuccessState(true)
    // }

    return(
        
        <div className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 ${styles.navbarHeader}`}>
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-100">
                <a href="/books" className={`d-flex align-items-center pb-0 mb-md-0 me-md-auto ${styles.navbarBrand}`}>
                    <img src="/book_logo.png" className={styles.logoImg}/>
                    <span className="d-none d-sm-inline text-dark">
                        <img src="/name.png" alt="book logo"/>
                    </span>
                    
                </a>
                <hr className={styles.navLinkColor}/>
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    {/* <li className={`nav-item ${styles.navlinks}`}>
                        <a href="/" className={`nav-link align-middle px-0 ${styles.navLinkColor} ${styles.navlinkfirst}`}>
                            <i className="fs-4 bi-house-door"></i> <span className={`ms-1 d-none d-sm-inline`}>Home</span>
                        </a>
                    </li> */}
                    <li className={`nav-item ${styles.navlinks}`}>
                        <a href="/books" className={`nav-link px-0 align-middle ${styles.navLinkColor} ${styles.navlinkfirst}`}>
                        <i class="fs-4 bi-journal-text"></i> <span className={`ms-1 d-none d-sm-inline`}>&nbsp;Books</span> </a>
                    </li>
                    <li className={`nav-item ${styles.navlinks}`}>
                        <a href="/authors" className={`nav-link px-0 align-middle ${styles.navLinkColor}`}>
                            <i class="fs-4 bi bi-person-lines-fill"></i> <span className={`ms-1 d-none d-sm-inline`}>&nbsp;Authors</span></a>
                    </li>
                    <li className={`nav-item ${styles.navlinks}`}>
                        <a href="/genres" className={`nav-link px-0 align-middle ${styles.navLinkColor}`}>
                            <i class="fs-4 bi bi-list-stars"></i> <span className={`ms-1 d-none d-sm-inline`}>&nbsp;Genres</span></a>
                    </li>
                    
                </ul>
                <div className="hr"/>
                <div className={`dropdown pb-4 ${styles.navlinks}`}>
                    <a href="#" className={`d-flex align-items-center ${styles.navLinkColor} text-decoration-none dropdown-toggle`} id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="/femaleavatar.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                        <span className={`d-none d-sm-inline mx-1 ${styles.navLinkColor}`}>Admin</span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-light text-small shadow ">
                        {/* <li><a className="dropdown-item" href="#">New project...</a></li> */}
                        <li><a className="dropdown-item" href="#">Settings</a></li>
                        <li><a className="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="/login">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        //         <div className={`col py-3 ${styles.content}`}>
        //             {/* <BrowserRouter> */}
        //                 {/* <Routes> */}
        //                 {/* <Route path="/" element ={<Home/>}/> */}
        //                 {/* <Route path="/" element ={<Login/>}/> */}
                           
        //                 {/* </Routes> */}
        //             {/* </BrowserRouter> */}
        //         </div>
        //     </div>
        // </div>

    );
}

export default NavBar