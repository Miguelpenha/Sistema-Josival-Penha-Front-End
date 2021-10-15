import styled from 'styled-components'
import { TableCell as TableCellMUI, TableContainer as TableContainerMUi } from '@material-ui/core'

export const TableContainer = styled(TableContainerMUi)`
    width: 45%;
    border-radius: 20px;
`

export const TableCell = styled(TableCellMUI)`
    font-size: 1vw;
`

export const TableCellTitle = styled(TableCell)`
    color: #ED3237;
    font-size: 2vw;
    padding-top: 5%;
    padding-bottom: 5%;
`

export const TableCellDespesaPrice = styled(TableCell)`
    color: #ED3237;
    border-left: 1px solid #E0E0E0;
`