import styled from 'styled-components'
import IconInfoTotalAlunosSVG from '../../../assets/icon-info-total-alunos.svg'
import IconInfoTotalTurmasSVG from '../../../assets/icon-info-total-turmas.svg'
import IconInfoMédiaAlunosSVG from '../../../assets/icon-info-média-alunos.svg'
import IconInfoOcupaçãoSVG from '../../../assets/icon-info-ocupação.svg'

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 2.3fr 0.6fr;
    height: 100%;
`


const Main = styled.main`
    padding: 2%;
    color: black;
`

const AlunosBanner = styled.div`
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

const InfoAdminContainer = styled.div`
    display: flex;
    height: fit-content;
    flex-direction: row;
    justify-content: space-around;
`

const InfoAdmin = styled.div`
    display: inline-block;
    background-color: #ffffff;
    width: 22%;
    height: fit-content;
    margin-top: 5%;
    padding: 1.2%;
    border-radius: 0.5vw;
`

const InfoAdminTit = styled.h2`
    width: 100%;
    font-weight: 100;
    color: #525051;
`

const InfoAdminDado = styled.span`
    width: 45%;
    font-weight: bolder;
    font-size: 3vw;
    color: #0872FC;
    height: auto;
`

const IconInfoTotalAlunos = styled(IconInfoTotalAlunosSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
    height: fit-content;
`

const IconInfoTotalTurmas = styled(IconInfoTotalTurmasSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
    height: fit-content;
`

const IconInfoMédiaAlunos = styled(IconInfoMédiaAlunosSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
    height: fit-content;
`

const IconInfoOcupação = styled(IconInfoOcupaçãoSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
    height: fit-content;
`

const NavInfos = styled.nav`
    padding: 5%;
    background-color: #ffffff;
    border-top-left-radius: 2.5vw;
    border-bottom-left-radius: 2.5vw;
    color: black;
`

export { 
    Container,
    Main,
    AlunosBanner,
    InfoAdminContainer,
    InfoAdmin,
    InfoAdminTit,
    InfoAdminDado,
    IconInfoTotalAlunos,
    IconInfoTotalTurmas,
    IconInfoMédiaAlunos,
    IconInfoOcupação,
    NavInfos
}