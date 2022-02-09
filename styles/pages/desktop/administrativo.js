import styled from 'styled-components'
import Lottie from 'react-lottie'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`

export const ContainerIconBack = styled.button`
    width: 5%;
    margin: 0.6%;
    border: none;
    padding: 0.5%;
    display: flex;
    color: #009BDD;
    cursor: pointer;
    border-radius: 50%;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: #cccccc;
    }
`

export const IconBack = styled.svg`
    width: 100%;
    height: auto;
`

export const Title = styled.h1`
    color: #009BDD;
    font-size: 3vw;
    margin-bottom: 2%;
    text-align: center;
`

export const Button = styled.a`
    width: 20%;
    margin: auto;
    padding: 1.5%;
    display: flex;
    color: #ffffff;
    cursor: pointer;
    font-weight: 500;
    font-size: 1.8vw;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    background-color: #009BDD;
    margin-top: 1%;

    :hover {
        opacity: 0.7;
    }
`

export const IconFile = styled.svg`
    width: 14%;
    margin-left: 8%;
`

export const Animation = styled(Lottie).attrs({
    width: '58%',
    height: 'auto'
})`
    
`