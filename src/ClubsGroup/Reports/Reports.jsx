import {useState} from "react";
import {useParams} from "react-router-dom";

export const Reports = () => {

    const {club_id} = useParams();

    const [reports, setReports] = useState([]);

    return (
        <div className={'container'}>
            <h1>Reportes</h1>
        </div>
    )
}