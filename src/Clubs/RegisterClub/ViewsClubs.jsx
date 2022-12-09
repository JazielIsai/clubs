import React from 'react'
import { ListCardClubs } from './components/ListCardClubs'
import { TableClub } from './components/TableClub'


export const ViewsClubs = () => {



    return (
        <div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        View 1
                    </button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        View 2
                    </button>
                </div>
            </nav>
            <div className="tab-content container" id="nav-tabContent">
                <h2 className='text-center mt-3 mb-3' >Ver los clubs</h2>
                <div className="tab-pane m-2 fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0">
                    <ListCardClubs />
                </div>
                <div className="tab-pane m-2 fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0">
                    <TableClub />
                </div>
            </div>
        </div>
    )
}
