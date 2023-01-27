import React from 'react'
import { Row } from 'src/styles'
import { ItemPieces } from '../../type'
import { ItemLaudoPieces } from './components/ItemPieces'
import { Container } from './Styles'

type TableViewPiecesProps = {
  setItemPieces: React.Dispatch<React.SetStateAction<ItemPieces[]>>
  itemPieces: ItemPieces[]
}

const TableViewPieces: React.FC<TableViewPiecesProps> = ({
  setItemPieces,
  itemPieces,
}) => {
  return (
    <Container>
      <Row columns="5fr 1fr 1fr 1fr" gap={10} marginTop="5px">
        <div>Peças</div>
        <div>Qtd</div>
        <div>Unit</div>
        <div>Preço</div>
      </Row>
      <ItemLaudoPieces setItemPieces={setItemPieces} itemPieces={itemPieces} />
      <ItemLaudoPieces setItemPieces={setItemPieces} itemPieces={itemPieces} />
      <ItemLaudoPieces setItemPieces={setItemPieces} itemPieces={itemPieces} />
      <ItemLaudoPieces setItemPieces={setItemPieces} itemPieces={itemPieces} />
      <ItemLaudoPieces setItemPieces={setItemPieces} itemPieces={itemPieces} />
      <ItemLaudoPieces setItemPieces={setItemPieces} itemPieces={itemPieces} />
    </Container>
  )
}

export default TableViewPieces
