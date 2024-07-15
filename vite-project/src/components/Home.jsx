import styles from './home.module.css'

const Home = () => {
    return(
        <>
        <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.navbarHeader}`}>
            <div className="container-fluid gx-0">
                <a href="/login" className={`d-flex align-items-center pb-0 mb-md-0 me-md-auto ${styles.navbarBrand}`}>
                    <img src="/book_logo.png" className={styles.logoImg}/>
                    <span className="d-none d-sm-inline text-dark">
                        <img src="/name.png" alt="book logo" className={styles.logo}/>
                    </span>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    <div className={`navbar-nav ${styles.headerNav}`}>
                        <a className="nav-link header-nav-link active text-white" aria-current="page" href="/"><i className={`bi bi-house-door-fill ${styles.houseFill}`}></i>&nbsp;Home</a>
            
                        <a className="nav-link header-nav-link todo_link text-white" href="/login"><i className={`bi bi-person-circle ${styles.personCircle}`}></i>&nbsp;Login</a>
                    </div>
                </div> 
            </div>
        </nav>
        <div className={`col-lg-12 ${styles.homeBlockquote}`}>
            {/* <img src="" className={styles.bannerImg}/> */}
            <div className="row">
                {/* <a href="/login" className={`d-flex align-items-center pb-0 mb-md-0 me-md-auto ${styles.navbarBrand}`}>
                    <img src="/book_logo.png" className={styles.logoImg}/>
                    <span className="d-none d-sm-inline text-dark">
                        <img src="/name2.png" alt="book logo" className={styles.logo}/>
                    </span>
                </a> */}
            </div>
            <br/>
            <blockquote className="blockquote">
                <p className={styles.homeBlockquoteText}>One stop place to effectively manage the books available in book store.</p>   
                <a className={`btn ${styles.homeBtn}`} href="/login" type="button">Get Started for a Demo&nbsp;<i className="bi bi-arrow-right-circle-fill"></i></a> 
            </blockquote>
        </div>

        <div className="col-lg-12">
            <div>
                <h5 className={`${styles.homeFeaturesTitle} text-center`}>Explore all features "BookHaven" has to offer</h5>
            </div>
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-3">
                <div className="col px-4 py-2">
                    <div className="card rounded-0">
                        <img src="/bookstore1.svg" className={`${styles.homeCardImgTop}`} alt="..."/>
                        <div className="card-body text-center">
                            <h5 className="card-title">Manage Books Effectively</h5>
                            <p>Create, access and manage the books available in the store effectively via BookHaven.</p>
                        </div>
                    </div>
                </div>

                <div className="col px-4 py-2">
                    <div className="card rounded-0">
                        <img src="/bookstore2.png" className={`${styles.homeCardImgTop}`} alt="..."/>
                        <div className="card-body text-center">
                            <h5 className="card-title">Authors and Book Categories</h5>
                            <p>Along with the books, book related authors and categories can also be stored, viewed and managed in BookHaven.</p>
                        </div>
                    </div>
                </div>

                <div className="col px-4 py-2">
                    <div className="card rounded-0">
                        <img src="/bookstore3.jpg" className={`${styles.homeCardImgTop}`} alt="..."/>
                        <div className="card-body text-center">
                            <h5 className="card-title">Search Filter and Sort</h5>
                            <p>Search, sort and filter to quickly locate books, authors and genres based on selected criteria in BookHaven.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='bg-light'>
            <div className='row pullright'>
                
            </div>
            <br/>
            <div>
                <div className="row border border-primary">
                    <div className="col-6 border border-dark">
                        <img src="bookstore2.png" className={styles.homeImg}/>
                    </div>
                    <div className="col-6 border border-dark">
                        <div className="row">
                            <a href="/login" className={`d-flex align-items-center pb-0 mb-md-0 me-md-auto ${styles.navbarBrand}`}>
                                <img src="/book_logo.png" className={styles.logoImg}/>
                                <span className="d-none d-sm-inline text-dark">
                                    <img src="/name2.png" alt="book logo" className={styles.logo}/>
                                </span>
                            </a>
                        </div>
                        <div className="row">
                            <div className="col-4 border border-warning">
                            Set Priorities and deadline to understand the urgency of the tasks and sort them based on the
                            </div>
                            <div className="col-4 border border-warning">
                            Set Priorities and deadline to understand the urgency of the tasks and sort them based on the
                            </div>
                            <div className="col-4 border border-warning">
                            Set Priorities and deadline to understand the urgency of the tasks and sort them based on the
                            </div>  
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        </>
    )
}

export default Home