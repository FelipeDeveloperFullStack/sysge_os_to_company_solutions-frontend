import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { useModal } from 'src/hooks/useModal'
import RemoveConfirmation from '../../messages/RemoveConfirmation'
import { PieceT } from 'src/store/Types'
import { ADMINISTRATION_PIECES_EDIT } from 'src/layouts/typePath'
import { useHistory } from 'react-router-dom'
import { formatPrice } from 'src/helpers/formatPrice'

export const useColumns = () => {
  const { showMessage } = useModal()
  const history = useHistory()

  const onHandleDeleteRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const piece = params.row as PieceT
      showMessage(RemoveConfirmation, piece)
    }
  }

  const onHandleUpdateRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const piece = params.row as PieceT
      history.push(ADMINISTRATION_PIECES_EDIT, piece)
    }
  }

  const columns: GridColDef[] = [
    { field: 'description', headerName: 'Peça', width: 810 },
    {
      field: 'value',
      headerName: 'Preço',
      width: 200,
      renderCell: (params: GridCellParams) => {
        const { value } = params.row as PieceT
        return <span>{formatPrice(value)}</span>
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
            color="info"
            onClick={() => onHandleUpdateRow(params)}
          >
            <EditIcon />
          </IconButton>
          <>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => onHandleDeleteRow(params)}
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