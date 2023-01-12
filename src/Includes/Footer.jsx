import React from 'react';
import { NavLink } from 'react-router-dom';
import logo_itesi from '../Assets/img/LogoITESI.png'

export const Footer = () => {
  return (
    <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
            <NavLink to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                <img src={logo_itesi} alt="logo" width="40" height="40" />
            </NavLink>
            <span className="text-muted">© 2022 Clubs ITESI </span>
            </div>

            <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3"><NavLink className="text-muted" to="#">  </NavLink></li>
            <li className="ms-3"><NavLink className="text-muted" to="#">  </NavLink></li>
            <li className="ms-3"><NavLink className="text-muted" to="#">  </NavLink></li>
            </ul>
        </footer>
    </div>
  )
}
