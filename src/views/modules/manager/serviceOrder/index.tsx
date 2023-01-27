import React from 'react'
import { Button } from 'src/components'
import { useGeneratePDF } from 'src/hooks/useGeneratePDF'
import { Row } from 'src/styles'
import Logo from './assets/images/logo.png'
import {
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

  const getDateCurrent = () => {
    return `${new Date().getDate()}/${new Date().getMonth() + 1}/
    ${new Date().getFullYear()}`
  }

  return (
    <>
      <Button
        textButton="Gerar OS"
        variant="contained"
        onClick={() => exportPDF('Ordem de servico', 'pdf')}
      />
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
                  Nº <OSNumber color="red">1870</OSNumber>
                </OSNumber>
              </ContainerOSText>
            </PaperStyled>
            <PaperStyled elevation={1}>
              <ContainerDateOS>
                <DateOS>Data {getDateCurrent()}</DateOS>
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
                <b>Cliente:</b> FELIPE MIGUEL DOS SANTOS
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
                <b>Equipamento:</b> Notebook
              </Text>
              <Text marginRight="15px">
                <b>Marca:</b> INTELBRAS
              </Text>
              <Text marginRight="15px">
                <b>Modelo:</b> IM4
              </Text>
              <Text marginRight="15px">
                <b>Nº Série:</b> 65406540
              </Text>
            </Row>
          </PaperStyled>
          <PaperStyled elevation={1}>
            <Text marginLeft="15px" isNotUsingBorderBottom>
              Laudo Técnico
            </Text>
            <Row columns="8fr" marginLeft="15px">
              <Text marginTop="20px" marginRight="15px">
                RESTAURAÇÃO DOBRADIÇA COLA INSTANTÂNEA + PÓ DE
                FERRO,LUBRIFICAÇÃO DA DOBRADIÇA E REGULAGEM DO TENSOR
              </Text>
            </Row>
            <Row columns="8fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">DESENTUPIMENTO DE DRENO</Text>
            </Row>
            <Row columns="8fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">
                RESTAURAÇÃO DOBRADIÇA COM ARREBITES DE 2 MM ,LUBRIFICAÇÃO DA
                DOBRADIÇA E REGULAGEM DO TENSOR
              </Text>
            </Row>
            <Row columns="8fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">CRIMPAGEM DE PONTA A PONTA RJ45 /</Text>
            </Row>
            <Row columns="8fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">CRIMPAGEM DE PONTA A PONTA RJ11 </Text>
            </Row>
            <Row columns="8fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">ABASTECIMENTO DE TINTA</Text>
            </Row>
            <Row columns="8fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">ALINHAMENTO DE CABEÇOTE</Text>
            </Row>
            <Row columns="8fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">LIMPEZA DO CABEÇOTE</Text>
            </Row>
          </PaperStyled>
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
          <PaperStyled elevation={1}>
            <Text marginLeft="15px" isNotUsingBorderBottom>
              Serviços Executados
            </Text>
            <Row columns="8fr 1fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">CAMERA VIDEO WI-FI FULL HD IM4</Text>
              <Text marginTop="20px">R$ 448.38</Text>
            </Row>
            <Row columns="8fr 1fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">
                LEITOR USB + CARTAO MEMORIA CLASSE10 64GB MULTILASER
              </Text>
              <Text marginTop="20px">R$ 109.98</Text>
            </Row>
            <Row columns="8fr 1fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">
                LEITOR USB + CARTAO MEMORIA CLASSE10 32GB MULTILASER
              </Text>
              <Text marginTop="20px">R$ 107.68</Text>
            </Row>
            <Row columns="8fr 1fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">RESTAURAÇÃO CARCAÇA</Text>
              <Text marginTop="20px">R$ 75,15</Text>
            </Row>
            <Row columns="8fr 1fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">FORMATAÇÃO BÁSICA</Text>
              <Text marginTop="20px">R$ 60,00</Text>
            </Row>
            <Row columns="8fr 1fr" marginLeft="15px" marginRight="15px">
              <Text marginTop="20px">INSTALAÇÃO DE PROGRAMA</Text>
              <Text marginTop="20px">R$ 30,00</Text>
            </Row>
          </PaperStyled>
          <PaperStyled elevation={1}>
            <Row marginLeft="15px" columns="repeat(2, 1fr)" marginBottom="5px">
              <Text isNotUsingBorderBottom>
                <b>Valor da mão de obra: </b> R$ 150,00
              </Text>
              <Text marginRight="15px" isNotUsingBorderBottom>
                <b>Total: </b> R$ 816,04
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
