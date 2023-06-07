import React from 'react'
import { Button } from 'src/components'
import { useLoading } from 'src/hooks/useLoading'
import { useModal } from 'src/hooks/useModal'
import { MANAGER_SERVICE_ORDER } from 'src/layouts/typePath'
import {
  ButtonLaunchFinancialConfirmationContainer,
  LaunchFinancialConfirmationContainer,
} from './style'

type LaunchFinancialConfirmationProps = {
  history: any
  resetAllField: () => void
}

export const LaunchFinancialConfirmation: React.FC<
  LaunchFinancialConfirmationProps
> = ({ history }) => {
  const { closeModal } = useModal()
  const { Loading } = useLoading()

  const newOS = () => {
    // resetAllField()
    // closeModal()
    Loading.turnOn()
    window.location.reload()
  }

  const redirectListOS = () => {
    history.push(MANAGER_SERVICE_ORDER)
    closeModal()
  }

  return (
    <LaunchFinancialConfirmationContainer>
      <div>Deseja Iniciar Uma Nova OS?</div>
      <ButtonLaunchFinancialConfirmationContainer>
        <Button
          textButton="Sim"
          variant="outlined"
          size="large"
          icon="add2"
          onClick={newOS}
        />
        <Button
          textButton="Não"
          variant="outlined"
          size="large"
          icon="close"
          color="error"
          onClick={redirectListOS}
        />
      </ButtonLaunchFinancialConfirmationContainer>
    </LaunchFinancialConfirmationContainer>
  )
}
