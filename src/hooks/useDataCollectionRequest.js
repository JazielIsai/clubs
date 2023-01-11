import {useState, useEffect} from "react";
import {useFetch_RequestGet} from "./useFetchGet";

export function useDataCollectionRequest ( url, method ) {

    const {data} = useFetch_RequestGet(url);

    const [dataCollectionRequest, setDataCollectionRequest] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        try {

            if (data) {
                if (method === 'row') {
                    setDataCollectionRequest(JSON.parse(data)[0]);

                } else {
                    setDataCollectionRequest(JSON.parse(data));
                }
            }

        } catch (error) {
            setError(error);
            console.log("useDataCollectionRequest: ", error);
        }

    },[data, method]);


    return {
        dataCollectionRequest,
        setDataCollectionRequest,
        error
    };
}