import React from 'react'
import { AdminActivities } from './Components/Activities/AdminActivities'
import { AdminClubs } from './Components/Clubs/AdminClubs'
import { AdminMembers } from './Components/Members/AdminMembers'

export const AdminGeneral = () => {
  return (
    <div>
        <nav>
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Clubs</button>
                <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Actividades</button>
                <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Miembros</button>
            </div>
        </nav>
        <div className="tab-content w-100" id="nav-tabContent">
            <div className="tab-pane fade show active w-100" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                <div className='container w-100 mt-4 m-auto'>
                    <AdminClubs />
                </div>
            </div>
            <div className="tab-pane fade w-100" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">
                <div className='container w-100 mt-4 m-auto'>
                    <AdminActivities />
                </div>
            </div>
            <div className="tab-pane fade w-100" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex="0">
                <div className='container w-100 mt-4 m-auto'>
                    <AdminMembers />
                </div>
            </div>
        </div>
    </div>
  )
}
