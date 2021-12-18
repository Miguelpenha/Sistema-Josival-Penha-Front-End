import styled from 'styled-components'
import LogoJP from '../../components/LogoJPNome'
import LinkNext from '../../components/Link'
import IconExit from '../../assets/icon-exit.svg'

export const Container = styled.main`
    height: 100%;
    display: flex;
    flex-direction: row;
`

export const ContainerLogo = styled.div`
    flex: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
`

export const Logo = styled(LogoJP)`
    width: 70%;
`

export const ContainerLinks = styled.div`
    flex: 0.5;
    display: flex;
    padding-top: 10%;
    align-items: center;
    padding-bottom: 10%;
    flex-direction: column;
    justify-content: space-evenly;
`

export const Link = styled.a`
    width: 60%;
    padding: 1.5%;
    color: #ffffff;
    font-size: 1.5vw;
    display: flex;
    font-weight: bold;
    text-align: center;
    border-radius: 10px;
    align-items: center;
    text-decoration: none;
    justify-content: center;
    background-color: ${props => props.bg};

    svg {
        margin-right: 5%;
    }
`