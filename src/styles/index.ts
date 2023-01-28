import styled from 'styled-components'

type RowProp = {
  gap?: number
  columns?: string
  display?: string
  justifyContent?: string
  marginTop?: string
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  borderBottom?: string
  position?: string
  bottom?: string
  top?: string
  left?: string
  right?: string
  height?: string
}

export const Row = styled.div<RowProp>`
  display: ${({ display }) => (display ? display : 'grid')};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0px')};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : '0px')};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '0px')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0px')};
  position: ${({ position }) => position};
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  right: ${({ right }) => right};
  bottom: ${({ bottom }) => bottom};
  height: ${({ height }) => height};
  gap: ${({ gap }) => (gap ? gap + 'px' : '32px')};
  border-bottom: ${({ borderBottom }) => borderBottom};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'space-between'};
  grid-template-columns: ${({ columns }) =>
    `${columns} !important` || '1fr 1fr'};
  @media (max-width: 1200px) {
    grid-template-columns: 100%;
  }
`
