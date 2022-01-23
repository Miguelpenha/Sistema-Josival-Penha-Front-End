import styled from 'styled-components'

export const Container = styled.div`
    top: 30%;
    left: 50%;
    width: 40%;
    height: 60%;
    display: flex;
    padding: 1.5%;
    font-size: 0.8vw;
    position: absolute;
    align-items: center;
    border-radius: 10px;
    flex-direction: column;
    background-color: #ffffff;
    transform: translate(-50%, -25%);
`

export const Title = styled.h1`
    font-size: 2vw;
    color: #8A8A8A;
    margin-top: 2%;
`

export const ContainerInputMensalidade = styled.div`
    width: 90%;
    display: flex;
    color: #4ED134;
    margin-top: 5%;
    border-bottom: 4px solid #4ED134;
`

export const IconInput = styled.svg`
    width: 10%;
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 0.5%;
`

export const InputMensalidade = styled.input`
    width: 100%;
    border: none;
    color: #4ED134;
    margin-left: 2%;
    font-size: 2.4vw;
    margin-bottom: 2.5%;

    :focus {
        outline: none;
    }
`

export const ContainerInputDescription = styled.div`
    width: 90%;
    display: flex;
    color: #C6C6C6;
    margin-top: 8%;
    border-bottom: 4px solid #C6C6C6;
`

export const InputDescription = styled.textarea`
    width: 100%;
    border: none;
    color: #C6C6C6;
    margin-left: 2%;
    font-size: 2.4vw;
    resize: vertical;
    margin-bottom: 2.5%;
    scrollbar-color: #E5E5E5 #C6C6C6;

    :focus {
        outline: none;
    }
    
    ::-webkit-scrollbar {
        width: 12px;
    }

    ::-webkit-scrollbar-track {
        background: #C6C6C6;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background-color: #E5E5E5;
    }

    ::-webkit-input-placeholder{
        color: currentColor;
    }
`

export const ButtonSubmit = styled.button`
    background-color: #4ED134;
    width: 45%;
    border: none;
    color: #ffffff;
    font-size: 2vw;
    margin-top: 9%;
    padding: 2.5%;
    border-radius: 15px;
    cursor: pointer;

    :hover {
        opacity: 0.7;
    }
`