import Home from './Home';
import Authors from "./Authors"
import Books from "./Books"
import Genres from "./Genres"
import PageNotFound from "./PageNotFound"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import styles from './navbar.module.css'

const NavBar = () => {
    return(
        // <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.navbarHeader}`}>
        //     <div className="container-fluid gx-0">
        //         <a className={`navbar-brand ${styles.navbarBrand}`} href="/" >
        //             <img src="" alt="3D fonts"/>
        //         </a>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon"></span>
        //         </button>
        //         <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        //             <div className={`navbar-nav ${styles.headerNav}`}>
        //                 <a className="nav-link header-nav-link active text-white" aria-current="page" href="/"><i className={`bi bi-house-door-fill ${styles.houseFill}`}></i>&nbsp;Home</a>
        //                 {/* <a className="nav-link header-nav-link text-white" aria-current="page" href="/books"><i className={`bi bi-house-door-fill ${styles.houseFill}`}></i>&nbsp;Books</a>
        //                 <a className="nav-link header-nav-link text-white" aria-current="page" href="/authors"><i className={`bi bi-house-door-fill ${styles.houseFill}`}></i>&nbsp;Authors</a>
        //                 <a className="nav-link header-nav-link text-white" aria-current="page" href="/genres"><i className={`bi bi-house-door-fill ${styles.houseFill}`}></i>&nbsp;Genres</a> */}
        //                 {/* <li className="nav-item header-nav-link dropdown">
        //                     <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        //                         <i className={`bi bi-pencil-fill`}></i>&nbsp;Books
        //                     </a>
        //                     <ul className={`dropdown-menu ${styles.todoHeaderDropdown}`}>
        //                         <li><a className={`dropdown-item ${styles.todoHeaderDropdownList} text-white`} href="/addtodo">Add Todos</a></li>
        //                         <li><a className={`dropdown-item ${styles.todoHeaderDropdownList} text-white`} href="/viewtodo">View Todos</a></li>
        //                     </ul>
        //                 </li> */}
            
        //                 <a className="nav-link header-nav-link todo_link text-white" href="#"><i className={`bi bi-person-circle ${styles.personCircle}`}></i>&nbsp;Admin</a>
        //             </div>
        //         </div> 
        //     </div>
        // </nav>
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-light ${styles.navbarHeader}`}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100">
                        <a href="/" className={`d-flex align-items-center pb-3 mb-md-0 me-md-auto ${styles.navbarBrand}`}>
                            <span className="d-none d-sm-inline text-dark">
                                <img src="/name2.png" alt="book logo"/>
                            </span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            <li className={`nav-item ${styles.navlinks}`}>
                                <a href="/" className={`nav-link align-middle px-0 ${styles.navLinkColor} ${styles.navlinkfirst}`}>
                                    <i className="fs-4 bi-house-door"></i> <span className={`ms-1 d-none d-sm-inline`}>Home</span>
                                </a>
                            </li>
                            <li className={`nav-item ${styles.navlinks}`}>
                                <a href="/books" className={`nav-link px-0 align-middle ${styles.navLinkColor}`}>
                                <i class="fs-4 bi bi-book-half"></i> <span className={`ms-1 d-none d-sm-inline`}>Books</span> </a>
                                {/* <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1 </a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2 </a>
                                    </li>
                                </ul> */}
                            </li>
                            <li className={`nav-item ${styles.navlinks}`}>
                                <a href="/authors" className={`nav-link px-0 align-middle ${styles.navLinkColor}`}>
                                    <i class="fs-4 bi bi-person-vcard-fill"></i> <span className={`ms-1 d-none d-sm-inline`}>Authors</span></a>
                            </li>
                            <li className={`nav-item ${styles.navlinks}`}>
                                <a href="/genres" className={`nav-link px-0 align-middle ${styles.navLinkColor}`}>
                                <i class="fs-4 bi bi-journal-text"></i> <span className={`ms-1 d-none d-sm-inline`}>Genres</span></a>
                                {/* <ul className="collapse nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                                    <li className="w-100">
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 1</a>
                                    </li>
                                    <li>
                                        <a href="#" className="nav-link px-0"> <span className="d-none d-sm-inline">Item</span> 2</a>
                                    </li>
                                </ul> */}
                            </li>
                            
                        </ul>
                        <hr/>
                        <div className={`dropdown pb-4 ${styles.navlinks}`}>
                            <a href="#" className="d-flex align-items-center text-black text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="/femaleavatar.png" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                                <span className="d-none d-sm-inline mx-1 text-black">Admin</span>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-light text-small shadow ">
                                {/* <li><a className="dropdown-item" href="#">New project...</a></li> */}
                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li><a className="dropdown-item" href="#">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`col py-3 ${styles.content}`}>
                    <BrowserRouter>
                        <Routes>
                        <Route path="/" element ={<Home/>}/>
                        <Route path="/books" element ={<Books/>}/>
                        <Route path="/authors" element ={<Authors/>}/>
                        <Route path="/genres" element ={<Genres/>}/>
                        <Route path="*" element={<PageNotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </div>

    );
}

export default NavBar