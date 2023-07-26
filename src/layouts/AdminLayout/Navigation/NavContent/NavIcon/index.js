import React from 'react'
import PaidIcon from '@mui/icons-material/Paid'
import ContentPasteIcon from '@mui/icons-material/ContentPaste'
import MoneyOffIcon from '@mui/icons-material/MoneyOff'
import GroupIcon from '@mui/icons-material/Group'
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import { Icon } from './style'

const getIcon = (icon) => {
  const icons = {
    incomesIcon: <PaidIcon />,
    orderServiceIcon: <ContentPasteIcon />,
    expensesIcon: <MoneyOffIcon />,
    clientsIcon: <GroupIcon />,
    piecesIcon: <HomeRepairServiceIcon />,
    serviceIcon: <ManageAccountsIcon />,
    equipamentIcon: <ImportantDevicesIcon />,
    managerUsersIcon: <GroupAddIcon />,
    extractNubankIcon: <CreditCardIcon />,
  }
  return icons[icon]
}

const NavIcon = ({ items }) => {
  let navIcons = false
  if (items.icon) {
    navIcons = getIcon(items.icon)
  }

  return (
    <React.Fragment>
      <Icon>{navIcons}</Icon>
    </React.Fragment>
  )
}

export default NavIcon
