import { Container, NomeReceitaOrDespesa, ValueReceitaOrDespesa } from './style'
import LimitText from '../../LimitText'

export default function ReceitaOrDespesa({ name, value, receita }) {
    return (
        <Container receita={receita}>
            <NomeReceitaOrDespesa>
                <LimitText limit="25">{name}</LimitText>
            </NomeReceitaOrDespesa>
            <ValueReceitaOrDespesa receita={receita}>{receita ? '+' : '-'} {value}</ValueReceitaOrDespesa>
        </Container>
    )
}