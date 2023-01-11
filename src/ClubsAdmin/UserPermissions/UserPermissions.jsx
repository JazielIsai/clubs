import {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../Auth";
import {useFetch_RequestGet} from "../../hooks/useFetchGet";

export const UserPermissions = () => {


    return (
        <>
            <div className={'container'}>

                <h3>Permisos de usuario</h3>

                <div className={'row'}>

                    <div className={'col-12 col-md-6'}>

                    </div>

                    <div className={'col-12 col-md-6'}>

                    </div>

                </div>

            </div>
        </>
    )
}