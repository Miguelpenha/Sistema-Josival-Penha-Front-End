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
import { MonetizationOn as IconFinanceiroSVG, Group as IconColaboradoresSVG } from '@material-ui/icons'
import { memo } from 'react'

const NavOptionsStyle = styled.nav`
    background-color: #ffffff;
    border-top-right-radius: 2.5vw;
    border-bottom-right-radius: 2.5vw;
    height: 100%;
`

export const NavOptions = memo(NavOptionsStyle)

const LogoJPNomeStyle = styled(LogoJPNomeSemStyle)`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 8%;
    width: 70%;
    height: auto;
`

export const LogoJPNome = memo(LogoJPNomeStyle)

export const FunçõesStyle = styled.ul`
    height: auto;
    font-size: 1.4vw;
    margin-top: 15%;
    height: 80%;
    max-height: 800px;
`

export const Funções = memo(FunçõesStyle)

const FunçãoStyle = styled.li`
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

export const Função = memo(FunçãoStyle)

const LinkFunçãoStyle = styled.a`
    color: #9D9D9D;
    text-decoration: none;
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

export const LinkFunção = memo(LinkFunçãoStyle)

const IconAlunosStyle = styled(IconAlunosSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

export const IconAlunos = memo(IconAlunosStyle)

const IconAlunosSeleStyle = styled(IconAlunosSeleSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

export const IconAlunosSele = memo(IconAlunosSeleStyle)

const IconAcadêmicoStyle = styled(IconAcadêmicoSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

export const IconAcadêmico = memo(IconAcadêmicoStyle)

const IconAcadêmicoSeleStyle = styled(IconAcadêmicoSeleSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

export const IconAcadêmicoSele = memo(IconAcadêmicoSeleStyle)

const IconDashBoardStyle = styled(IconDashBoardSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

export const IconDashBoard = memo(IconDashBoardStyle)

const IconDashBoardSeleStyle = styled(IconDashBoardSeleSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

export const IconDashBoardSele = memo(IconDashBoardSeleStyle)

const IconMarketingStyle = styled(IconMarketingSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

export const IconMarketing = memo(IconMarketingStyle)

const IconMarketingSeleStyle = styled(IconMarketingSeleSVG)`
    width: 25%;
    margin-right: 4%;
    height: auto;
`

export const IconMarketingSele = memo(IconMarketingSeleStyle)

const IconFinanceiroStyle = styled(IconFinanceiroSVG)`
    && {
        width: 20%;
        margin-right: 6%;
        margin-left: 4%;
        height: auto;
    }
`

export const IconFinanceiro = memo(IconFinanceiroStyle)

const IconFinanceiroSeleStyle = styled(IconFinanceiroSVG)`
    && {
        width: 20%;
        margin-right: 6%;
        margin-left: 4%;
        height: auto;
        color: #0872FC;
    }
`

export const IconFinanceiroSele = memo(IconFinanceiroSeleStyle)

const IconColaboradoresStyle = styled(IconColaboradoresSVG)`
    && {
        width: 20%;
        margin-right: 6%;
        margin-left: 4%;
        height: auto;
    }
`

export const IconColaboradores = memo(IconColaboradoresStyle)

const IconColaboradoresSeleStyle = styled(IconColaboradoresSVG)`
    && {
        width: 20%;
        margin-right: 6%;
        margin-left: 4%;
        height: auto;
        color: #0872FC;
    }
`

export const IconColaboradoresSele = memo(IconColaboradoresSeleStyle)

const TextFunçãoStyle = styled.span`
    align-self: center;
`

export const TextFunção = memo(TextFunçãoStyle)