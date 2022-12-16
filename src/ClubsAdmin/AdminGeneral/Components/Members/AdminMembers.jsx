import React from 'react'
import { Especialidad } from './Especialidad'
import { RolMember } from './RolMember'

export const AdminMembers = () => {
  return (
    <div className="d-flex align-items-start">
        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button className="nav-link active" id="v-pills-roles-tab" data-bs-toggle="pill" data-bs-target="#v-pills-roles" type="button" role="tab" aria-controls="v-pills-roles" aria-selected="true">Roles </button>
            <button className="nav-link" id="v-pills-especialidad-tab" data-bs-toggle="pill" data-bs-target="#v-pills-especialidad" type="button" role="tab" aria-controls="v-pills-especialidad" aria-selected="false">Especialidad</button>
        </div>
        <div className="tab-content w-100" id="v-pills-tabContent">
            <div className="tab-pane fade show active w-100" id="v-pills-roles" role="tabpanel" aria-labelledby="v-pills-roles-tab" tabIndex="0">
                <RolMember />
            </div>
            <div className="tab-pane fade w-100" id="v-pills-especialidad" role="tabpanel" aria-labelledby="v-pills-especialidad-tab" tabIndex="0">
                <Especialidad />
            </div>
        </div>
    </div>
  )
}
