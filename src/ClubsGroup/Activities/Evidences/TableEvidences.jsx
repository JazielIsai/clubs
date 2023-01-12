import React, {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../../Auth";
import {useFetch_RequestGet} from "../../../hooks/useFetchGet";


export const TableEvidences = ({ id_activity }) => {

    const {data: evidencesByActivity} = useFetch_RequestGet(`get_evidences_by_activity&id_activity=${id_activity}`)

    const [ getDataEvidences, setDataEvidences ] = useState();
    const [ getColumnEvidences, setColumnEvidences ] = useState();

    useEffect( () => {
        try {

            console.log(JSON.parse(evidencesByActivity)[0]);
            setColumnEvidences(JSON.parse(evidencesByActivity)[0]);
            setDataEvidences(JSON.parse(evidencesByActivity));


        } catch (err) {
            console.log(err);
        }
    }, [evidencesByActivity] )


    return (
        <table className='table caption-top'>
            <caption> Evidencias entregadas </caption>
            <thead>
            <tr>
                {
                    getColumnEvidences !== undefined &&
                    getColumnEvidences !== null &&
                    Object.keys(getColumnEvidences).map( (keyRow, index) => {
                        if (keyRow == 'id') { return null; }
                        if (keyRow == 'id_actividad') { return null; }

                        keyRow = keyRow.replace(/_/g, ' ');
                        keyRow = keyRow.replace(/(^\w{1})|(\s+\w{1})/g, letra => letra.toUpperCase());

                        return (
                            <th key={index} scope="col"> {keyRow} </th>
                        )
                    })
                }

                <th scope="col"> Editar </th>
                <th scope="col"> Eliminar </th>

            </tr>
            </thead>
            <tbody>
            {
                getDataEvidences !== undefined &&
                getDataEvidences !== null &&
                getDataEvidences.map(  (valueRow, index) => {

                    return (
                        <tr key={index} >
                            <td>{valueRow?.nombre}</td>
                            <td>{valueRow?.tipo}</td>
                            <td>{valueRow?.ruta}</td>
                            <td>
                                <button className='btn btn-primary' >Editar</button>
                            </td>
                            <td>
                                <button className='btn btn-danger'>Eliminar</button>
                            </td>
                        </tr>
                    )

                })
            }

            </tbody>
        </table>
    )
}