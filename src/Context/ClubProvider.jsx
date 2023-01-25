import {useState} from "react";
import {ClubContext} from './ClubContext';


export const ClubProvider = ( {children} ) => {

    const [dataEvidencie, setDataEvidencie] = useState(null);


    return (
        <ClubContext.Provider
            value={{
                dataEvidencie,
                setDataEvidencie
            }}
        >
            {children}
        </ClubContext.Provider>
    )

}