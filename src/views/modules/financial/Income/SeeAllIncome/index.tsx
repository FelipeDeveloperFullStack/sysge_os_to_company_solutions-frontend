import React, { useState } from 'react'
import Filters from './Filters'
import TableView from './Table'
import { Income } from './Table/adapter'

const SeeAllIncome: React.FC = () => {
  const [incomesFiltered, setIncomesFiltered] = useState<Income[]>(
    [] as Income[],
  )
  return (
    <>
      <Filters setIncomesFiltered={setIncomesFiltered} />
      <TableView incomesFiltered={incomesFiltered} />
    </>
  )
}

export default SeeAllIncome
