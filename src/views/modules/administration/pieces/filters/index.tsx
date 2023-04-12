import { Paper } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import clearSpecialCharacters from 'src/helpers/clearSpecialCharacters'
import { ADMINISTRATION_PIECES_CREATE } from 'src/layouts/typePath'
import { PIECE_FILTER } from 'src/store/actions'
import { PieceT } from 'src/store/Types'
import { Row } from 'src/styles'
import Button from '../../../../../components/Form/Button'
import InputText from '../../../../../components/Form/InputText/index_old'
import { ButtonContainer, Container } from './styles'

const Filters: React.FC = () => {
  const { control, handleSubmit, reset, watch } = useForm<PieceT>()

  const history = useHistory()

  const dispatch = useDispatch()

  const onSubmitFilter = (data: PieceT) => {
    data = {
      ...data,
      description: data.description,
      value: clearSpecialCharacters(data.value),
    }
    dispatch({
      type: PIECE_FILTER,
      payload: data,
    })
  }

  const clearFilter = () => {
    reset()
    dispatch({
      type: PIECE_FILTER,
      payload: {} as PieceT,
    })
  }

  return (
    <Container>
      <Paper elevation={1}>
        <form onSubmit={handleSubmit(onSubmitFilter)} autoComplete="off">
          <Row columns="1fr" gap={10}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputText
                  label="Nome da peça"
                  field={field}
                  fieldState={fieldState}
                />
              )}
            />
            {/* <Controller
              name="value"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputText
                  label="Preço"
                  field={field}
                  fieldState={fieldState}
                />
              )}
            /> */}
          </Row>
          <ButtonContainer>
            <Button
              textButton="Incluir"
              variant="outlined"
              size="medium"
              icon="add"
              onClick={() => history.push(ADMINISTRATION_PIECES_CREATE)}
            />
            <div>
              <Button
                textButton="Limpar Filtro "
                variant="outlined"
                color="error"
                onClick={() => clearFilter()}
              />
              <Button
                textButton="Filtrar Resultado"
                variant="outlined"
                type="submit"
              />
            </div>
          </ButtonContainer>
        </form>
      </Paper>
    </Container>
  )
}

export default Filters
