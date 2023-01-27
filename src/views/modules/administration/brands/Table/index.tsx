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
import { ADMINISTRATION_BRANDS_EDIT } from 'src/layouts/typePath'
import { BrandT, IStore } from 'src/store/Types'
import {
  IconButtonStyled,
  TableCellColumnStyled,
} from '../../connections/Table/Styles'
import RemoveConfirmation from '../messages/RemoveConfirmation'
import { columns } from './Columns'

const TableView: React.FC = () => {
  const brandsStore = useSelector((state: IStore) => state.brand.brands)
  const history = useHistory()
  const { showMessage } = useModal()

  const removeClient = (client: BrandT) => {
    showMessage(RemoveConfirmation, client)
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <div style={{ margin: '20px', fontWeight: 'bold', fontSize: '16px' }}>
            {brandsStore?.length ? (
              <div>
                <div>Resultados encontrados</div>
                <div style={{ fontSize: '12px' }}>
                  Total: ({brandsStore?.length})
                </div>
              </div>
            ) : (
              <>Nenhum resultado encontrado</>
            )}
          </div>
          <TableRow>
            {!!brandsStore.length &&
              columns.map((column) => (
                <TableCell>{column.headerName}</TableCell>
              ))}
            {!!brandsStore.length && (
              <TableCellColumnStyled>Ações</TableCellColumnStyled>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {!!brandsStore.length &&
            brandsStore?.map((row) => (
              <TableRow key={row._id}>
                {columns.map((column) => {
                  return <TableCell>{row[column.field]}</TableCell>
                })}
                <TableCell>
                  <IconButtonStyled>
                    <EditIcon
                      color="primary"
                      onClick={() =>
                        history.push(ADMINISTRATION_BRANDS_EDIT, row)
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
