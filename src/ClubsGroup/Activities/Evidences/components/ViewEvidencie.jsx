import {useContext} from "react";
import {ClubContext} from "../../../../Context/ClubContext";
import {urlDBLogin} from "../../../../Shared/baseUrl";
import {ViewPDF} from "./ViewPDF";


export const ViewEvidencies = ( { evidencies, handleAddTab } ) => {

    const { dataEvidencie } = useContext(ClubContext);

    console.log(dataEvidencie);

    return (
        <div className='container'>

            {
                dataEvidencie?.ruta ? (
                    <ViewPDF
                        pathFile = {urlDBLogin.concat(dataEvidencie?.ruta.slice(2, dataEvidencie?.ruta.length))}
                    />
                ) : (
                    <div className={'bg-light bg-opacity-10'} > Cargando... </div>
                )
            }

        </div>
    )
}