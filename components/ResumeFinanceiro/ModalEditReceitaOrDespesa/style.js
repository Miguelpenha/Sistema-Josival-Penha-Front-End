import styled from 'styled-components'
import { Switch as SwitchNotStyled } from '@material-ui/core'

export const Container = styled.div`
    top: 30%;
    left: 50%;
    width: 50%;
    height: 75%;
    padding: 1.5%;
    display: flex;
    position: absolute;
    border-radius: 10px;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;
    transform: translate(-50%, -30%);
    color: ${props => props.receita ? '#60BF92' : '#EF5252'};
`

export const Title = styled.h1`
    font-size: 2vw;
    margin-bottom: 2%;
`

export const Form = styled.form`
    width: 70%;
    display: flex;
    padding-top: 2%;
    align-items: center;
    flex-direction: column;
`

export const Campo = styled.div`
    width: 80%;
    display: flex;
    padding-bottom: 4%;
    flex-direction: column;
`

export const Label = styled.label`
    font-size: 1.5vw;
    padding-bottom: 2%;
`

export const InputText = styled.input`
    width: 70%;
    padding: 1.5%;
    font-size: 1.5vw;
    border-radius: 10px;
    color: ${props => props.receita ? '#60BF92' : '#EF5252'};
    border: 2px solid ${props => props.receita ? '#60BF92' : '#EF5252'};

    :focus {
        outline: none;
        border-width: 3px;
        border-radius: 15px;
    }
`

export const ContainerSwitch = styled.div`
    width: 80%;
    display: flex;
    align-items: center;
`

export const Switch = styled(SwitchNotStyled)`
    && .MuiSwitch-switchBase.Mui-checked {
        color: ${props => props.receita ? '#60BF92' : '#EF5252'};
    }

    && .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track {
        background-color: ${props => props.receita ? '#60BF92' : '#EF5252'};
    }
`

export const TextSwitch = styled.span`
    font-size: 1.8vw;
`