import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { Row } from 'src/styles'
import InputText from '../../../../serviceOrder/create/tables/laudoTechnical/components/InputText'
import { Laudo } from '../type'
import { Container } from './style'

type LaudoDetailsProps = {
  laudos: Laudo[]
  setLaudos: React.Dispatch<React.SetStateAction<Laudo[]>>
  setLaudosList: React.Dispatch<React.SetStateAction<Laudo[]>>
}

const LaudoDetails: React.FC<LaudoDetailsProps> = ({
  laudos,
  setLaudos,
  setLaudosList,
}) => {
  const removeItemLaudo = (item: Laudo) => {
    setLaudos((laudo) => [
      ...laudo.filter(
        (itemLaudo) => itemLaudo.description !== item.description,
      ),
    ])
    setLaudosList((laudo) => [
      ...laudo.filter(
        (itemLaudo) => itemLaudo.description !== item.description,
      ),
    ])
  }

  return (
    <Container>
      {!!laudos.length && <div>Laudos</div>}
      {!!laudos.length &&
        laudos?.map((item: Laudo) => {
          return (
            <>
              {!!Object.keys(item)?.length && (
                <Row columns="21fr 1fr" marginTop="5px">
                  <InputText value={item.description} disabled />
                  <Tooltip title="Excluir" placement="left">
                    <IconButton
                      aria-label="delete"
                      size="large"
                      color="secondary"
                      onClick={() => removeItemLaudo(item)}
                    >
                      <DeleteIcon fontSize="inherit" color="secondary" />
                    </IconButton>
                  </Tooltip>
                </Row>
              )}
            </>
          )
        })}
    </Container>
  )
}

export default LaudoDetails
