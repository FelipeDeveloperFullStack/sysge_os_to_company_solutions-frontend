import { Divider, Paper } from '@mui/material'
import styled, { css, keyframes } from 'styled-components'

type HeaderTextFontProps = {
  fontSize?: number
  fontWeight?: boolean
  marginBottom?: string
}

type TextClientProps = {
  isNotUsingBorderBottom?: boolean
  marginTop?: string
  marginLeft?: string
  marginRight?: string
  marginBottom?: string
  width?: string
  height?: string
  borderTop?: string
  display?: string
  justifyContent?: string
  fontWeight?: string
  fontSize?: string
  gap?: string
  position?: string
}

const swingButtonFinancial = keyframes`
  15% {
    transform: translateX(5px);
  }
  30% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(3px);
  }
  65% {
    transform: translateX(-3px);
  }
  80% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
`

export const TecnicalResponsible = styled.b`
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 9999999999;
  border-top: 1px solid gray;
`

export const PaperStyled = styled(Paper)<{
  padding?: string
  paddingBottom?: string
  display?: string
  justifyContent?: string
  fontSize?: string
  flexDirection?: string
  alignItems?: string
}>`
  border-style: solid;
  border-color: gray;
  border-width: 3px;
  border-radius: 10px;
  margin-bottom: 5px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom ? paddingBottom : '10px'};
  padding: ${({ padding }) => padding};
  display: ${({ display }) => display};
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: ${({ justifyContent }) => justifyContent};
  font-size: ${({ fontSize }) => fontSize};
  align-items: ${({ alignItems }) => alignItems};
  > div {
    > section {
      > img {
        position: absolute;
        top: -53px;
        width: 92px;
        z-index: 0;
      }
    }
  }
`

export const ButtonContainerGenerateOS = styled.div<{ isGeneratePDF: boolean }>`
  position: fixed;
  bottom: 31px;
  right: 23px;
  ${({ isGeneratePDF }) =>
    isGeneratePDF &&
    css`
      visibility: hidden;
      height: 0px;
    `}
`
export const ButtonContainerLaunchInTheFinancial = styled.div<{
  isGeneratePDF: boolean
}>`
  position: fixed;
  bottom: 85px;
  right: 23px;
  //animation: ${swingButtonFinancial} 1s ease-in-out infinite;
  ${({ isGeneratePDF }) =>
    isGeneratePDF &&
    css`
      visibility: hidden;
      height: 0px;
    `}
`

export const Container = styled.section<{
  isGeneratePDF: boolean
}>`
  background-color: #fff;
  height: auto;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ isGeneratePDF }) =>
    isGeneratePDF &&
    css`
      /* visibility: hidden;*/
      height: 0px;
    `}
`

export const ContainerOS = styled.section`
  padding: 15px;
  width: 1024px;
`

export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 0px 15px 0px 15px;
`
export const HeaderText = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const HeaderTextFont = styled.section<HeaderTextFontProps>`
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '20px')};
  font-weight: ${({ fontWeight }) => (fontWeight ? 'bold' : null)};
  margin-bottom: ${({ marginBottom }) => marginBottom};
`

export const Image = styled.img`
  //width: 180px;
  width: 171px;
  /* margin-bottom: 5px; */
  position: relative;
  top: 0px;
`

export const CompanyAddress = styled.section`
  width: 50%;
`
export const CompanyContact = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export const DividerStyled = styled(Divider)<{ marginTop?: string }>`
  margin: 0px 15px 0px 15px;
  border-width: 1px;
  margin-top: ${({ marginTop }) => marginTop};
`

export const ContainerOSNumberAndDate = styled.section`
  display: grid;
  grid-template-columns: 3fr 1fr;
`

export const ContainerOSText = styled.section`
  display: flex;
  justify-content: space-between;
`

export const OSText = styled.section`
  padding-left: 13px;
  font-size: 30px;
  font-weight: bold;
  font-family: fantasy;
  letter-spacing: 4px;
`
export const OSNumber = styled.section<{ color?: string }>`
  padding-left: 13px;
  font-size: 30px;
  font-weight: bold;
  font-family: fantasy;
  letter-spacing: 4px;
  color: ${({ color }) => color};
  display: flex;
  padding-right: 10px;
`

export const ContainerDateOS = styled.section`
  display: flex;
  justify-content: center;
`
export const DateOS = styled.section`
  font-size: 30px;
`

export const Text = styled.section<TextClientProps>`
  border-bottom: ${({ isNotUsingBorderBottom }) =>
    !isNotUsingBorderBottom ? '1px solid gray' : null};
  margin-top: ${({ marginTop }) => (marginTop ? marginTop : '0px')};
  margin-left: ${({ marginLeft }) => (marginLeft ? marginLeft : '0px')};
  margin-right: ${({ marginRight }) => (marginRight ? marginRight : '0px')};
  margin-bottom: ${({ marginBottom }) => (marginBottom ? marginBottom : '0px')};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-top: ${({ borderTop }) => borderTop};
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  gap: ${({ gap }) => gap};
  position: ${({ position }) => position};
`
