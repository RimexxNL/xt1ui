import React, {FC, ReactElement} from "react"

interface DataTableProps {
    columns: TableColumn[]
    items: TableRow[]
}

export interface TableColumn {
    label: string
    width?: number
    dataIndex: string
}

export interface TableRow {
    [key: string]: string | ReactElement
}
const DataTable:FC<DataTableProps> = ({columns, items}) => {
    return (
        <>
            <table className={`xt1table`} style={{width:"100%"}}>
                <thead>
                    <tr key={`dtc-row`}>
                        {columns.map((column, index) => {
                            return (
                                <th style={{width:column.width||'auto'}} key={`thdi-${column.dataIndex}-${String(index)}`}>{column.label}</th>
                        )
                        })}
                    </tr>
                </thead>
                <tbody>
                { items.map((item, idx2) => {
                    return (
                        <tr key={`di2--${String(idx2)}`}>
                            {columns.map((column,idx) => {
                                return (
                                    <td key={`di-${column.dataIndex}-${String(idx)}`}>{item[column.dataIndex]}</td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default DataTable