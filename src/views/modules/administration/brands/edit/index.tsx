import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { InputText } from 'src/components'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { ADMINISTRATION_BRANDS } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import { BRAND_FILTER, LAYOUT_TITLE_PAGE } from 'src/store/actions'
import { BrandT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaBrand } from '../schemaValidation'
import { toApi } from './adapters'
import { ButtonContainer, Container, Form } from './style'

const CreateBrand: React.FC = () => {
  const dispatch = useDispatch()

  const { apiAdmin } = useAdmin()
  const [idbrand, setIdBrand] = useState('')

  const { control, handleSubmit, setValue } = useForm<BrandT>({
    shouldUnregister: false,
    resolver: yupResolver(schemaBrand),
  })

  const history = useHistory()
  const location = useLocation()

  useLayoutEffect(() => {
    scroll(0, 0)
    dispatch({
      type: LAYOUT_TITLE_PAGE,
      payload: {
        title: 'Marca - Inclusão',
      },
    })
  }, [])

  useEffect(() => {
    const { description, _id } = location?.state
    setValue('description', description)
    setIdBrand(_id)
  }, [])

  const onSubmit = async (data: BrandT) => {
    try {
      await apiAdmin.put(`brands/${idbrand}`, toApi(data))
      dispatch({
        type: BRAND_FILTER,
        payload: {},
      })
      history.push(ADMINISTRATION_BRANDS)
      toast.success('Marca atualizada com sucesso.')
    } catch (error) {
      exceptionHandle(error)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row columns="1fr">
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label={'Nome da marca'}
                field={field}
                fieldState={fieldState}
              />
            )}
          />
        </Row>
        <ButtonContainer>
          <Button
            textButton="Salvar"
            variant="contained"
            size="large"
            icon="add"
            type="submit"
          />
          <Button
            textButton="Voltar"
            variant="outlined"
            size="large"
            icon="back"
            onClick={() => history.push(ADMINISTRATION_BRANDS)}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreateBrand
