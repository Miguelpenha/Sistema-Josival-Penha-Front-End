import styled, { css } from 'styled-components'
import { TableCell as TableCellMUI, TableContainer as TableContainerMUi, TableRow as TableRowMUI, IconButton as IconButtonBruto, Checkbox } from '@material-ui/core'

export const TableContainer = styled(TableContainerMUi)`
    && {
        width: 85%;
        border-radius: 20px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5%;
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
        /* background-color: #CCCCCC; */
    }
`

export const TableCellValue = styled(TableCell)`
        && {
            color: ${props => {
                if (props.receita) {
                    return '#5AB55E'
                } else if (props.noColor) {
                    return '#000000'
                } else {
                    return '#ED3237'
                }
            }};
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

export const TableCellSaldo = styled(TableCell)`
    && {
        font-size: 2vw;
        padding: 5%;
    }
`

export const TextSaldo = styled.span`
    && {
        color: #0872FC;
        margin-right: 2%;
    }
`

export const TextSaldoValue = styled.span`
    && {
        color: ${props => props.negative ? '#ED3237' : '#5AB55E'};
    }
`

export const IconButton = styled(IconButtonBruto)`
    && {
        background-color: #FBD6D7;
    }
`

export const CheckBox = styled(Checkbox)`
    & svg {
        font-size: 1.5vw;
    }
`