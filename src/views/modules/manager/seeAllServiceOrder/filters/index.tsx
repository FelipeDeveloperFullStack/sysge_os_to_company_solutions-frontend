import { Paper } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { MANAGER_SERVICE_ORDER_CREATE } from 'src/layouts/typePath'
import { MODEL_FILTER } from 'src/store/actions'
import { ModelT } from 'src/store/Types'
import { Row } from 'src/styles'
import Button from '../../../../../components/Form/Button'
import InputText from '../../../../../components/Form/InputText/index_old'
import { ButtonContainer, Container } from './styles'

const Filters: React.FC = () => {
  const { control, handleSubmit, reset } = useForm<ModelT>()

  const history = useHistory()

  const dispatch = useDispatch()

  const onSubmitFilter = (data: ModelT) => {
    data = {
      ...data,
      description: data.description,
    }
    dispatch({
      type: MODEL_FILTER,
      payload: data,
    })
  }

  const clearFilter = () => {
    reset()
    dispatch({
      type: MODEL_FILTER,
      payload: {} as ModelT,
    })
  }

  return (
    <Container>
      <Paper elevation={1}>
        <form onSubmit={handleSubmit(onSubmitFilter)} autoComplete="off">
          <Row columns=" 5fr 1fr" gap={10}>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputText
                  label="Cliente"
                  field={field}
                  fieldState={fieldState}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputText
                  label="Nº OS"
                  field={field}
                  fieldState={fieldState}
                />
              )}
            />
          </Row>
          <ButtonContainer>
            <Button
              textButton="Incluir"
              variant="contained"
              size="medium"
              icon="add"
              onClick={() => history.push(MANAGER_SERVICE_ORDER_CREATE)}
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
                variant="contained"
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
