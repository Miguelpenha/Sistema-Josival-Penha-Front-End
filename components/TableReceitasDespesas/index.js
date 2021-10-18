import { TableContainer, TableCell, TableCellTitle, TableCellValue, TableCellSaldo, TextSaldo, TextSaldoValue, TableRowSele, TableCellValueBorder, TableCellBorder, IconButton } from './style'
import { Paper, Table, TableHead, TableRow, TableBody, TableFooter, Tooltip } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import CheckAnimation from '../../animations/check'
import NotCheckAnimation from '../../animations/notCheck'

export default function TableReceitasDespesas({ receitas=[], despesas=[], saldo='', onDeleteDespesas }) {
    console.log(typeof despesas)
    console.log(typeof receitas)
    if (typeof receitas != 'string' && typeof despesas != 'string') {
        despesas.map(despesa => {
            despesa.despesa = true
            despesa.criação.sistema = new Date(despesa.criação.sistema)
        })
        receitas.map(receita => {
            receita.receita = true
            receita.criação.sistema = new Date(receita.criação.sistema)
        })
        let rows = [...receitas, ...despesas]
        
        function sortDate(a, b) {
            return b.criação.sistema - a.criação.sistema
        }

        rows.sort(sortDate)

        return (
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCellTitle align="center" scope="col" colSpan={6}>Resumo</TableCellTitle>
                        </TableRow>
                        <TableRow>
                            <TableCellBorder align="center">Nome</TableCellBorder>
                            <TableCellBorder align="center">Preço</TableCellBorder>
                            <TableCellBorder align="center">Criação</TableCellBorder>
                            <TableCellBorder align="center">Investimento</TableCellBorder>
                            <TableCellBorder align="center">Fixa</TableCellBorder>
                            <TableCell align="center">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRowSele key={index}>
                                <TableCellValue receita={row.receita && 'true'} component="th" scope="col">{row.nome}</TableCellValue>
                                <TableCellValueBorder bold receita={row.receita && 'true'}>{row.receita ? '+ ' : '- '}{row.preco}</TableCellValueBorder>
                                <TableCellValueBorder receita={row.receita && 'true'} align="center">{row.criação.data}</TableCellValueBorder>
                                <TableCellValueBorder noColor align="center">
                                    {row.investimento ? <CheckAnimation/> : <NotCheckAnimation/>}
                                </TableCellValueBorder>
                                <TableCellValueBorder noColor align="center">
                                    {row.fixa ? <CheckAnimation/> : <NotCheckAnimation/>}
                                </TableCellValueBorder>
                                <TableCellValueBorder align="center">
                                    <Tooltip title={
                                        <span style={{fontSize: '1vw'}}>Excluir essa despessa</span>
                                    } arrow placement="bottom">
                                        <IconButton idreceita={row._id} onClick={e => {
                                            if (row.receita) {

                                            } else {
                                                onDeleteDespesas(e.currentTarget.getAttribute('idreceita'))
                                            }
                                        }}>
                                            <DeleteIcon sx={{color: '#ED3237'}}/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCellValueBorder>
                            </TableRowSele>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCellSaldo align="center" colSpan={6}>
                                <TextSaldo negative={saldo.includes('-')}>Saldo</TextSaldo>
                                {saldo.includes('-') ?
                                    <TextSaldoValue negative={true}>
                                        - R$ {saldo.replace('-R$', '').trim()}
                                    </TextSaldoValue>
                                 : <TextSaldoValue negative={false}>
                                        + {saldo}
                                    </TextSaldoValue>
                                }
                            </TableCellSaldo>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        )
    } else {
        return null
    }
}