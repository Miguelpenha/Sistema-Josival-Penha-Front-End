import styled from 'styled-components'

export const Container = styled.main`

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
    font-size: 2vw;
    text-align: center;
`

export const TextNotification = styled.textarea`
    width: 40%;
    padding: 0.8%;
    display: block;
    color: #8b8b8b;
    margin-top: 2%;
    font-size: 1.5vw;
    resize: vertical;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    scrollbar-width: thin;
    scroll-behavior: smooth;
    border: 2px solid #1976D2;
    scrollbar-color: #f2f2f2 #bfbfbf;
    font-family: 'Roboto', sans-serif;

    :focus {
        outline: none;
        border-width: 3px;
        border-radius: 8px;
    }

    ::placeholder {
        color: #8b8b8b;
    }

    ::-webkit-scrollbar {
        width: 12px;
    }
    ::-webkit-scrollbar-track {
        background: #bfbfbf;
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 16px;
        background-color: #f2f2f2;
    }
`

export const Button = styled.button`
    width: 20%;
    border: none;
    padding: 1.2%;
    font-size: 2vw;
    display: block;
    margin-top: 2%;
    color: #ffffff;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: #1976D2;

    :hover {
        opacity: 0.8;
    }

    :disabled {
        cursor: default;
        opacity: 0.6;

        :hover {
            opacity: 0.6;
        }
    }
`