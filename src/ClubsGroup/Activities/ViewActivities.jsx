import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFetch_RequestGet } from '../../hooks/useFetchGet';

export const ViewActivities = () => {

    const navigate = useNavigate();

    const { data } = useFetch_RequestGet(`get_activities_by_club_id&club_id=${2}`);

    const editUser = () => {

    }

    const deleteUser = () => {

    }

    return (
        <div className=''>          
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
