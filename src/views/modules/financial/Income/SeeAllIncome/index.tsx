/* eslint-disable no-restricted-globals */
import React, { useState } from 'react'
import useLocalStorage from 'use-local-storage'
import Filters from './Filters'
import TableView from './Table'
import { Income } from './Table/adapter'

const SeeAllIncome: React.FC = () => {
  const [incomesFiltered, setIncomesFiltered] = useState<Income[]>(
    [] as Income[],
  )
  const [makeRequest, setMakeRequest] = useLocalStorage<number>(
    'makeRequest',
    undefined,
  )

  React.useEffect(() => {
    scroll(0, 0)
  }, [])

  return (
    <>
      <Filters
        setIncomesFiltered={setIncomesFiltered}
        makeRequest={makeRequest}
      />
      <TableView
        incomesFiltered={incomesFiltered}
        setMakeRequest={setMakeRequest}
      />
    </>
  )
}

export default SeeAllIncome
