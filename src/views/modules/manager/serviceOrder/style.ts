import { Divider, Paper } from '@mui/material'
import styled from 'styled-components'

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
  borderTop?: string
  display?: string
  justifyContent?: string
  fontWeight?: string
}

export const PaperStyled = styled(Paper)<{
  padding?: string
  paddingBottom?: string
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
`

export const ButtonContainer = styled.div`
  position: fixed;
  bottom: 31px;
  right: 23px;
`

export const Container = styled.section`
  background-color: #fff;
  height: auto;
  font-size: 12px;
`

export const ContainerOS = styled.section`
  padding: 15px;
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
  width: 180px;
  margin-bottom: 5px;
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
  border-top: ${({ borderTop }) => borderTop};
  display: ${({ display }) => display};
  justify-content: ${({ justifyContent }) => justifyContent};
  font-weight: ${({ fontWeight }) => fontWeight};
`
