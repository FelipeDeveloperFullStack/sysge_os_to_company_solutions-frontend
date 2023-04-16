import * as React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

type DataTableProps<TypeGenericRow> = {
  rows: TypeGenericRow[]
  columns: GridColDef[]
  pageSize?: number
  checkboxSelection?: boolean
  setCellClick?: (cellClick: TypeGenericRow) => void
}

export const DataTable = <TypeGenericRow extends object>({
  columns,
  rows,
  pageSize = 10,
  checkboxSelection = false,
  setCellClick,
}: DataTableProps<TypeGenericRow>) => {
  const customLocaleText = {
    noRowsLabel: 'Nenhum registro encontrado',
  }

  const CustomFooter = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <span style={{ marginRight: 8 }}>Total:</span>
        <span>{'R$ 654,00'}</span>
      </div>
    )
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10]}
        checkboxSelection={checkboxSelection}
        autoHeight
        onCellClick={(e) => {
          if (!e.value) {
            if (setCellClick) setCellClick(e.row)
          }
        }}
        localeText={customLocaleText}
      />
    </div>
  )
}
