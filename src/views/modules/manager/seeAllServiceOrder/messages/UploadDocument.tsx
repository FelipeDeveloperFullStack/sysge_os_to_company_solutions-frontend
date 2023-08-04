/* eslint-disable react-hooks/exhaustive-deps */
import { Alert } from '@mui/material'
import React, { useState } from 'react'
import Button from 'src/components/Form/Button'
import { UploadWithTemplate } from 'src/components/Upload/UploadWithTemplate'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useAuth } from 'src/hooks/useAuth'
import { useModal } from 'src/hooks/useModal'
import { useAdmin } from 'src/services/useAdmin'
import { MappedDataServiceOrders } from '../types'
import { ButtonGroup, Container, ContainerDocuments, ContainerUploadDocuments, Text } from './style'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

type Documents = {
  fileName: string
  base64: string
}

const UploadDocument: React.FC<MappedDataServiceOrders> = ({
  osNumber,
  name,
  typeDocument,
  isBoletoUploaded,
  clientName
}) => {
  const { closeModal } = useModal()
  const { user } = useAuth()
  const { apiAdmin } = useAdmin()
  const [documents, setDocuments] = useState<Documents[]>([] as Documents[])

  const getTypeDocument = (typeDocument: string) => {
    if (typeDocument === 'ORDEM_DE_SERVICO') return 'Ordem de Serviço'
    if (typeDocument === 'ORCAMENTO') return 'Orçamento'
  }

  const getDocuments = async () => {
    try {
      const { data } = await apiAdmin.get(`orderServices/documents/${osNumber}`)
      setDocuments(data)
    } catch (error) {
      exceptionHandle(error)
    }
  }

  function base64ToBlob(base64Data, contentType = 'application/pdf') {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  const openDocument = (base64Data: string) => {
    const blob = base64ToBlob(base64Data);
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
  }

  React.useEffect(() => {
    getDocuments()
  }, [])

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
          Cliente: <span>{name || clientName}</span>
        </div>
      </Text>

      {!isBoletoUploaded && <Alert severity="warning">
        Ao clicar em <span><b>Enviar</b></span> o documento PDF importado ficará vinculado a ordem de serviço de nº <b>{osNumber}</b>.
      </Alert>}
      {isBoletoUploaded && <Alert severity="warning">
        Ao clicar em <span><b>Enviar</b></span> o documento PDF importado irá <b>substituir</b> o arquivo já existente vinculando a ordem de serviço de nº <b>{osNumber}</b>.
      </Alert>}
      {documents?.length === 1 && <Alert>1 arquivo vinculado a essa ordem de serviço.</Alert>}
      {documents?.length > 1 && <Alert>{documents?.length} arquivos vinculado a essa ordem de serviço.</Alert>}
      {documents?.map((doc, index) => (
        <ContainerUploadDocuments>
          <ContainerDocuments>
            <div style={{ display: 'flex', gap: '5px' }}>
              <Tooltip title='Visualizar o documento'>
                <IconButton onClick={() => openDocument(doc.base64)}>
                  <VisibilityIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title='Excluir'>
                <IconButton color='error'>
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div>{doc.fileName}</div>
          </ContainerDocuments>
        </ContainerUploadDocuments>
      ))}
      <UploadWithTemplate endpoint={`http://${user?.user?.ip}:3005/orderServices/upload/boleto/${osNumber}`} multiple call={getDocuments} />
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
