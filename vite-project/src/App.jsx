import { useState } from "react";
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Books from "./components/Books";
import Genres from "./components/Genres";
import Authors from "./components/Authors";
import PageNotFound from "./components/PageNotFound";

function App() {
  const [loginSuccessState, setLoginSuccessState] = useState(true);
  
  return (
    <div className="App">
      {/* <NavBar/> */}
      <BrowserRouter>
          <Routes>
            <Route path="/login" element ={<Login setLoginSuccessState={setLoginSuccessState}/>}/>
            <Route path="/books" element ={<Books loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState}/>}/>
            <Route path="/authors" element ={<Authors loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState}/>}/>
            <Route path="/genres" element ={<Genres loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState}/>}/>
            <Route path="*" element={<PageNotFound/>}/>

            {/* <Route path="/login" element ={!loginSuccessState ? <Login setLoginSuccessState={setLoginSuccessState}/>
                                                              :<Books loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState}/>}/>
            <Route path="/" element ={!loginSuccessState ? <Login setLoginSuccessState={setLoginSuccessState}/> : <Books loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState}/>}/>
            <Route path="/books" element ={loginSuccessState ? <Books loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState}/> : <Login setLoginSuccessState={setLoginSuccessState}/>}/>
            <Route path="/authors" element ={loginSuccessState && <Authors loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState}/>}/>
            <Route path="/genres" element ={loginSuccessState ? <Genres loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState}/>: <Login setLoginSuccessState={setLoginSuccessState}/>}/>
            <Route path="*" element={<PageNotFound/>}/> */}
          </Routes>
        </BrowserRouter>

    </div>
  )
}

export default App
