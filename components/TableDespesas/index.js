import { TableContainer, TableCell, TableCellDespesaPrice, TableCellTitle } from './style'
import { Paper, Table, TableHead, TableRow, TableBody } from '@material-ui/core'

export default function TableDespesas({ rows=[] }) {
    return (
        <TableContainer component={Paper}>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCellTitle align="center" scope="col" colSpan={2}>Despesas</TableCellTitle>
                    </TableRow>
                    <TableRow>
                        <TableCell align="center" style={{borderRight: '1px solid #E0E0E0'}}>Nome</TableCell>
                        <TableCell align="center">Preço</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="col">{row.nome}</TableCell>
                            <TableCellDespesaPrice>{row.preco}</TableCellDespesaPrice>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}