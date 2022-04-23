import styled, { css } from 'styled-components'

export const ContainerModalInfoReceitaOrDespesa = styled.div`
    top: 30%;
    left: 50%;
    width: 50%;
    height: 50%;
    display: flex;
    padding: 1.5%;
    font-size: 0.8vw;
    position: absolute;
    border-radius: 10px;
    flex-direction: column;
    background-color: #ffffff;
    transform: translate(-50%, -30%);
    color: ${props => props.receita ? '#60BF92' : '#EF5252'};
`

export const AlertCopyInfo = styled.div`
    top: 5%;
    right: 2%;
    padding: 1.5%;
    color: #ffffff;
    position: fixed;
    font-size: 1.2vw;
    font-weight: bold;
    background-color: #0872FC;
    border-radius: 20px 5px 20px 20px;
`

export const ContainerInfoReceitaOrDespesa = styled.h1`
    padding: 1%;
`

export const TitleInfoReceitaOrDespesa = styled.span`

`

export const InfoReceitaOrDespesa = styled.span`
    padding: 0.8%;
    border-radius: 8px;
    
    ${props => !props.notCopy && css`
        cursor: pointer;

        :hover {
            background-color: #cccccc;
        }
    `}
`