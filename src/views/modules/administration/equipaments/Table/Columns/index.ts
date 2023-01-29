interface ColumnProps {
  field: string
  headerName: string
  width?: number
  id?: number | string
}

export const columns: ColumnProps[] = [
  { field: 'equipamentName', headerName: 'Equipamento', width: 400 },
  { field: 'brand', headerName: 'Marca', width: 400 },
  { field: 'model', headerName: 'Modelo', width: 400 },
  { field: 'serialNumber', headerName: 'Nº de série', width: 400 },
]
