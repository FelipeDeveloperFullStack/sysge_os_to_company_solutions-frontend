import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import BackIcon from '@mui/icons-material/Reply'
import { useGeneratePDF } from 'src/hooks/useGeneratePDF'
import { Row } from 'src/styles'
import Logo from './assets/images/logo.png'
import { ItemPieces, ItemServices, OSData } from './create/type'
import { formatPrice } from 'src/helpers/formatPrice'
import Fab from '@mui/material/Fab'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'
import {
  ButtonContainerGenerateOS,
  ButtonContainerLaunchInTheFinancial,
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
import { Laudo } from './create/tables/type'
import { MANAGER_SERVICE_ORDER } from 'src/layouts/typePath'
import { useAdmin } from 'src/services/useAdmin'
import { toast } from 'src/components/Widgets/Toastify'
import { format } from 'date-fns'

const ServiceOrder: React.FC = () => {
  const exportPDF = useGeneratePDF()
  const location = useLocation()
  const history = useHistory()
  const { apiAdmin } = useAdmin()

  const [data] = useState<OSData>(location?.state?.oSData)
  const [isOSGenerated, setIsOsGenerated] = useState(false)

  const getCurrentDateAndHour = () => {
    const now = new Date()
    return format(now, 'dd/MM/yyyy HH:mm')
  }

  const updateDateOSGenerated = async () => {
    try {
      await apiAdmin.put(`orderServices/${data._id}`, {
        dateGeneratedOS: getCurrentDateAndHour(),
      })
    } catch (error) {
      toast.error(
        'Um erro ocorreu ao tentar atualizar a data de atualização da OS gerada.',
      )
    }
  }

  const handleClickToGenerateOS = async () => {
    exportPDF(
      `Cliente_${data.client.name}_Ordem_de_Servico_N_${data.osNumber}_NSerie_${data.serialNumber}`,
      'pdf',
      'open_new_window',
    )
    setIsOsGenerated(true)
    await updateDateOSGenerated()
  }

  const resultNewArray = (data: any[]) => {
    const lengthData = 6 - data.length
    if (lengthData < 6) {
      return [...data, ...new Array(lengthData).fill('')]
    } else {
      return data
    }
  }

  const resultRowItemServices = (data: any[]): ItemServices[] => {
    return resultNewArray(data)
  }

  const resultRowLaudos = (data: any[]): Laudo[] => {
    return resultNewArray(data)
  }

  const resultRowItemPieces = (data: any[]): ItemPieces[] => {
    return resultNewArray(data)
  }

  return (
    <>
      <ButtonContainerLaunchInTheFinancial>
        <Fab
          color="secondary"
          variant="extended"
          onClick={() => handleClickToGenerateOS()}
        >
          <CloudDownloadIcon sx={{ mr: 1 }} />
          Gerar PDF
        </Fab>
      </ButtonContainerLaunchInTheFinancial>
      <ButtonContainerGenerateOS>
        <Fab
          color="primary"
          variant="extended"
          onClick={() => history.push(MANAGER_SERVICE_ORDER)}
        >
          <BackIcon sx={{ mr: 1 }} />
          Voltar
        </Fab>
      </ButtonContainerGenerateOS>
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
                <b>Cliente:</b> {data.client.name}
              </Text>
            </Row>
            <Row marginLeft="15px" columns="5fr 1fr" marginBottom="5px">
              <Text>
                <b>End:</b> {data.client.address}
              </Text>
              <Text marginRight="15px">
                <b>CEP:</b> {data.client.cep}
              </Text>
            </Row>
            <Row
              marginLeft="15px"
              marginRight="15px"
              columns="3fr 1fr 2fr"
              marginBottom="5px"
            >
              <Text>
                <b>Cidade:</b> {data.client.city}
              </Text>
              <Text>
                <b>UF:</b> {data.client.uf}
              </Text>
              <Text>
                <b>CNPJ:</b> {data.client.cpfOrCnpj}
              </Text>
            </Row>
            <Row marginLeft="15px" columns="2fr 1fr" marginBottom="5px">
              <Text>
                <b>E-mail:</b> {data.client.email}
              </Text>
              <Text marginRight="15px">
                <b>Telefone:</b> {data.client.phoneNumber}{' '}
                {data.client.phoneNumberFixo
                  ? `${data.client.phoneNumberFixo}`
                  : null}
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
              {resultRowItemServices(data.itemServices).map((item) => {
                return (
                  <Row
                    columns="8fr 1fr 1fr 1fr"
                    marginLeft="15px"
                    marginRight="15px"
                    height="27px"
                    gap={5}
                  >
                    <Text marginTop="20px" height="19px">
                      {item.description}
                    </Text>
                    <Text
                      marginTop="20px"
                      height="19px"
                      display="flex"
                      justifyContent="center"
                    >
                      {item.qtde}
                    </Text>
                    <Text
                      marginTop="20px"
                      height="19px"
                      display="flex"
                      justifyContent="center"
                    >
                      {formatPrice(item.unit)}
                    </Text>
                    <Text marginTop="20px" height="19px">
                      {formatPrice(item.total)}
                    </Text>
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
              {resultRowLaudos(data.laudos).map((item) => {
                return (
                  <Row columns="8fr" marginLeft="15px" height="27px">
                    <Text marginTop="20px" height="19px" marginRight="15px">
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
                <b>Cabo?</b> {data.cable}
              </Text>
              <Text marginRight="15px">
                <b>Carregador?</b> {data.charger}
              </Text>
              <Text marginRight="15px">
                <b>Quabrado?</b> {data.breaked}
              </Text>
              <Text marginRight="15px">
                <b>Detalhes?</b> {data.detail}
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
              {resultRowItemPieces(data.itemPieces).map((item) => {
                return (
                  <Row
                    columns="8fr 1fr 1fr 1fr"
                    marginLeft="15px"
                    marginRight="15px"
                    height="27px"
                    gap={5}
                  >
                    <Text marginTop="20px" height="19px">
                      {item.description}
                    </Text>
                    <Text
                      marginTop="20px"
                      height="19px"
                      display="flex"
                      justifyContent="center"
                    >
                      {item.qtde}
                    </Text>
                    <Text
                      marginTop="20px"
                      height="19px"
                      display="flex"
                      justifyContent="center"
                    >
                      {formatPrice(item.unit)}
                    </Text>
                    <Text marginTop="20px" height="19px">
                      {formatPrice(item.total)}
                    </Text>
                  </Row>
                )
              })}
            </PaperStyled>
          )}
          <Row columns="repeat(2, 1fr)" marginBottom="5px" gap={5}>
            <PaperStyled
              elevation={1}
              display="flex"
              justifyContent="center"
              fontSize="17px"
            >
              <Text isNotUsingBorderBottom>
                <b>Valor da mão de obra: </b> {data.manpower}
              </Text>
            </PaperStyled>
            <PaperStyled
              elevation={1}
              display="flex"
              justifyContent="center"
              fontSize="17px"
            >
              <Text marginRight="15px" isNotUsingBorderBottom>
                <b>Total: </b> {data.total}
              </Text>
            </PaperStyled>
          </Row>
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
                    width: '100%',
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
                <b
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  Cliente
                </b>
              </Text>
            </Row>
          </PaperStyled>
        </ContainerOS>
      </Container>
    </>
  )
}

export default ServiceOrder
