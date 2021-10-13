import styled from 'styled-components'
import { Add as IconAddSVG, TrendingDown as IconTrendingDownSVG, TrendingUp as IconTrendingUpSVG, Label as IconLabelSVG, Description as DescriptionIconSVG, Payment as IconPaymentSVG, SyncAlt as IconSyncAltSVG, AccountBalance as IconAccountBalanceSVG } from '@material-ui/icons'
import { Card, Dialog, DialogContent, TextField, Button, Checkbox, Switch } from '@material-ui/core'
import Chart from 'react-google-charts'

const Container = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 2.3fr;
    height: 100%;
    width: 100%;
`

const Main = styled.main`
    padding: 2%;
    color: black;
    height: 100%;
    width: 100%;
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

const IconSyncAlt = styled(IconSyncAltSVG)`
    && {
        color: ${props => props.color};
        margin-right: 15%;
        width: 22%;
        height: auto;
    }
`

const Infos = styled.section`
    padding-top: 5%;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    padding-right: 2%;
`

const Info = styled(Card)`
    background-color: #ffffff;
    padding: 2%;
    width: 27%;
    padding-bottom: 2%;
    border-radius: 12px;
    margin-left: 2%;
`

const InfoTit = styled.span`
    font-size: 1vw;
`

const InfoDado = styled.span`
    display: inline-block;
    font-size: 2vw;
    color: ${props => props.color};
    font-weight: bold;
    padding-top: 6%;
`

const IconAccountBalance = styled(IconAccountBalanceSVG)`
    && {
        color: ${props => props.color};
        ${props => {
            if (props.bg) {
                return `
                    border: 5px solid ${props.bg};
                    border-radius: 50px;
                    background-color: ${props.bg};
                `
            }
        }}
        margin-top: 2%;
        width: 22%;
        height: auto;
        float: right;
    }
`

const IconTrendingUpInfo = styled(IconTrendingUpSVG)`
    && {
        color: ${props => props.color};
        ${props => {
            if (props.bg) {
                return `
                    border: 5px solid ${props.bg};
                    border-radius: 50px;
                    background-color: ${props.bg};
                `
            }
        }}
        margin-top: 2%;
        width: 22%;
        height: auto;
        float: right;
    }
`

const IconTrendingDownInfo = styled(IconTrendingDownSVG)`
    && {
        color: ${props => props.color};
        ${props => {
            if (props.bg) {
                return `
                    border: 5px solid ${props.bg};
                    border-radius: 50px;
                    background-color: ${props.bg};
                `
            }
        }}
        margin-top: 2%;
        width: 22%;
        height: auto;
        float: right;
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

const InputNomeReceita = styled(TextField)`
    && {
        margin-top: 5%;
    }
    
    & .MuiInput-underline {
        font-size: 1vw;
    }

    & .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #5AB55E;
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

const InputReceita = styled(TextField)`
    & input {
        color: #5AB55E;
    }
    
    & .MuiInput-underline {
        font-size: 1.5vw;
    }

    & .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #5AB55E;
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

const InputReceitaObservação = styled(TextField)`
    && {
        margin-top: 5%;
    }
    
    & .MuiInput-underline {
        font-size: 1vw;
    }

    & .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #5AB55E;
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

const InvestimentoReceita = styled(Switch)`
    & .MuiSwitch-switchBase.Mui-checked {
        color: #5AB55E;
    }
    
    & .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track {
        background-color: #5AB55E;
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

const FixaReceita = styled(Switch)`
    & .MuiSwitch-switchBase.Mui-checked {
        color: #5AB55E;
    }
    
    & .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track {
        background-color: #5AB55E;
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

const ButtonSubmitReceita = styled(Button)`
    && {
        float: right;
        border-radius: 20px;
        background-color: #5AB55E;
        font-size: 1vw;
        width: 30%;
        margin-top: 6%;
        margin-bottom: 30%;
        height: auto;
    }

    &&:hover {
        background-color: #408243;
    }
`

const ChartReceitasDespesas = styled(Chart)`
    margin-top: 7%;

    & svg {
        border-radius: 20px;
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
    IconSyncAlt,
    Infos,
    Info,
    InfoTit,
    InfoDado,
    IconAccountBalance,
    IconTrendingUpInfo,
    IconTrendingDownInfo,
    DialogCadasDespesa,
    DialogContentCadasDespesa,
    FormDespesa,
    InputNomeDespesa,
    InputNomeReceita,
    InputDespesa,
    InputReceita,
    RealInputDespesa,
    InputDespesaData,
    InputDespesaObservação,
    InputReceitaObservação,
    DescriptionIcon,
    CampoCheckBoxsDespesas,
    CheckboxCategoriaDespesa,
    NomeCategoriaDepesaComCor,
    NomeCategoriaDepesaSóCor,
    InvestimentoDespesa,
    InvestimentoReceita,
    FixaDespesa,
    FixaReceita,
    ButtonSubmitDespesa,
    ButtonSubmitReceita,
    TitCampoCheckBoxDespesa,
    ChartReceitasDespesas
}