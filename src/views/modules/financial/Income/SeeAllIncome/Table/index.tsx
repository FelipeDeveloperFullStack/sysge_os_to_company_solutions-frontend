/* eslint-disable react-hooks/exhaustive-deps */
import BadgeIcon from '@mui/icons-material/Badge'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import React from 'react'
import { useSelector } from 'react-redux'
import formatTextWithLimit from 'src/helpers/formatTextWithLimit'
import { useModal } from 'src/hooks/useModal'
import { IStore } from 'src/store/Types'
import { Income } from './adapter'
import { columns } from './Columns'

type TableViewProps = {
  incomesFiltered: Income[]
}

const TableView: React.FC<TableViewProps> = ({ incomesFiltered }) => {
  const clientsStore = useSelector((state: IStore) => state.client.clients)
  const { showMessage } = useModal()

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {/* {columns.map((column) => (
              <TableCell>{column.headerName}</TableCell>
            ))} */}
          </TableRow>
          <div style={{ margin: '20px', fontWeight: 'bold', fontSize: '16px' }}>
            {incomesFiltered?.length ? (
              <div>
                <div>Resultados encontrados</div>
                <div style={{ fontSize: '12px' }}>
                  Total: ({incomesFiltered?.length})
                </div>
              </div>
            ) : (
              <>Nenhum resultado encontrado</>
            )}
          </div>
        </TableHead>
        <TableBody>
          {incomesFiltered?.map((row) => (
            <TableRow
              key={row.id}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <b>{formatTextWithLimit(row.clientName, 40)}</b>
                <div>{row.dateOS}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TableView
