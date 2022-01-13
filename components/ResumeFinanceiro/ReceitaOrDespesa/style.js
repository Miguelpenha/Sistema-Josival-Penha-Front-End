import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    border-bottom: 2px solid ${props => props.receita ? '#60BF92' : '#EF5252'};
    color: #7f7f7f;
    padding: 1%;
    margin-bottom: 2%;
    width: 80%;
    flex-direction: column;
`

export const NomeReceitaOrDespesa = styled.div`
    margin-bottom: 1%;
`

export const ValueReceitaOrDespesa = styled.div`
    color: ${props => props.receita ? '#60BF92' : '#EF5252'};
`