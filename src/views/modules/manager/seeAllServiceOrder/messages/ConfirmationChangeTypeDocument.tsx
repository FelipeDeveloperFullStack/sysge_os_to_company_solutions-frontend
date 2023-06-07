import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useLoading } from 'src/hooks/useLoading'
import { useModal } from 'src/hooks/useModal'
import { useAdmin } from 'src/services/useAdmin'
import { LAYOUT_MAKE_REQUEST } from 'src/store/actions'
import { MappedDataServiceOrders } from '../types'
import { ButtonGroup, Container, Text } from './style'
import { Select } from 'src/components/Widgets/Select'

const ConfirmationChangeTypeDocument: React.FC<MappedDataServiceOrders> = ({
  id,
  osNumber,
  name,
  typeDocument,
  total,
}) => {
  const { closeModal } = useModal()
  const { Loading } = useLoading()
  const { apiAdmin } = useAdmin()
  const dispatch = useDispatch()
  const [status, setStatus] = useState('PENDENTE')

  const updateTypeDocument = async () => {
    try {
      Loading.turnOn()
      await apiAdmin.put(`orderServices/${id}`, {
        typeDocument: getInverseTypeDocumentToApi(typeDocument),
        status
      })
      toast.success(`${getTypeDocument(typeDocument)} de nº ${osNumber} convertida para ${getInverseTypeDocument(typeDocument)} com sucesso!`)
      closeModal()
      dispatch({
        type: LAYOUT_MAKE_REQUEST,
        payload: {
          makeRequest: Math.random(),
        },
      })
    } catch (error) {
      exceptionHandle(
        error,
        `Ops, Houve um erro ao tentar converter o tipo de documento, atualize a página e tente novamente.`,
      )
    } finally {
      Loading.turnOff()
    }
  }

  const getTypeDocument = (typeDocument: string) => {
    if (typeDocument === 'ORDEM_DE_SERVICO') return 'Ordem de Serviço'
    if (typeDocument === 'ORCAMENTO') return 'Orçamento'
  }
  const getInverseTypeDocument = (typeDocument: string) => {
    if (typeDocument === 'ORDEM_DE_SERVICO') return 'Orçamento'
    if (typeDocument === 'ORCAMENTO') return 'Ordem de Serviço'
  }
  const getInverseTypeDocumentToApi = (typeDocument: string) => {
    if (typeDocument === 'ORDEM_DE_SERVICO') return 'ORCAMENTO'
    if (typeDocument === 'ORCAMENTO') return 'ORDEM_DE_SERVICO'
  }

  return (
    <Container>
      <Text alignSelf="center" fontSize="20px">
        Deseja converter para <b style={{ marginLeft: '5px' }}>{getInverseTypeDocument(typeDocument)}</b> ?
      </Text>
      <Text flexDirection="column">
        <div>
          {getTypeDocument(typeDocument)}: <span>{osNumber}</span>
        </div>
        <div>
          Cliente: <span>{name}</span>
        </div>
        <div>
          Total: <span>{total}</span>
        </div>
      </Text>
      {typeDocument === 'ORCAMENTO' && <>
        <Text>
          Selecione abaixo qual status financeiro deseja atualizar o registro:
        </Text>
        <Select setValue={setStatus} value={status} options={[
          { label: 'PENDENTE', value: 'PENDENTE' },
          { label: 'PAGO', value: 'PAGO' },
        ]} />
      </>}
      <ButtonGroup>
        <Button
          textButton="Sim"
          variant="contained"
          color="primary"
          icon="update"
          onClick={() => updateTypeDocument()}
        />
        <Button
          textButton="Não"
          variant="outlined"
          icon="back"
          onClick={() => closeModal()}
        />
      </ButtonGroup>
    </Container>
  )
}

export default ConfirmationChangeTypeDocument
