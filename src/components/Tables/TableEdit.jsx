import { useState, useEffect } from "react";
import { Button, Input, Select } from "./Components";


export const TableEdit = ( {onCaption = false, getColumns = [], getRows = [], getButtons = false } ) => {

    const [columns, setColumns] = useState(getColumns);
    const [rows, setRows] = useState(getRows);
    const [buttons, setButtons] = useState(getButtons);

    useEffect(() => {
        try {
            setColumns(getColumns);
            setRows(getRows);
            setButtons(getButtons);

        } catch (error) {
            console.log(error);
        }
    }, [getColumns, rows]);

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

                            if(column?.hidden) return null;

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
                                                column?.type === 'select' ? (
                                                    <Select
                                                        key={index}
                                                        options={column?.options}
                                                        onChange={(e)=>column?.onChange(e, row)}
                                                        valueSelected={ column?.valueSelected ? column?.valueSelected : row[column?.field]}
                                                        name={column?.field}
                                                    />
                                                ) : column?.type === 'text' ||
                                                    column?.type === 'date' ||
                                                    column?.type === 'number' ||
                                                    column?.type === 'file' ? (
                                                        <Input
                                                            key={index}
                                                            type={column?.type}
                                                            defaultValue={row[column?.field]}
                                                            onChange={(e)=>column?.onChange(e, row)}
                                                            name={column?.field}
                                                        />
                                                    ) : column?.type === 'button' ? (
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
                                            <button
                                                className={'btn d-flex m-auto'}
                                                style={button.style}
                                                onClick={ (e) => button?.onClick(e, row) }
                                            >
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


