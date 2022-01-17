import styled, { css } from 'styled-components'

export const ContainerModalInfoReceitaOrDespesa = styled.div`
    background-color: #ffffff;
    width: 50%;
    color: ${props => props.receita ? '#60BF92' : '#EF5252'};
    display: flex;
    top: 30%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -30%);
    flex-direction: column;
    padding: 1.5%;
    border-radius: 10px;
    height: 50%;
    font-size: 0.8vw;
`

export const AlertCopyInfo = styled.div`
    background-color: #0872FC;
    position: fixed;
    right: 2%;
    top: 5%;
    color: #ffffff;
    padding: 1.5%;
    border-radius: 20px 5px 20px 20px;
    font-size: 1.2vw;
    font-weight: bold;
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