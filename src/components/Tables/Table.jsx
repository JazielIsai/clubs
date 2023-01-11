import { useState, useEffect } from "react";
import { Button } from "./Components";

// setColumns accepts array with objects that defined the columns of the table and field name as key,
// its names will be headerName for show in the header
// and the name "field" for relation of each row that belong the column
// and the name "hidden" for hide the column and its content

// setRows accepts array with the rows of the table

// setButtons accepts array with objects that defined the buttons of the table and field name as key,
// its names will be "label" for show in the button
// and the name "function" for the function that will be executed when the button is clicked
// and the name "icon" for the icon that will be showed in the button


export const Table = ( {onCaption = false, getColumns = [], getRows = [], getButtons = false } ) => {

    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        try {

            setColumns(getColumns);
            setRows(getRows);
            setButtons(getButtons);

        } catch (error) {
            console.log(error);
        }
    }, [getColumns, getRows, getButtons]);

    return (
        <div className={'table-responsive'}>
            <table className="table caption-top table-borderless table-hover">

                {
                    onCaption && (
                        <caption className="text-center">
                            {onCaption}
                        </caption>
                    )
                }

                <thead>
                    <tr>
                        {
                            columns.map( (column, index) => {

                                if(column.hidden) return null;

                                return (
                                    <th key={column?.field}>
                                        {column?.headerName}
                                    </th>
                                )
                            } )
                        }
                    </tr>
                </thead>

                <tbody>

                {
                    rows.map( (row, index) => (
                        <tr key={index}>
                            {
                                columns.map( (column, index) => {

                                    if(column?.hidden) return null;

                                    return (
                                        <td key={index}>
                                            {
                                                column?.type === 'button' ? (
                                                    <Button
                                                        key={index}
                                                        name={column?.field}
                                                        label={column?.label}
                                                        icon={column?.icon}
                                                        onClick={(e)=>column?.onClick(e, row)}
                                                        style={column?.style}
                                                        nameClass={column?.nameClass}
                                                    />
                                                ) : (
                                                    row[column?.field]
                                                )
                                            }
                                        </td>
                                    )
                                })

                            }

                            {
                                buttons &&
                                buttons.map( (button, index) => {
                                    return (
                                        <td key={index}>
                                            <button className={'btn d-flex m-auto'} style={button.style} onClick={ () => button?.onClick(row) }>
                                                {button?.label} {button?.icon}
                                            </button>
                                        </td>
                                    )
                                })
                            }

                        </tr>
                    ))
                }

                </tbody>
            </table>
        </div>
    )
}
