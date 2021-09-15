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

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 2.5fr;
`

const Main = styled.main`
    padding: 2%;
    color: black;
`

const NavOptions = styled.nav`
    background-color: #ffffff;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
`

const LogoJPNome = styled(LogoJPNomeSemStyle)`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8%;
    width: 80%;
    height: auto;
`

const Funções = styled.ul`
    height: auto;
    font-size: 1.5vw;
    font-weight: 500;
    margin-top: 15%;
`

const Função = styled.li`
    height: auto;
    color: ${props => props.selected ? '#000000;' :'#9D9D9D;'};
    width: 80%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    padding: 3%;
    margin-top: 4%;
    align-items: center;
`

const IconAlunos = styled(IconAlunosSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconAlunosSele = styled(IconAlunosSeleSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconAcadêmico = styled(IconAcadêmicoSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconAcadêmicoSele = styled(IconAcadêmicoSeleSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconDashBoard = styled(IconDashBoardSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconDashBoardSele = styled(IconDashBoardSeleSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconMarketing = styled(IconMarketingSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconMarketingSele = styled(IconMarketingSeleSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconFinanceiro = styled(IconFinanceiroSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconFinanceiroSele = styled(IconFinanceiroSeleSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconColaboradores = styled(IconColaboradoresSVG)`
    width: 35%;
    margin-right: 8%;
`

const IconColaboradoresSele = styled(IconColaboradoresSeleSVG)`
    width: 35%;
    margin-right: 8%;
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
    Main
}