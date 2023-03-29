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
import { IStore } from 'src/store/Types'
import Chip from '@mui/material/Chip'
import { Row } from 'src/styles'
import {
  IconButtonStyled,
  TableCellColumnStyled,
} from '../../../../modules/administration/connections/Table/Styles'
import RemoveConfirmation from '../messages/RemoveConfirmation'
import { columns } from './Columns'
import { OSData } from '../../serviceOrder/create/type'

const TableView: React.FC = () => {
  const serviceOrdersStore = useSelector(
    (state: IStore) => state.serviceOrder.serviceOrders,
  )
  const history = useHistory()
  const { showMessage } = useModal()

  const removeClient = (serviceOrder: OSData) => {
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
                  return column.field === 'clientName' ? (
                    <TableCell>
                      <Row display="flex" flexDirection="column" gap={5}>
                        <div>{row['client'].name}</div>
                        <div>
                          <strong>Total:</strong> {row['total']}
                        </div>
                      </Row>
                    </TableCell>
                  ) : column.field === 'status' ? (
                    <TableCell>
                      {row[column.field] === 'Pendente' ? (
                        <Chip label={row[column.field]} color="warning" />
                      ) : (
                        <Chip label={row[column.field]} color="success" />
                      )}
                    </TableCell>
                  ) : (
                    <TableCell>{row[column.field]}</TableCell>
                  )
                })}
                <TableCell>
                  <IconButtonStyled>
                    <EditIcon
                      color="primary"
                      // onClick={() =>
                      //   history.push(ADMINISTRATION_MODELS_EDIT, row)
                      // }
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
