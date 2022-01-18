import styled from 'styled-components'

export const Container = styled.div`
    width: 90%;
    display: flex;
    padding: 0.5%;
    color: #7f7f7f;
    cursor: pointer;
    margin-bottom: 1%;
    flex-direction: column;
    border-start-end-radius: 10px;
    border-start-start-radius: 10px;
    border-bottom: 2px solid ${props => props.receita ? '#60BF92' : '#EF5252'};

    :hover {
        background-color: ${props => props.receita ? '#e0ffda' : '#ffdcdc'};
    }
`

export const Row1 = styled.div`
    display: flex;
    margin-bottom: 0.5%;
    justify-content: space-between;
`

export const Nome = styled.span`
    
`

export const Date = styled.a`
    padding: 1%;
    font-size: 1vw;
    color: #4c4c4c;
    font-weight: bold;
    border-radius: 10px;
    height: fit-content;
    text-decoration: none;
    
    :hover {
        background-color: #4c4c4c50;
    }
`

export const Row2 = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Value = styled.span`
    width: 100%;
    height: min-content;
    color: ${props => props.receita ? '#60BF92' : '#EF5252'};
`

export const Options = styled.div`
    display: flex;
    justify-content: right;
`

export const ContainerIconOptions = styled.a`
    width: 12%;
    padding: 2%;
    display: flex;
    cursor: pointer;
    border-radius: 50%;
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