import styled from 'styled-components'

export const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 2.3fr 0.6fr;
    height: 100%;
`

export const Main = styled.main`
    padding: 2%;
    color: #555555;
`

export const Table = styled.table`
    max-width: 120%;
    min-width: 95%;
    font-size: 1.5vw;
    margin-bottom: 5%;

    th {
        padding: 1%;
        color: #7c7c7c;
    }

    tr {
        td {
            padding: 0%;
            background-color: #ffffff;

            a {
                width: 100%;
                padding: 2%;
                height: 100%;
                color: #555555;
                display: block;
                text-decoration: none;
                display: flex;
                align-items: center;
            }
        }

        .aluno {
            cursor: pointer;
        }

        :hover {
            td {
                background-color: #E5E5E5;
            }
        }
    }
`

export const ContainerFilters = styled.div`
    display: flex;
    flex-direction: row;
    width: 60%;
    align-items: center;
`

export const ContainerInputFind = styled.div`
    margin-right: 3%;
    display: flex;
    align-items: center;
    width: 56%;
    background-color: #ffffff;
    border-radius: 15px;
    margin-top: 2%;
    margin-bottom: 2%;
`

export const IconInputFind = styled.svg`
    color: #1976D2;
    width: 80%;
    height: auto;
    margin-left: 2%;
`

export const InputFind = styled.input`
    padding: 3%;
    font-size: 1.4vw;
    color: #1976D2;
    font-weight: 500;
    border: #ffffff 2px solid;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;

    :focus {
        outline: none;
        border: #1976D2 2px solid;
    }
`

export const IconAtrasadoOrEmDia = styled.div`
    display: flex;
    background-color: ${props => props.color};
    width: 6%;
    padding: 6%;
    margin-right: 5%;
    border-radius: 50%;
`