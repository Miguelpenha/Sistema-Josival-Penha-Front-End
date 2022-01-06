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

export const ContainerEmail = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 50%;
    background-color: #ffffff;
    border-radius: 10px;
`

export const ContainerAlunoSelect = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

export const LabelAlunoSelect = styled.label`
    padding: 2%;
    font-size: 2vw;
    color: #8a8a8a;
`

export const AlunoSelect = styled(Select)`
    && {
        border-end-start-radius: 0;
        border-end-end-radius: 0;
        width: 60%;
        font-size: 1.2vw;
    }
`

export const TextEmail = styled.textarea`    
    padding: 1%;
    border: none;
    border-end-start-radius: 10px;
    border-end-end-radius: 10px;
    resize: vertical;
    font-size: 2vw;
    font-family: 'Roboto', sans-serif;
    border: 1px solid #cccccc;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    width: 100%;

    :focus {
        outline: none;
        border-radius: 4px;
        border: 2px solid ${props => props.theme.colors.secondary};
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

    :hover {
        background-color: #12599f;
    }

    :disabled {
        pointer-events: none;
        cursor: default;
        color: #999999;
        background-color: #0c3c6c;
    }
`