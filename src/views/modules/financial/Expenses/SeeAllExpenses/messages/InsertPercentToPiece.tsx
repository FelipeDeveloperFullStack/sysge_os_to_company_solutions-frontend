import React, { useState } from 'react'
import { Button } from 'src/components'
import { useModal } from 'src/hooks/useModal'
import { UpdateDeleteConfirmationContainer, Container, Text } from './style'
import { Expense } from '../Table/adapter'
import Alert from '@mui/material/Alert'
import PercentIcon from '@mui/icons-material/Percent'

type InsertPercentToPieceProps = {
  selectedAllRow: Expense[]
  onHandleRegisterPiece: (selectedAllRowState: Expense[]) => void
}

export const InsertPercentToPiece: React.FC<InsertPercentToPieceProps> = ({
  onHandleRegisterPiece,
  selectedAllRow,
}) => {
  const { closeModal } = useModal()
  const [selectedAllRowState, setselectedAllRowState] = useState(selectedAllRow)

  const confirmation = async () => {
    await onHandleRegisterPiece(selectedAllRowState)
  }

  const cancel = () => {
    closeModal()
  }

  return (
    <Container>
      <Text>
        <PercentIcon />
      </Text>
      <Text>
        <Alert severity="info">
          Digite o percentual de margem de lucro que deseja para cada peça.
        </Alert>
      </Text>
      {selectedAllRowState.map((item, index) => (
        <div key={index}>{item.expense}</div>
      ))}
      <UpdateDeleteConfirmationContainer>
        <Button
          textButton="Registrar em Peça"
          variant="outlined"
          size="large"
          icon="add2"
          onClick={confirmation}
        />
        <Button
          textButton="Cancelar"
          variant="outlined"
          size="large"
          icon="close"
          color="error"
          onClick={cancel}
        />
      </UpdateDeleteConfirmationContainer>
    </Container>
  )
}
