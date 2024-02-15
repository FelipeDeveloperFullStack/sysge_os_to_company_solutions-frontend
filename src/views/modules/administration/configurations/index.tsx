/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
} from '@mui/material'
import Alert from '@mui/material/Alert'
import React, { useState } from 'react'
import Button from 'src/components/Form/Button'
import { toast } from 'src/components/Widgets/Toastify'
import { exceptionHandle } from 'src/helpers/exceptions'
import { useModal } from 'src/hooks/useModal'
import { socket } from 'src/services/Socket'
import {
  CONNECTION_UPDATE,
  QRCODE_UPDATED,
} from 'src/services/Socket/EventTypes'
import { useAdmin } from 'src/services/useAdmin'
import ConnectionQrCode from './messages/ConnectionQrCode'
import { ConnectionWhatsapp, Container, ContainerCheckBox } from './style'
import { InputText } from 'src/components'
import { useLoading } from 'src/hooks/useLoading'

type UpdateHandle = {
  isEnableEmailBilling?: boolean
  isEnableToDontShowBeforeYearCurrent?: boolean
  isEnableSendNotificationMessage?: boolean
}

export type SocketResponse = {
  event?: string
  base64?: string
  state?: string
  stateReason?: number
}

const ConfigurationsSystem: React.FC = () => {
  const [
    isEnableToDontShowBeforeYearCurrent,
    setIsEnableToDontShowBeforeYearCurrent,
  ] = useState(false)
  const [
    isEnableSendNotificationMessage,
    setIsEnableSendNotificationMessage,
  ] = useState(false)
  const [isEnableSendConfigurationEmail, setIsEnableSendConfigurationEmail] =
    useState(false)
  const [makeRequest, setMakeRequest] = useState<number>()
  const [labelButton, setLabelButton] = useState('Conectar')
  const [labelButtonWebhook, setLabelButtonWebhook] = useState('')
  const [webSocketData, setWebSocketData] = useState<SocketResponse>(
    {} as SocketResponse,
  )
  const [statusConnection, setStatusConnection] = useState(false)
  const [statusConnectionWebhook, setStatusConnectionWebhook] = useState(false)
  const [webSocketState, setWebSocketState] = useState('')
  const [publicIP, setPublicIP] = useState('')
  const { apiAdmin } = useAdmin()
  const { showMessage, closeModal } = useModal()
  const { Loading } = useLoading()

  const update = async (data: UpdateHandle) => {
    try {
      await apiAdmin.put('configurations/update', { ...data })
      setMakeRequest(Math.random())
      toast.success('Configurações atualizadas com sucesso.')
    } catch (error) {
      exceptionHandle(error)
    }
  }
  const updateAllRegisterIncomesToDontShowBeforeYearCurrent = async (data: UpdateHandle) => {
    try {
      Loading.turnOn()
      await apiAdmin.put('configurations/update', { ...data })
      await apiAdmin.get(`orderServices/update-income-isEnableToDontShowBeforeYearCurrent/${data?.isEnableToDontShowBeforeYearCurrent}`)
      await apiAdmin.get(`expense/update-expense-isEnableToDontShowBeforeYearCurrent/${data?.isEnableToDontShowBeforeYearCurrent}`)
      setMakeRequest(Math.random())
      setTimeout(() => {
        Loading.turnOff()
        toast.success('Configurações atualizadas com sucesso.')
      }, 10000)
    } catch (error) {
      exceptionHandle(error)
      Loading.turnOff()
    }
  }

  const onHandleChangeEnableDontShowBeforeYearCurrent = async (event: any) => {
    setIsEnableToDontShowBeforeYearCurrent(event.target.checked)
    await updateAllRegisterIncomesToDontShowBeforeYearCurrent({ isEnableToDontShowBeforeYearCurrent: event.target.checked })
  }

  const onHandleChangeSendNotificationMessage = async (event: any) => {
    setIsEnableSendNotificationMessage(event.target.checked)
    await update({ isEnableSendNotificationMessage: event.target.checked })
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
        setIsEnableToDontShowBeforeYearCurrent(data[0]?.isEnableToDontShowBeforeYearCurrent)
        setIsEnableSendNotificationMessage(data[0]?.isEnableSendNotificationMessage)
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
  const onHandleSetWebhook = async () => {
    try {
      const { data } = await apiAdmin.put(
        'configurations/webhook/defineWebhook',
        { publicIP },
      )
      if (data?.status === 200) {
        toast.success(data?.message)
      }
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
  const getStatusConnectionWebhook = async () => {
    try {
      const { data } = await apiAdmin.get(`configurations/status/webhook`)
      if (data?.status === 404) {
        setStatusConnectionWebhook(false)
        setLabelButton('Aguardando a configuração do webhook')
        setLabelButtonWebhook('Enviar e configurar webhook')
        toast.warning(data?.message)
      } else {
        setLabelButtonWebhook('Webhook configurado com sucesso.')
        setStatusConnectionWebhook(true)
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
    getStatusConnectionWebhook()
  }, [])

  React.useEffect(() => {
    socket.on(CONNECTION_UPDATE, (response: SocketResponse) => {
      let webSocketState = response?.state
      setWebSocketData({
        state: response?.state,
        stateReason: response?.stateReason,
      })
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
      const base64 = response?.base64
      setWebSocketData({ ...webSocketData, base64 })
      showMessage(ConnectionQrCode, { qrCode: base64, webSocketState }, true)
    })
  }, [])

  React.useEffect(() => {
    if (
      webSocketData?.state === 'connecting' &&
      webSocketData?.stateReason === 200
    ) {
      setLabelButton('Conectando...')
    }
    if (webSocketData?.state === 'close') {
      setLabelButton('Conectar')
      toast.error('Conexão com Whatsapp fechada.')
      setStatusConnection(false)
    }
    if (webSocketData?.state === 'open' && webSocketData?.stateReason === 200) {
      setLabelButton('Conectado com sucesso.')
      toast.success('Whatsapp conectado com sucesso!')
      setStatusConnection(true)
    }
  }, [webSocketData, statusConnection])

  return (
    <Container>
      <Paper elevation={3}>
        <Alert severity="info">
          Ao marcar essa opção o sistema não irá mostrar nenhum dado anterior ao
          ano de {new Date().getFullYear()}.
        </Alert>
        <ContainerCheckBox>
          <FormGroup>
            <Card>
              <FormControlLabel
                control={<Checkbox />}
                checked={isEnableToDontShowBeforeYearCurrent}
                onChange={(event) =>
                  onHandleChangeEnableDontShowBeforeYearCurrent(event)
                }
                label={'Não mostrar os dados dos anos anteriores.'}
                value={isEnableToDontShowBeforeYearCurrent}
              />
            </Card>
          </FormGroup>
        </ContainerCheckBox>
      </Paper>
      <Paper elevation={3}>
        <Alert severity="info">
          Ao marcar essa opção o sistema não irá enviar a mensagem de notificação no Whatsapp e no E-mail após realizar a importação dos arquivos.
        </Alert>
        <ContainerCheckBox>
          <FormGroup>
            <Card>
              <FormControlLabel
                control={<Checkbox />}
                checked={isEnableSendNotificationMessage}
                onChange={(event) =>
                  onHandleChangeSendNotificationMessage(event)
                }
                label={'Não enviar mensagem de notificação após a importação dos arquivos.'}
                value={isEnableSendNotificationMessage}
              />
            </Card>
          </FormGroup>
        </ContainerCheckBox>
      </Paper>
      <Paper elevation={3}>
        <Alert severity="info">
          Conexão com Whatsapp. (Apenas envio de mensagens)
        </Alert>
        <ConnectionWhatsapp>
          <Button
            disabled={statusConnection}
            textButton={labelButton}
            variant="contained"
            icon="whatsApp"
            onClick={onHandleConnectionButton}
          />
        </ConnectionWhatsapp>
      </Paper>
      <Paper elevation={3}>
        <Alert severity="info">
          Informe o IP público para a configuração do Webhook. Necessário para a
          geraçao do QRCode de autenticação.
        </Alert>
        {!statusConnectionWebhook && <p></p>}
        {!statusConnectionWebhook && (
          <TextField
            label="IP público Webhook"
            variant="outlined"
            focused
            fullWidth
            size="small"
            value={publicIP}
            placeholder="Ex: 12.487.054.781"
            onChange={(event) => setPublicIP(event.target.value)}
          />
        )}
        <ConnectionWhatsapp>
          <Button
            disabled={statusConnectionWebhook}
            textButton={labelButtonWebhook}
            variant="contained"
            icon="whatsApp"
            onClick={onHandleSetWebhook}
          />
        </ConnectionWhatsapp>
      </Paper>
    </Container>
  )
}

export default ConfigurationsSystem
