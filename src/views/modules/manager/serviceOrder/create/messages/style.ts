import { FormControlLabel } from '@mui/material'
import styled, { css } from 'styled-components'

export const Container = styled.section`
  //padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`
export const ButtonGroup = styled.section`
  display: flex;
  gap: 10px;
  justify-content: center;
`
export const Text = styled.section<{ bold?: boolean }>`
  font-size: 20px;
  align-self: center;
  ${({ bold }) =>
    bold &&
    css`
      font-weight: bold;
    `}
`

export const FormControlLabelStyled = styled(FormControlLabel)`
  width: 695px;
`
