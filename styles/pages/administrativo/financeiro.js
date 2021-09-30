import styled from 'styled-components'
import { Add as IconAddSVG, TrendingDown as IconTrendingDownSVG, Description as DescriptionIconSVG } from '@material-ui/icons'
import { Dialog, DialogContent, TextField, Button, Checkbox } from '@material-ui/core'

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 2.3fr 0.6fr;
`

const Main = styled.main`
    padding: 2%;
    color: black;

    & .MuiAutocomplete-popper.css-bckmzb-MuiAutocomplete-popper {
        background-color: red;
    }
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

const FormDespesa = styled.form`

`

const InputNomeDespesa = styled(TextField)`
    margin-top: 5%;
    
    .MuiInput-underline {
        font-size: 1vw;
    }

    .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #ED3237;
    }
`

const InputDespesa = styled(TextField)`
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

const RealInputDespesa = styled.span`
    font-size: 1.5vw;
    margin-bottom: 120%;
    width: fit-content;
`

const InputDespesaData = styled.input`
    margin-top: 5%;
    width: 100%;
`

const InputDespesaObservação = styled(TextField)`
    margin-top: 5%;
    
    .MuiInput-underline {
        font-size: 1vw;
    }

    .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #ED3237;
    }
`

const DescriptionIcon = styled(DescriptionIconSVG)`
    
`

const CampoCheckBoxsDespesas = styled.div`
    margin-top: 5%;
    background-color: #E7E7E7;
    border-radius: 10px;
    padding: 1%;
`

const CheckboxCategoriaDespesa = styled(Checkbox)`
    & .MuiSvgIcon-root {
        font-size: 1.5vw;
    }
`

const NomeCategoriaDepesaComCor = styled.span`
    font-size: 0.8vw;
`

const NomeCategoriaDepesaSóCor = styled.span`
    background-color: ${props => props.color ? props.color : '#53BDE8'};
    padding: 0.1%;
    border-radius: 50%;
    margin-right: 2%;
    padding-left: 2.7%;
`

const ButtonSubmitDespesa = styled(Button)`
    float: right;
    margin-left: auto;
    margin-right: auto;
    border-radius: 20px;
    background-color: #ED3237;
    font-size: 1vw;
    width: 30%;
    margin-top: 8%;
    margin-bottom: 3%;
    
    &&:hover {
        background-color: #BA272B;
    }
`

export { 
    Container,
    Main,
    IconAdd,
    IconTrendingDown,
    DialogCadasDespesa,
    DialogContentCadasDespesa,
    FormDespesa,
    InputNomeDespesa,
    InputDespesa,
    RealInputDespesa,
    InputDespesaData,
    InputDespesaObservação,
    DescriptionIcon,
    CampoCheckBoxsDespesas,
    CheckboxCategoriaDespesa,
    NomeCategoriaDepesaComCor,
    NomeCategoriaDepesaSóCor,
    ButtonSubmitDespesa
}