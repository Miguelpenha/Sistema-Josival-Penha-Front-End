import styled from 'styled-components'

export const Container = styled.div`
    width: 60%;
    display: flex;
    margin-left: auto;
    padding-bottom: 1%;
    margin-right: auto;
    border-radius: 15px;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
`

export const ContainerReceitasDespesas = styled.div`
    width: 100%;
    padding: 1.5%;
    display: flex;
    font-size: 1.5vw;
    align-items: center;
    flex-direction: column;
`

export const ContainerSaldos = styled.div`
    width: 87%;
    color: #7f7f7f;
`

export const Saldo= styled.div`
    padding: 2.5%;
    font-size: 1vw;
    margin-bottom: 2%;
    border-radius: 10px;
    color: ${props => props.color};
    border: 2px solid ${props => props.color};
`