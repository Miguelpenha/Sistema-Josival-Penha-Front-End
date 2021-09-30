import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        height: 100%;
        transition-timing-function: linear;
        transition-duration: 0.2s;
        
        & .css-zw3mfo-MuiModal-root-MuiDialog-root {
            height: 1%;
        }

        & .css-iz3z40-MuiDialog-container {
            height: 10000%;
        }
    }

    html {
        background: ${props => props.theme.colors.backgrounds.primary};
        color: ${props => props.theme.colors.text};
        font: ${props => props.theme.fonts.global}
    }
`