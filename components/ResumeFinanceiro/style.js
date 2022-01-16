import styled from 'styled-components'

export const Container = styled.div`
    width: 60%;
    margin-right: auto;
    margin-left: auto;
    display: flex;
    padding-bottom: 1%;
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
    color: #7f7f7f;
    width: 87%;
`

export const Saldo= styled.div`
    border: 2px solid ${props => props.color};
    padding: 2.5%;
    border-radius: 10px;
    color: ${props => props.color};
    font-size: 1vw;
    margin-bottom: 2%;
`