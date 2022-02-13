import styled from 'styled-components'
import { TextField, Switch as SwitchNotStyled } from '@material-ui/core'

export const Container = styled.div`
    top: 30%;
    left: 50%;
    width: 50%;
    height: 80%;
    display: flex;
    padding: 1.5%;
    font-size: 0.8vw;
    overflow-y: auto;
    position: absolute;
    align-items: center;
    border-radius: 10px;
    scrollbar-width: thin;
    flex-direction: column;
    background-color: #ffffff;
    scrollbar-color: #4ED134 #cccccc;
    transform: translate(-50%, -25%);

    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        background: #cccccc;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background-color: #4ED134;
    }
`

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Title = styled.h1`
    font-size: 2vw;
    color: #4ED134;
    margin-top: 2%;
    padding-bottom: 4%;
    font-weight: 500;
`

export const Campo= styled.div`
    width: 80%;
    display: flex;
    margin-top: 3.5%;
    flex-direction: column;
`

export const TextInput = styled(TextField)`
    && {
        margin-bottom: 2%;

        && .MuiInput-underline {
            font-size: 1.5vw;
            color: ${props => props.colorIn};
        }

        && .MuiInput-underline:after, .MuiInput-underline:before {
            border-bottom-color: ${props => props.colorIn};
        }
    }
`

export const DateInput = styled(TextField)`
    && {
        margin-bottom: 2%;

        && .MuiInputBase-colorPrimary {
            color: #4ED134;
            font-size: 1.5vw;
            border-color: #4ED134;
        }
    }
`

export const Switch = styled(SwitchNotStyled)`
    && .MuiSwitch-switchBase.Mui-checked {
        color: #4ED134;
    }

    && .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
        background-color: #4ED134;
    }
`

export const Button = styled.button`
    width: 45%;
    border: none;
    padding: 2.5%;
    color: #ffffff;
    font-size: 2vw;
    margin-top: 9%;
    cursor: pointer;
    border-radius: 15px;
    background-color: #4ED134;

    :hover {
        opacity: 0.7;
    }
`