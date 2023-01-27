import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { formatPrice } from 'src/helpers/formatPrice'
import { useModal } from 'src/hooks/useModal'
import { ADMINISTRATION_SERVICES_EDIT } from 'src/layouts/typePath'
import { IStore, PieceT } from 'src/store/Types'
import {
  IconButtonStyled,
  TableCellColumnStyled,
} from '../../connections/Table/Styles'
import RemoveConfirmation from '../messages/RemoveConfirmation'
import { TableCellPrice } from '../styles'
import { columns } from './Columns'

const TableView: React.FC = () => {
  const servicesStore = useSelector((state: IStore) => state.service.services)
  const history = useHistory()
  const { showMessage } = useModal()

  const removeClient = (client: PieceT) => {
    showMessage(RemoveConfirmation, client)
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <div style={{ margin: '20px', fontWeight: 'bold', fontSize: '16px' }}>
            {servicesStore?.length ? (
              <div>
                <div>Resultados encontrados</div>
                <div style={{ fontSize: '12px' }}>
                  Total: ({servicesStore?.length})
                </div>
              </div>
            ) : (
              <>Nenhum resultado encontrado</>
            )}
          </div>
          <TableRow>
            {!!servicesStore.length &&
              columns.map((column) => (
                <>
                  {column.field === 'description' ? (
                    <TableCell>{column.headerName}</TableCell>
                  ) : (
                    <TableCellPrice>{column.headerName}</TableCellPrice>
                  )}
                </>
              ))}
            {!!servicesStore.length && (
              <TableCellColumnStyled>Ações</TableCellColumnStyled>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!servicesStore.length &&
            servicesStore?.map((row) => (
              <TableRow key={row._id}>
                {columns.map((column) => {
                  return (
                    <>
                      {column.field === 'description' ? (
                        <TableCell>
                          <div>
                            <b>{row.description}</b>
                          </div>
                          {!!row.laudos.length && (
                            <div>
                              <ul>
                                {row.laudos.map((item) => {
                                  return <li>{item}</li>
                                })}
                              </ul>
                            </div>
                          )}
                        </TableCell>
                      ) : (
                        <TableCell>{formatPrice(row.value)}</TableCell>
                      )}
                    </>
                  )
                })}
                <TableCell>
                  <IconButtonStyled>
                    <EditIcon
                      color="primary"
                      onClick={() =>
                        history.push(ADMINISTRATION_SERVICES_EDIT, row)
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
