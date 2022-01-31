import styled from 'styled-components'

export const Container = styled.main`
    padding-bottom: 5%;
`

export const ContainerIconBack = styled.a`
    width: 5%;
    margin: 1%;
    display: flex;
    margin-bottom: 0%;
    border-radius: 50%;

    :hover {
        background-color: #1976d23b;
    }
`

export const IconBack = styled.svg`
    width: 100%;
    height: auto;
    color: #1976D2;
`

export const Title = styled.h1`
    color: #1976D2;
    font-size: 3vw;
    text-align: center;
    
`

export const Form = styled.form`
    width: 45%;
    margin: auto;
    display: flex;
    margin-top: 2%;
    padding-top: 1.5%;
    padding-bottom: 3%;
    align-items: center;
    border-radius: 15px;
    flex-direction: column;
    background-color: #ffffff;
`

export const Campo = styled.div`
    width: 65%;
    display: flex;
    margin-bottom: 6%;
    flex-direction: column;
`

export const Label = styled.label`
    color: #1976D2;
    font-size: 2vw;
    margin-bottom: 2%;
`

export const Input = styled.input`
    width: 100%;
    padding: 3%;
    color: #1976D2;
    font-size: 1.5vw;
    border-radius: 10px;
    border: 2px solid #cccccc;

    :focus {
        outline: none;
        border-radius: 15px;
        border-color: #1976D2;
    }
`

export const TextArea = styled.textarea`
    width: 100%;
    padding: 3%;
    color: #1976D2;
    resize: vertical;
    font-size: 1.5vw;
    border-radius: 10px;
    border: 2px solid #cccccc;

    :focus {
        outline: none;
        border-radius: 15px;
        border-color: #1976D2;
    }
`

export const TextSwitch = styled.span`
    color: #1976D2;
    font-size: 1.5vw;
`

export const Button = styled.button`
    width: 50%;
    border: none;
    padding: 3.5%;
    font-size: 2vw;
    margin-top: 5%;
    color: #ffffff;
    cursor: pointer;
    border-radius: 15px;
    background-color: #1976D2;

    :hover {
        opacity: 0.8;
    }
`