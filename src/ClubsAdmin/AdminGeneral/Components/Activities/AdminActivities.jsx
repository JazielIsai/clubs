import React from 'react'
import { Abilitis } from './Abilitis'
import { Lenguage } from './Lenguage'
import { TipoAct } from './TipoAct'

export const AdminActivities = () => {
  return (
    <div className="d-flex align-items-start">
        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button className="nav-link active" id="v-pills-habilidades-tab" data-bs-toggle="pill" data-bs-target="#v-pills-habilidades" type="button" role="tab" aria-controls="v-pills-Habilidades" aria-selected="true">Habilidades</button>
            <button className="nav-link" id="v-pills-lenguage-tab" data-bs-toggle="pill" data-bs-target="#v-pills-lenguage" type="button" role="tab" aria-controls="v-pills-lenguage" aria-selected="false">Idiomas</button>
            <button className="nav-link" id="v-pills-activity-tab" data-bs-toggle="pill" data-bs-target="#v-pills-activity" type="button" role="tab" aria-controls="v-pills-activity" aria-selected="false">Tipo de Actividad</button>
        </div>
        <div className="tab-content w-100" id="v-pills-tabContent">
            <div className="tab-pane fade show active w-100 " id="v-pills-habilidades" role="tabpanel" aria-labelledby="v-pills-habilidades-tab" tabIndex="0">
                <Abilitis />
            </div>
            <div className="tab-pane fade w-100" id="v-pills-lenguage" role="tabpanel" aria-labelledby="v-pills-lenguage-tab" tabIndex="0">
                <Lenguage />
            </div>
            <div className="tab-pane fade w-100" id="v-pills-activity" role="tabpanel" aria-labelledby="v-pills-activity-tab" tabIndex="0">
                <TipoAct />
            </div>
        </div>
    </div>
  )
}
