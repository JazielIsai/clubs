import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useFetch_RequestGet } from '../../hooks/useFetchGet';
import { useDataCollectionRequest } from '../../hooks/useDataCollectionRequest';
import {useForm} from "../../hooks/useForm";
import {AlertDialog, AlertSuccess, AlertToast, requestGet, requestPost} from "../../helpers";
import logo_itesi_nombre from '../../Assets/img/LogoITESI.png';
import {urlDBLogin} from "../../Shared/baseUrl";
import Swal from "sweetalert2";

export const UpdateUser = ({}) => {

    const {user_id} = useParams();
    const { dataForm, onInputChange} = useForm({});

    const [enabledEdit, setEnabledEdit] = useState(true);
    const [imgProfile, setImgProfile] = useState(logo_itesi_nombre); //variable para guardar la imagen que se va a mostrar
    const [getImgProfileToUpload, setGetImgProfileToUpload] = useState(null); //variable para guardar la imagen que se va a subir
    const [imgName, setImgName] = useState(null);
    const [disable, setDisable] = useState(true);

    const refInputImg = useRef();

    const id = parseInt(user_id);

    //const data
    const { dataCollectionRequest: user } = useDataCollectionRequest(
        `get_user_by_id&user_id=${user_id}`,
        'row'
    );

    const { dataCollectionRequest: rolesUser } = useDataCollectionRequest(
        `get_all_roles`,
        'all'
    );

    const {dataCollectionRequest: clubUser} = useDataCollectionRequest(
        `get_all_clubs`,
        `all`
    );

    const Dialog = async (title, message, confirmButtonText, denyButtonText) => {
        return await Swal.fire({
            title: title,
            showDenyButton: true,
            confirmButtonText: confirmButtonText,
            denyButtonText: denyButtonText,
        })
    }


    const uploadImgProfile = (image) =>{

        const photo_data ={
            id_user: id,
            nombre: imgName
        }

        const formData = new FormData();
        formData.append('photo_data', JSON.stringify(photo_data));
        formData.append('nameUser', user?.nombre);
        formData.append('file_photo', image);

        requestPost('add_photo', formData)
            .then((response) => {
                if (response.trim() >= 1) {
                    fotoUpdate();
                    AlertToast('Edicción exitoso', 'success', 3000);
                } else {
                    AlertToast('Edicción fallida', 'error', 3000);
                }
                console.log('la respuesta, ',response);
            })
            .catch((error) => {
                console.log('error: ',error);
            })


    }

    const handleDisabled = () => {
        setEnabledEdit(!enabledEdit)
    }        
    const handleClickChangeImg = (e) => {
        refInputImg.current.click();
    }
    const handleUploadImg = (e) => {
        const file = e.target.files[0]; //file es un objeto que contiene la imagen, pero no se puede guardar en la base de datos, solo se puede guardar la ruta
        const reader = new FileReader(); //reader es un objeto que nos permite leer archivos
        reader.readAsDataURL(file); //lee la imagen y la convierte en base64, para poder guardarla en la base de datos, pero no se muestra en el front
        reader.onload = () => { //cuando se termine de leer la imagen, se ejecuta el codigo que esta dentro de la funcion
            Dialog('¿Desea subir esta imagen?','Alerta', 'Aceptar', 'Cancelar')
                .then((result) => {
                    if(result){
                        setImgProfile(reader.result); //sirve para mostrar la imagen, pero no se guarda en la base de datos, solo se guarda la ruta
                        //setGetImgProfileToUpload(file); //sirve para guardar la imagen en la base de datos

                        setImgName(file.name);
                        setDisable(true)
                        uploadImgProfile(file)
                    }else{
                        setImgProfile(logo_itesi_nombre)
                    }

                })
        }
    }

    const handleUpdate = (e) =>{
        e.preventDefault();

        const body = {
            id:user_id,
            nombre:dataForm?.nombre || user?.nombre,
            correo:dataForm?.correo || user?.correo,
            contraseña:dataForm?.contraseña || user?.contraseña,
            fecha_creacion: user?.fecha_creacion,
            id_rol:dataForm?.id_rol || user?.id_rol,
            id_club:dataForm?.id_club || clubUser.id //en un ternario las || sirven para que si no se selecciona nada, se guarde el valor que ya tiene, por lo que id_club es el id del club que ya tiene el usuario
        }
        console.log(body);

        const formData = new FormData();
        formData.append('user_info', JSON.stringify(body));
        requestPost('update_user', formData)
            .then( response => {
                console.log('Respuesta, '+response.trim());
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
    const fotoUpdate = () =>{
        requestGet(`get_photo_by_user&user_id=${user_id}`)
            .then( (fotoUser) => {
                fotoUser = JSON.parse(fotoUser)[0]
                setGetImgProfileToUpload( urlDBLogin.concat(fotoUser?.ruta.split(/^\.\//, fotoUser?.ruta.length)[1]) )
                setDisable(false)
            } )
    }

    useEffect(() => {

        try {
            if (disable) {
                requestGet(`get_photo_by_user&user_id=${user_id}`)
                    .then( (fotoUser) => {
                        fotoUser = JSON.parse(fotoUser)[0]
                        setGetImgProfileToUpload( urlDBLogin.concat(fotoUser?.ruta.split(/^\.\//, fotoUser?.ruta.length)[1]) )
                        setDisable(false)
                    } )
            }
        } catch (err) {

        }
    },[imgProfile, imgName, disable, setGetImgProfileToUpload])

    return (
        <div className="row justify-content-center align-content-center align-items-center m-4 mt-0">

            <div className="col-md-6 col-12 ">
                <div className="d-flex align-items-center justify-content-center">
                    <img className='img-fluid mx-auto' style={{width: '80%'}} src={logo_itesi_nombre} alt="Logo itesi" />
                </div>

            </div>

            <div className="col-md-6 col-12 ">
                <section className='container'>

                    <h2 className='mt-3 mb-3 text-center'> {enabledEdit?"Información el usuario":"Editar usuario"} </h2>

                    <div className='text-center'>
                        <img className='img-fluid rounded-3' src={getImgProfileToUpload || imgProfile} alt="" onClick={handleClickChangeImg} style={{ width: '130px', height: '130px', borderRadius: '50%', backgroundSize: 'cover' }}/>
                        <input type="file" className='d-none' ref={refInputImg} onChange={handleUploadImg}/>
                    </div>


                    <form>

                        <div className="form-group mt-3">
                            <label for="name_user"> Nombre del Usuario: </label>
                            <input disabled={enabledEdit} type="text" className="form-control" id="nombre" onChange={onInputChange} defaultValue={user?.nombre} placeholder="" name="nombre" />
                        </div>

                        <div className="form-group mt-3">
                            <label for="email_user"> Email del Usuario: </label>
                            <input disabled={enabledEdit} type="text" className="form-control" onChange={onInputChange} defaultValue={user?.correo} id="correo" placeholder="Ej:" name="correo" />
                        </div>

                        <div className="form-group mt-3">
                            <label for="password_user"> Contraseña del Usuario: </label>
                            <input disabled={enabledEdit} type="text" className="form-control" id="contraseña" onChange={onInputChange} defaultValue={user?.contraseña} placeholder="Ej:" name="contraseña" />
                        </div>

                        {/* <div className="form-group mt-3">
                            <label for="password_user"> Confirmar Contraseña del Usuario: </label>
                            <input type="text" className="form-control" id="password_user" placeholder="Ej:" name="password_user" />
                        </div> */}

                        <div className="form-group mt-3">
                            <label for="role_user"> Rol del Usuario: </label>
                            <select disabled={enabledEdit} onChange={onInputChange} className="form-control" id="id_rol" name="id_rol">
                                <option selected={user?.id_rol === 1} value={1}>Administrador</option>
                                <option selected={user?.id_rol === 2} value={2}>Presidente</option>
                                <option selected={user?.id_rol === 3} value={3}>Consultor</option>


                            </select>
                        </div>

                        <div className="form-group mt-3">  
                            <label for="club_user"> Club del Usuario: </label>
                            <select disabled={enabledEdit} onChange={onInputChange} className="form-control" id="id_club" name="id_club">
                                {

                                    clubUser !== null &&
                                    clubUser !== undefined &&
                                        clubUser.map( (club, index) => {
                                            return(
                                                <option selected={user?.id_club != null && user?.id_club === club.id} value={club.id}> {club.name} </option>
                                            )
                                        } )
                                }
                            </select>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-6 mt-3 d-flex justify-content-center">
                                <input type="button" className={"btn ".concat(enabledEdit?"btn-primary":"btn-danger")} value={enabledEdit?"Editar Club":"Cancelar"} id="" onClick={handleDisabled}/>
                            </div>

                            <div className="col-6 mt-3 d-flex justify-content-center">
                                <input disabled={enabledEdit} type="submit" className="btn btn-success" value="Guardar Club" id="" onClick={handleUpdate}/>
                            </div>
                        </div>


                    </form>

                </section>
            </div>



        </div>
    )
}