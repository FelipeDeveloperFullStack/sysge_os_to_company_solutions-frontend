import { Alert } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from 'src/components/Form/Button'
import { UploadWithTemplate } from 'src/components/Upload/UploadWithTemplate'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useAuth } from 'src/hooks/useAuth'
import { useLoading } from 'src/hooks/useLoading'
import { useModal } from 'src/hooks/useModal'
import { useAdmin } from 'src/services/useAdmin'
import { LAYOUT_MAKE_REQUEST } from 'src/store/actions'
import { MappedDataServiceOrders } from '../types'
import { ButtonGroup, Container, Text } from './style'

const UploadDocument: React.FC<MappedDataServiceOrders> = ({
  osNumber,
  name,
  typeDocument,
  isBoletoUploaded,
}) => {
  const { closeModal } = useModal()
  const { user } = useAuth()

  const getTypeDocument = (typeDocument: string) => {
    if (typeDocument === 'ORDEM_DE_SERVICO') return 'Ordem de Serviço'
    if (typeDocument === 'ORCAMENTO') return 'Orçamento'
  }

  return (
    <Container>
      <Text alignSelf="center" fontSize="20px" bold>
        Importação de Boleto
      </Text>
      <Text flexDirection="column">
        <div>
          {getTypeDocument(typeDocument)}: <span>{osNumber}</span>
        </div>
        <div>
          Cliente: <span>{name}</span>
        </div>
      </Text>
      {isBoletoUploaded && <Alert>Já existe um boleto vinculado a essa ordem de serviço.</Alert>}
      {!isBoletoUploaded && <Alert severity="warning">
        Ao clicar em <span><b>Enviar</b></span> o documento PDF importado ficará vinculado a ordem de serviço de nº <b>{osNumber}</b>.
      </Alert>}
      {isBoletoUploaded && <Alert severity="warning">
        Ao clicar em <span><b>Enviar</b></span> o documento PDF importado irá <b>substituir</b> o arquivo já existente vinculando a ordem de serviço de nº <b>{osNumber}</b>.
      </Alert>}
      <UploadWithTemplate endpoint={`http://${user?.user?.ip}:3005/orderServices/upload/boleto/${osNumber}`} />
      <ButtonGroup>
        <Button
          textButton="Fechar"
          variant="outlined"
          icon="close"
          onClick={() => closeModal()}
        />
      </ButtonGroup>
    </Container>
  )
}

export default UploadDocument
