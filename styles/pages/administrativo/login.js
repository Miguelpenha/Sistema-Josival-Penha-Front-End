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
    display: flex;
    width: 70%;
    margin-left: 10%;
    height: 60%;
    flex-direction: column;
`

export const Title = styled.h1`
    font-size: 2.45vw;
    color: #000000;
    margin-bottom: 5%;
`

export const Campo = styled.div`
    flex-direction: column;
    display: flex;
    margin-top: 5%;
`

export const Label = styled.label`
    color: #0872FC;
    font-size: 1.5vw;
    font-weight: bold;
    margin-bottom: 2%;
`

export const Input = styled.input`
    background-color: #C6D9F1;
    border: none;
    border-radius: 10px;
    padding: 3%;
    color: #0872FC;
    font-size: 1.2vw;

    :focus{
        outline: none;
        opacity: 0.85;
    }
`

export const Button = styled.button`
    background-color: #6A54ED;
    border: none;
    color: #ffffff;
    font-size: 1.5vw;
    padding: 3%;
    font-weight: bold;
    border-radius: 10px;
    margin-top: 10%;
    cursor: pointer;

    :hover {
        opacity: 0.85;
    }
`

export const IconButtonBack = styled(IconButton)`
    width: fit-content;
`

export const IconBack = styled(ArrowBack)`
    
`