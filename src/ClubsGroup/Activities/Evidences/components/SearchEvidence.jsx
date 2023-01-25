import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";

export const SearchEvidence = () => {

    const { activity_id } = useParams();

    const [search, setSearch] = useState('');

    useEffect(() => {
        console.log(search);

    }, [search]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className={'m-2 mb-4 p-0'}>
            <input
                type="text"
                className={'form-control'}
                placeholder={'Buscar evidencia'}
                onChange={handleSearch}
            />
        </div>
    )
}