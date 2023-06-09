import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { useModal } from 'src/hooks/useModal'
import UpdateInactiveConfirmation from '../../messages/RemoveConfirmation'
import { EquipamentT } from 'src/store/Types'
import { ADMINISTRATION_EQUIPAMENTS_EDIT, ADMINISTRATION_MANAGER_USER_EDIT } from 'src/layouts/typePath'
import { useHistory } from 'react-router-dom'
import { User } from '../../type'
import { formatCpf } from 'src/helpers/formatCpf'
import { useAuth } from 'src/hooks/useAuth';
import { Chip, Tooltip } from '@mui/material';

export const useColumns = () => {
  const { showMessage } = useModal()
  const { user } = useAuth()
  const history = useHistory()

  const onHandleUpdateRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const data = params.row as User
      showMessage(UpdateInactiveConfirmation, data)
    }
  }

  const onHandleUpdateSituationRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const data = params.row as User
      history.push(ADMINISTRATION_MANAGER_USER_EDIT, data)
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 300 },
    { field: 'email', headerName: 'E-mail', width: 300 },
    {
      field: 'cpf',
      headerName: 'CPF',
      width: 150,
      renderCell: (params: GridCellParams) => {
        const user = params.row as User
        return (
          <div>{formatCpf(String(user.cpf))}</div>
        )
      }
    },
    {
      field: 'typeUser',
      headerName: 'Tipo Usuário',
      width: 160,
      renderCell: (params: GridCellParams) => {
        const user = params.row as User
        return (
          <Chip
            label={user.typeUser === 'ADMIN' ? 'ADMINISTRADOR' : 'OPERADOR'}
            color={user.typeUser === 'ADMIN' ? 'info' : 'secondary'}
          />
        )
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 140,
      renderCell: (params: GridCellParams) => {
        const user = params.row as User
        return (
          <Chip
            label={user.status === 'ATIVO' ? 'ATIVO' : 'BLOQUEADO'}
            color={user.status === 'ATIVO' ? 'success' : 'error'}
          />
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
          <Tooltip title='Editar'>
            <IconButton
              aria-label="edit"
              color="info"
              onClick={() => onHandleUpdateSituationRow(params)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          {user.user?.username?.trim() !== params.row?.email.trim() && <>
            <Tooltip title={params.row.status === 'BLOQUEADO' ? 'Ativar' : 'Bloquear'}>
              <IconButton
                aria-label="update"
                color="error"
                onClick={() => onHandleUpdateRow(params)}
              >
                {params.row.status === 'BLOQUEADO' ? <LockIcon /> : <LockOpenIcon />}
              </IconButton>
            </Tooltip>
          </>}
        </>
      ),
    },
  ]
  return columns
}
