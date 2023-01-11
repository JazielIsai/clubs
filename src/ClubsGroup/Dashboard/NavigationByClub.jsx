import React, {useContext} from 'react'
import { NavLink, useParams } from 'react-router-dom'
import {AuthContext} from "../../Auth";

export const NavigationByClub = () => {

    const { user } = useContext(AuthContext);

    const { id: id_club } = useParams();



  return (
    <div>
        <ul className="nav flex-column">

            <li className="nav-item">
              <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to={user?.id_club != null ? `/club/activities/${id_club}` : `/admin/activities/${id_club}`}
              >
                  Actividades
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                  className="nav-link"
                  to={ user?.id_club != null ? `/club/evidences/${id_club}` : `/admin/evidences/${id_club}`}
              >
                  Evidencias
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                  className="nav-link"
                  to={ user?.id_club ? `/club/events_public` : `/admin/events_public` }
              >
                  Eventos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                  className="nav-link"
                  to={ user?.id_club ? `/club/members/${id_club}` : `/admin/members/${id_club}`}
              >
                  Miembros
              </NavLink>
            </li>

            <li className="nav-item">
                <NavLink
                    className="nav-link"
                    to={ user?.id_club ? `/club/members/${id_club}` : `/admin/members/${id_club}`}
                >
                    Reportes
                </NavLink>
            </li>

        </ul>
    </div>
  )
}
