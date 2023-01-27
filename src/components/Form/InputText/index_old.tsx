import React from 'react'
import { Container } from './styles'
import { TextFieldStyled } from './stylesInputText'

interface InputTextProps {
  label?: string
  field: any
  toUpperCase?: boolean
  variant?: variantType
  [x: string]: any
  // setValue?: (value: string) => void
  // hasError?: boolean
  // msgError?: string
  // onlyLetter?: boolean
  // onlyNumber?: boolean
  // multiline?: boolean
  // rows?: number
  // noSpecialCaracter?: boolean
  // size?: sizeType
  // fullWidth?: boolean
  // name?: string
  // onChange: any
}

type variantType = 'outlined' | 'filled' | 'standard'
type sizeType = 'small' | 'medium'

const InputText: React.FC<InputTextProps> = ({
  label = '',
  field: { onChange, value },
  fieldState: { error },
  variant,
  toUpperCase = true,
  // setValue,
  // onChange,
  // hasError = false,
  // msgError = '',
  // onlyLetter = false,
  // onlyNumber = false,
  // noSpecialCaracter,
  // multiline,
  // rows,
  // fullWidth,
  // size,
  // name,
  ...rest
}) => {
  return (
    <Container
      variation={'variation'}
      hasError={'msgError || hasError'}
      isHasValue={value?.trim() ? true : false}
    >
      <TextFieldStyled
        label={label}
        variant={variant || 'outlined'}
        margin="dense"
        isHasValue={value?.trim()}
        value={toUpperCase ? String(value).toUpperCase() : value}
        fullWidth
        onChange={onChange}
        error={!!error}
        helperText={error ? error.message : null}
        focused
        {...rest}
      />
    </Container>
  )
}

export default InputText
