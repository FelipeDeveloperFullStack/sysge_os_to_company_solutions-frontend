import { Badge, Paper } from '@mui/material'
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
import { ButtonGenerateOSContainer } from '../Table/Styles'
import { ButtonContainer, Container } from './styles'

type FiltersProps = {
  onHandleGenerateOS: () => void
  selectedAllRowIds: string[]
}

const Filters: React.FC<FiltersProps> = ({
  onHandleGenerateOS,
  selectedAllRowIds,
}) => {
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
              variant="outlined"
              size="medium"
              icon="add"
              onClick={() => history.push(MANAGER_SERVICE_ORDER_CREATE)}
            />
            {!!selectedAllRowIds?.length && (
              <ButtonGenerateOSContainer>
                <Badge badgeContent={selectedAllRowIds?.length} color="primary">
                  <Button
                    textButton={`Gerar`}
                    variant="contained"
                    onClick={onHandleGenerateOS}
                    size="medium"
                    icon="doc"
                  />
                </Badge>
              </ButtonGenerateOSContainer>
            )}
            {/* <div>
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
            </div> */}
          </ButtonContainer>
        </form>
      </Paper>
    </Container>
  )
}

export default Filters
