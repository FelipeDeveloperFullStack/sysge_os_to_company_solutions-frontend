import PaidIcon from '@mui/icons-material/Paid'
import DashboardIcon from '@mui/icons-material/Dashboard';
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import GroupIcon from '@mui/icons-material/Group'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'

export const permissionsUser = [
  {
    name: 'DASHBOARD',
    key: 'DASHBOARD',
    icon: <DashboardIcon />
  },
  {
    name: 'ORDEM DE SERVIÇO (VISUALIZAR)',
    key: 'ORDEM_SERVICO_VISUALIZAR',
    icon: <ContentPasteIcon />,
  },
  {
    name: 'ORDEM DE SERVIÇO (EDITAR)',
    key: 'ORDEM_SERVICO_EDITAR',
    icon: <ContentPasteIcon />,
  },
  {
    name: 'ORDEM DE SERVIÇO (EXCLUIR)',
    key: 'ORDEM_SERVICO_EXCLUIR',
    icon: <ContentPasteIcon />,
  },
  {
    name: 'RECEITAS (VISUALIZAR)',
    key: 'RECEITAS_VISUALIZAR',
    icon: <PaidIcon />,
  },
  {
    name: 'RECEITAS (EDITAR)',
    key: 'RECEITAS_EDITAR',
    icon: <PaidIcon />,
  },
  {
    name: 'RECEITAS (EXCLUIR)',
    key: 'RECEITAS_EXCLUIR',
    icon: <PaidIcon />,
  },
  {
    name: 'DESPESAS (VISUALIZAR)',
    key: 'DESPESAS_VISUALIZAR',
    icon: <MoneyOffIcon />,
  },
  {
    name: 'DESPESAS (EDITAR)',
    key: 'DESPESAS_EDITAR',
    icon: <MoneyOffIcon />,
  },
  {
    name: 'DESPESAS (EXCLUIR)',
    key: 'DESPESAS_EXCLUIR',
    icon: <MoneyOffIcon />,
  },
  {
    name: 'CLIENTES (VISUALIZAR)',
    key: 'CLIENTES_VISUALIZAR',
    icon: <GroupIcon />,
  },
  {
    name: 'CLIENTES (EDITAR)',
    key: 'CLIENTES_EDITAR',
    icon: <GroupIcon />,
  },
  {
    name: 'CLIENTES (EXCLUIR)',
    key: 'CLIENTES_EXCLUIR',
    icon: <GroupIcon />,
  },
  {
    name: 'PEÇAS (VISUALIZAR)',
    key: 'PECAS_VISUALIZAR',
    icon: <HomeRepairServiceIcon />,
  },
  {
    name: 'PEÇAS (EDITAR)',
    key: 'PECAS_EDITAR',
    icon: <HomeRepairServiceIcon />,
  },
  {
    name: 'PEÇAS (EXCLUIR)',
    key: 'PECAS_EXCLUIR',
    icon: <HomeRepairServiceIcon />,
  },
  {
    name: 'SERVIÇOS (VISUALIZAR)',
    key: 'SERVICOS_VISUALIZAR',
    icon: <ManageAccountsIcon />,
  },
  {
    name: 'SERVIÇOS (EDITAR)',
    key: 'SERVICOS_EDITAR',
    icon: <ManageAccountsIcon />,
  },
  {
    name: 'SERVIÇOS (EXCLUIR)',
    key: 'SERVICOS_EXCLUIR',
    icon: <ManageAccountsIcon />,
  },
  {
    name: 'EQUIPAMENTOS (VISUALIZAR)',
    key: 'EQUIPAMENTOS_VISUALIZAR',
    icon: <ImportantDevicesIcon />,
  },
  {
    name: 'EQUIPAMENTOS (EDITAR)',
    key: 'EQUIPAMENTOS_EDITAR',
    icon: <ImportantDevicesIcon />,
  },
  {
    name: 'EQUIPAMENTOS (EXCLUIR)',
    key: 'EQUIPAMENTOS_EXCLUIR',
    icon: <ImportantDevicesIcon />,
  },
  {
    name: 'GESTÃO DE USUÁRIOS (VISUALIZAR)',
    key: 'GESTAO_USUARIOS_VISUALIZAR',
    icon: <GroupAddIcon />,
  },
  {
    name: 'GESTÃO DE USUÁRIOS (EDITAR)',
    key: 'GESTAO_USUARIOS_EDITAR',
    icon: <GroupAddIcon />,
  },
  {
    name: 'GESTÃO DE USUÁRIOS (EXCLUIR)',
    key: 'GESTAO_USUARIOS_EXCLUIR',
    icon: <GroupAddIcon />,
  },
]