import React from 'react'
import { CategoryClub } from './CategoryClub'
import { EspecialidadClub } from './EspecialidadClub'
import { Plantel } from './Plantel'

export const AdminClubs = () => {
  return (
    <div className="d-flex align-items-start w-100">
        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button className="nav-link active" id="v-pills-category-tab" data-bs-toggle="pill" data-bs-target="#v-pills-category" type="button" role="tab" aria-controls="v-pills-category" aria-selected="true">Categoria</button>
            <button className="nav-link" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Especialiad</button>
            <button className="nav-link" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Plantel</button>
        </div>
        <div className="tab-content w-100" id="v-pills-tabContent">
            <div className="tab-pane fade show active w-100" id="v-pills-category" role="tabpanel" aria-labelledby="v-pills-category-tab" tabIndex="0">
                <CategoryClub />
            </div>
            <div className="tab-pane fade w-100" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabIndex="0">
                <EspecialidadClub />
            </div>
            <div className="tab-pane fade w-100" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabIndex="0">
                <Plantel />
            </div>
        </div>
    </div>
  )
}
