import styled from 'styled-components'

export const Container = styled.div`
    background-color: #ffffff;
    width: 50%;
    color: ${props => props.receita ? '#60BF92' : '#EF5252'};
    display: flex;
    top: 30%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -30%);
    flex-direction: column;
    padding: 1.5%;
    border-radius: 10px;
    height: 50%;
    align-items: center;
`

export const Form = styled.form`
    display: flex;
    width: 70%;
    flex-direction: column;
    align-items: center;
    padding-top: 2%;
`

export const Campo = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    padding-bottom: 4%;
`

export const Label = styled.label`
    font-size: 1.5vw;
    padding-bottom: 2%;
`

export const InputText = styled.input`
    width: 70%;
    border: 2px solid ${props => props.receita ? '#60BF92' : '#EF5252'};
    color: ${props => props.receita ? '#60BF92' : '#EF5252'};
    border-radius: 10px;
    font-size: 1.5vw;
    padding: 1.5%;

    :focus {
        outline: none;
        border-width: 3px;
        border-radius: 15px;
    }
`