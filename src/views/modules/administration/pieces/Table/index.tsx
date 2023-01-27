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
import { ADMINISTRATION_PIECES_EDIT } from 'src/layouts/typePath'
import { IStore, PieceT } from 'src/store/Types'
import {
  IconButtonStyled,
  TableCellColumnStyled,
} from '../../connections/Table/Styles'
import RemoveConfirmation from '../messages/RemoveConfirmation'
import { columns } from './Columns'

const TableView: React.FC = () => {
  const piecesStore = useSelector((state: IStore) => state.piece.pieces)
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
            {piecesStore?.length ? (
              <div>
                <div>Resultados encontrados</div>
                <div style={{ fontSize: '12px' }}>
                  Total: ({piecesStore?.length})
                </div>
              </div>
            ) : (
              <>Nenhum resultado encontrado</>
            )}
          </div>
          <TableRow>
            {!!piecesStore.length &&
              columns.map((column) => (
                <TableCell>{column.headerName}</TableCell>
              ))}
            {!!piecesStore.length && (
              <TableCellColumnStyled>Ações</TableCellColumnStyled>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!piecesStore.length &&
            piecesStore?.map((row) => (
              <TableRow key={row._id}>
                {columns.map((column) => {
                  return (
                    <>
                      {column.field === 'description' ? (
                        <TableCell>{row[column.field]}</TableCell>
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
                        history.push(ADMINISTRATION_PIECES_EDIT, row)
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
