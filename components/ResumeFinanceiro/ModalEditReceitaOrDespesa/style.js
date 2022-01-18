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