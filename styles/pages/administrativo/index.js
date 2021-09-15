import styled from 'styled-components'
import LogoJPNomeSemStyle from '../../../components/LogoJPNome'
import IconAlunosSVG from '../../../assets/icon-alunos.svg'

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.4fr 2.6fr;
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
    font-size: 1vw;
    font-weight: 500;
    margin-top: 5%;
`

const Função = styled.li`
    height: auto;
    color: ${props => props.selected ? '#000000;' :'#9D9D9D;'};
    width: 80%;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding: 3%;
`

const IconAlunos = styled(IconAlunosSVG)`
    width: 20%;
`

export { 
    Container,
    NavOptions,
    LogoJPNome,
    Funções,
    Função,
    IconAlunos,
    Main
}