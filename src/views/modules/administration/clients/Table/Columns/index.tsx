// interface ColumnProps {
//   field: string
//   headerName: string
//   width?: number
//   id?: number | string
// }

// export const columns: ColumnProps[] = [
//   { field: 'name', headerName: 'Nome', width: 400 },
//   // { field: 'address', headerName: 'Endereço', width: 200 },
//   // { field: 'city', headerName: 'Cidade', width: 200 },
//   // { field: 'uf', headerName: 'UF', width: 200 },
//   { field: 'cpfOrCnpj', headerName: 'CPF/CNPJ', width: 90 },
//   { field: 'phoneNumber', headerName: 'Telefone', width: 90 },
// ]

import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { useModal } from 'src/hooks/useModal'
import RemoveConfirmation from '../../messages/RemoveConfirmation'
import { ClientT } from 'src/store/Types'
import { ADMINISTRATION_CLIENTS_EDIT } from 'src/layouts/typePath'
import { useHistory } from 'react-router-dom'
import { CLIENTES_EDITAR, CLIENTES_EXCLUIR } from '../../../permissions/static/keysPermissions'
import { usePermission } from 'src/hooks/usePermission'

export const useColumns = () => {
  const { showMessage } = useModal()
  const history = useHistory()
  const { hasPermission } = usePermission()

  const onHandleDeleteRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const client = params.row as ClientT
      showMessage(RemoveConfirmation, client)
    }
  }

  const onHandleUpdateRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const client = params.row as ClientT
      history.push(ADMINISTRATION_CLIENTS_EDIT, client)
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      width: 450,
    },
    {
      field: 'address',
      headerName: 'Endereço',
      width: 500,
      renderCell: (params: GridCellParams) => {
        const { address, city, uf } = params.row as ClientT
        return (
          <div>
            <div>
              {address} - {city}/{uf}
            </div>
          </div>
        )
      },
    },
    {
      field: 'phoneNumber',
      headerName: 'Telefone',
      renderCell: (params: GridCellParams) => {
        const { phoneNumber, phoneNumberFixo } = params.row as ClientT
        return (
          <div>
            <div>{phoneNumber}</div>
            <div>{phoneNumberFixo}</div>
          </div>
        )
      },
    },
    {
      field: 'group-buttons',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => onHandleUpdateRow(params)}
            disabled={!hasPermission(CLIENTES_EDITAR)}
          >
            <EditIcon />
          </IconButton>
          <>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => onHandleDeleteRow(params)}
              disabled={!hasPermission(CLIENTES_EXCLUIR)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
        </>
      ),
    },
  ]
  return columns
}
