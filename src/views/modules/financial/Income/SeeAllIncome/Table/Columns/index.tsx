import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import { useModal } from 'src/hooks/useModal'
import { DeleteConfirmation } from '../../messages/DeleteConfirmation'
import { Income } from '../adapter'
import { UpdateConfirmation } from '../../messages/UpdateConfirmation'

type ColumnsProps = {
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

export const useColumns = (props: ColumnsProps) => {
  const { showMessage } = useModal()

  const onHandleDeleteRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const { clientName, id, osNumber, valueFormated } = params.row as Income
      showMessage(DeleteConfirmation, {
        osNumber,
        id,
        valueFormated,
        clientName,
        setMakeRequest: props.setMakeRequest,
      })
    }
  }

  const onHandleUpdateSituationRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const { clientName, id, valueFormated } = params.row as Income
      showMessage(UpdateConfirmation, {
        valueFormated,
        clientName,
        id,
        setMakeRequest: props.setMakeRequest,
      })
    }
  }

  const columns: GridColDef[] = [
    { field: 'clientName', headerName: 'Nome', width: 410 },
    { field: 'osNumber', headerName: 'Nº OS' },
    {
      field: 'valueFormated',
      headerName: 'Valor',
    },
    {
      field: 'situation',
      headerName: 'Status',
      width: 125,
      renderCell: (params: GridCellParams) => {
        const situation = params.value as string
        return (
          <Chip
            label={situation === 'PAGO' ? 'RECEBIDO' : 'PENDENTE'}
            color={situation === 'PAGO' ? 'success' : 'warning'}
          />
        )
      },
    },
    {
      field: 'formOfPayment',
      headerName: 'Forma Pagamento',
      width: 170,
    },
    { field: 'dateOS', headerName: 'Data' },
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
          >
            <PublishedWithChangesIcon />
          </IconButton>
          {params.row.situation === 'PENDENTE' && (
            <>
              <IconButton
                aria-label="delete"
                color="default"
                onClick={() => onHandleDeleteRow(params)}
              >
                <DeleteForeverIcon />
              </IconButton>
            </>
          )}
        </>
      ),
    },
  ]
  return columns
}
