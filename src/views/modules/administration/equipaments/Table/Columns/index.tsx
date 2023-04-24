import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import { useModal } from 'src/hooks/useModal'
import RemoveConfirmation from '../../messages/RemoveConfirmation'
import { EquipamentT } from 'src/store/Types'
import { ADMINISTRATION_EQUIPAMENTS_EDIT } from 'src/layouts/typePath'
import { useHistory } from 'react-router-dom'

export const useColumns = () => {
  const { showMessage } = useModal()
  const history = useHistory()

  const onHandleDeleteRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const equipament = params.row as EquipamentT
      showMessage(RemoveConfirmation, equipament)
    }
  }

  const onHandleUpdateSituationRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const equipament = params.row as EquipamentT
      history.push(ADMINISTRATION_EQUIPAMENTS_EDIT, equipament)
    }
  }

  const columns: GridColDef[] = [
    { field: 'equipamentName', headerName: 'Equipamento', width: 410 },
    { field: 'brand', headerName: 'Marca', width: 200 },
    {
      field: 'model',
      headerName: 'Modelo',
      width: 200,
    },
    {
      field: 'serialNumber',
      headerName: 'Nº de Série',
      width: 200,
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
            onClick={() => onHandleUpdateSituationRow(params)}
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
