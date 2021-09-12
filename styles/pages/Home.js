import styled from 'styled-components'
import Link from '../../components/Link'
import LogoJPNome from '../../components/LogoJPNome'
import IconLinkAdmin from '../../assets/icon-link-admin.svg'
import IconLinkProfessoras from '../../assets/icon-link-professoras.svg'
import IconExit from '../../assets/icon-exit.svg'

const HomeStyle = styled.div`
    @media (max-width: 1036px) {
        .part-right>a {
            font-size: 2rem;
        }

        .part-right>a>svg {
            width: 32px;
            height: 32px;
        }
    }

    @media (max-width: 864.5px) {
        .part-left {
            display: flex;
            width: 100%;
            height: 35%;
            padding-top: 5%;
            padding-bottom: 5%;
            align-items: center;
            justify-content: space-evenly;
            flex-direction: column;
        }

        .part-left>img {
            min-width: 280px;
        }

        .part-right {
            display: flex;
            width: 100%;
            height: 75%;
            align-items: center;
            justify-content: space-evenly;
            flex-direction: column;
            padding-bottom: 5%;
            padding-top: 7%;
        }

        .part-right>a {
            margin: 0;
            padding: 5%;
            width: 75%;
            font-size: 2.3rem;
        }

        .part-right>a>svg {
            width: 35px;
            height: 35px;
        }
    }
`

HomeStyle.PartLeft = styled.div`
    background-color: ${props => props.theme.colors.backgrounds.secondary};
    width: 50%;
    height: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    float: left;
`

HomeStyle.Exit = styled(IconExit)`
    width: 30px;
    height: 30px;
    margin-top: 40%;
    margin-left: 40%;
`

HomeStyle.LogoJPNome = styled(LogoJPNome)`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    height: auto;
    min-width: 380px;
`

HomeStyle.PartRight = styled.div`
    display: flex;
    width: 50%;
    height: 100%;
    float: right;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    padding-top: 15rem;
    padding-bottom: 15rem;
`

HomeStyle.LinkAdmin = styled(Link)`
    padding: 1.5%;
`

HomeStyle.LinkAdmin.Icon = styled(IconLinkAdmin)`
    margin-right: 5%;
`

HomeStyle.LinkProfessoras = styled(Link)`
    padding: 1.5%;
`

HomeStyle.LinkProfessoras.Icon = styled(IconLinkProfessoras)`
    margin-right: 5%;
`

export default HomeStyle