import AddIcon from '@mui/icons-material/Add'
import AddTaskIcon from '@mui/icons-material/AddTask'
import CloseIcon from '@mui/icons-material/Close'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import BackIcon from '@mui/icons-material/Reply'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import PdfIcon from '@mui/icons-material/PictureAsPdf'
import Button from '@mui/material/Button'
import React from 'react'

interface buttonProps {
  textButton: string
  variant: variantType
  color?: colorType
  disabled?: boolean
  icon?: iconType
  size?: sizeType
  onClick?: () => void
  type?: string
  [x: string]: any
}

type variantType = 'outlined' | 'contained' | 'text'
type colorType =
  | 'inherit'
  | 'default'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
type sizeType = 'small' | 'medium' | 'large'
type iconType =
  | 'add'
  | 'add2'
  | 'add3'
  | 'edit'
  | 'delete'
  | 'whatsApp'
  | 'back'
  | 'close'
  | 'pdf'

const icons = {
  add: <AddIcon />,
  add2: <LibraryAddIcon />,
  add3: <AddTaskIcon />,
  edit: <EditIcon />,
  delete: <DeleteForeverIcon />,
  whatsApp: <WhatsAppIcon />,
  back: <BackIcon />,
  close: <CloseIcon />,
  pdf: <PdfIcon />,
}

const defineIcon = (icon: iconType) => {
  return icons[icon]
}

const _Button: React.FunctionComponent<buttonProps> = (props, { ...rest }) => {
  return (
    <React.Fragment>
      <Button
        variant={props.variant}
        color={props.color}
        disabled={props.disabled || false}
        onClick={props.onClick}
        startIcon={defineIcon(props.icon)}
        size={props.size}
        type={props.type}
        {...rest}
      >
        {props.textButton}
      </Button>
    </React.Fragment>
  )
}

export default _Button
