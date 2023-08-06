import React from 'react'
import { Container } from './style'
import Alert from '@mui/material/Alert';

interface ConnectionQrCodeProps {
  qrCode: string
}

const ConnectionQrCode: React.FC<ConnectionQrCodeProps> = ({ qrCode }) => {
  return (
    <Container>
      <Alert severity="info">Conecte o aparelho celular ao QRCode abaixo</Alert>
      <img src={qrCode} alt='QrCode' />
    </Container>
  )
}

export default ConnectionQrCode
