import { useForm } from '../../hooks/useForm';
import { useParams } from 'react-router-dom';
import { useDataCollectionRequest } from '../../hooks/useDataCollectionRequest';
import { requestPost,AlertToast } from '../../helpers';
//import { useFetch_RequestGet } from '../../hooks/useFetchGet'

export const EditActivitie = () => {

  const { club_id, id_activitie } = useParams();
  const { dataForm, onInputChange, onResetForm } = useForm({});
  
  const { dataCollectionRequest: getActivity } = useDataCollectionRequest(
    `get_activities_by_id&activities_id=${id_activitie}`,
    'row'
  );
  
  const { dataCollectionRequest: getAllMembers } = useDataCollectionRequest(
    `get_users_by_club&club_id=${club_id}`,
    'all'
  );
  
  const{dataCollectionRequest: getAllTypeActivity}=useDataCollectionRequest(
    `get_all_type_activity`,
    'all'
  );
  
  const {dataCollectionRequest:getAllIdioma}=useDataCollectionRequest(
    'get_all_idioms',
    'all'
  );
  
  const {dataCollectionRequest:getAllHabilidades}=useDataCollectionRequest(
    'get_all_skills',
    'all'
  );

  const handleSendPost = (e) => {
    e.preventDefault();

    const body = {
    
      id: parseInt(id_activitie),
      nombre: dataForm.nombre || getActivity.nombre,
      modalidad: dataForm.modalidad || getActivity.modalidad,
      objetivo_desarrollo_s: dataForm.objetivo_s || getActivity.objetivo_desarrollo_s,
      atributo_egreso: dataForm.atributo_e || getActivity.atributo_egreso,
      calificacion_valor: dataForm.valor || getActivity.calificacion_valor,
      tipo_evidencia: dataForm.tipo_evidencia || getActivity.tipo_evidencia,
      responsable: dataForm.responsable || getActivity.responsable,
      observaciones: dataForm.observaciones || getActivity.observaciones,
      estatus: dataForm.estatus || getActivity.estatus,
      modelo: dataForm.modelo || getActivity.modelo,
      dominio: dataForm.dominio || getActivity.dominio,
      id_habilidad_desarrollada: parseInt(dataForm.habilidad) || getActivity.id_habilidad_desarrollada,
      id_tipo_actividad: parseInt(dataForm.tipo_activity) || getActivity.id_tipo_actividad,
      id_club:parseInt(club_id),
      fecha: dataForm.fecha || getActivity.fecha,
      id_idioma: parseInt(dataForm.idioma) || getActivity.id_idioma,
        
    }

    console.log("body",body);

    const formData = new FormData();
    formData.append('activity_info', JSON.stringify(body));
    requestPost('update_activity', formData)
        .then( response => {
            console.log(response);
            if (response.trim() == 1) {
                AlertToast('Edicción exitoso', 'success', 3000);
            } else {
                AlertToast('Edicción fallida', 'error', 3000);
            }
        })
        .catch( err => {
            console.log(err);
        })
}
 
 console.log("Data",getActivity);
  

  return (
    <div className='container'>
      <div className='row mt-4 mb-4 border-bottom  border-info'>
        <h3 className='text-center mt-3 mb-3'> Editar actividad </h3>
      </div>
        <form>
            
          <div className='row d-flex justify-content-between mt-4 mb-4'>
            <div className='col-12 col-md-6 form-floating ps-0 mb-3'>
              <input type="text" class="form-control" defaultValue={getActivity?.nombre} onChange={onInputChange} id="floatingName" name='nombre'/>
              <label for="floatingName">Nombre</label>
            </div>
            
            <div class="col-12 col-md-4 form-floating ps-0 mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={onInputChange} name='responsable'>
                <option selected>{getActivity?.responsable}</option>
                {
                  getAllMembers &&
                  
                  getAllMembers.map( (member, index) => (
                                    member.nombre !== getActivity.responsable &&
                                    <option key={index} value={member.nombre}> {member.nombre} </option>
                                    ))
                }
               
              </select>
              <label for="floatingSelect">Responsable</label>
            </div>
            
            <div className='col-12 col-md-2 form-floating ps-0 mb-3'>
              <input type="date-time" class="form-control" id="floatingAttribut" onChange={onInputChange}  defaultValue={getActivity?.fecha} name='fecha'/>
              <label for="floatingAttribut">Fecha y hora de registro</label>
            </div>
            
          </div>
          
          <div className='row d-flex justify-content-between mt-4 mb-4'>
            <div class="col-12 col-md-3 form-floating ps-0 mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={onInputChange}  name='tipo_activity'>
                <option selected disabled>{getActivity?.tipo_actividad}</option>
                {
                  getAllTypeActivity &&
                  
                  getAllTypeActivity.map( (type, index) => (
                                    type.nombre !== getActivity.tipo_actividad &&
                                    <option key={index} value={type.id}> {type.nombre} </option>
                                    ))
                }
              </select>
              <label for="floatingSelect">Tipo de actividad</label>
            </div>
            
            <div class="col-12 col-md-2 form-floating ps-0 mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={onInputChange} name='modalidad'>
                <option selected disabled>{getActivity?.modalidad}</option>
                <option value="Presencial"> Presencial </option>
                <option value="Virtual"> Virtual </option>
                <option value="Hibrido"> Hibrido </option>
              </select>
              <label for="floatingSelect">Modalidad</label>
            </div>
            
            <div class="col-12 col-md-3 form-floating ps-0 mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={onInputChange} name='tipo_evidencia'>
                <option selected disabled>{getActivity?.tipo_evidencia}</option>
                <option value="Reporte"> Reporte </option>
                <option value="Video"> Video </option>
                <option value="Foto"> Foto </option>
                <option value="Presentación"> Presentación </option>
                <option value="Conferencia"> Conferencia </option>
              </select>
              <label for="floatingSelect">Tipo de evidencia</label>
            </div>
            
            <div className='col-12 col-md-3 form-floating ps-0 mb-3'>
              <textarea class="form-control" id="floatingObjetive" defaultValue={getActivity?.objetivo_desarrollo_s} onChange={onInputChange} name='objetivo_s' ></textarea>
              <label for="floatingObjetive"> Objetivo de desarrollo Sustentable </label>
            </div>

          </div>
            
            
          <div className='row d-flex justify-content-between mt-4 mb-4'>
          
          <div class="col-12 col-md-3 form-floating ps-0 mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={onInputChange} name='habilidad'>
                <option selected>{getActivity?.habilidad}</option>
                {
                  getAllHabilidades &&
                  
                  getAllHabilidades.map( (habilidad, index) => (
                                    habilidad.nombre !== getActivity.habilidad &&
                                    <option key={index} value={habilidad.id}> {habilidad.nombre} </option>
                                    ))
                }
              </select>
              <label for="floatingSelect">Habilidad</label>
            </div>
            
            <div className='col-12 col-md-3 form-floating ps-0 mb-3'>
              <input type="text" class="form-control" defaultValue={getActivity?.atributo_egreso} onChange={onInputChange} id="floatingAttribut" name='atributo_e' />
              <label for="floatingAttribut">Atributo Egreso</label>
            </div>
            
            <div className='col-12 col-md-3 form-floating ps-0 mb-3'>
              <input type="text" class="form-control" defaultValue={getActivity?.calificacion_valor} onChange={onInputChange} id="floatingValue" name='valor'/>
              <label for="floatingValue"> Valor </label>
            </div>
            
            <div class="col-12 col-md-3 form-floating ps-0 mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={onInputChange} name='idioma'>
                <option selected>{getActivity?.idioma}</option>
                {
                  getAllIdioma &&
                  
                  getAllIdioma.map( (idioma, index) => (
                                    idioma.idioma !== getActivity.idioma &&
                                    <option key={index} value={idioma.id}> {idioma.idioma} </option>
                                    ))
                }
              </select>
              <label for="floatingSelect">Idioma</label>
            </div>
          
          </div>
            
          <div className='row d-flex justify-content-between mt-4 mb-4'>
          
            <div className='col-12 col-md-2 form-floating ps-0 mb-3'>
              <input type="text" class="form-control" id="floatinglanguage" defaultValue={getActivity?.modelo} onChange={onInputChange} name='modelo'/>
              <label for="floatinglanguage">Modelo</label>
            </div>
            
            <div class="col-12 col-md-2 form-floating ps-0 mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={onInputChange} name='estatus'>
                <option selected disabled >{getActivity?.estatus}</option>
                <option value="Realizada">Realizada</option>
                <option value="Reagendada">Reagendada</option>
                <option value="Candelada">Cancelada</option>
                <option value="Programada">Programada</option>
              </select>
              <label for="floatingSelect">Estatus</label>
            </div>
            
            <div class="col-12 col-md-2 form-floating ps-0 mb-3">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example" name='dominio' onChange={onInputChange}>
                <option selected>{getActivity?.dominio}</option>
                {
                  getActivity &&
                  
                    (getActivity?.dominio === 'Privado' ) 
                    ?
                    <option value="Público">Público</option>
                    :
                    <option value="Privado">Privado</option> 
                }
              </select>
              <label for="floatingSelect">Dominio</label>
            </div>
            
            <div className='col-12 col-md-6 form-floating ps-0 mb-3'>
              <input type="text" class="form-control" defaultValue={getActivity?.observaciones} onChange={onInputChange} id="floatinglanguage" name='observaciones' />
              <label for="floatinglanguage">Observaciones</label>
            </div>
            
          </div>
          
        <div className='row d-flex justify-content-center  mt-4 mb-4'>
          <button type="button" onClick={handleSendPost} className="col-md-3 btn btn-success">Guardar</button>
        </div>

        </form>
    </div>
  )
}
