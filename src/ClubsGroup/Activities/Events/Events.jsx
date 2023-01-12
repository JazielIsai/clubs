
import {Table} from "../../../components/Tables";
import {useDataCollectionRequest} from "../../../hooks/useDataCollectionRequest";

export const Events = () => {

    const { dataCollectionRequest : getActivitiesPublic, setDataCollectionRequest } = useDataCollectionRequest(
        'get_public_activities',
        'all',
    );



    return (
        <div className={'container'}>

            <div className={''}>
                <h4>Eventos</h4>
            </div>

            <div className={'row mt-3'}>
                <Table
                    getColumns={[
                        { field: 'id', headerName: 'ID', hidden: true, },
                        { field: 'nombre', headerName: 'Nombre' },
                        { field: 'modalidad', headerName: 'Modalidad' },
                        { field: 'fecha', headerName: 'Fecha' },
                        { field: 'club', headerName: 'Club que organiza' },
                        { field: 'lugar', headerName: 'Lugar' },
                    ]}
                    getRows={getActivitiesPublic ? getActivitiesPublic : []}

                />
            </div>
        </div>
    )
}