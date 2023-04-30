/* eslint-disable react-hooks/exhaustive-deps */
import { Badge, Paper } from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import hasNumber from 'src/helpers/hasNumber'
import { MANAGER_SERVICE_ORDER_CREATE } from 'src/layouts/typePath'
import { MODEL_FILTER } from 'src/store/actions'
import { ModelT } from 'src/store/Types'
import { Row } from 'src/styles'
import Button from '../../../../../components/Form/Button'
import InputText from '../../../../../components/Form/InputText/index_old'
import { OSData } from '../../serviceOrder/create/type'
import { ButtonGenerateOSContainer } from '../Table/Styles'
import { ButtonContainer, Container } from './styles'

type FiltersProps = {
  onHandleGenerateOS: () => void
  selectedAllRowIds: string[]
  serviceOrdersStore: OSData[]
  setDataListTable: React.Dispatch<React.SetStateAction<OSData[]>>
}

const Filters: React.FC<FiltersProps> = ({
  onHandleGenerateOS,
  selectedAllRowIds,
  setDataListTable,
  serviceOrdersStore,
}) => {
  const { control, handleSubmit, reset, watch, setValue } = useForm<ModelT>()
  const history = useHistory()
  const dispatch = useDispatch()
  const clientNameOrOsNumber = watch('description')

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

  const filterData = (clientNameOrOsNumber: string) => {
    if (hasNumber(clientNameOrOsNumber)) {
      setDataListTable(() => [
        ...serviceOrdersStore.filter((item) =>
          item.osNumber
            .toUpperCase()
            .trim()
            .includes(clientNameOrOsNumber.toUpperCase().trim()),
        ),
      ])
    } else {
      setDataListTable(() => [
        ...serviceOrdersStore.filter((item) =>
          item.client.name
            .toUpperCase()
            .trim()
            .includes(clientNameOrOsNumber.toUpperCase().trim()),
        ),
      ])
    }
  }

  React.useEffect(() => {
    if (clientNameOrOsNumber) {
      filterData(clientNameOrOsNumber)
      setValue('description', clientNameOrOsNumber)
    } else {
      setDataListTable(serviceOrdersStore)
    }
    return () => {
      clearFilter()
    }
  }, [clientNameOrOsNumber])

  return (
    <Container>
      <Paper elevation={1}>
        <form onSubmit={handleSubmit(onSubmitFilter)} autoComplete="off">
          <Row columns="1fr">
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputText
                  label="Cliente/Nº OS"
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
          </ButtonContainer>
        </form>
      </Paper>
    </Container>
  )
}

export default Filters
