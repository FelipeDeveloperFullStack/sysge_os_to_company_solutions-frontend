import styled, { css } from 'styled-components'

interface NotificationTextProps {
  warning?: boolean
}

export const NotificationText = styled.div<NotificationTextProps>`
  /* background: #1b5e20; */
  background: #3f4d67;
  ${({ warning }) =>
    warning &&
    css`
      background: #ed6c02;
    `}
  color: #fff;
  border-radius: 5px;
  padding: 2px;
  width: fit-content;
`
