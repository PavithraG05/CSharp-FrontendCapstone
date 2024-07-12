import styles from './pagenotfound.module.css';
const PageNotFound = () => {
    return(
        <div className={styles.pageNotFoundContainer}>
            <a href="/login" className={`d-flex align-items-center pb-0 mb-md-0 me-md-auto ${styles.navbarBrand}`}>
                    <img src="/book_logo.png" className={styles.logoImg}/>
                    <span className="d-none d-sm-inline text-dark">
                        <img src="/name2.png" alt="book logo" className={styles.logo}/>
                    </span>
                    
                </a>
                <br/>
                <br/>
            <h3 className="text-center">404: Page not found</h3>
            <h6 className="text-center">The page you are looking for doesn't exist or error occured.<br/>Go back to <a href="/login">localhost:5173/login</a> to choose a new direction.</h6>
            <br/>
            <div className={styles.notFoundImage}>
                <img src='/404.png' />
            </div>
        </div>
    )
}

export default PageNotFound