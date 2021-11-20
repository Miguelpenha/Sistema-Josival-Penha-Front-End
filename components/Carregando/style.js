import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core'

export const Carregando = styled(CircularProgress).attrs({
    style: {color: '#0872FC'},
    size: '70px'
})`
    position: absolute;
    top: 0; 
    bottom: 0;
    left: 0; 
    right: 0;
    margin: auto;
`