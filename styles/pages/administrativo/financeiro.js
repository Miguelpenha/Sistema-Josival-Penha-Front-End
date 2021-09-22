import styled from 'styled-components'
import { Add as IconAddSVG, TrendingDown as IconTrendingDownSVG } from '@material-ui/icons'
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
    && {
        font-size: 20vw;
    }
`

const InputNomeDespesa = styled(TextField)`
    && {
        font-size: 20vw;
    }
`

export { 
    Container,
    Main,
    IconAdd,
    IconTrendingDown,
    DialogCadasDespesa,
    DialogContentCadasDespesa,
    InputNomeDespesa
}