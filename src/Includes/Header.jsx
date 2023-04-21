import React, {useContext, useEffect, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Auth';
import logo_itesi from '../Assets/img/LogoITESI.png'
import {requestGet} from "../helpers";
import {urlDBLogin} from "../Shared/baseUrl";

export const Header = () => {

  const { user, logout } = useContext(AuthContext); // Get the context

  const navigate = useNavigate();

  const [img, setImg] = useState();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  }

  const handleNavigateEditUser = () => {
    navigate(`/admin/updateUser/`);
  }

  useEffect(() => {
    try {
      requestGet(`get_photo_by_user&user_id=${user.user_id}`)
          .then( (fotoUser) => {
            console.log(fotoUser)
            fotoUser = JSON.parse(fotoUser)[0]
            setImg(urlDBLogin.concat(fotoUser?.ruta.split(/^\.\//, fotoUser?.ruta.length)[1]));

          } )
    } catch (error) {
      console.log(error);
    }
  } , [])

  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <NavLink to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <img src={logo_itesi} alt="logo" width="50" height="50" />
          </NavLink>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

            <li><NavLink to="/admin/viewClubs" className="nav-link px-2 link-dark">Clubs</NavLink></li>
            <li><NavLink to="/admin/ViewUsers" className="nav-link px-2 link-dark">Usuarios</NavLink></li>
            <li><NavLink to="#" className="nav-link px-2 link-dark"> Evaluación </NavLink></li>
            <li><NavLink to="/admin/adminGeneral" className="nav-link px-2 link-dark"> Administración </NavLink></li>
            <li><NavLink to="/admin/reports" className="nav-link px-2 link-dark"> Reportes </NavLink></li>

          </ul>


          <div className="dropdown text-end d-flex flex-row">

            <div className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <p className=''> { user.name } {' '} { user.lastname } </p>
            </div>

            <NavLink to="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={img} alt="mdo" width="32" height="32" className="rounded-circle"/>
            </NavLink>
            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
              <li><NavLink className="dropdown-item" to={`/admin/updateUser/${user?.user_id}`}>Perfil</NavLink></li>
              <li><NavLink className="dropdown-item" to={`/admin/updateUser/config/${user?.user_id}`}>Configuración</NavLink></li>
              <li><hr className="dropdown-divider"/></li>
              <li><button className="dropdown-item" onClick={handleLogout} >Cerrar Sesión</button></li>
            </ul>
          </div>

        </div>
      </div>
  </header>
  )
}
