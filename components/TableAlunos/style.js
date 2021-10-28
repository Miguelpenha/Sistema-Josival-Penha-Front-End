import styled, { css } from 'styled-components'
import { TableCell as TableCellMUI, TableContainer as TableContainerMUi, TableRow as TableRowMUI, IconButton as IconButtonBruto, Checkbox, Dialog, TextField, Button } from '@material-ui/core'

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

export const IconButtonExclu = styled(IconButtonBruto)`
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

export function LimitText({ children='', limit=0, points=true }) {
    if (children.length > limit) {
        let newChildren = ''
        
        for (let index = 1;index <= limit;index++) newChildren += children[index-1]
        
        if (points) {
            return newChildren+'...'
        } else {
            return newChildren
        }
    } else {
        return children
    }
}

export const DialogGerarDeclaração = styled(Dialog).attrs({
    fullWidth: true
})`
    && {
        height: 100%;
    }
`

export const FormGerarDeclaração = styled.form`
    && {
        padding-bottom: 15%;
    }
`

export const InputPorcentagemGerarDeclaração = styled(TextField)`
    && {
        margin-top: 5%;
        width: 20%;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }
    
    & .MuiInput-underline {
        font-size: 1vw;
    }

    & .MuiInput-underline:after, .MuiInput-underline:before {
        border-bottom-color: #0872FC;
    }
`

export const ButtonSubmitGerarDeclaração = styled(Button)`
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