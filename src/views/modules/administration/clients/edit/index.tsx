/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { InputText } from 'src/components'
import Button from 'src/components/Form/Button'
import InputCPF_CNPJ from 'src/components/Form/InputCPF_CNPJ'
import InputMask from 'src/components/Form/InputMask'
import InputPhone from 'src/components/Form/InputPhone'
import { toast } from 'src/components/Widgets/Toastify'
import clearSpecialCharacters from 'src/helpers/clearSpecialCharacters'
import { exceptionHandle } from 'src/helpers/exceptions'
import { validateCNPJ } from 'src/helpers/validateCNPJ'
import validateCpf from 'src/helpers/validateCpf'
import { ADMINISTRATION_CLIENTS } from 'src/layouts/typePath'
import { useServiceCEP } from 'src/services/ServiceCEP'
import { useAdmin } from 'src/services/useAdmin'
import { CLIENT_FILTER } from 'src/store/actions'
import { ClientT } from 'src/store/Types'
import { Row } from 'src/styles'
import { schemaClient } from '../schemaValidation'
import { ButtonContainer, Container, Form } from './style'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';
import { validateTwoPhoneTypes } from 'src/helpers/validateFields/validateTwoPhoneTypes'

const EditClient: React.FC = () => {
  const dispatch = useDispatch()
  const { apiAdmin } = useAdmin()
  const { getAddressByCEP } = useServiceCEP()
  const location = useLocation()
  const history = useHistory()
  const [clientId, setClientId] = useState('')
  const [enableButtons, setEnableButton] = useState(true)
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ClientT>({
    shouldUnregister: false,
    resolver: yupResolver(schemaClient),
  })

  const onSubmit = async (data: ClientT) => {
    if (data.phoneNumber) {
      const validate = validateTwoPhoneTypes(data.phoneNumber)
      if (validate?.trim() !== '') {
        toast.error('Celular inválido')
        return
      }
    }
    if (data.phoneNumberFixo) {
      const validate = validateTwoPhoneTypes(data.phoneNumberFixo)
      if (validate?.trim() !== '') {
        toast.error('Telefone Fixo inválido')
        return
      }
    }
    try {
      setLoading(true)
      await apiAdmin.put(`clients/${clientId}`, data)
      dispatch({
        type: CLIENT_FILTER,
        payload: {},
      })
      history.push(ADMINISTRATION_CLIENTS)
      toast.success(`Cliente ${data.name} atualizado com sucesso.`)
    } catch (error) {
      exceptionHandle(error)
    } finally {
      setLoading(false)
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

  useEffect(() => {
    const {
      address,
      city,
      uf,
      cep,
      cpfOrCnpj,
      email,
      name,
      phoneNumber,
      id,
      phoneNumberFixo,
      idFolderClientName,
      idFolderOrcamento,
      idFolderOsUnificadas,
      idFolderOsPendentes,
      idFolderOsPagas
    } = location.state
    setValue('address', address)
    setValue('city', city)
    setValue('uf', uf)
    setValue('cep', cep)
    setValue('cpfOrCnpj', cpfOrCnpj)
    setValue('name', name)
    setValue('email', email)
    setValue('phoneNumber', phoneNumber)
    setValue('phoneNumberFixo', phoneNumberFixo)
    setValue('idFolderClientName', idFolderClientName)
    setValue('idFolderOrcamento', idFolderOrcamento)
    setValue('idFolderOsUnificadas', idFolderOsUnificadas)
    setValue('idFolderOsPendentes', idFolderOsPendentes)
    setValue('idFolderOsPagas', idFolderOsPagas)
    setClientId(id)
    scroll(0, 0)
  }, [])

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
            render={({ field, fieldState, formState: { errors } }) => (
              <InputPhone
                label="Celular"
                {...field}
                hasError={!!errors.phoneNumber}
                msgError={errors.phoneNumber?.message}
              />
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
        <Row marginTop="15px" display='flex' gap={1}>
          <div><b>Atenção:</b> Realizar a alteração desses IDs abaixo somente quando a pasta não existir mais. Para habilitar os campos abaixo, clique aqui:
            <Tooltip title={enableButtons ? 'Habilitar Campos' : 'Desabilitar Campos'}>
              <IconButton onClick={() => setEnableButton(!enableButtons)}><LockIcon /></IconButton>
            </Tooltip></div>
        </Row>
        <Row columns="repeat(5, 1fr)" marginTop="15px">
          <Controller
            name="idFolderClientName"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label="ID Pasta do Cliente"
                field={field}
                fieldState={fieldState}
                toUpperCase={false}
                disabled={enableButtons}
              />
            )}
          />
          <Controller
            name="idFolderOrcamento"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label="ID Pasta Orçamento"
                field={field}
                fieldState={fieldState}
                toUpperCase={false}
                disabled={enableButtons}
              />
            )}
          />
          <Controller
            name="idFolderOsPagas"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label="ID Pasta Os Pagas"
                field={field}
                fieldState={fieldState}
                toUpperCase={false}
                disabled={enableButtons}
              />
            )}
          />
          <Controller
            name="idFolderOsPendentes"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label="ID Pasta Os Pendentes"
                field={field}
                fieldState={fieldState}
                toUpperCase={false}
                disabled={enableButtons}
              />
            )}
          />
          <Controller
            name="idFolderOsUnificadas"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputText
                label="ID Pasta Os Unificadas"
                field={field}
                fieldState={fieldState}
                toUpperCase={false}
                disabled={enableButtons}
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
            loading={loading}
          />
          <Button
            textButton="Voltar"
            variant="outlined"
            size="large"
            icon="back"
            onClick={() => history.push(ADMINISTRATION_CLIENTS)}
          />
        </ButtonContainer>
      </Form >
    </Container >
  )
}

export default EditClient
