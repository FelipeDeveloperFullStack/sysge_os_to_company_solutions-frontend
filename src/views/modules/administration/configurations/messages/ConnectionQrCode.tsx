/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Container } from './style'
import Alert from '@mui/material/Alert';
import { SocketResponse } from '..';
import { useModal } from 'src/hooks/useModal';

interface ConnectionQrCodeProps {
  qrCode: string
  webSocketState: string
}

const ConnectionQrCode: React.FC<ConnectionQrCodeProps> = ({ qrCode, webSocketState }) => {

  const { closeModal } = useModal()

  React.useEffect(() => {
    if (webSocketState === 'close') {
      closeModal()
    }
    if (webSocketState === 'open') {
      closeModal()
    }
    console.log(webSocketState)
  }, [webSocketState])

  return (
    <Container>
      <Alert severity="info">Conecte o aparelho celular ao QRCode abaixo</Alert>
      <img src={qrCode} alt='QrCode' />
    </Container>
  )
}

export default ConnectionQrCode
