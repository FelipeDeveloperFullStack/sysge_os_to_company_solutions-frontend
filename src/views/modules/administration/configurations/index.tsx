/* eslint-disable react-hooks/exhaustive-deps */
import { Checkbox, FormControlLabel, FormGroup, Paper } from '@mui/material';
import Alert from '@mui/material/Alert';
import React, { useState } from 'react';
import Button from 'src/components/Form/Button';
import { toast } from 'src/components/Widgets/Toastify';
import { exceptionHandle } from 'src/helpers/exceptions';
import { useModal } from 'src/hooks/useModal';
import { socket } from 'src/services/Socket';
import { CONNECTION_UPDATE, QRCODE_UPDATED } from 'src/services/Socket/EventTypes';
import { useAdmin } from 'src/services/useAdmin';
import ConnectionQrCode from './messages/ConnectionQrCode';
import { Card, ConnectionWhatsapp, Container } from './style';

type UpdateHandle = {
  isEnableEmailBilling?: boolean
  isEnableWhatsappBilling?: boolean
}

export type SocketResponse = {
  event?: string
  base64?: string
  state?: string
  stateReason?: number
}

const ConfigurationsSystem: React.FC = () => {

  const [isEnableSendConfigurationWhatsapp, setIsEnableSendConfigurationWhatsapp] = useState(false)
  const [isEnableSendConfigurationEmail, setIsEnableSendConfigurationEmail] = useState(false)
  const [makeRequest, setMakeRequest] = useState<number>()
  const [labelButton, setLabelButton] = useState('Conectar')
  const [webSocketData, setWebSocketData] = useState<SocketResponse>({} as SocketResponse)
  const [webSocketState, setWebSocketState] = useState('')
  const [statusConnection, setStatusConnection] = useState(false)
  const { apiAdmin } = useAdmin()
  const { showMessage, closeModal } = useModal()

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

  const getStatusConnection = async () => {
    try {
      const { data } = await apiAdmin.get(`configurations/status/connection`)
      if (data?.statusReason === 200) {
        setStatusConnection(true)
        setLabelButton('Conectado com sucesso.')
        toast.success('Whatsapp conectado com sucesso!')
      } else {
        setStatusConnection(false)
      }
    } catch (error) {
      exceptionHandle(error)
    }
  }

  React.useEffect(() => {
    getConfigurations()
  }, [makeRequest])

  React.useEffect(() => {
    getStatusConnection()
  }, [])

  React.useEffect(() => {
    socket.on(CONNECTION_UPDATE, (response: SocketResponse) => {
      let webSocketState = response?.state
      console.log({ state: response?.state, stateReason: response?.stateReason, CONNECTION_UPDATE })
      setWebSocketData({ state: response?.state, stateReason: response?.stateReason })
      setWebSocketState(response?.state)
      if (webSocketState === 'close') {
        closeModal()
      }
      if (webSocketState === 'open') {
        closeModal()
      }
      if (webSocketState === 'refused') {
        closeModal()
      }
    })
    socket.on(QRCODE_UPDATED, (response: SocketResponse) => {
      console.log({ base64: response?.base64, QRCODE_UPDATED })
      const base64 = response?.base64
      setWebSocketData({ ...webSocketData, base64 })
      showMessage(ConnectionQrCode, { qrCode: base64, webSocketState }, true)
    })
  }, [])

  React.useEffect(() => {
    if (webSocketData?.state === 'connecting' && webSocketData?.stateReason === 200) {
      setLabelButton('Conectando...')
    }
    if (webSocketData?.state === 'close') {
      setLabelButton('Conectar')
      toast.error('Conexão com Whatsapp falhou, tente novamente!')
      setStatusConnection(false)
    }
    if (webSocketData?.state === 'open' && webSocketData?.stateReason === 200) {
      setLabelButton('Conectado com sucesso.')
      toast.success('Whatsapp conectado com sucesso!')
    }
  }, [webSocketData, statusConnection])

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
        <Alert severity="info">Conexão com Whatsapp. (Apenas envio de mensagens)</Alert>
        <ConnectionWhatsapp>
          <Button disabled={statusConnection} textButton={labelButton} variant='contained' icon='whatsApp' onClick={onHandleConnectionButton} />
        </ConnectionWhatsapp>
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
    </Container>
  )
}

export default ConfigurationsSystem