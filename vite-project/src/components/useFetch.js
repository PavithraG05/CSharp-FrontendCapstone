import {useState, useEffect} from 'react';

const baseUrl = "https://localhost:7226/api/v1/";

export default function useFetch(url,token){
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function init(){
            try{
                const response = await fetch(baseUrl + url, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                if(response.ok){
                    const json = await response.json();
                    setData(json);
                }
                else{
                    throw response;
                }
            }
            catch (e){
                setError(e);
            }finally {
                setLoading(false);
            }
        }
        init();
    },[url]);
    return {data, error, loading};
}