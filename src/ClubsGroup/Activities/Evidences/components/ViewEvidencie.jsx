import {useContext} from "react";
import {ClubContext} from "../../../../Context/ClubContext";
import {urlDBLogin} from "../../../../Shared/baseUrl";
import {ViewPDF} from "./ViewPDF";


export const ViewEvidencies = ( { evidencies, handleAddTab } ) => {

    const { dataEvidencie } = useContext(ClubContext);

    return (
        <div className='w-100 h-100 d-flex '>

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