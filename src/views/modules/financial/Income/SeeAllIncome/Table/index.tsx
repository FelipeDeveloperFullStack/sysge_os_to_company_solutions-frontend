/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Income } from './adapter'
import { useColumns } from './Columns'
import { DataTable } from 'src/components/Widgets/DataTable'

type TableViewProps = {
  incomesFiltered: Income[]
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

const TableView: React.FC<TableViewProps> = ({
  incomesFiltered,
  setMakeRequest,
}) => {
  const columns = useColumns({ setMakeRequest })

  return (
    <>
      <div style={{ margin: '20px', fontWeight: 'bold', fontSize: '16px' }}>
        {!!incomesFiltered?.length && (
          <div>
            <div>Resultados encontrados</div>
            <div style={{ fontSize: '12px' }}>
              Total: ({incomesFiltered?.length})
            </div>
          </div>
        )}
      </div>
      <DataTable rows={incomesFiltered} columns={columns} />
    </>
  )
}

export default TableView
