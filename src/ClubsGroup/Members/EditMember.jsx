import React from 'react'
import {useParams} from "react-router-dom";
import { AlertToast } from '../../helpers';
import {useDataCollectionRequest} from "../../hooks/useDataCollectionRequest";
import {useForm} from "../../hooks/useForm";
import { requestPost} from '../../helpers';

export const EditMember = () => {

    const { club_id, id_member } = useParams();
    

    const { dataForm, onInputChange, onResetForm } = useForm({});

    const { dataCollectionRequest: getMember } = useDataCollectionRequest(
        `get_members_by_id&member_id=${id_member}`,
        'row'
    );
    
    const{dataCollectionRequest: getAllSpeciality}=useDataCollectionRequest(
        `get_all_speciality`,
        'all'
    );
    
    const{dataCollectionRequest: getAllRolMembers }=useDataCollectionRequest(
        `get_all_rol_members_clubs`,
        'all'
    );
    
   
   const handleSendPost = (e) => {
        e.preventDefault();

        const body = {
            id:parseInt(id_member),
            no_control:dataForm?.no_control || getMember?.no_control,
            nombre:dataForm?.name || getMember?.nombre,
            apellido_paterno:dataForm?.apellido_paterno || getMember?.apellido_paterno,
            apellido_materno:dataForm?.apellido_materno || getMember?.apellido_materno,
            id_especialidad:parseInt(dataForm?.id_speciality) || getMember?.id_especialidad,
            semestre:dataForm?.semestre || getMember?.semestre,
            id_club:parseInt(club_id),
            rango:dataForm?.rango || getMember?.rango,
            id_rol_member_club:parseInt(dataForm?.id_rol) || getMember?.id_rol_member_club,
            sexo:dataForm?.sexo || getMember?.sexo,
            correo:dataForm?.email || getMember?.correo,
            telefono:dataForm?.phone || getMember?.telefono,
        }

        console.log(body);

        const formData = new FormData();
        formData.append('member_info', JSON.stringify(body));
        requestPost('update_member', formData)
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
   
     
    return (
        <div className={'container'}>

            <form>
             
                <div className='row mt-4 mb-4 border-bottom  border-info'>
                    <label className='text-uppercase fst-normal mb-3 fs-5'>{getMember?.nombre_completo}</label>
                </div>
                
                <div className='row d-flex justify-content-between mt-4 mb-4'>
                    <div className='col-12 col-md-2 form-floating ps-0 mb-3'>
                        <input type="text" class="form-control" onChange={onInputChange} id="floatingNumberControl" name='no_control' defaultValue={getMember?.no_control} />
                        <label for="floatingNumberControl">Numero de Control</label>
                    </div>
                    
                    <div className='col-12 col-md-3 form-floating mb-3 ps-0'>
                        <input type="text" class="form-control" id="floatingName" onChange={onInputChange} name='name' defaultValue={getMember?.nombre} />
                        <label for="floatingName">Nombre(s)</label>
                    </div>
                    
                    <div className='col-12 col-md-3 form-floating mb-3 ps-0'>
                        <input type="text" class="form-control" id="floatingLastNameFather" onChange={onInputChange} name='apellido_paterno' defaultValue={getMember?.apellido_paterno} />
                        <label for="floatingLastNameFather">Apellido Paterno</label>
                    </div>
                    
                    <div className='col-12 col-md-3 form-floating mb-3 ps-0'>
                        <input type="text" className="form-control" id="floatingLastNameMather" onChange={onInputChange} name='apellido_materno' defaultValue={getMember?.apellido_materno}/>
                        <label for="floatingLastNameMather">Apellido Materno</label>
                    </div>
                </div>
                
                
                <div className='row d-flex justify-contet-between mt-4 mb-4'>
                    <div className=" col-12 col-md-5 form-floating ps-0 mb-3">
                        <select class="form-select" id="floatingSelect" name='id_speciality' onChange={onInputChange} aria-label="Floating label select example">
                            <option disable="true" selected>{getMember?.especialidad_miembro} </option>
                            {
                                getAllSpeciality &&
                                    getAllSpeciality.map( (speciality, index) => (
                                        speciality.nombre !== getMember.especialidad_miembro &&
                                        <option key={index} value={speciality.id}> {speciality.nombre} </option>
                                    ))
                            }
                        </select>
                        <label for="floatingSelect">Especialidad</label>
                    </div>
                    
                    <div className='col-12 col-md-1  form-floating mb-3 ps-0'>
                        <input type="text" className="form-control tenpm xt-center" id="floatingSemester" onChange={onInputChange} name='semestre' defaultValue={getMember?.semestre}/>
                        <label className="text-center" for="floatingSemester">Semestre</label>
                    </div>
                    
                    <div className='col-12 col-md-2  form-floating mb-3 ps-0'>
                        <input type="text" className="form-control " id="floatingClub" onChange={onInputChange} name='club' defaultValue={getMember?.nombre_club}/>
                        <label  for="floatingClub"> Club </label>
                    </div>
                    
                    <div className='col-12 col-md-2 form-floating mb-3 ps-0'>
                        <input type={'text'} class="form-control" id="floatingMember" onChange={onInputChange} name='rango' defaultValue={getMember?.rango} ></input>
                        <label for="floatingMember"> Rango </label>
                    </div>
                    
                    <div className="col-12 col-md-2 form-floating mb-3 ps-0">
                        <select className="form-select" id="floatingSelect" onChange={onInputChange} name="id_rol" aria-label="Floating label select example" >
                            <option disable="true" selected>{getMember?.rol_miembro} </option>
                            {
                                getAllRolMembers &&
                                  getAllRolMembers.map((rol,index)=>(
                                      rol.nombre !== getMember.rol_miembro &&
                                      <option key={index} value={rol.id}>{rol.nombre}</option>
                                  ))
                            }
                            
                        </select>
                        <label for="floatingSelect"> Rol </label>
                    </div>
                </div>
                
                <div className='d-flex row justify-content-between mt-4 mb-4'>
                    
                    <div class=" col-12 col-md-2 form-floating mb-3 ps-0">
                        <select class="form-select" id="floatingSelect" name='sexo' onChange={onInputChange} aria-label="Floating label select example" >
                            <option selected disabled>{getMember?.sexo}</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                        <label for="floatingSelect">Sexo</label>
                    </div>
                    
                    <div className='col-12 col-md-4 form-floating mb-3 ps-0'>
                        <input type={'email'} class="form-control" id="floatingEmail" name='email' onChange={onInputChange} defaultValue={getMember?.correo} ></input>
                        <label for="floatingEmail"> Email </label>
                    </div>
    
                    <div className='col-12 col-md-4 form-floating mb-3 ps-0'>
                        <input type={'text'} class="form-control" id="floatingPhone" name='phone' onChange={onInputChange} defaultValue={getMember?.telefono}></input>
                        <label for="floatingPhone"> Telefono </label>
                    </div>
                
                </div>
                    
                <div className='row d-flex justify-content-center mt-4'>
                    <button type="button" onClick={handleSendPost} className="col-md-3 btn btn-success">Guardar</button>
                </div>
                
                
            </form>
        </div>
    )
}
