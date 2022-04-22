import { FC } from 'react'
import { Table, Header, HeaderRow, HeaderCellTitle, Body, BodyRow, BodyCell, ContainerName, IconName, ContainerIconMore, IconMore } from './style'
import { Ireceita, Idespesa } from '../../types'

interface IreceitaModify extends Ireceita {
    receita?: boolean
}

interface IdespesaModify extends Idespesa {
    despesa?: boolean
}

interface IreceitaAndDespesaModify extends Ireceita {
    receita?: boolean
    despesa?: boolean
}

interface Iprops {
    receitas: IreceitaModify[]
    despesas: IdespesaModify[]
    month: string
}

const TableFinanceiro: FC<Iprops> = ({ receitas, despesas, month }) => {
    receitas.map(receita => {
        receita.receita = true
    })

    despesas.map(despesa => {
        despesa.despesa = true
    })

    const receitasAndDespesas: IreceitaAndDespesaModify[] = [...receitas, ...despesas]
    
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
                                {receitaOrDespesa.auto ? (
                                    <IconName
                                        viewBox="0 0 45 45"
                                        xmlns="http://www.w3.org/2000/svg"
                                        colorType={receitaOrDespesa.receita ? 'receita' : 'despesa'}
                                    >
                                        <path d="M32.85 9.6 24.75 17.7 22.35 15.35 25.7 11.95H23.75Q18.9 11.95 15.375 15.525Q11.85 19.1 11.85 24Q11.85 25.6 12.175 27Q12.5 28.4 13.05 29.6L9.75 32.9Q8.35 30.85 7.75 28.625Q7.15 26.4 7.15 24Q7.15 17.25 12.05 12.25Q16.95 7.25 23.65 7.25H25.8L22.4 3.8L24.75 1.45ZM15.05 38.6 23.15 30.4 25.55 32.8 22.1 36.2H24.25Q29.1 36.2 32.625 32.625Q36.15 29.05 36.15 24.1Q36.15 22.55 35.825 21.15Q35.5 19.75 34.9 18.55L38.25 15.25Q39.6 17.35 40.225 19.55Q40.85 21.75 40.85 24.1Q40.85 30.9 35.95 35.925Q31.05 40.95 24.4 40.95H22.1L25.55 44.35L23.15 46.7Z"/>
                                    </IconName>
                                ) : receitaOrDespesa.receita ? (
                                    <IconName xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" colorType="receita">
                                        <path d="M6.35 36.85 2.95 33.5 18.8 17.75 27.15 26.1 37.1 16.1H31.15V11.4H45.05V25.25H40.4V19.5L27.1 32.8L18.75 24.45Z"/>
                                    </IconName>
                                ) : (
                                    <IconName xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" colorType="despesa">
                                        <path d="M2.95 14.75 6.35 11.4 18.75 23.8 27.1 15.45 40.4 28.75V23H45.05V36.85H31.15V32.15H37.1L27.15 22.15L18.8 30.5Z"/>
                                    </IconName>
                                )}
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