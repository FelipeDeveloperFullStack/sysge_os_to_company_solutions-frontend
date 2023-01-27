interface ColumnProps {
  field: string
  headerName: string
  width?: number
  id?: number | string
}

export const columns: ColumnProps[] = [
  { field: 'description', headerName: 'Peça', width: 400 },
]
