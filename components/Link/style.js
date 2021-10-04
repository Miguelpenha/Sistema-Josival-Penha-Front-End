import styled from 'styled-components'

export const Link = styled.a`
    text-decoration: none;
    color: #9D9D9D;
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
    text-align: center;
    text-decoration: none;
    color: ${props => props.theme.colors.text};
    font: ${props => props.theme.fonts.link};
    background-color: ${props => {
        if (props.theme.colors.backgrounds.links[props.background]) {
            return props.theme.colors.backgrounds.links[props.background]+';'
        } else {
            return props.theme.colors.backgrounds.links.primary+';'
        }
    }};
    padding: 3%;
    padding-left: 10%;
    padding-right: 10%;
    border-radius: 10px;
    font-size: ${props => props.theme.fonts.link};
    height: auto;
    cursor: pointer;
`