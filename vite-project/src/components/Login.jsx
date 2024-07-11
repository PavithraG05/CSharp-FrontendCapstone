import styles from './login.module.css'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Login = ({setLoginSuccessState}) => {

    const loginData = {
        username:"",
        password:"",
    }

    const navigate = useNavigate();
    const [login, setLogin] = useState(loginData);
    // const [loginSuccessState, setLoginSuccessState] = useState(false);
    const [nameError, setNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [apiErr, setApiError] = useState("");
    const [failuremsg, setFailuremsg] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    

    // useEffect(()=>{
    //     setLogin(loginData);
    //     setSuccessMessage("")
    //     setNameError("")
    //     setApiError("")
    //     setPasswordError("")
    // },[])

    function showHidePassword(){
        setShowPassword(!showPassword);
    }

    function handleChange(e){
        setSuccessMessage("");
        const name = e.target.name;
        const value = e.target.value;
        // console.log(name,value);
        setLogin((login) => ({
            ...login,
            [name]: value,
        })
      );
    }

    function handleName(){
        setNameError("");
        if(!login.username){
            setNameError("Username should not be empty");
        }
    }

    function handlePassword(){
        setPasswordError("");
        if(!login.password){
            setPasswordError("Password should not be empty");
        }
    }

    function validateLogin(){
        console.log(login);
        fetch('http://localhost:3000/api/users',
            {
                method: "POST",
                headers:{"content-type":"application/json"},
                body: JSON.stringify(login)
            }
        )
        .then((response) => response.json())
        .then(data => {
            // alert("Todo added successfully");
            console.log(JSON.stringify(data));
            if(data){
                console.log("Login success");
                setLoginSuccessState(true);
                navigate('/books');
            }else{
                console.log("Login failed");
                setLoginSuccessState(false);
                setFailuremsg("Incorrect Username or Password!")
            }
        })
        .catch((error) => {
            console.log(error);
            setApiError("Error adding details to API");
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        if(login.username && login.password){
            console.log(`${login.username} ${login.password}`);
            validateLogin();
            // checklogin();
        }
        else{
            !login.username ? setNameError("Username should not be empty") : setNameError("");
            !login.password ? setPasswordError("Password should not be empty") : setPasswordError("");
        }
    }


    return(
        <>
        <div className={`${styles.loginContainer} rounded-0`}>
            <form>
                <div className="form-group p-2">
                    <label className="form-label">Username*</label>
                    <input type="text" className={nameError?`${styles.fieldBorderColor} form-control`:"form-control"} value={login.username} name="username" onChange={handleChange} onBlur={handleName}/>
                    {nameError && <div className={styles.errorFormField}>
                        {nameError}
                    </div>}
                </div>
                    
                <div className="form-group p-2">
                    <label className="form-label">Password* </label>
                    <input type={showPassword?"password":"text"} className={ passwordError ? `${styles.fieldBorderColor} form-control`:"form-control"} name="password" value={login.password} onChange={handleChange} onBlur={handlePassword}/>
                    <i className={`bi bi-eye-fill ${styles.eyeFill}`} onClick = {showHidePassword}></i>
                    {passwordError && <div className={styles.errorFormField}>
                        {passwordError}
                    </div>}
                </div>

                
                {apiErr && <div className={styles.errorFormField}>{apiErr}</div>}

                <div className="row p-3 justify-content-center">
                    <button className={`btn text-white ${styles.loginBtn} rounded-0`} type="submit" onClick={handleSubmit}>LOGIN</button>
                </div>
            </form>
            {successMessage && <div className={`${styles.successMsg}`}><i className="bi bi-check-circle-fill text-success"></i> &nbsp;{successMessage} </div>}
            {failuremsg && <div className={`${styles.failureMsg}`}><i className="bi bi-x-circle-fill text-danger"></i> &nbsp;{failuremsg} </div>}
        </div>
        </>
    )
}

export default Login