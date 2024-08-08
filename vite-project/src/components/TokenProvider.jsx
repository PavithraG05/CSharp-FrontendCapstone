import { TokenContext } from "./TokenContext";
import { useState, useContext } from "react";

export function useToken(){
    return useContext(TokenContext);
}

const TokenProvider = ({children}) => {
    const [authToken,setAuthToken] = useState("");
    const TokenAssign = (newToken) => {
        setAuthToken(newToken);
        console.log("setting token called")
        // You might also store the token in localStorage/sessionStorage here
      };
    return(
        <TokenContext.Provider value={{authToken,TokenAssign}}>
            {children}   
        </TokenContext.Provider>
    );
}

export default TokenProvider