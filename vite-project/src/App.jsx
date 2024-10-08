import { useState, useEffect } from "react";
import Login from "./components/Login"
import NavBar from "./components/NavBar"
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Books from "./components/Books";
import Genres from "./components/Genres";
import Authors from "./components/Authors";
import PageNotFound from "./components/PageNotFound";
import Home from "./components/Home";
import TokenProvider from "./components/TokenProvider";

function App() {
  const [loginSuccessState, setLoginSuccessState] = useState(true);
  //const [token, setToken] = useState();
  


  return (
    <div className="App">
      <TokenProvider>
      {/* <NavBar/> */}
      <BrowserRouter>
          <Routes>
            <Route path="/" element ={<Home/>}/>
            <Route path="/login" element ={<Login setLoginSuccessState={setLoginSuccessState}/>}/>
            <Route path="/books" element ={<Books loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState} />}/>
            <Route path="/authors" element ={<Authors loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState} />}/>
            <Route path="/genres" element ={<Genres loginSuccessState={loginSuccessState} setLoginSuccessState={setLoginSuccessState} />}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
        </TokenProvider>
    </div>
  )
}

export default App
