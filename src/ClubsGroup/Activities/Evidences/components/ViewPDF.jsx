
export const ViewPDF = ( { pathFile = '' } ) => {


    return (
        <div className={'w-100 h-100 d-flex flex-column'}>
            <object
                id={"pdfHolder"}
                data={pathFile}
                type="application/pdf"
                width="100%"
                height="100%"

            >
                <embed id={"pdfHolder"} src={pathFile} type="application/pdf" />
            </object>
        </div>
    )
}