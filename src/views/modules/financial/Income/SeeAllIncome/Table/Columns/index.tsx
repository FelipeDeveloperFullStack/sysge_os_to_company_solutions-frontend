import { GridCellParams, GridColDef } from '@mui/x-data-grid'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
//import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
// import SyncIcon from '@mui/icons-material/Sync'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import { useModal } from 'src/hooks/useModal'
import { DeleteConfirmation } from '../../messages/DeleteConfirmation'
import { Income } from '../adapter'
import { UpdateConfirmation } from '../../messages/UpdateConfirmation'
import { RECEITAS_EDITAR, RECEITAS_EXCLUIR } from 'src/views/modules/administration/permissions/static/keysPermissions'
import { usePermission } from 'src/hooks/usePermission'
import { parse, isBefore, addDays } from 'date-fns'
import { NofiticationMessage, NotificationText } from './style'
import { Tooltip } from '@mui/material'
import TaskIcon from '@mui/icons-material/Task';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import UploadDocument from 'src/views/modules/manager/seeAllServiceOrder/messages/UploadDocument'
import { AddPartialIncome } from '../../messages/AddPartialIncome';

type ColumnsProps = {
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

export const useColumns = (props: ColumnsProps) => {
  const { showMessage } = useModal()
  const { hasPermission } = usePermission()

  const onHandleDeleteRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const { clientName, id, osNumber, valueFormated, idFileCreatedGoogleDrive } = params.row as Income
      showMessage(DeleteConfirmation, {
        osNumber,
        id,
        valueFormated,
        clientName,
        setMakeRequest: props.setMakeRequest,
        idFileCreatedGoogleDrive,
      })
    }
  }
  const onHandlePartialIncomes = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const { clientName, id, osNumber, valueFormated } = params.row as Income
      showMessage(AddPartialIncome, {
        id,
        osNumber,
        valueFormated,
        clientName,
        setMakeRequest: props.setMakeRequest,
      })
    }
  }

  const onHandleUpdateSituationRow = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const { clientName, id, valueFormated, situation } = params.row as Income
      showMessage(UpdateConfirmation, {
        valueFormated,
        clientName,
        id,
        situation,
        setMakeRequest: props.setMakeRequest,
      })
    }
  }

  const onUploadDocument = (params: GridCellParams) => {
    if (params.field === 'group-buttons') {
      const serviceOrder = params.row as Income
      showMessage(UploadDocument, { ...serviceOrder, setMakeRequest: props.setMakeRequest, }, true)
    }
  }

  const columns: GridColDef[] = [
    {
      field: 'clientName', headerName: 'Nome', width: 410,
      renderCell: (params: GridCellParams) => {
        const data = params.row as Income
        return (
          <>
            <NofiticationMessage>
              {!data?.isPartial && <div>{data.clientName}</div>}
              {data?.isPartial && <div><b>[PARCIAL]</b> {data.clientName}</div>}
              <section>
                {((data.isSendNowDayMaturityBoleto || data.isSendThreeDayMaturityBoleto) && data.situation === 'PENDENTE') && <NotificationText>Notificação de cobrança enviado</NotificationText>}
                {(!data?.isBoletoUploaded && data.formOfPayment === 'Boleto' && data.situation === 'PENDENTE') && <NotificationText warning={!data?.isBoletoUploaded}>Boleto não importado</NotificationText>}
                {(data?.isBoletoUploaded) && <NotificationText success>Boleto Importado</NotificationText>}
              </section>
            </NofiticationMessage>
          </>
        )
      },
    },
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
      width: 130,
      renderCell: (params: GridCellParams) => {
        const { formOfPayment, maturityOfTheBoleto } = params.row as Income
        const today = new Date()
        const threeDaysFromNow = addDays(today, 3)
        const maturityDate = parse(
          maturityOfTheBoleto || '',
          'dd/MM/yyyy',
          new Date(),
        )
        if (formOfPayment === 'Boleto') {
          const isWithinIntervalMaturityDate = isBefore(maturityDate, threeDaysFromNow)
          return (
            <div>
              <div>{formOfPayment}
                <span style={{
                  color: isWithinIntervalMaturityDate ? 'red' : '',
                  fontWeight: isWithinIntervalMaturityDate ? '900' : '',
                }}>
                </span>
              </div>
            </div>
          )
        } else {
          return <div>{formOfPayment}</div>
        }
      },
    },
    {
      field: 'maturityOfTheBoleto',
      headerName: 'Vencimento',
      width: 100,
      renderCell: (params: GridCellParams) => {
        const { maturityOfTheBoleto, situation } = params.row as Income
        const today = new Date()
        const threeDaysFromNow = addDays(today, 3)
        const maturityDate = parse(
          maturityOfTheBoleto || '',
          'dd/MM/yyyy',
          new Date(),
        )
        const isWithinIntervalMaturityDate = isBefore(maturityDate, threeDaysFromNow)
        return (
          <span style={{
            color: situation === 'PENDENTE' ? isWithinIntervalMaturityDate ? 'red' : '' : '',
            fontWeight: situation === 'PENDENTE' ? isWithinIntervalMaturityDate ? '900' : '' : '',
          }}>
            {maturityOfTheBoleto}
          </span>
        )
      },
    },
    { field: 'dateOS', headerName: 'Entrada' },
    {
      field: 'group-buttons',
      headerName: ' ',
      sortable: false,
      disableColumnMenu: true,
      width: 140,
      renderCell: (params: GridCellParams) => (
        <>
          {/* <IconButton
            aria-label="update"
            color="info"
            onClick={() => onHandleUpdateSituationRow(params)}
            disabled={!hasPermission(RECEITAS_EDITAR)}
          >
            {params.row.situation === 'PENDENTE' ? (
              <PublishedWithChangesIcon />
            ) : (
              <SyncIcon />
            )}
          </IconButton> */}
          <>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => onHandleDeleteRow(params)}
              disabled={!hasPermission(RECEITAS_EXCLUIR)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </>
          {(params.row.typeDocument !== 'ORCAMENTO'
            && params.row.situation === 'PENDENTE'
            && params.row.formOfPayment === 'Boleto') &&
            <Tooltip title={params.row?.isBoletoUploaded ? 'Boleto importado' : 'Importar boleto'}>
              <IconButton
                aria-label="Importar Boleto"
                color={params.row?.isBoletoUploaded ? 'info' : 'default'}
                onClick={() => onUploadDocument(params)}
                disabled={!hasPermission(RECEITAS_EDITAR)}
              >
                {!params.row?.isBoletoUploaded ? <UploadFileIcon /> : <TaskIcon />}
              </IconButton>
            </Tooltip>}
          {params.row.situation === 'PENDENTE' && <>
            <Tooltip title={'Adicionar Recebimento Parcial'}>
              <IconButton
                aria-label="parcial"
                color="info"
                onClick={() => onHandlePartialIncomes(params)}
                disabled={!hasPermission(RECEITAS_EDITAR)}
              >
                <CurrencyExchangeIcon />
              </IconButton>
            </Tooltip>
          </>}
        </>
      ),
    },
  ]
  return columns
}
