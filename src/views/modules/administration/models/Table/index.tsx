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
import { useModal } from 'src/hooks/useModal'
import { ADMINISTRATION_MODELS_EDIT } from 'src/layouts/typePath'
import { IStore, ModelT } from 'src/store/Types'
import {
  IconButtonStyled,
  TableCellColumnStyled,
} from '../../connections/Table/Styles'
import RemoveConfirmation from '../messages/RemoveConfirmation'
import { columns } from './Columns'

const TableView: React.FC = () => {
  const modelsStore = useSelector((state: IStore) => state.model.models)
  const history = useHistory()
  const { showMessage } = useModal()

  const removeClient = (client: ModelT) => {
    showMessage(RemoveConfirmation, client)
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <div style={{ margin: '20px', fontWeight: 'bold', fontSize: '16px' }}>
            {modelsStore?.length ? (
              <div>
                <div>Resultados encontrados</div>
                <div style={{ fontSize: '12px' }}>
                  Total: ({modelsStore?.length})
                </div>
              </div>
            ) : (
              <>Nenhum resultado encontrado</>
            )}
          </div>
          <TableRow>
            {!!modelsStore.length &&
              columns.map((column) => (
                <TableCell>{column.headerName}</TableCell>
              ))}
            {!!modelsStore.length && (
              <TableCellColumnStyled>Ações</TableCellColumnStyled>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!modelsStore.length &&
            modelsStore?.map((row) => (
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
