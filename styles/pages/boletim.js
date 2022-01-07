import styled from 'styled-components'
import { Select } from '@material-ui/core'

export const Container = styled.main`
    display: flex;
    flex-direction: column;
`

export const ContainerIconBack = styled.a`
    width: 4%;
    height: 4%;
    margin: 0.5%;
    border-radius: 50%;

    :hover {
        background-color: #1976d23b;
    }
`

export const IconBack = styled.svg`
    width: auto;
    height: auto;
    fill: #1976D2;
`

export const ContainerBoletim = styled.div`
    width: 50%;
    display: flex;
    align-self: center;
    border-radius: 10px;
    flex-direction: column;
    background-color: #ffffff;
    ${props => props.aluno && 'padding-bottom: 1%;'}
`

export const ContainerAlunoSelect = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const LabelAlunoSelect = styled.label`
    padding: 2%;
    font-size: 2vw;
    color: #8a8a8a;
`

export const AlunoSelect = styled(Select)`
    && {
        font-size: 1.2vw;
        width: ${props => !props.fullWidth && '60%'};
    }
`

export const TableBoleto = styled.table`
    color: #cccccc;

    th {
        font-size: 2.5vw;
        text-align: center;
    }

    td {
        border: 1px solid #cccccc;

        input {
            width: 100%;
        }
    }
`

export const ButtonSubmit = styled.button`
    width: 30%;
    padding: 2%;
    border: none;
    color: #ffffff;
    margin-top: 2%;
    cursor: pointer;
    font-size: 2.5vw;
    text-align: center;
    align-self: center;
    border-radius: 25px;
    background-color: #1976D2;
    margin-bottom: 5%;

    :hover {
        background-color: #12599f;
    }

    :disabled {
        color: #999999;
        cursor: default;
        pointer-events: none;
        background-color: #0c3c6c;
    }
`