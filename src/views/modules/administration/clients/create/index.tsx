import { yupResolver } from '@hookform/resolvers/yup'
import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { InputText } from 'src/components'
import Button from 'src/components/Form/Button'
import InputCPF_CNPJ from 'src/components/Form/InputCPF_CNPJ'
import InputMask from 'src/components/Form/InputMask'
import InputPhone from 'src/components/Form/InputPhone'
import clearSpecialCharacters from 'src/helpers/clearSpecialCharacters'
import { exceptionHandle } from 'src/helpers/exceptions'
import { validateCNPJ } from 'src/helpers/validateCNPJ'
import validateCpf from 'src/helpers/validateCpf'
import { ADMINISTRATION_CLIENTS } from 'src/layouts/typePath'
import { useServiceCEP } from 'src/services/ServiceCEP'
import { useAdmin } from 'src/services/useAdmin'
import { CLIENT_FILTER, LAYOUT_TITLE_PAGE } from 'src/store/actions'
import { ClientT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaClient } from '../schemaValidation'
import { ButtonContainer, Container, Form } from './style'

const CreateClient: React.FC = () => {
  const dispatch = useDispatch()

  const { apiAdmin } = useAdmin()

  const { getAddressByCEP } = useServiceCEP()

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    register,
    setError,
    formState: { errors },
  } = useForm<ClientT>({
    shouldUnregister: false,
    resolver: yupResolver(schemaClient),
  })

  const history = useHistory()

  useLayoutEffect(() => {
    scroll(0, 0)
    dispatch({
      type: LAYOUT_TITLE_PAGE,
      payload: {
        title: 'Cliente - Inclusão',
      },
    })
  }, [])

  const onSubmit = async (data: ClientT) => {
    try {
      await apiAdmin.post(`clients`, data)
      dispatch({
        type: CLIENT_FILTER,
        payload: {},
      })
      history.push(ADMINISTRATION_CLIENTS)
    } catch (error) {
      exceptionHandle(error)
    }
  }

  const onGetCep = async ({ value }) => {
    const valueWithoutCharacters = clearSpecialCharacters(value)
    if (valueWithoutCharacters?.length === 8) {
      const { address, city, district, state, ok } = await getAddressByCEP(
        String(value).replace('.', ''),
      )
      if (!ok) {
        setValue('address', '')
        setValue('city', '')
        setValue('uf', '')
      } else {
        setValue('address', `${address} - ${district}`)
        setValue('city', city)
        setValue('uf', state)
      }
    }
  }

  const onValidateCPF_CNPJ = async ({ value }) => {
    const valueWithoutCharacters = clearSpecialCharacters(value)

    if (valueWithoutCharacters?.length === 11) {
      console.log({ validate: validateCpf(valueWithoutCharacters) })
      if (!validateCpf(valueWithoutCharacters)) {
        setError('cpfOrCnpj', { message: 'CPF inválido!' })
      } else {
        setError('cpfOrCnpj', { message: '' })
      }
    }
    if (valueWithoutCharacters?.length === 14) {
      if (!validateCNPJ(valueWithoutCharacters)) {
        setError('cpfOrCnpj', { message: 'CNPJ inválido!' })
      } else {
        setError('cpfOrCnpj', { message: '' })
      }
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Row columns="1fr">
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText label={'Nome'} field={field} fieldState={fieldState} />
            )}
          />
        </Row>
        <Row columns="2fr 6fr 4fr 1fr" marginTop="15px">
          <Controller
            name="cep"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputMask
                label="CEP"
                variant="outlined"
                mask="99.999-999"
                onKeyUp={() => onGetCep(field)}
                {...field}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label="Endereço"
                field={field}
                fieldState={fieldState}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText label="Cidade" field={field} fieldState={fieldState} />
            )}
          />
          <Controller
            name="uf"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText label="UF" field={field} fieldState={fieldState} />
            )}
          />
        </Row>
        <Row columns="1fr 3fr 1fr 1fr" marginTop="15px">
          <Controller
            name="cpfOrCnpj"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputCPF_CNPJ
                label="CPF/CNPJ"
                onKeyUp={() => onValidateCPF_CNPJ(field)}
                fieldState={fieldState}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label="Email"
                field={field}
                fieldState={fieldState}
                toUpperCase={false}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputPhone label="Celular" {...field} />
            )}
          />
          <Controller
            name="phoneNumberFixo"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputMask label="Fixo" mask="(99) 9999-9999" {...field} />
            )}
          />
        </Row>
        <ButtonContainer>
          <Button
            textButton="Salvar"
            variant="outlined"
            size="large"
            icon="add"
            type="submit"
          />
          <Button
            textButton="Voltar"
            variant="outlined"
            size="large"
            icon="back"
            onClick={() => history.push(ADMINISTRATION_CLIENTS)}
          />
        </ButtonContainer>
      </Form>
    </Container>
  )
}

export default CreateClient
