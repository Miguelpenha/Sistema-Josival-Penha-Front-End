import { FC } from 'react'
import { Table, Header, HeaderRow, HeaderCellTitle, Body, BodyRow, BodyCell, ContainerName, IconName, ContainerIconMore, IconMore } from './style'
import { Ireceita, Idespesa } from '../../types'

interface Iprops {
    receitas: Ireceita[]
    despesas: Idespesa[]
    month: string
}

const TableFinanceiro: FC<Iprops> = ({ receitas, despesas, month }) => {
    const receitasAndDespesas: (Ireceita | Idespesa)[] = [...receitas, ...despesas]

    return (
        <Table cellPadding="0" cellSpacing="0">
            <Header>
                <HeaderRow>
                    <HeaderCellTitle align="left" first colSpan={2}>Nome</HeaderCellTitle>
                    <HeaderCellTitle align="left">Status</HeaderCellTitle>
                    <HeaderCellTitle align="left">Vencimento</HeaderCellTitle>
                    <HeaderCellTitle align="left">Valor</HeaderCellTitle>
                    <HeaderCellTitle align="right" last>Ações</HeaderCellTitle>
                </HeaderRow>
            </Header>
            <Body>
                {receitasAndDespesas.map(receitaOrDespesa => (
                    <BodyRow>
                        <BodyCell first colSpan={2}>
                            <ContainerName>
                                <IconName xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                    <path d="M29.95 25.3Q31.45 25.3 32.525 24.225Q33.6 23.15 33.6 21.65Q33.6 20.15 32.525 19.075Q31.45 18 29.95 18Q28.45 18 27.375 19.075Q26.3 20.15 26.3 21.65Q26.3 23.15 27.375 24.225Q28.45 25.3 29.95 25.3ZM21.95 34H37.95V33.05Q37.95 30.95 35.825 29.8Q33.7 28.65 29.95 28.65Q26.2 28.65 24.075 29.8Q21.95 30.95 21.95 33.05ZM7.05 40Q5.85 40 4.95 39.075Q4.05 38.15 4.05 37V11Q4.05 9.85 4.95 8.925Q5.85 8 7.05 8H21.05L24.05 11H41.05Q42.2 11 43.125 11.925Q44.05 12.85 44.05 14V37Q44.05 38.15 43.125 39.075Q42.2 40 41.05 40ZM7.05 11V37Q7.05 37 7.05 37Q7.05 37 7.05 37H41.05Q41.05 37 41.05 37Q41.05 37 41.05 37V14Q41.05 14 41.05 14Q41.05 14 41.05 14H22.8L19.8 11H7.05Q7.05 11 7.05 11Q7.05 11 7.05 11ZM7.05 11Q7.05 11 7.05 11Q7.05 11 7.05 11V14Q7.05 14 7.05 14Q7.05 14 7.05 14V37Q7.05 37 7.05 37Q7.05 37 7.05 37Q7.05 37 7.05 37Q7.05 37 7.05 37Z"/>
                                </IconName>
                                {receitaOrDespesa.nome}
                            </ContainerName>
                        </BodyCell>
                        <BodyCell>status</BodyCell>
                        <BodyCell>{receitaOrDespesa.data ? receitaOrDespesa.data : `${receitaOrDespesa.fixaDay}/${month==='full' ? new Date().toLocaleDateString().split('/')[1] : month}/${new Date().toLocaleDateString().split('/')[2]}`}</BodyCell>
                        <BodyCell>{receitaOrDespesa.preco}</BodyCell>
                        <BodyCell>
                            <ContainerIconMore>
                                <IconMore xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                                    <path d="M20 35Q18.75 35 17.896 34.125Q17.042 33.25 17.042 32.042Q17.042 30.792 17.896 29.896Q18.75 29 20 29Q21.25 29 22.104 29.896Q22.958 30.792 22.958 32.042Q22.958 33.25 22.104 34.125Q21.25 35 20 35ZM20 22.958Q18.75 22.958 17.896 22.104Q17.042 21.25 17.042 20Q17.042 18.75 17.896 17.896Q18.75 17.042 20 17.042Q21.25 17.042 22.104 17.896Q22.958 18.75 22.958 20Q22.958 21.25 22.104 22.104Q21.25 22.958 20 22.958ZM20 11Q18.75 11 17.896 10.104Q17.042 9.208 17.042 7.958Q17.042 6.708 17.896 5.833Q18.75 4.958 20 4.958Q21.25 4.958 22.104 5.833Q22.958 6.708 22.958 7.958Q22.958 9.208 22.104 10.104Q21.25 11 20 11Z"/>
                                </IconMore>
                            </ContainerIconMore>
                        </BodyCell>
                    </BodyRow>
                ))}
            </Body>
        </Table>
    )
}

export default TableFinanceiro