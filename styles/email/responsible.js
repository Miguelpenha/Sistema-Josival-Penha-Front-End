import styled from 'styled-components'

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

export const ContainerEmail = styled.section`
    width: 70%;
    display: flex;
    color: #000000;
    font-size: 1.2vw;
    align-self: center;
    border-radius: 10px;
    flex-direction: column;
    background-color: #ffffff;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
`

export const TextEmail = styled.textarea`    
    padding: 1%;
    border: none;
    resize: vertical;
    font-size: 1.5vw;
    font-family: 'Roboto', sans-serif;

    :focus {
        outline: none;
        border-radius: 4px;
        border: 2px solid ${props => props.theme.colors.secondary};
    }
`

export const ResultEmail = styled.div`
    padding: 5%;
    padding-top: 5%;
    align-self: center;
    padding-bottom: 10%;
`

export const ButtonSubmit = styled.button`
    width: 30%;
    padding: 2%;
    border: none;
    color: #ffffff;
    margin-top: 2%;
    cursor: pointer;
    font-size: 2.5vw;
    margin-bottom: 7%;
    text-align: center;
    align-self: center;
    border-radius: 25px;
    background-color: #1976D2;

    :hover {
        background-color: #12599f;
    }
`