import React from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {


  return (
    <header className="p-3 mb-3 border-bottom">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <NavLink to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
            <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="logo" width="40" height="32" />
          </NavLink>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><NavLink to="/admin/viewClubs" className="nav-link px-2 link-dark">Clubs</NavLink></li>
            <li><NavLink to="/admin/ViewUsers" className="nav-link px-2 link-dark">Usuarios</NavLink></li>
            <li><NavLink to="#" className="nav-link px-2 link-dark">Customers</NavLink></li>
            <li><NavLink to="#" className="nav-link px-2 link-dark">Products</NavLink></li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
          </form>

          <div className="dropdown text-end">
            <NavLink to="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
            </NavLink>
            <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
              <li><NavLink className="dropdown-item" to="#">New project...</NavLink></li>
              <li><NavLink className="dropdown-item" to="#">Settings</NavLink></li>
              <li><NavLink className="dropdown-item" to="#">Profile</NavLink></li>
              <li><hr className="dropdown-divider"/></li>
              <li><NavLink className="dropdown-item" to="#">Sign out</NavLink></li>
            </ul>
          </div>
        </div>
      </div>
  </header>
  )
}
