import styled from 'styled-components'
import { Select } from '@material-ui/core'

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

export const ContainerBoletim = styled.div`
    width: 60%;
    display: flex;
    align-self: center;
    border-radius: 10px;
    flex-direction: column;
    background-color: #ffffff;
    ${props => props.aluno && 'padding-bottom: 1%;'}
`

export const ContainerAlunoSelect = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const LabelAlunoSelect = styled.label`
    padding: 2%;
    font-size: 2vw;
    color: #8a8a8a;
`

export const AlunoSelect = styled(Select)`
    && {
        font-size: 1.2vw;
        width: ${props => !props.fullWidth && '60%'};
    }
`

export const TableBoletim = styled.table`
    color: #1976D2;

    th {
        text-align: center;
    }

    td {
        input {
            width: 100%;
            padding: 4%;
            font-size: 1.5vw;
            color: #1976D2;
            border-radius: 3px;
            border: 1.5px solid #7f7f7f;
            font-weight: bold;

            :focus {
                outline: none;
                border: 2px solid #1976D2;
                padding: 3.5%;
            }
        }
    }

    .matter {
        border: 1px solid #7f7f7f;
        border-radius: 3px;
        text-align: left;
        font-size: 1.3vw;
        padding: 1%;
    }
`

export const TitleTableBoletim = styled.th`
    font-size: 2.5vw;
    border: 1px solid #7f7f7f;
    border-radius: 3px;
    padding: 1%;
`

export const IconReloadTitleTableBoletim = styled.svg`
    width: 5%;
    fill: #1976D2;
    height: auto;
    cursor: pointer;

    :hover {
        background-color: #1976d23b;
    }
`

export const HeaderTableBoletim = styled.tr`
    border: 1px solid #7f7f7f;
    border-radius: 3px;
    font-size: 1.5vw;

    #matters {
        width: 25%;
    }

    th {
        border: 1px solid #7f7f7f;
        border-radius: 3px;
        padding: 1%;
    }
`

export const ButtonSubmit = styled.button`
    width: 25%;
    padding: 1.5%;
    border: none;
    color: #ffffff;
    margin-top: 1%;
    cursor: pointer;
    font-size: 2.5vw;
    text-align: center;
    align-self: center;
    border-radius: 25px;
    background-color: #1976D2;
    margin-bottom: 5%;

    :hover {
        background-color: #12599f;
    }

    :disabled {
        color: #999999;
        cursor: default;
        pointer-events: none;
        background-color: #0c3c6c;
    }
`