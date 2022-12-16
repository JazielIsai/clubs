import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

export const NavigationByClub = () => {
  
  const { id: id_club } = useParams();


  return (
    <div>
        <ul className="nav flex-column">
              
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to={`/admin/activities/${id_club}`}> Actividades </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/admin/evidences/${id_club}`}> Evidencias </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#"> Eventos </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to={`/admin/members/${id_club}`}> Miembros </NavLink>
            </li>

        </ul>
    </div>
  )
}
