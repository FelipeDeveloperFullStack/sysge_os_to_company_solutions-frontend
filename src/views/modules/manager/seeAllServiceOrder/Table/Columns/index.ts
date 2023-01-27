interface ColumnProps {
  field: string
  headerName: string
  width?: number
  id?: number | string
}

export const columns: ColumnProps[] = [
  { field: 'clientName', headerName: 'Cliente', width: 400 },
  { field: 'osNumber', headerName: 'Nº OS', width: 400 },
  { field: 'dateOS', headerName: 'Data', width: 400 },
  { field: 'status', headerName: 'Status', width: 400 },
]
