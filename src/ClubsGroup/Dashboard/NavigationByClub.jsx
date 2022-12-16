import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavigationByClub = () => {
  return (
    <div>
        <ul className="nav flex-column">
              
            <li className="nav-item">
            <NavLink className="nav-link active" aria-current="page" to="/admin/activities"> Actividades </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/admin/evidences"> Evidencias </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="#"> Eventos </NavLink>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/admin/members"> Miembros </NavLink>
            </li>

        </ul>
    </div>
  )
}
