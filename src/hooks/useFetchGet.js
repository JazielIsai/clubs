import { useState, useEffect } from 'react';
import { urlDB } from '../Shared/baseUrl';

export const useFetch_RequestGet = ( nameServices ) =>{


    const [ stateData, setStateData ] = useState( {
        data: null,
        loading: true,
        error: null
    });


    useEffect( () => {
        setStateData({
            data: null,
            loading: true,
            error: null
        })

        fetch( urlDB.concat(nameServices) )
            .then( resp => resp.json() )
            .then( data => {               
                setStateData({
                    loading: false,
                    error: null,
                    data: data
                });

            })
            .catch( err => console.log("The error is: ",err) )

    }, [nameServices] )

    return stateData;
    
}

