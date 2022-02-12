import styled from 'styled-components'
import { TextField, Alert } from '@material-ui/core'

export const Campo= styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3.5%;
`

export const InputText = styled(TextField)`
    && {
        margin-bottom: 5%;

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
        margin-bottom: 5%;

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
        font-size: 1.5vw;
        border-radius: 10px;
        align-items: center;
        margin-bottom: 4%;

        && svg {
            font-size: 2vw;
        }
    }
`

export const Button = styled.button`
    width: 50%;
    padding: 2%;
    border: none;
    color: #ffffff;
    font-size: 2vw;
    display: block;
    cursor: pointer;
    margin-bottom: 1%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: #0872FC;

    :hover {
        opacity: 0.8;
    }
`