import styled from 'styled-components'
import { Select as SelectNotStyled } from '@material-ui/core'

export const Main = styled.main`
    color: #383838;
`

export const ContainerIconBack = styled.a`
    width: 5%;
    margin: 1%;
    display: flex;
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

export const Container = styled.div`
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 5%;
`

export const InputFind = styled.input`
    padding: 1.25%;
    color: #1976D2;
    font-size: 1.2vw;
    margin-right: 2%;
    border-radius: 8px;
    border: 2px solid #cccccc;

    :focus {
        outline: none;
        border-radius: 12px;
        border-color: #1976D2;

        ::placeholder {
            color: #1976D2;
        }

        :-ms-input-placeholder {
            color: #1976D2;
        }

        ::-ms-input-placeholder {
            color: #1976D2;
        }
    }
`

export const Select = styled(SelectNotStyled)`
    && {
        width: 20%;
        font-size: 1vw;
        margin-bottom: 1%;
        background-color: #ffffff;
    }
`

export const Table = styled.table`
    width: 100%;
    margin: auto;
    font-size: 1.5vw;

    th {
        padding: 1%;
        color: #7c7c7c;
    }

    tr {
        cursor: pointer;

        :hover {
            td {
                background-color: #E5E5E5;
            }
        }

        td {
            padding: 0.6%;
            color: #555555;
            background-color: #ffffff;
        }
    }
`

export const IconAtrasadoOrEmDia = styled.div`
    display: inline-flex;
    background-color: ${props => props.color};
    width: 6%;
    padding: 6%;
    margin-right: 5%;
    border-radius: 50%;
`