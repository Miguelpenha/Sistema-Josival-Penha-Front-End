import styled from 'styled-components'
import { TextField, Button } from '@material-ui/core'

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const FormAccess = styled.form`
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 45%;
    border-radius: 10px;
    align-self: center;
    margin-top: auto;
    margin-bottom: auto;
`

export const InputFormFinanceiro = styled(TextField)`
    && {
        width: 70%;
        margin-top: 8%;
        margin-bottom: 4%;
    }

    & .MuiInput-underline {
        font-size: 2vw;
        color: ${props => props.error ? '#F06360' : '#0872FC'};
    }

    & .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: ${props => props.error ? '#F06360' : '#0872FC'};
    }
`

export const ButtonFormFinanceiro = styled(Button)`
    && {
        background-color: #0872FC;
        width: 60%;
        font-size: 1.5vw;
        border-radius: 40px;
        margin-top: 6%;
        margin-bottom: 8%;
        padding: 2%;
    }


    &:hover {
        background-color: #0890FC;
    }
`

export const Container = styled.main`
    padding-bottom: 8%;
`

export const ContainerIconBack = styled.a`
    width: 6%;
    margin: 1%;
    padding: 0.2%;
    display: flex;
    cursor: pointer;
    border-radius: 50%;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: #BED3E9;
    }
`

export const IconBack = styled.svg`
    width: 100%;
    height: auto;
    fill: #1976D2;
`