import styled from 'styled-components'
import { Select as SelectNotStyled } from '@material-ui/core'

export const Container = styled.main`
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

export const Select = styled(SelectNotStyled)`
    && {
        width: 20%;
        font-size: 1vw;
        background-color: #ffffff;
    }
`

export const Table = styled.table`
    width: 80%;
    margin: auto;
    font-size: 1.5vw;
    margin-bottom: 5%;

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