/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, FormGroup, FormControlLabel, Paper } from '@mui/material'
import { Card, ConnectionWhatsapp, Container } from './style'
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { useAdmin } from 'src/services/useAdmin';
import { exceptionHandle } from 'src/helpers/exceptions';
import React from 'react'
import { toast } from 'src/components/Widgets/Toastify';
import Button from 'src/components/Form/Button'
import { socket } from 'src/services/Socket';
import { CONNECTION_UPDATE, QRCODE_UPDATED } from 'src/services/Socket/EventTypes';
import { useModal } from 'src/hooks/useModal';
import ConnectionQrCode from './messages/ConnectionQrCode';

type UpdateHandle = {
  isEnableEmailBilling?: boolean
  isEnableWhatsappBilling?: boolean
}

type SocketResponse = {
  data: {
    event?: string
    base64?: string
    state?: string
    stateReason?: number
  }
}

const ConfigurationsSystem: React.FC = () => {

  const [isEnableSendConfigurationWhatsapp, setIsEnableSendConfigurationWhatsapp] = useState(false)
  const [isEnableSendConfigurationEmail, setIsEnableSendConfigurationEmail] = useState(false)
  const [makeRequest, setMakeRequest] = useState<number>()
  const [labelButton, setLabelButton] = useState('Conectar')
  const [webSocketData, setWebSocketData] = useState<any>({})
  const { apiAdmin } = useAdmin()
  const { showMessage } = useModal()

  const update = async (data: UpdateHandle) => {
    try {
      await apiAdmin.put('configurations/update', { ...data })
      setMakeRequest(Math.random())
      toast.success('Configurações atualizadas com sucesso.')
    } catch (error) {
      exceptionHandle(error)
    }
  }

  const onHandleChangeEnableConfigurationWhatsapp = async (event: any) => {
    setIsEnableSendConfigurationWhatsapp(event.target.checked)
    await update({ isEnableWhatsappBilling: event.target.checked })
  }

  const onHandleChangeEnableConfigurationEmail = async (event: any) => {
    setIsEnableSendConfigurationEmail(event.target.checked)
    await update({ isEnableEmailBilling: event.target.checked })
  }

  const getConfigurations = async () => {
    try {
      const { data } = await apiAdmin.get('configurations')
      if (data.length) {
        setIsEnableSendConfigurationEmail(data[0]?.isEnableEmailBilling)
        setIsEnableSendConfigurationWhatsapp(data[0]?.isEnableWhatsappBilling)
      }
    } catch (error) {
      exceptionHandle(error)
    }
  }

  const onHandleConnectionButton = async () => {
    try {
      await apiAdmin.get('configurations/connect/whatsapp')
    } catch (error) {
      exceptionHandle(error)
    }
  }

  React.useEffect(() => {
    getConfigurations()
  }, [makeRequest])

  React.useEffect(() => {
    socket.on(CONNECTION_UPDATE, (response: any) => {
      console.log({ CONNECTION_UPDATE: response })
      setWebSocketData({ state: response?.data?.state, stateReason: response?.data?.stateReason })
    })
    socket.on(QRCODE_UPDATED, (response: SocketResponse) => {
      console.log({ QRCODE_UPDATED: response })
      const base64 = response?.data?.base64
      setWebSocketData({ base64 })
      showMessage(ConnectionQrCode, { qrCode: base64 })
    })
  }, [])

  React.useEffect(() => {
    if (webSocketData?.state === 'connecting' && webSocketData?.stateReason === 200) {
      setLabelButton('Conectando...')
    }
    if (webSocketData?.state === 'close' && webSocketData?.stateReason === 515) {
      setLabelButton('Conectar')
    }
    if (webSocketData?.state === 'close' && webSocketData?.stateReason === 408) {
      setLabelButton('Conectar')
    }
    if (webSocketData?.state === 'open' && webSocketData?.stateReason === 200) {
      setLabelButton('Conectado com sucesso.')
    }
  }, [webSocketData])

  return (
    <Container>
      <Paper elevation={3}>
        <Alert severity="info">Ao marcar essa opção o sistema irá enviar a notificação de cobraça imediatamente após a importação do boleto e nota fiscal na ordem de serviço do cliente.</Alert>
        <FormGroup>
          <Card>
            <FormControlLabel
              control={<Checkbox />}
              checked={isEnableSendConfigurationWhatsapp}
              onChange={(event) => onHandleChangeEnableConfigurationWhatsapp(event)}
              label={'Enviar notificações de cobrança no Whatsapp do cliente.'}
              value={isEnableSendConfigurationWhatsapp}
            />
          </Card>
        </FormGroup>
      </Paper>
      <Paper elevation={3}>
        <Alert severity="info">Ao marcar essa opção o sistema irá enviar a notificação de cobraça quando faltar 3 dias para o vencimento do boleto e no dia do vencimento.</Alert>
        <FormGroup>
          <Card>
            <FormControlLabel
              control={<Checkbox />}
              checked={isEnableSendConfigurationEmail}
              onChange={(event) => onHandleChangeEnableConfigurationEmail(event)}
              label={'Enviar notificações de cobrança no E-mail do cliente.'}
              value={isEnableSendConfigurationEmail}
            />
          </Card>
        </FormGroup>
      </Paper>
      <Paper elevation={3}>
        <Alert severity="info">Conexão com Whatsapp. (Apenas envio de mensagens)</Alert>
        <ConnectionWhatsapp>
          <Button textButton={labelButton} variant='contained' icon='whatsApp' onClick={onHandleConnectionButton} />
        </ConnectionWhatsapp>
      </Paper>
    </Container>
  )
}

export default ConfigurationsSystem