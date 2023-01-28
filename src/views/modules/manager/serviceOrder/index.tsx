import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from 'src/components'
import { useGeneratePDF } from 'src/hooks/useGeneratePDF'
import { Row } from 'src/styles'
import Logo from './assets/images/logo.png'
import { OSData } from './create/type'
import { formatPrice } from 'src/helpers/formatPrice'
import Fab from '@mui/material/Fab'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import {
  ButtonContainer,
  CompanyAddress,
  CompanyContact,
  Container,
  ContainerDateOS,
  ContainerOS,
  ContainerOSNumberAndDate,
  ContainerOSText,
  DateOS,
  DividerStyled,
  Header,
  HeaderText,
  HeaderTextFont,
  Image,
  OSNumber,
  OSText,
  PaperStyled,
  Text,
} from './style'

const ServiceOrder: React.FC = () => {
  const exportPDF = useGeneratePDF()
  const location = useLocation()

  const [data] = useState<OSData>(location?.state?.OSData)

  const getDateCurrent = () => {
    return `${new Date().getDate()}/${new Date().getMonth() + 1}/
    ${new Date().getFullYear()}`
  }

  useEffect(() => {
    console.log({ data })
  }, [])

  return (
    <>
      <ButtonContainer>
        {/* <Button
          textButton="Gerar OS"
          size="large"
          variant="contained"
          onClick={() =>
            exportPDF(
              `Cliente_${data.clientName}_Ordem_de_Servico_N_${data.osNumber}`,
              'pdf',
            )
          }
        /> */}
        <Fab
          color="primary"
          variant="extended"
          onClick={() =>
            exportPDF(
              `Cliente_${data.clientName}_Ordem_de_Servico_N_${data.osNumber}`,
              'pdf',
            )
          }
        >
          <CloudDownloadIcon sx={{ mr: 1 }} />
          Gerar OS
        </Fab>
      </ButtonContainer>
      <Container>
        <ContainerOS id="pdf">
          <PaperStyled elevation={1}>
            <Header>
              <HeaderTextFont>
                <Image src={Logo} />
              </HeaderTextFont>
              <HeaderText>
                <HeaderTextFont>
                  Instalação e manutenção de equipamentos em geral
                </HeaderTextFont>
                <HeaderTextFont>Manutenção de Ar Condicionado</HeaderTextFont>
              </HeaderText>
            </Header>

            <DividerStyled />

            <Header>
              <CompanyAddress>
                <HeaderTextFont fontSize={12} marginBottom="10px">
                  CNPJ: 46.293.911/0001-55
                </HeaderTextFont>
                <HeaderTextFont fontSize={20} fontWeight>
                  NOME DA EMPRESA AQUI
                </HeaderTextFont>
                <HeaderTextFont fontSize={12}>
                  Av. Niemeyer QD 157 LT 24
                </HeaderTextFont>
              </CompanyAddress>

              <CompanyContact>
                <HeaderTextFont fontSize={20} fontWeight>
                  Fone: (62)98529-6795 (62)3222-6069
                </HeaderTextFont>
                <HeaderTextFont fontSize={12}>
                  E-mail: prflucas@gmail.com
                </HeaderTextFont>
              </CompanyContact>
            </Header>
          </PaperStyled>

          <ContainerOSNumberAndDate>
            <PaperStyled elevation={1}>
              <ContainerOSText>
                <OSText>ORDEM DE SERVIÇO</OSText>
                <OSNumber>
                  Nº <OSNumber color="red">{data.osNumber}</OSNumber>
                </OSNumber>
              </ContainerOSText>
            </PaperStyled>
            <PaperStyled elevation={1}>
              <ContainerDateOS>
                <DateOS>Data {data.dateOS}</DateOS>
              </ContainerDateOS>
            </PaperStyled>
          </ContainerOSNumberAndDate>

          <PaperStyled elevation={1}>
            <Row
              borderBottom="1px solid gray"
              marginLeft="15px"
              marginRight="15px"
              marginBottom="5px"
            >
              <Text isNotUsingBorderBottom width="900px">
                <b>Cliente:</b> {data.clientName}
              </Text>
            </Row>
            <Row marginLeft="15px" columns="5fr 1fr" marginBottom="5px">
              <Text>
                <b>End:</b> Rua 10 QUADRA CP16 LOTE 01 SALA 03
              </Text>
              <Text marginRight="15px">
                <b>CEP:</b> 74395-200
              </Text>
            </Row>
            <Row
              marginLeft="15px"
              marginRight="15px"
              columns="3fr 1fr 2fr"
              marginBottom="5px"
            >
              <Text>
                <b>Cidade:</b> GOIÂNIA
              </Text>
              <Text>
                <b>UF:</b> GO
              </Text>
              <Text>
                <b>CNPJ:</b> 39.325.426/0001-55
              </Text>
            </Row>
            <Row marginLeft="15px" columns="4fr 1fr" marginBottom="5px">
              <Text>
                <b>E-mail:</b> arianyf_aguiar@hotmail.com
              </Text>
              <Text marginRight="15px">
                <b>Telefone:</b> (62) 98206-9603
              </Text>
            </Row>
          </PaperStyled>
          <PaperStyled elevation={1}>
            <Row marginLeft="15px" columns="repeat(4, 1fr)" marginBottom="5px">
              <Text>
                <b>Equipamento:</b> {data.equipament}
              </Text>
              <Text marginRight="15px">
                <b>Marca:</b> {data.brand}
              </Text>
              <Text marginRight="15px">
                <b>Modelo:</b> {data.model}
              </Text>
              <Text marginRight="15px">
                <b>Nº Série:</b> {data.serialNumber}
              </Text>
            </Row>
          </PaperStyled>
          {!!data.itemServices.length && (
            <PaperStyled elevation={1} paddingBottom="20px">
              <Row
                columns="8fr 1fr 1fr 1fr"
                gap={5}
                marginLeft="15px"
                marginRight="15px"
                marginBottom="-16px"
              >
                <Text isNotUsingBorderBottom fontWeight="bold">
                  Executados
                </Text>
                <Text
                  isNotUsingBorderBottom
                  display="flex"
                  justifyContent="center"
                  fontWeight="bold"
                >
                  Qtde
                </Text>
                <Text
                  isNotUsingBorderBottom
                  display="flex"
                  justifyContent="center"
                  fontWeight="bold"
                >
                  Unit
                </Text>
                <Text isNotUsingBorderBottom fontWeight="bold">
                  Total
                </Text>
              </Row>
              {data.itemServices.map((item) => {
                return (
                  <Row
                    columns="8fr 1fr 1fr 1fr"
                    marginLeft="15px"
                    marginRight="15px"
                    height="27px"
                    gap={5}
                  >
                    <Text marginTop="20px">{item.description}</Text>
                    <Text
                      marginTop="20px"
                      display="flex"
                      justifyContent="center"
                    >
                      {item.qtde}
                    </Text>
                    <Text
                      marginTop="20px"
                      display="flex"
                      justifyContent="center"
                    >
                      {formatPrice(item.unit)}
                    </Text>
                    <Text marginTop="20px">{formatPrice(item.total)}</Text>
                  </Row>
                )
              })}
            </PaperStyled>
          )}
          {!!data.laudos.length && (
            <PaperStyled elevation={1} paddingBottom="20px">
              <Text
                marginLeft="15px"
                isNotUsingBorderBottom
                fontWeight="bold"
                marginBottom="-16px"
              >
                Laudo Técnico
              </Text>
              {data.laudos.map((item) => {
                return (
                  <Row columns="8fr" marginLeft="15px" height="27px">
                    <Text marginTop="20px" marginRight="15px">
                      {item.description}
                    </Text>
                  </Row>
                )
              })}
            </PaperStyled>
          )}
          <PaperStyled elevation={1}>
            <Row marginLeft="15px" columns="repeat(4, 1fr)" marginBottom="5px">
              <Text>
                <b>Cabo?</b> Sim
              </Text>
              <Text marginRight="15px">
                <b>Carregador?</b> Sim
              </Text>
              <Text marginRight="15px">
                <b>Quabrado?</b> Não
              </Text>
              <Text marginRight="15px">
                <b>Detalhes?</b> Não
              </Text>
            </Row>
          </PaperStyled>
          {!!data.itemPieces.length && (
            <PaperStyled elevation={1} paddingBottom="20px">
              <Row
                columns="8fr 1fr 1fr 1fr"
                gap={5}
                marginLeft="15px"
                marginRight="15px"
                marginBottom="-16px"
              >
                <Text isNotUsingBorderBottom fontWeight="bold">
                  Peças e Serviços
                </Text>
                <Text
                  isNotUsingBorderBottom
                  display="flex"
                  justifyContent="center"
                  fontWeight="bold"
                >
                  Qtde
                </Text>
                <Text
                  isNotUsingBorderBottom
                  display="flex"
                  fontWeight="bold"
                  justifyContent="center"
                >
                  Unit
                </Text>
                <Text isNotUsingBorderBottom fontWeight="bold">
                  Total
                </Text>
              </Row>
              {data.itemPieces.map((item) => {
                return (
                  <Row
                    columns="8fr 1fr 1fr 1fr"
                    marginLeft="15px"
                    marginRight="15px"
                    height="27px"
                    gap={5}
                  >
                    <Text marginTop="20px">{item.description}</Text>
                    <Text
                      marginTop="20px"
                      display="flex"
                      justifyContent="center"
                    >
                      {item.qtde}
                    </Text>
                    <Text
                      marginTop="20px"
                      display="flex"
                      justifyContent="center"
                    >
                      {formatPrice(item.unit)}
                    </Text>
                    <Text marginTop="20px">{formatPrice(item.total)}</Text>
                  </Row>
                )
              })}
            </PaperStyled>
          )}
          <PaperStyled elevation={1}>
            <Row marginLeft="15px" columns="repeat(2, 1fr)" marginBottom="5px">
              <Text isNotUsingBorderBottom>
                <b>Valor da mão de obra: </b> {data.manpower}
              </Text>
              <Text marginRight="15px" isNotUsingBorderBottom>
                <b>Total: </b> {data.total}
              </Text>
            </Row>
          </PaperStyled>
          <PaperStyled elevation={1} padding="40px">
            <Row marginLeft="15px" columns="repeat(2, 1fr)" marginBottom="5px">
              <Text
                isNotUsingBorderBottom
                borderTop="1px solid gray"
                display="flex"
                justifyContent="center"
              >
                <b
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '500px',
                  }}
                >
                  Técnico Responsável
                </b>
              </Text>
              <Text
                isNotUsingBorderBottom
                borderTop="1px solid gray"
                display="flex"
                justifyContent="center"
              >
                <b>Cliente</b>
              </Text>
            </Row>
          </PaperStyled>
        </ContainerOS>
      </Container>
    </>
  )
}

export default ServiceOrder
