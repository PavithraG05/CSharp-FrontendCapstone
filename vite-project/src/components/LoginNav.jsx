import styles from './loginnav.module.css'

const LoginNav = () => {
    return(
        <>
        <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${styles.navbarHeader}`}>
            <div className="container-fluid gx-0">
                <a className={`navbar-brand ${styles.navbarBrand}`} href="/" >
                    <img src="/name.png" alt="3D fonts"/>
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
        </>
    )
}

export default LoginNav;