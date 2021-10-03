import styled from 'styled-components'
import LogoJPNomeSemStyle from '../../components/LogoJPNome'
import IconAlunosSVG from '../../assets/icon-nav-admin-alunos.svg'
import IconAlunosSeleSVG from '../../assets/icon-nav-admin-alunos-sele.svg'
import IconAcadêmicoSVG from '../../assets/icon-nav-admin-acadêmico.svg'
import IconAcadêmicoSeleSVG from '../../assets/icon-nav-admin-acadêmico-sele.svg'
import IconDashBoardSVG from '../../assets/icon-nav-admin-dashBoard.svg'
import IconDashBoardSeleSVG from '../../assets/icon-nav-admin-dashBoard-sele.svg'
import IconMarketingSVG from '../../assets/icon-nav-admin-marketing.svg'
import IconMarketingSeleSVG from '../../assets/icon-nav-admin-marketing-sele.svg'
import IconFinanceiroSVG from '../../assets/icon-nav-admin-financeiro.svg'
import IconFinanceiroSeleSVG from '../../assets/icon-nav-admin-financeiro-sele.svg'
import IconColaboradoresSVG from '../../assets/icon-nav-admin-financeiro.svg'
import IconColaboradoresSeleSVG from '../../assets/icon-nav-admin-financeiro-sele.svg'

const NavOptions = styled.nav`
    background-color: #ffffff;
    border-top-right-radius: 2.5vw;
    border-bottom-right-radius: 2.5vw;
    height: 100%;
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
    height: 80%;
`

const Função = styled.li`
    color: ${props => props.selected ? '#000000;' :'#9D9D9D;'};
    font-weight: ${props => props.selected ? '500;' :'200;'};
    width: 80%;
    display: flex;
    margin-left: auto;
    margin-right: auto;
    padding: 2%;
    margin-top: 4%;
    align-items: center;
    height: 10%;
`

const LinkFunção = styled.a`
    width: auto;
    display: inline-flex;
    justify-content: baseline;
    cursor: pointer;
    border-radius: 20px;
    transition-timing-function: linear;
    transition-duration: 0.2s;
    padding: 3%;
    height: 100%;

    &:hover {
        transition-timing-function: linear;
        transition-duration: 0.2s;
        background-color: #0872FC;
        color: #ffffff;
    }
`

const IconAlunos = styled(IconAlunosSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconAlunosSele = styled(IconAlunosSeleSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconAcadêmico = styled(IconAcadêmicoSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconAcadêmicoSele = styled(IconAcadêmicoSeleSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconDashBoard = styled(IconDashBoardSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconDashBoardSele = styled(IconDashBoardSeleSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconMarketing = styled(IconMarketingSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconMarketingSele = styled(IconMarketingSeleSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconFinanceiro = styled(IconFinanceiroSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconFinanceiroSele = styled(IconFinanceiroSeleSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconColaboradores = styled(IconColaboradoresSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const IconColaboradoresSele = styled(IconColaboradoresSeleSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

const TextFunção = styled.span`
    align-self: center;
`

export { 
    NavOptions,
    LogoJPNome,
    Funções,
    Função,
    LinkFunção,
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
    TextFunção
}