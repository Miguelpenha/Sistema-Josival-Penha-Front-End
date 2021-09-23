import styled from 'styled-components'
import { Add as IconAddSVG, TrendingDown as IconTrendingDownSVG, Paid as IconMonetInputDespesaSVG  } from '@material-ui/icons'
import { Dialog, DialogContent, TextField } from '@material-ui/core'

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 2.3fr 0.6fr;
`

const Main = styled.main`
    padding: 2%;
    color: black;
`

const IconAdd = styled(IconAddSVG)`
    color: #ffffff;
    background-color: #6A54ED;
    border-radius: 50%;
    border: 2px solid #6A54ED;
    cursor: pointer;

    && {
        width: 6%;
        height: auto;
    }

    &:hover {
        background-color: #9C59FF;
        border-color: #9C59FF;
    }
`

const IconTrendingDown = styled(IconTrendingDownSVG)`
    color: #ED3237;
    margin-right: 15%;

    && {
        width: 22%;
        height: auto;
    }
`

const DialogCadasDespesa = styled(Dialog).attrs({
    fullWidth: true
})`
    height: fit-content;
`

const DialogContentCadasDespesa = styled(DialogContent)`
    
`

const InputNomeDespesa = styled(TextField)`
    input {
        color: #ED3237;
    }
    
    .MuiInput-underline {
        font-size: 1.5vw;
    }

    .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #ED3237;
    }
`

const IconMonetInputDespesa = styled(IconMonetInputDespesaSVG)`
    margin-top: 100%;
`

const RealInputDespesa = styled.span`
    font-size: 1.5vw;
    margin-bottom: 120%;
    width: fit-content;
`

export { 
    Container,
    Main,
    IconAdd,
    IconTrendingDown,
    DialogCadasDespesa,
    DialogContentCadasDespesa,
    InputNomeDespesa,
    IconMonetInputDespesa,
    RealInputDespesa
}