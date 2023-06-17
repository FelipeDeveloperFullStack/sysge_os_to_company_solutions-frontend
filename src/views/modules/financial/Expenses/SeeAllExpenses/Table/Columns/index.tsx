import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import SyncIcon from '@mui/icons-material/Sync'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import { useModal } from 'src/hooks/useModal'
import { DeleteConfirmation } from '../../messages/DeleteConfirmation'
import { Expense } from '../adapter'
import { UpdateConfirmation } from '../../messages/UpdateConfirmation'
import { DESPESAS_EDITAR, DESPESAS_EXCLUIR } from 'src/views/modules/administration/permissions/static/keysPermissions'
import { usePermission } from 'src/hooks/usePermission'

type ColumnsProps = {
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

export const useColumns = (props: ColumnsProps) => {
  const { showMessage } = useModal()
  const { hasPermission } = usePermission()

  const onHandleDeleteRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const { id, valueFormated, expense, status } = params.row as Expense
      showMessage(DeleteConfirmation, {
        id,
        valueFormated,
        expense,
        status,
        setMakeRequest: props.setMakeRequest,
      })
    }
  }

  const onHandleUpdateSituationRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const { id, valueFormated, status, expense } = params.row as Expense
      showMessage(UpdateConfirmation, {
        valueFormated,
        id,
        situation: status,
        expense,
        setMakeRequest: props.setMakeRequest,
      })
    }
  }

  const columns: GridColDef[] = [
    { field: 'expense', headerName: 'Despesa', width: 370 },
    {
      field: 'valueFormated',
      headerName: 'Valor',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 125,
      renderCell: (params: GridCellParams) => {
        const situation = params.value as string
        return (
          <Chip
            label={situation === 'PAGO' ? 'PAGO' : 'A PAGAR'}
            color={situation === 'PAGO' ? 'success' : 'warning'}
          />
        )
      },
    },
    {
      field: 'isRegister',
      headerName: 'Peças',
      width: 170,
      renderCell: (params: GridCellParams) => {
        const isRegister = params.value as boolean
        return (
          <Chip
            label={isRegister ? 'REGISTRADO' : 'NÃO REGISTRADO'}
            color={isRegister ? 'info' : 'secondary'}
          />
        )
      },
    },
    { field: 'dateIn', headerName: 'Entrada' },
    { field: 'maturity', headerName: 'Vencimento' },
    {
      field: 'group-buttons',
      headerName: ' ',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <>
          <IconButton
            aria-label="update"
            color="info"
            onClick={() => onHandleUpdateSituationRow(params)}
            disabled={!hasPermission(DESPESAS_EDITAR)}
          >
            {params.row.situation?.toUpperCase().trim() === 'A PAGAR' ? (
              <PublishedWithChangesIcon />
            ) : (
              <SyncIcon />
            )}
          </IconButton>
          <>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => onHandleDeleteRow(params)}
              disabled={!hasPermission(DESPESAS_EXCLUIR)}
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
