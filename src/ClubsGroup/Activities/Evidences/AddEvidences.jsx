import React, {useState} from 'react'
import {useForm} from "../../../hooks/useForm";
import {useParams} from "react-router-dom";
import {requestPost} from "../../../helpers";

export const AddEvidences = () => {

    const { club_id, id_activitie } = useParams();

    const { dataForm, onInputChange, onResetForm } = useForm({});

    const [getFile, setFile] = useState();

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const onHandleAddEvidence = () => {

        const body = {
            nombre: dataForm?.nombre,
            descripcion: dataForm?.descripcion,
            id_actividad: id_activitie
        }

        const formData = new FormData();
        formData.append('evidence_info', JSON.stringify(body));
        formData.append('id_club', club_id);
        formData.append('nameClub','');
        formData.append('file_evidencia_info', getFile);

        requestPost('', formData)
            .then( (res) => {

                console.log(res);

            } )
            .catch( (err) => {
                console.log(err)
            } )

    }


    return (
    <div className='container'>
        <form>

            <div className='form-floating mb-3'>
              <input type="text" className="form-control" onChange={onInputChange} id="floatingName" name={'nombre'} />
              <label htmlFor="floatingName">Nombre</label>
            </div>

            <div className='form-floating mb-3'>
              <input type="text" className="form-control" id="floatingDesc" onChange={onInputChange} name={'descripcion'}  />
              <label htmlFor="floatingName">Descripcion</label>
            </div>

            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupFile01" >Subir archivos</label>
              <input type="file" className="form-control" id="inputGroupFile01" onChange={handleFile}  name={'file_evidence[]'} />
            </div>

            <div className='d-flex justify-content-end'>
              <button className='btn btn-success' onClick={onHandleAddEvidence}>
                Enviar evidencia
              </button>
            </div>

        </form>
    </div>
    )
}
