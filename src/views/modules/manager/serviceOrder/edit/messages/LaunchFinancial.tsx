import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import InputText from '../components/InputCurrency'
import { toast } from 'src/components/Widgets/Toastify'
import { useAdmin } from 'src/services/useAdmin'
import { SERVICE_FILTER } from 'src/store/actions'
import { OSData } from '../type'
import { ButtonContainer, Modal } from './style'
import { Select } from 'src/components/Widgets/Select'
import { OptionsProps } from 'src/components/Form/Select'
import { Button } from 'src/components'
import { useModal } from 'src/hooks/useModal'
import { LaunchFinancialConfirmation } from './LaunchFinancialConfirmation'

type LauchFinancialProps = {
  data: OSData
  history: any
  resetAllField: () => void
}

export const LaunchFinancial: React.FC<LauchFinancialProps> = ({
  data,
  history,
  resetAllField,
}) => {
  const { apiAdmin } = useAdmin()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const { closeModal, showMessage } = useModal()

  const [status, setStatus] = useState('PENDENTE')
  const statusOptions: OptionsProps[] = [
    { label: 'Pendente', value: 'PENDENTE' },
    { label: 'Pago', value: 'PAGO' },
  ]

  const [formOfPayment, setFormOfPayment] = useState('Boleto')
  const sformOfPaymentOptions: OptionsProps[] = [
    { label: 'Boleto', value: 'Boleto' },
    { label: 'Pix', value: 'Pix' },
    { label: 'Dinheiro', value: 'Dinheiro' },
    { label: 'Cheque', value: 'Cheque' },
    { label: 'Cartão de Crédito', value: 'Cartão de Crédito' },
    { label: 'Cartão de Débito', value: 'Cartão de Débito' },
  ]

  const saveOS = async () => {
    const dataOS = {
      ...data,
      status,
      formOfPayment,
    }

    try {
      setLoading(true)
      await apiAdmin.post(`orderServices`, dataOS)
      dispatch({
        type: SERVICE_FILTER,
        payload: {},
      })
      toast.success('Ordem de serviço cadastrada com sucesso.')
      showMessage(LaunchFinancialConfirmation, { history, resetAllField })
    } catch (error) {
      toast.error('Houve um erro ao tentar salvar a Ordem de Serviço.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal>
      <div>Lançamento Financeiro</div>
      <InputText type="text" label="Data" value={data.dateOS} disabled />
      <InputText
        type="text"
        label="Cliente"
        value={data.client.name}
        disabled
      />
      <InputText
        type="text"
        label="CPF/CNPJ"
        value={data.client.cpfOrCnpj}
        disabled
      />
      <section>
        <Select
          label="Situação"
          setValue={setStatus}
          value={status}
          options={statusOptions}
        />
        <Select
          label="Forma de pagamento"
          setValue={setFormOfPayment}
          value={formOfPayment}
          options={sformOfPaymentOptions}
        />
        <InputText type="text" label="Valor" value={data.total} disabled />
      </section>
      <ButtonContainer>
        <Button
          textButton="Lançar Financeiro"
          variant="outlined"
          size="large"
          icon="add2"
          onClick={saveOS}
          loading={loading}
        />
        <Button
          textButton="Fechar"
          variant="outlined"
          size="large"
          icon="close"
          color="error"
          onClick={closeModal}
        />
      </ButtonContainer>
    </Modal>
  )
}
