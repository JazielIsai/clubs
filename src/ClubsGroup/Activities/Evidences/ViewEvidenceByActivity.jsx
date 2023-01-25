import React, {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../../Auth";
import {useDataCollectionRequest} from "../../../hooks/useDataCollectionRequest";
import { Layout, Model } from "flexlayout-react";
import {layoutEvidenceByActivity} from "./Layout/layoutEvidenceByActivity";
import {FoldersEvidencies} from "./components/FoldersEvidencies";
import {ViewEvidencies} from "./components/ViewEvidencie";

export const ViewEvidenceByActivity = () => {

    const { activity_id, activity_name } = useParams();

    const navigate = useNavigate();

    const [model] = useState(Model.fromJson(layoutEvidenceByActivity));

    const { dataCollectionRequest : getActivity } = useDataCollectionRequest(
        '',
        'row'
    )

    const factory = (node, TabNode) => {
        let component = node.getComponent();

        if (component === "menu") {
            return (
                <div className='container'>
                    <h1 className={' fs-4 text-center mt-1 '}>
                        {activity_name}
                    </h1>
                </div>
            )

        } else if (component === "folders") {
            return (
                <FoldersEvidencies />
            )
        } else if (component === "evidences") {
            return (
                <ViewEvidencies />
            )
        }

    }


    return (
        <div className={'evidencie_by_activity'}>
            <Layout
                model={model}
                factory={factory}
            />
        </div>
    )
}