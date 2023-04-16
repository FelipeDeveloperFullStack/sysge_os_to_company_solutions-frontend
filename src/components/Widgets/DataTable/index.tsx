import * as React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { DataGridStyled } from './styles'
interface TypeGenericRowWithId {
  id: string
}

type DataTableProps<TypeGenericRow> = {
  rows: TypeGenericRow[] & TypeGenericRowWithId[]
  columns: GridColDef[]
  pageSize?: number
  checkboxSelection?: boolean
  setCellClick?: (cellClick: TypeGenericRow[]) => void
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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGridStyled
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[10]}
        checkboxSelection={checkboxSelection}
        autoHeight
        onCellClick={(e) => {
          if (!e.value) {
            if (setCellClick)
              // @ts-ignore
              setCellClick((previousState: TypeGenericRowWithId[]) => [
                ...previousState.filter((item) => item.id !== e.row.id),
                e.row,
              ])
          } else {
            // @ts-ignore
            setCellClick((previousState: TypeGenericRowWithId[]) => {
              const resultFilter = previousState.filter(
                (item) => item.id !== e.row.id,
              )
              return [...resultFilter]
            })
          }
        }}
        localeText={customLocaleText}
      />
    </div>
  )
}
