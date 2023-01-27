import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useModal } from 'src/hooks/useModal'
import { ADMINISTRATION_MODELS_EDIT } from 'src/layouts/typePath'
import { IStore, ServiceOrderT } from 'src/store/Types'
import {
  IconButtonStyled,
  TableCellColumnStyled,
} from '../../../../modules/administration/connections/Table/Styles'
import RemoveConfirmation from '../messages/RemoveConfirmation'
import { columns } from './Columns'

const TableView: React.FC = () => {
  const serviceOrdersStore = useSelector(
    (state: IStore) => state.serviceOrder.serviceOrders,
  )
  const history = useHistory()
  const { showMessage } = useModal()

  const removeClient = (serviceOrder: ServiceOrderT) => {
    showMessage(RemoveConfirmation, serviceOrder)
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <div style={{ margin: '20px', fontWeight: 'bold', fontSize: '16px' }}>
            {!!serviceOrdersStore.length ? (
              <div>
                <div>Resultados encontrados</div>
                <div style={{ fontSize: '12px' }}>
                  Total: ({serviceOrdersStore?.length})
                </div>
              </div>
            ) : (
              <>Nenhum resultado encontrado</>
            )}
          </div>
          <TableRow>
            {!!serviceOrdersStore.length &&
              columns.map((column) => (
                <TableCell>{column.headerName}</TableCell>
              ))}
            {!!serviceOrdersStore.length && (
              <TableCellColumnStyled>Ações</TableCellColumnStyled>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!serviceOrdersStore.length &&
            serviceOrdersStore?.map((row) => (
              <TableRow key={row._id}>
                {columns.map((column) => {
                  return <TableCell>{row[column.field]}</TableCell>
                })}
                <TableCell>
                  <IconButtonStyled>
                    <EditIcon
                      color="primary"
                      onClick={() =>
                        history.push(ADMINISTRATION_MODELS_EDIT, row)
                      }
                    />
                  </IconButtonStyled>
                  <IconButtonStyled>
                    <DeleteForeverIcon
                      color="error"
                      onClick={() => removeClient(row)}
                    />
                  </IconButtonStyled>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableView
