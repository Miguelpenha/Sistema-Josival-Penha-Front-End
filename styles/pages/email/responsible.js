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

export const TextEmail = styled.textarea`
    width: 100%;
    padding: 1%;
    border: none;
    font-size: 2vw;
    resize: vertical;
    border: 1px solid #cccccc;
    border-end-end-radius: 10px;
    border-end-start-radius: 10px;
    font-family: 'Roboto', sans-serif;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);

    :focus {
        outline: none;
        border-radius: 4px;
        border: 2px solid ${props => props.theme.colors.secondary};
    }
`

export const ContainerLinks = styled.div`
    display: flex;
    flex-direction: column;
`

export const TitleLinks = styled.h2`
    color: #1976D2;
    font-size: 2.5vw;
    text-align: center;
    margin-top: 2%;
    margin-bottom: 2%;
`

export const ContainerLink = styled.div`
    display: flex;
    padding: 1%;
`

export const InputLink = styled.input`
    width: 100%;
    border: 1px solid #cccccc;
    border-radius: 10px;
    font-size: 1.5vw;
    padding: 0.5%;
    color: #1976D2;

    :focus {
        outline: none;
    }

    :hover, :focus {
        border: 1px solid #999999;
    }
`

export const IconAddLink = styled.svg`
    width: 8%;
    height: auto;
    fill: #1976D2;
    border-radius: 50%;
    margin-left: 1%;
    cursor: pointer;

    :hover {
        background-color: #1976d23b;
    }
`

export const IconRemoveLink = styled.svg`
    width: 8%;
    height: auto;
    fill: #1976D2;
    border-radius: 50%;
    margin-left: 1%;
    cursor: pointer;

    :hover {
        background-color: #1976d23b;
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