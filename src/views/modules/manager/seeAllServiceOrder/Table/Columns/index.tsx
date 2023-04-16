import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import PdfIcon from '@mui/icons-material/PictureAsPdf'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import { useModal } from 'src/hooks/useModal'
import RemoveConfirmation from '../../messages/RemoveConfirmation'
import { MappedDataServiceOrders } from '../../types'
import { useHistory } from 'react-router-dom'
import { MANAGER_SERVICE_ORDER_VIEW } from 'src/layouts/typePath'
import { OSData } from '../../../serviceOrder/create/type'
import { useAdmin } from 'src/services/useAdmin'
import { useLoading } from 'src/hooks/useLoading'
import { toast } from 'src/components/Widgets/Toastify'

export const useColumns = () => {
  const { showMessage } = useModal()
  const history = useHistory()
  const { apiAdmin } = useAdmin()
  const { Loading } = useLoading()

  const onHandleDeleteRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const serviceOrder = params.row as MappedDataServiceOrders
      showMessage(RemoveConfirmation, serviceOrder)
    }
  }

  const onHandleGeneratePDF = async (params: GridCellParams) => {
    const dataIncomeTable = params.row
    try {
      Loading.turnOn()
      const { data: oSData } = await apiAdmin.get(
        `orderServices/${dataIncomeTable.id}`,
      )
      console.log(oSData)
      history.push(MANAGER_SERVICE_ORDER_VIEW, { oSData })
    } catch (error) {
      toast.error('Opss! Houve um erro ao tentar gerar a Ordem de Serviço.')
    } finally {
      Loading.turnOff()
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Nome', width: 470 },
    { field: 'osNumber', headerName: 'Nº OS' },
    { field: 'dateOS', headerName: 'Data' },
    {
      field: 'total',
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
            label={situation}
            color={situation === 'PAGO' ? 'success' : 'warning'}
          />
        )
      },
    },
    {
      field: 'generatedOS',
      headerName: 'OS Gerada',
    },
    {
      field: 'group-buttons',
      headerName: ' ',
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <>
          {params.row.status === 'PENDENTE' && (
            <>
              <IconButton
                aria-label="PDF"
                color="info"
                onClick={() => onHandleGeneratePDF(params)}
              >
                <PdfIcon />
              </IconButton>

              {/* <IconButton aria-label="editar" color="info">
                <EditIcon />
              </IconButton> */}

              <IconButton
                aria-label="excluir"
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
