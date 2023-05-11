import { toast } from 'src/components/Widgets/Toastify'
import { useLoading } from 'src/hooks/useLoading'
import { useAdmin } from 'src/services/useAdmin'
import { Total } from '..'

type DashboardProps = {
  setTotal: React.Dispatch<React.SetStateAction<Total>>
}

export const useDashBoard = ({ setTotal }: DashboardProps) => {
  const { Loading } = useLoading()
  const { apiAdmin } = useAdmin()

  const getTotalExpenses = async () => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get('expense/total')
      setTotal((previousState) => ({
        ...previousState,
        totalExpenses: data.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de despesas na plataforma.',
      )
    } finally {
      Loading.turnOff()
    }
  }

  const getTotalIncomes = async () => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get('orderServices/total/incomes')
      setTotal((previousState) => ({
        ...previousState,
        totalIncomes: data.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de receitas na plataforma.',
      )
    } finally {
      Loading.turnOff()
    }
  }

  const getTotalEquipaments = async () => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get('equipaments/total')
      setTotal((previousState) => ({
        ...previousState,
        totalEquipaments: data.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de serviços cadastrado na plataforma.',
      )
    } finally {
      Loading.turnOff()
    }
  }

  const getTotalServices = async () => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get('services/total')
      setTotal((previousState) => ({
        ...previousState,
        totalServices: data.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de serviços cadastrado na plataforma.',
      )
    } finally {
      Loading.turnOff()
    }
  }
  const getTotalPecas = async () => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get('pieces/total')
      setTotal((previousState) => ({
        ...previousState,
        totalPieces: data.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de peças cadastrado na plataforma.',
      )
    } finally {
      Loading.turnOff()
    }
  }

  const getTotalClients = async () => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get('clients/total')
      setTotal((previousState) => ({
        ...previousState,
        totalClients: data.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de clientes cadastrado na plataforma.',
      )
    } finally {
      Loading.turnOff()
    }
  }

  const getTotalOrderServices = async () => {
    try {
      Loading.turnOn()
      const { data } = await apiAdmin.get('orderServices/total')
      setTotal((previousState) => ({
        ...previousState,
        totalOrderService: data.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de ordem de serviços cadastrado na plataforma.',
      )
    } finally {
      Loading.turnOff()
    }
  }

  return {
    getTotalClients,
    getTotalOrderServices,
    getTotalPecas,
    getTotalServices,
    getTotalEquipaments,
    getTotalIncomes,
    getTotalExpenses,
  }
}
