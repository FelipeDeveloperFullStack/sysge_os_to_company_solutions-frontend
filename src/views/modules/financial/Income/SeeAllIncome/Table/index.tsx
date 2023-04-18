/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Income } from './adapter'
import { useColumns } from './Columns'
import { DataTable } from 'src/components/Widgets/DataTable'
import { formatPrice } from 'src/helpers/formatPrice'

type TableViewProps = {
  incomesFiltered: Income[]
  setMakeRequest: React.Dispatch<React.SetStateAction<number>>
}

const TableView: React.FC<TableViewProps> = ({
  incomesFiltered,
  setMakeRequest,
}) => {
  const columns = useColumns({ setMakeRequest })

  const mappedIncomeFinancial = (serviceOrder: Income[]): Income[] => {
    return serviceOrder
      .map((item: Income) => item)
      .sort((a, b) => Number(b.osNumber) - Number(a.osNumber))
  }

  return (
    <>
      <>
        <div
          style={{
            margin: '10px 0px 10px 0px',
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'flex',
            gap: '20px',
          }}
        >
          {!!incomesFiltered?.length && (
            <>
              <div style={{ fontSize: '12px' }}>
                Total:{' '}
                {formatPrice(
                  incomesFiltered?.reduce(
                    (sum, row) => sum + row.valueNumber,
                    0,
                  ),
                )}
              </div>
              <div style={{ fontSize: '12px' }}>
                Quantidade de registros encontrados: {incomesFiltered?.length}
              </div>
            </>
          )}
        </div>
      </>
      <DataTable
        rows={mappedIncomeFinancial(incomesFiltered)}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </>
  )
}

export default TableView
