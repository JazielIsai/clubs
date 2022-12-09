import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div className="col-md-4 d-flex align-items-center">
            <NavLink to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="logo" width="40" height="32" />
            </NavLink>
            <span className="text-muted">© 2021 Company, Inc</span>
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
