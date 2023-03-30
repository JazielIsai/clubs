import React, {useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Auth';
import logo_itesi from '../Assets/img/LogoITESI.png'
import {useFetch_RequestGet, useDataCollectionRequest} from "../hooks/useFetchGet";
import {urlDBLogin} from "../Shared/baseUrl";
import {requestGet} from "../helpers";

export const HeaderUser = () => {

  const { user, logout } = useContext(AuthContext); // Get the context

  const navigate = useNavigate();

  const { data: getClub } = useFetch_RequestGet(`get_club_by_id&club_id=${user.id_club}`);

  const [ dataClub, setDataClub ] = useState('');

  const [img, setImg] = useState();

  const {data: fotoUser} = useFetch_RequestGet(
      `get_photo_by_user&user_id=${user.user_id}`,
      `row`
  )

  const handleLogout = () => {
    logout();
    navigate('/auth');
  }

  
  const handleNavigateEditUser = (user_id) => {
    navigate(`updateUser/${user_id}`);
    console.log('este es mi user id,',user_id);
  }

  useEffect(() => {
    requestGet(`get_photo_by_user&user_id=${user.user_id}`)
        .then( (fotoUser) => {
          fotoUser = JSON.parse(fotoUser)[0]
          setImg(urlDBLogin.concat(fotoUser?.ruta.split(/^\.\//, fotoUser?.ruta.length)[1]));

        } )
    try {

     setDataClub(JSON.parse(getClub))
    } catch (error) {
      console.log(error);
    }

  }, [getClub])

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <NavLink to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <img src={logo_itesi} alt="logo" width="50" height="50" />
          </NavLink>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

            <li><NavLink to="/club/dashboard" className="nav-link px-2 link-primary"> { user.club } </NavLink></li>

            <li><NavLink to={`/club/updateClub/${user.id_club}`} className="nav-link px-2 link-dark">Editar Club</NavLink></li>

          </ul>


          <div className="dropdown text-end d-flex flex-row">

            <div className=" mb-lg-0 me-lg-3">
              <p className=''> { user.name } {' '} { user.lastname } </p>
            </div>

            <NavLink to="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={img} alt="mdo" width="32" height="32" className="rounded-circle"/>
            </NavLink>
            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
              <li><NavLink className="dropdown-item" to={`/club/updateUser/${user?.user_id}`}>Perfil</NavLink></li>
              <li><NavLink className="dropdown-item" to={`/club/updateUser/${user?.user_id}`}>Configuración</NavLink></li>
              <li><hr className="dropdown-divider"/></li>
              <li><button className="dropdown-item" onClick={handleLogout} >Cerrar Sesión</button></li>
            </ul>
          </div>
        </div>
      </div>
  </header>
  )
}
