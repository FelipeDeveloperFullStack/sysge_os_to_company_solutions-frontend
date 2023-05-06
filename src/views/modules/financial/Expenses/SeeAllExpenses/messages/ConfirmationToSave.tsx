import React from 'react'
import Button from 'src/components/Form/Button'
import { useModal } from 'src/hooks/useModal'
import { ButtonGroup, Container, Text } from './style'
import WarningIcon from '@mui/icons-material/Warning'
import Alert from '@mui/material/Alert'

type ConfirmationRegister = {
  setPercentValueToPiece: () => void
}

const ConfirmationToRegisterInPiece: React.FC<ConfirmationRegister> = (
  props,
) => {
  const { closeModal } = useModal()

  const onRegisterInPiece = async () => {
    await props.setPercentValueToPiece()
  }
  const onBack = () => {
    closeModal()
  }

  return (
    <Container>
      <Text>
        <WarningIcon />
      </Text>
      <Text bold>Atenção</Text>
      <Text>
        <Alert severity="info">
          Existem registros selecionados que já foram registrados em peças.
        </Alert>
      </Text>
      <Text>
        <Alert severity="warning">
          Ao clicar em confirmar irá gerar duplicidade de dados.
        </Alert>
      </Text>
      <ButtonGroup>
        <Button
          textButton="Confirmar"
          variant="outlined"
          color="info"
          icon="add3"
          onClick={onRegisterInPiece}
        />
        <Button
          textButton="Cancelar"
          variant="outlined"
          icon="close"
          color="error"
          onClick={onBack}
        />
      </ButtonGroup>
    </Container>
  )
}

export default ConfirmationToRegisterInPiece
