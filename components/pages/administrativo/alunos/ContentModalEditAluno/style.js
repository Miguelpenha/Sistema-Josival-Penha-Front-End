import styled from 'styled-components'
import { DialogContent, TextField, Alert, Select as SelectNotStyled, MenuItem } from '@material-ui/core'

export const Container = styled(DialogContent)`
    scrollbar-width: thin;
    scrollbar-color: #0872FC #cccccc;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #cccccc;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background-color: #0872FC;
    }
`

export const Campo= styled.div`
    display: flex;
    margin-top: 3.5%;
    flex-direction: column;
`

export const InputText = styled(TextField)`
    && {
        margin-bottom: 2%;

        && .MuiInput-underline {
            font-size: 1.2vw;
        }

        && .MuiInput-underline:after, .MuiInput-underline:before {
            border-bottom-color: #0872FC;
        }
    }
`

export const InputDate = styled(TextField)`
    && {
        margin-bottom: 2%;

        && .MuiInputBase-colorPrimary {
            font-size: 1.2vw;
        }
    }
`

export const Error = styled(Alert).attrs({
    severity: 'error'
})`
    && {
        display: flex;
        font-size: 1.2vw;
        margin-bottom: 4%;
        border-radius: 10px;
        align-items: center;

        && svg {
            font-size: 2vw;
        }
    }
`

export const Select = styled(SelectNotStyled)`
    && {
        font-size: 1.2vw;
        margin-bottom: 2%;
    }
`

export const ItemSelect = styled(MenuItem)`
    && {
        font-size: 1.2vw;
    }
`

export const Button = styled.button`
    width: 50%;
    padding: 2%;
    border: none;
    color: #ffffff;
    margin-top: 5%;
    font-size: 2vw;
    display: block;
    cursor: pointer;
    margin-bottom: 4%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: #0872FC;

    :hover {
        opacity: 0.8;
    }
`