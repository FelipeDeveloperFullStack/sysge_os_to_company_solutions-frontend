import React from 'react'

export type MappedDataServiceOrders = {
  id: string
  name: string
  clientName?: string
  osNumber: string
  dateOS: string
  total: string
  status: string
  typeDocument: string
  idFileCreatedGoogleDrive?: string
  clientId?: string
  isSendNowDayMaturityBoleto?: boolean
  isSendThreeDayMaturityBoleto?: boolean
  dateGeneratedOS?: string
  isBoletoUploaded?: boolean
  setMakeRequest?: React.Dispatch<React.SetStateAction<number>>
}

export type DeleteDocuments = {
  fileName: string
  loading?: boolean
  deleteDocument: (fileName: string) => Promise<void>
  setMakeRequest?: React.Dispatch<React.SetStateAction<number>>
}
