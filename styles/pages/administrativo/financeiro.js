import styled from 'styled-components'
import { Add as IconAddSVG, TrendingDown as IconTrendingDownSVG, TrendingUp as IconTrendingUpSVG, Label as IconLabelSVG, Description as DescriptionIconSVG, Payment as IconPaymentSVG } from '@material-ui/icons'
import { Dialog, DialogContent, TextField, Button, Checkbox, Switch } from '@material-ui/core'

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 2.3fr 0.6fr;
    height: 100%;
`

const Main = styled.main`
    padding: 2%;
    color: black;
    height: 8%;
`

const IconAdd = styled(IconAddSVG)`
    && {
        width: 6%;
        height: auto;
        color: #ffffff;
        background-color: #6A54ED;
        border-radius: 50%;
        border: 2px solid #6A54ED;
        cursor: pointer;
    }

    &:hover {
        background-color: #9C59FF;
        border-color: #9C59FF;
    }
`

const IconTrendingDown = styled(IconTrendingDownSVG)`
    && {
        color: ${props => props.color};
        margin-right: 15%;
        width: 22%;
        height: auto;
    }
`

const IconTrendingUp = styled(IconTrendingUpSVG)`
    && {
        color: ${props => props.color};
        margin-right: 15%;
        width: 22%;
        height: auto;
    }
`

const IconLabel = styled(IconLabelSVG)`
    && {
        color: ${props => props.color};
        margin-right: 15%;
        width: 22%;
        height: auto;
    }
`

const IconPayment = styled(IconPaymentSVG)`
    && {
        color: ${props => props.color};
        margin-right: 15%;
        width: 22%;
        height: auto;
    }
`

const DialogCadasDespesa = styled(Dialog).attrs({
    fullWidth: true
})`
    && {
        height: 100%;
    }
`

const DialogContentCadasDespesa = styled(DialogContent)`
    
`

const FormDespesa = styled.form`
    && {
        padding-bottom: 15%;
    }
`

const InputNomeDespesa = styled(TextField)`
    && {
        margin-top: 5%;
    }
    
    & .MuiInput-underline {
        font-size: 1vw;
    }

    & .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #ED3237;
    }
`

const InputDespesa = styled(TextField)`
    & input {
        color: #ED3237;
    }
    
    & .MuiInput-underline {
        font-size: 1.5vw;
    }

    & .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #ED3237;
    }
`

const RealInputDespesa = styled.span`
    font-size: 1.5vw;
`

const InputDespesaData = styled.input`
    margin-top: 5%;
    width: 100%;
    font-family: 'Roboto', sans-serif;
    border: 1.6px solid #767676;
    border-radius: 5px;
    padding: 1%;
`

const InputDespesaObservação = styled(TextField)`
    && {
        margin-top: 5%;
    }
    
    & .MuiInput-underline {
        font-size: 1vw;
    }

    & .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #ED3237;
    }
`

const DescriptionIcon = styled(DescriptionIconSVG)`
    
`

const CampoCheckBoxsDespesas = styled.div`
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 5%;
    background-color: #E7E7E7;
    border-radius: 10px;
    padding: 1%;
    width: 70%;
`

const CheckboxCategoriaDespesa = styled(Checkbox)`
    & .MuiSvgIcon-root {
        font-size: 1.5vw;
    }
`

const NomeCategoriaDepesaComCor = styled.span`
    font-size: 0.8vw;
`

const TitCampoCheckBoxDespesa = styled.h1`
    text-align: center;
    padding-top: 2%;
`

const NomeCategoriaDepesaSóCor = styled.span`
    background-color: ${props => props.color ? props.color : '#53BDE8'};
    padding: 0.1%;
    border-radius: 50%;
    margin-right: 2%;
    padding-left: 4%;
`

const InvestimentoDespesa = styled(Switch)`
    & .MuiSwitch-switchBase.Mui-checked {
        color: #ED3237;
    }
    
    & .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track {
        background-color: #ED3237;
    }
`

const FixaDespesa = styled(Switch)`
    & .MuiSwitch-switchBase.Mui-checked {
        color: #ED3237;
    }
    
    & .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track {
        background-color: #ED3237;
    }
`

const ButtonSubmitDespesa = styled(Button)`
    && {
        float: right;
        border-radius: 20px;
        background-color: #ED3237;
        font-size: 1vw;
        width: 30%;
        margin-top: 6%;
        margin-bottom: 30%;
        height: auto;
    }

    &&:hover {
        background-color: #BA272B;
    }
`

export { 
    Container,
    Main,
    IconAdd,
    IconTrendingDown,
    IconTrendingUp,
    IconLabel,
    IconPayment,
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
    InvestimentoDespesa,
    FixaDespesa, 
    ButtonSubmitDespesa,
    TitCampoCheckBoxDespesa
}