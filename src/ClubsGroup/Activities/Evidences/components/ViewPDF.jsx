import { useState } from "react";
import { Document, Page } from 'react-pdf';



export const ViewPDF = ( { pathFile = '' } ) => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    console.log(pathFile)

    return (
        <div className=''>

            <Document
                file={ { url: pathFile, httpHeaders: { 'X-CustomHeader': '40359820958024350238508234' }, withCredentials: true } }
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
        </div>
    )
}