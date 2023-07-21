import { toast } from 'src/components/Widgets/Toastify'
import { useAdmin } from 'src/services/useAdmin'
import { Total } from '..'

type DashboardProps = {
  setTotal: React.Dispatch<React.SetStateAction<Total>>
}

export const useDashBoard = ({ setTotal }: DashboardProps) => {
  const { apiAdmin } = useAdmin()

  const getTotalExpiredMaturityIn3Days = async () => {
    try {
      const { data } = await apiAdmin.get('orderServices/total/maturity-boleto')
      setTotal((previousState) => ({
        ...previousState,
        totalValueIncomeInExpired3Days: data?.count,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de receitas de vencer na plataforma.',
      )
    }
  }
  const getTotalExpired = async () => {
    try {
      const { data } = await apiAdmin.get('expense/expired')
      setTotal((previousState) => ({
        ...previousState,
        totalValueExpenseInExpired: data?.total,
        qtdeExpenseInExpired: data?.count,
        expiredTotal: data?.expiredTotal,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar as despesas de vencer na plataforma.',
      )
    }
  }

  const getTotalExpenses = async () => {
    try {

      const { data } = await apiAdmin.get('expense/total')
      setTotal((previousState) => ({
        ...previousState,
        totalExpenses: data?.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de despesas na plataforma.',
      )
    } finally {

    }
  }

  const getTotalIncomes = async () => {
    try {

      const { data } = await apiAdmin.get('orderServices/total/incomes')
      setTotal((previousState) => ({
        ...previousState,
        totalIncomes: data?.total,
        totalIncomesPending: data?.totalPending,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de receitas na plataforma.',
      )
    } finally {

    }
  }

  const getTotalEquipaments = async () => {
    try {

      const { data } = await apiAdmin.get('equipaments/total')
      setTotal((previousState) => ({
        ...previousState,
        totalEquipaments: data?.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de serviços cadastrado na plataforma.',
      )
    } finally {

    }
  }

  const getTotalServices = async () => {
    try {

      const { data } = await apiAdmin.get('services/total')
      setTotal((previousState) => ({
        ...previousState,
        totalServices: data?.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de serviços cadastrado na plataforma.',
      )
    } finally {

    }
  }
  const getTotalPecas = async () => {
    try {

      const { data } = await apiAdmin.get('pieces/total')
      setTotal((previousState) => ({
        ...previousState,
        totalPieces: data?.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de peças cadastrado na plataforma.',
      )
    } finally {

    }
  }

  const getTotalClients = async () => {
    try {

      const { data } = await apiAdmin.get('clients/total')
      setTotal((previousState) => ({
        ...previousState,
        totalClients: data?.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de clientes cadastrado na plataforma.',
      )
    } finally {

    }
  }

  const getTotalOrderServices = async () => {
    try {

      const { data } = await apiAdmin.get('orderServices/total')
      setTotal((previousState) => ({
        ...previousState,
        totalOrderService: data?.total,
      }))
    } catch (error) {
      toast.error(
        'Houve um erro ao tentar retornar o total de ordem de serviços cadastrado na plataforma.',
      )
    } finally {

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
    getTotalExpired,
    getTotalExpiredMaturityIn3Days
  }
}
