import styled from 'styled-components'
import IconLogoJP from '../../assets/logoJP.svg'
import IconQuerySVG from '../../assets/icon-query.svg'
import IconHomeSVG from '../../assets/icon-home.svg'

const Container = styled.div`
    background-color: #ffffff;
    height: 100%;
    display: grid;
    grid-template-rows: 10vw 20vw;
`

const LogoJP = styled(IconLogoJP)`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    height: auto;
    margin-top: 10%;
`

const ContainerTools = styled.div`
    width: 100%;
    height: fit-content;
    align-self: center;
    margin-top: 50%;
`

const LinkIcons= styled.a`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row; 
    flex-wrap: wrap;
    margin-left: auto;
    margin-right: auto;
    cursor: pointer;
    ${props => props.spacing ? 'margin-bottom: 35%;' : null}
`

const IconQuery = styled(IconQuerySVG)`
    height: auto;
    border-radius: 10%;
`

const IconHome = styled(IconHomeSVG)`
    height: auto;
    border-radius: 10%;
`

export {
    Container,
    LogoJP,
    ContainerTools,
    LinkIcons,
    IconQuery,
    IconHome
}