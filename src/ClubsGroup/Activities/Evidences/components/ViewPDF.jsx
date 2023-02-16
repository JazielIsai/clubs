import {useEffect} from "react";

export const ViewPDF = ( { pathFile = '' } ) => {


    useEffect(() => {

        const pdfHolder = document.getElementById('pdfHolder');
        pdfHolder.data = pathFile;

        return () => {
            pdfHolder.data = '';
            pathFile = '';
        }

    } , [pathFile])


    return (
        <div className={'w-100 h-100 d-flex flex-column'}>
            <object
                id={"pdfHolder"}
                type="application/pdf"
                width="100%"
                height="100%"

            >
            </object>
        </div>
    )
}