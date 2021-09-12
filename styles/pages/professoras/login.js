import styled from 'styled-components'
import LogoJPNome from '../../../components/LogoJPNome'

const LoginStyle = styled.div`
    @media (max-width: 1036px) {
        
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

LoginStyle.PartLeft = styled.div`
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

LoginStyle.PartLeft.LogoJPNome = styled(LogoJPNome)`
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
    height: auto;
    min-width: 380px;
`

LoginStyle.PartRight = styled.div`
    display: flex;
    width: 50%;
    height: 100%;
    float: right;
    justify-content: space-between;
    flex-wrap: wrap;
`

LoginStyle.PartRight.Form = styled.form`
    ${props => {
        if (props.error) {
            return 'margin-top: 0%;'
        } else {
            return 'margin-bottom: 4%;\nmargin-top: 20%;'
        }
    }}
    margin-left: 10%;
    width: 70%;
    height: auto;
`

LoginStyle.PartRight.Form.Tit = styled.h1`
    width: 100%;
    color: #000000;
    font: ${props => props.theme.fonts.link};
    flex-grow: 1;
    height: auto;
    text-align: left;
    font-size: 3.7rem;
    padding-bottom: 7%;
`

LoginStyle.PartRight.Form.Label = styled.label`
    display: block;
    height: auto;
    margin-bottom: 2%;
    margin-top: 2%;
    font: ${props => props.theme.fonts.link};
    font-size: 2.3rem;
    color: ${props => props.theme.colors.secondary};
`

LoginStyle.PartRight.Form.Input = styled.input`
    width: 100%;
    flex-grow: 1;
    height: 10%;
    align-self: stretch;
    background-color: #C6D9F1;
    border: none;
    border-radius: 10px;
    margin-bottom: 3%;
    &:focus {
        box-shadow: 0 0 0 0;
        border: 0 none;
        outline: 0;
    }
    padding: 3%;
    color: ${props => props.theme.colors.secondary};
    font: ${props => props.theme.fonts.input};
`

LoginStyle.PartRight.Form.Btn = styled.button`
    width: 100%;
    flex-grow: 1;
    height: auto;
    align-self: stretch;
    margin-top: 8%;
    background-color: ${props => props.theme.colors.backgrounds.links.secondary};
    color: ${props => props.theme.colors.text};
    border: none;
    border-radius: 10px;
    padding-bottom: 3%;
    padding-top: 3%;
    font: ${props => props.theme.fonts.link};
    font-size: 2.5rem;
    cursor: pointer;
`

export default LoginStyle