import styled from 'styled-components'
import LogoJPNomeSemStyle from '../../../components/LogoJPNome'
import IconAlunosSVG from '../../../assets/icon-nav-admin-alunos.svg'
import IconAlunosSeleSVG from '../../../assets/icon-nav-admin-alunos-sele.svg'
import IconAcadêmicoSVG from '../../../assets/icon-nav-admin-acadêmico.svg'
import IconAcadêmicoSeleSVG from '../../../assets/icon-nav-admin-acadêmico-sele.svg'
import IconDashBoardSVG from '../../../assets/icon-nav-admin-dashBoard.svg'
import IconDashBoardSeleSVG from '../../../assets/icon-nav-admin-dashBoard-sele.svg'
import IconMarketingSVG from '../../../assets/icon-nav-admin-marketing.svg'
import IconMarketingSeleSVG from '../../../assets/icon-nav-admin-marketing-sele.svg'
import IconFinanceiroSVG from '../../../assets/icon-nav-admin-financeiro.svg'
import IconFinanceiroSeleSVG from '../../../assets/icon-nav-admin-financeiro-sele.svg'
import IconColaboradoresSVG from '../../../assets/icon-nav-admin-financeiro.svg'
import IconColaboradoresSeleSVG from '../../../assets/icon-nav-admin-financeiro-sele.svg'
import Iconalunosbannersvg from '../../../assets/icon-alunos-banner.svg'
import IconInfoTotalAlunosSVG from '../../../assets/icon-info-total-alunos.svg'
import IconInfoTotalTurmasSVG from '../../../assets/icon-info-total-turmas.svg'
import IconInfoMédiaAlunosSVG from '../../../assets/icon-info-média-alunos.svg'
import IconInfoOcupaçãoSVG from '../../../assets/icon-info-ocupação.svg'

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 2.3fr 0.6fr;
`

const NavOptions = styled.nav`
    background-color: #ffffff;
    border-top-right-radius: 2.5vw;
    border-bottom-right-radius: 2.5vw;
`

const LogoJPNome = styled(LogoJPNomeSemStyle)`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8%;
    width: 70%;
    height: auto;
`

const Funções = styled.ul`
    height: auto;
    font-size: 1.4vw;
    margin-top: 15%;
`

const Função = styled.li`
    height: auto;
    color: ${props => props.selected ? '#000000;' :'#9D9D9D;'};
    font-weight: ${props => props.selected ? '500;' :'200;'};
    width: 80%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    padding: 3%;
    margin-top: 4%;
    align-items: center;
`

const IconAlunos = styled(IconAlunosSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconAlunosSele = styled(IconAlunosSeleSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconAcadêmico = styled(IconAcadêmicoSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconAcadêmicoSele = styled(IconAcadêmicoSeleSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconDashBoard = styled(IconDashBoardSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconDashBoardSele = styled(IconDashBoardSeleSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconMarketing = styled(IconMarketingSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconMarketingSele = styled(IconMarketingSeleSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconFinanceiro = styled(IconFinanceiroSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconFinanceiroSele = styled(IconFinanceiroSeleSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconColaboradores = styled(IconColaboradoresSVG)`
    width: 25%;
    margin-right: 4%;
`

const IconColaboradoresSele = styled(IconColaboradoresSeleSVG)`
    width: 25%;
    margin-right: 4%;
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
    width: 50%;
    font-weight: bolder;
    font-size: 3vw;
    color: #0872FC;
`

const IconInfoTotalAlunos = styled(IconInfoTotalAlunosSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
`

const IconInfoTotalTurmas = styled(IconInfoTotalTurmasSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
`

const IconInfoMédiaAlunos = styled(IconInfoMédiaAlunosSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
`

const IconInfoOcupação = styled(IconInfoOcupaçãoSVG)`
    width: 45%;
    float: right;
    margin-top: 2%;
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
    NavOptions,
    LogoJPNome,
    Funções,
    Função,
    IconAlunos,
    IconAlunosSele,
    IconAcadêmico,
    IconAcadêmicoSele,
    IconDashBoard,
    IconDashBoardSele,
    IconMarketing,
    IconMarketingSele,
    IconFinanceiro,
    IconFinanceiroSele,
    IconColaboradores,
    IconColaboradoresSele,
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