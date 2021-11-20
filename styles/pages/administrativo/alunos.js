import styled from 'styled-components'
import IconInfoTotalAlunosSVG from '../../../assets/icon-info-total-alunos.svg'
import IconInfoTotalTurmasSVG from '../../../assets/icon-info-total-turmas.svg'
import IconInfoMédiaAlunosSVG from '../../../assets/icon-info-média-alunos.svg'
import IconInfoOcupaçãoSVG from '../../../assets/icon-info-ocupação.svg'
import { Add as IconAddSVG, AddCircleOutline as IconAddCircleOutlineSVG } from '@material-ui/icons'
import { Dialog, TextField, Button, Select } from '@material-ui/core'
import { memo } from 'react'

export const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 2.3fr 0.6fr;
    height: 100%;
`


export const Main = styled.main`
    padding: 2%;
    color: black;
`

export const AlunosBanner = styled.div`
    background-color: #0872FC;
    width: 60%;
    height: auto;
    font-size: 2.6vw;
    padding: 2.5%;
    margin-top: 8%;
    color: #ffffff;
    border-radius: 1.2vw;
    font-weight: 500;
    padding-top: 3.5%;
    padding-bottom: 3.5%;
    margin-left: 1.6%;
`

export const InfoAdminContainer = styled.div`
    display: flex;
    height: fit-content;
    flex-direction: row;
    justify-content: space-around;
`

export const InfoAdmin = styled.div`
    display: inline-block;
    background-color: #ffffff;
    width: 22%;
    height: fit-content;
    margin-top: 5%;
    padding: 1.2%;
    border-radius: 0.5vw;
    border-radius: 20px;
`

export const InfoAdminTit = styled.h2`
    width: 100%;
    font-weight: 100;
    color: #525051;
`

export const InfoAdminDado = styled.span`
    width: 45%;
    font-weight: bolder;
    font-size: 3vw;
    color: #0872FC;
    height: auto;
`

export const IconInfoTotalAlunos = styled(IconInfoTotalAlunosSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
    height: fit-content;
`

export const IconInfoTotalTurmas = styled(IconInfoTotalTurmasSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
    height: fit-content;
`

export const IconInfoMédiaAlunos = styled(IconInfoMédiaAlunosSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
    height: fit-content;
`

export const IconInfoOcupação = styled(IconInfoOcupaçãoSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
    height: fit-content;
`

export const NavInfos = styled.nav`
    padding: 5%;
    background-color: #ffffff;
    border-top-left-radius: 2.5vw;
    border-bottom-left-radius: 2.5vw;
    color: black;
`

export const IconAdd = styled(IconAddSVG)`
    && {
        width: 6%;
        height: auto;
        color: #ffffff;
        background-color: #6A54ED;
        border-radius: 50%;
        border: 2px solid #6A54ED;
        cursor: pointer;
        margin-top: 4%;
    }

    &:hover {
        background-color: #9C59FF;
        border-color: #9C59FF;
    }
`

export const IconAddCircleOutline = styled(IconAddCircleOutlineSVG)`
    && {
        color: ${props => props.color};
        margin-right: 15%;
        width: 22%;
        height: auto;
    }
`

const DialogCadasAlunoStyle = styled(Dialog).attrs({
    fullWidth: true
})`
    && {
        height: 100%;
    }
`

export const DialogCadasAluno = memo(DialogCadasAlunoStyle)

export const CampoInputCadasAluno = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3.5%;
`

const InputNomeCadasAlunoStyle = styled(TextField)`
    && {
        width: 100%;
    }
    
    & .MuiInput-underline {
        font-size: 1vw;
    }

    & .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #0872FC;
    }
`

export const InputNomeCadasAluno = memo(InputNomeCadasAlunoStyle)

export const ButtonSubmitCadasAluno = styled(Button)`
    && {
        float: right;
        border-radius: 20px;
        background-color: #0872FC;
        font-size: 1vw;
        width: 30%;
        margin-top: 6%;
        height: auto;
        margin-bottom: 30%;
    }

    &&:hover {
        background-color: #0852FF;
    }
`

export const InputSelectCadasAluno = styled(Select)`
    && {
        margin-top: 1%;
        height: 10%;
        font-size: 1vw;
    }
`

export const InputDespesaData = styled(TextField)`
    
`

export const LabelInputStyle = styled.span`
    font-size: 1vw;
    width: fit-content;
    color: #8a8a8a;
`

export const LabelInputStyleReq = styled.span`
    color: #D93025;
    margin-left: 10%;
`