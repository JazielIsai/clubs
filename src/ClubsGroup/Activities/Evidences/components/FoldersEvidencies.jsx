import {useContext, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useDataCollectionRequest} from "../../../../hooks/useDataCollectionRequest";
import {SearchEvidence} from "./SearchEvidence";
import {ClubContext} from "../../../../Context/ClubContext";

export const FoldersEvidencies = ( { children } ) => {

    const { activity_id } = useParams();

    const { setDataEvidencie } = useContext(ClubContext);

    const { dataCollectionRequest : getEvidences } = useDataCollectionRequest(
        'get_evidences_by_activity&id_activity='+activity_id,
        'all'
    );

    const viewEvidence = (e, evidence) => {
        setDataEvidencie(evidence);
    }

    return (
        <div className={''}>

            <SearchEvidence />

            {
                getEvidences &&
                getEvidences.map( (item, index) => {

                    return (
                        <button
                            key={index}
                            className={'d-flex flex-column mb-2 w-100 bg-info bg-opacity-25 border-0'}
                            onClick={(e) => viewEvidence(e, item)}
                        >
                            <h5 className={'m-2 fs-6'}>
                                {item.nombre}
                            </h5>
                        </button>
                    )
                } )
            }
        </div>
    )
}