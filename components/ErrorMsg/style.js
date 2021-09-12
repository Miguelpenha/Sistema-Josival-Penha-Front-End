import styled from 'styled-components'
import IconSVG from '../../assets/icon-alert-error.svg'

const Alert = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    font: ${props => props.theme.fonts.link};
    font-size: 1.4rem;
    border-radius: 4px;
    background-color: #F44336;
    padding: 2%;
    border-radius: 10px;
    font-size: ${props => props.theme.fonts.link};
    height: fit-content;
    margin-top: 2%;
`

const Icon = styled(IconSVG)`
    width: 5%;
    height: auto;
    margin-right: 3%;
`

export {
    Alert,
    Icon
}