import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        transition-duration: 0.2s;
        transition-timing-function: linear;
    }

    html, body, body>div:first-child, div#__next, div#__next>div {
        height: 100%;
    }
    
    html {
        background: ${props => props.theme.colors.backgrounds.primary};
        color: ${props => props.theme.colors.text};
        font: ${props => props.theme.fonts.global};
    }

    body {
        .css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root {
            font-size: 1vw;
        }
    }
`