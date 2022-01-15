import styled from 'styled-components'

export const Container = styled.div`
    display: flex;
    border-bottom: 2px solid ${props => props.receita ? '#60BF92' : '#EF5252'};
    color: #7f7f7f;
    padding: 0.5%;
    margin-bottom: 1%;
    width: 90%;
    flex-direction: column;
    border-start-start-radius: 10px;
    border-start-end-radius: 10px;
    cursor: pointer;

    :hover {
        background-color: ${props => props.receita ? '#e0ffda' : '#ffdcdc'};
    }
`

export const Row1 = styled.div`

`

export const Nome = styled.div`
    margin-bottom: 0.5%;
`

export const Row2 = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Value = styled.span`
    color: ${props => props.receita ? '#60BF92' : '#EF5252'};
    width: 100%;
    height: min-content;
`

export const Options = styled.div`
    display: flex;
    justify-content: right;
`

export const ContainerIconOptions = styled.a`
    width: 12%;
    padding: 2%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: ${props => props.bg};
    }
`

export const IconOptions = styled.svg`
    width: 100%;
    height: auto;
    fill: ${props => props.color};
`