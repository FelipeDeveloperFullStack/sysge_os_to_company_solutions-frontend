import BadgeIcon from '@mui/icons-material/Badge'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
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
import { useHistory } from 'react-router-dom'
import { DataTable } from 'src/components/Widgets/DataTable'
import formatTextWithLimit from 'src/helpers/formatTextWithLimit'
import { useModal } from 'src/hooks/useModal'
import { ADMINISTRATION_CLIENTS_EDIT } from 'src/layouts/typePath'
import { ClientT, IStore } from 'src/store/Types'
import { IconButtonStyled } from '../../connections/Table/Styles'
import RemoveConfirmation from '../messages/RemoveConfirmation'
import { useColumns } from './Columns'

const TableView: React.FC = () => {
  const clientsStore = useSelector((state: IStore) => state.client.clients)
  const history = useHistory()
  const { showMessage } = useModal()
  const columns = useColumns()

  const removeClient = (client: ClientT) => {
    showMessage(RemoveConfirmation, client)
  }

  const mapped = (serviceOrder: ClientT[]): ClientT[] => {
    return serviceOrder.map((item: ClientT) => {
      return {
        id: item._id,
        ...item,
      }
    })
  }

  return (
    <>
      <div style={{ margin: '20px', fontWeight: 'bold', fontSize: '16px' }}>
        {!!clientsStore?.length && (
          <div>
            <div>Resultados encontrados</div>
            <div style={{ fontSize: '12px' }}>
              Total: ({clientsStore?.length})
            </div>
          </div>
        )}
      </div>
      <DataTable rows={mapped(clientsStore)} columns={columns} pageSize={10} />
    </>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         {/* {columns.map((column) => (
    //           <TableCell>{column.headerName}</TableCell>
    //         ))} */}
    //       </TableRow>
    //       <div style={{ margin: '20px', fontWeight: 'bold', fontSize: '16px' }}>
    //         {clientsStore?.length ? (
    //           <div>
    //             <div>Resultados encontrados</div>
    //             <div style={{ fontSize: '12px' }}>
    //               Total: ({clientsStore?.length})
    //             </div>
    //           </div>
    //         ) : (
    //           <>Nenhum resultado encontrado</>
    //         )}
    //       </div>
    //     </TableHead>
    //     <TableBody>
    //       {clientsStore?.map((row) => (
    //         <TableRow
    //           key={row._id}
    //           // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           {columns.map((column) => {
    //             return (
    //               <>
    //                 {column.field === 'name' ? (
    //                   <TableCell>
    //                     <b>{formatTextWithLimit(row[column.field], 40)}</b>
    //                     <div>{row.address}</div>
    //                     <div>
    //                       {row.city}/{row.uf}
    //                     </div>
    //                   </TableCell>
    //                 ) : column.field === 'cpfOrCnpj' ? (
    //                   <TableCell>
    //                     <div
    //                       style={{
    //                         display: 'flex',
    //                         gap: '5px',
    //                         alignItems: 'center',
    //                       }}
    //                     >
    //                       <BadgeIcon /> {row[column.field]}
    //                     </div>
    //                     <div
    //                       style={{
    //                         display: 'flex',
    //                         gap: '5px',
    //                         alignItems: 'center',
    //                       }}
    //                     >
    //                       <MailOutlineIcon /> {row.email}
    //                     </div>
    //                     {!!row.phoneNumber && (
    //                       <div>
    //                         <PhoneIphoneIcon /> {row.phoneNumber}
    //                       </div>
    //                     )}
    //                     {!!row.phoneNumberFixo && (
    //                       <div>
    //                         <PhoneForwardedIcon /> {row.phoneNumberFixo}
    //                       </div>
    //                     )}
    //                   </TableCell>
    //                 ) : (
    //                   // <TableCell>
    //                   //   {!!row.phoneNumber && (
    //                   //     <div>
    //                   //       <PhoneIphoneIcon /> {row.phoneNumber}
    //                   //     </div>
    //                   //   )}
    //                   //   {!!row.phoneNumberFixo && (
    //                   //     <div>
    //                   //       <PhoneForwardedIcon /> {row.phoneNumberFixo}
    //                   //     </div>
    //                   //   )}
    //                   // </TableCell>
    //                   <></>
    //                 )}
    //               </>
    //             )
    //           })}
    //           <TableCell>
    //             <IconButtonStyled>
    //               <EditIcon
    //                 color="primary"
    //                 onClick={() =>
    //                   history.push(ADMINISTRATION_CLIENTS_EDIT, row)
    //                 }
    //               />
    //             </IconButtonStyled>
    //             <IconButtonStyled>
    //               <DeleteForeverIcon
    //                 color="error"
    //                 onClick={() => removeClient(row)}
    //               />
    //             </IconButtonStyled>
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  )
}

export default TableView
