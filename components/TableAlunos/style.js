import styled, { css } from 'styled-components'
import { TableCell as TableCellMUI, TableContainer as TableContainerMUi, TableRow as TableRowMUI, IconButton as IconButtonBruto, Checkbox, Dialog, TextField, Button, Switch, Select } from '@material-ui/core'

export const TableContainer = styled(TableContainerMUi)`
    && {
        width: 95%;
        border-radius: 20px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5%;
        margin-bottom: 5%;
    }
`

export const TableCell = styled(TableCellMUI)`
    && {
        font-size: 1vw;
    }
`

export const TableCellBorder = styled(TableCell)`
    && {
        border-right: 1px solid #E0E0E0;
    }
`

export const TableCellTitle = styled(TableCell)`
    && {
        color: #0872FC;
        font-size: 2vw;
        padding-top: 3%;
        padding-bottom: 3%;
    }
`

export const TableCellTitleBorder = styled(TableCell)`
    && {
        color: #0872FC;
        font-size: 2vw;
        padding-top: 3%;
        padding-bottom: 3%;
        border-left: 1px solid #E0E0E0;
    }
`

export const TableRowSele = styled(TableRowMUI)`
    &:hover {
        transition-timing-function: linear;
        transition-duration: 0.2s;
    }
`

export const TableCellValue = styled(TableCell)`
        && {
            color: #000000
            ${props => props.bold && css`
                font-weight: bold;
            `}
        }
    `

export const TableCellValueBorder = styled(TableCellValue)`
    && {
        border-left: 1px solid #E0E0E0;
    }
`

export const TableCellTotal = styled(TableCell)`
    && {
        font-size: 2vw;
        padding: 5%;
    }
`

export const TextTotal = styled.span`
    && {
        color: #0872FC;
        margin-right: 2%;
    }
`

export const TextSaldoValue = styled.span`
    && {
        color: #000000;
    }
`

export const IconButtonExcluir = styled(IconButtonBruto)`
    && {
        background-color: ${props => props.bg};
    }
`

export const IconButtonMais = styled(IconButtonBruto)`
    && {
        background-color: #bfbfbfd3;
    }
`

export const CheckBox = styled(Checkbox)`
    & svg {
        font-size: 1.5vw;
    }
`

export const LinkFotoAluno = styled.a`
    &:hover {
        img {
            border-radius: 20%;
        }
    }
`

export const FotoAluno = styled.img`
    border-radius: 50%;

    &:hover {
        border-radius: 20%;
    }
`

export const DialogGerarDeclara????o = styled(Dialog).attrs({
    fullWidth: true
})`
    && {
        height: 100%;
    }
`

export const InputPorcentagemGerarDeclara????o = styled(TextField)`
    && {
        display: block;
        margin-left: auto;
        margin-right: auto;

        ${props => !props.fullWidth && css`
            width: 20%;
        `}

        ${props => !props.noTop && css`
            margin-top: 5%;
        `}
    }
    
    & .MuiInput-underline {
        font-size: 1vw;
    }

    & .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #0872FC;
    }
`

export const ButtonSubmitGerarDeclara????o = styled(Button)`
    && {
        float: right;
        border-radius: 20px;
        background-color: #0872FC;
        font-size: 1vw;
        width: 30%;
        margin-top: 6%;
        margin-bottom: 30%;
        height: auto;
    }

    &&:hover {
        background-color: #0852FF;
    }
`

export const BolsistaSwitch = styled(Switch)`
    & .MuiSwitch-switchBase.Mui-checked {
        color: #0872FC;
    }
    
    & .MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track {
        background-color: #0872FC;
    }
`

export const CampoInputCadasAluno = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3.5%;
`

export const LabelInputStyle = styled.span`
    font-size: 1vw;
    width: fit-content;
    color: #8a8a8a;
`

export const LabelInputStyleReq = styled.span`
    color: #D93025;
    margin-left: 10%;
`

export const InputSelectCadasAluno = styled(Select)`
    && {
        margin-top: 1%;
        height: 10%;
        font-size: 1vw;
    }
`

export const InputFindAlunos = styled.input`
    width: 90%;
    padding: 2%;
    font-size: 1.5vw;
    color:  #0872FC;
    border: 2px solid  #e0e0e0;
    border-radius: 8px;

    :focus {
        outline: none;
        border-radius: 12px;
        border-color: #0872FC;
    }
`