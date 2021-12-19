import styled from 'styled-components'
import LogoJP from '../../../components/LogoJPNome'
import { IconButton } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'

export const Container = styled.main`
    height: 100%;
    display: flex;
    flex-direction: row;
`

export const ContainerLogo = styled.div`
    flex: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
`

export const Logo = styled(LogoJP)`
    width: 70%;
`

export const ContainerForm = styled.div`
    flex: 0.5;
    display: flex;
    align-items: center;
`

export const Form = styled.form`
    width: 70%;
    height: 60%;
    display: flex;
    margin-left: 10%;
    flex-direction: column;
`

export const Title = styled.h1`
    color: #000000;
    font-size: 2.45vw;
    margin-bottom: 5%;
`

export const Campo = styled.div`
    display: flex;
    margin-top: 5%;
    flex-direction: column;
`

export const Label = styled.label`
    color: #0872FC;
    font-size: 1.5vw;
    font-weight: bold;
    margin-bottom: 2%;
`

export const Input = styled.input`
    padding: 3%;
    border: none;
    color: #0872FC;
    font-size: 1.2vw;
    border-radius: 10px;
    background-color: #C6D9F1;

    :focus{
        outline: none;
        opacity: 0.85;
    }
`

export const Button = styled.button`
    padding: 3%;
    border: none;
    color: #ffffff;
    margin-top: 10%;
    cursor: pointer;
    font-size: 1.5vw;
    font-weight: bold;
    border-radius: 10px;
    background-color: #6A54ED;

    :hover {
        opacity: 0.85;
    }
`

export const IconButtonBack = styled(IconButton)`
    width: fit-content;
`

export const IconBack = styled(ArrowBack)`
    
`