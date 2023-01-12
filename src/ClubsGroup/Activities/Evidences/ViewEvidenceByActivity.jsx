import React, {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../../Auth";
import {useFetch_RequestGet} from "../../../hooks/useFetchGet";
import {TableEvidences} from "./TableEvidences";

export const ViewEvidenceByActivity = () => {

    const navigate = useNavigate();
    const { id_activitie, nameActivitie } = useParams();



    return (
        <>
            <div className='row'>

                <div className='col-12 col-md-6'>


                </div>

                <div className='col-12 col-md-6' >

                    <TableEvidences id_activity={id_activitie} />

                </div>

            </div>
        </>
    )
}