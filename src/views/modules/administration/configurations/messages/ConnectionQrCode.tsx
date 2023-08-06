/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Container } from './style'
import Alert from '@mui/material/Alert';
import { SocketResponse } from '..';
import { useModal } from 'src/hooks/useModal';

interface ConnectionQrCodeProps {
  qrCode: string
  webSocketData: SocketResponse
}

const ConnectionQrCode: React.FC<ConnectionQrCodeProps> = ({ qrCode, webSocketData }) => {

  const { closeModal } = useModal()

  React.useEffect(() => {
    if (webSocketData?.state === 'close') {
      closeModal()
    }
    if (webSocketData?.state === 'open') {
      closeModal()
    }
  }, [webSocketData?.state])

  return (
    <Container>
      <Alert severity="info">Conecte o aparelho celular ao QRCode abaixo</Alert>
      <img src={qrCode} alt='QrCode' />
    </Container>
  )
}

export default ConnectionQrCode
