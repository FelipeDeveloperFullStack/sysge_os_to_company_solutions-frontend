interface ColumnProps {
  field: string
  headerName: string
  width?: number
  id?: number | string
}

export const columns: ColumnProps[] = [
  { field: 'name', headerName: 'Nome', width: 400 },
  // { field: 'address', headerName: 'Endereço', width: 200 },
  // { field: 'city', headerName: 'Cidade', width: 200 },
  // { field: 'uf', headerName: 'UF', width: 200 },
  { field: 'cpfOrCnpj', headerName: 'CPF/CNPJ', width: 90 },
  { field: 'phoneNumber', headerName: 'Telefone', width: 90 },
]
