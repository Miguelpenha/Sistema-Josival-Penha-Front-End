import { memo } from 'react'
import { TableContainer, TableCell, TableCellTitle, TableCellSaldo, TextSaldo, TextSaldoValue, TableRowSele, TableCellValueBorder, TableCellBorder, IconButton, TableCellTitleBorder } from './style'
import { Paper, Table, TableHead, TableRow, TableBody, TableFooter, Tooltip } from '@material-ui/core'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'
import CheckAnimation from '../../animations/check'
import NotCheckAnimation from '../../animations/notCheck'

function TableReceitasDespesas({ receitas=[], despesas=[], saldo='', onDeleteDespesas, onDeleteReceitas, onDeleteTodos, onEditReceita, onEditDespesa }) {
    if (typeof receitas != 'string' && typeof despesas != 'string') {
        if (receitas.length >= 1 || despesas.length >= 1) {
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
                                <TableCellTitle align="center" scope="col" colSpan="5">Resumo</TableCellTitle>
                                <TableCellTitleBorder align="center" scope="col" colSpan="1">
                                    <Tooltip title={
                                        <span style={{fontSize: '1vw'}}>Excluir itens</span>
                                    } arrow placement="bottom">
                                        <IconButton onClick={e => {
                                            onDeleteTodos()
                                        }}>
                                            <DeleteIcon sx={{color: '#ED3237'}}/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCellTitleBorder>
                            </TableRow>
                            <TableRow>
                                <TableCellBorder align="center">Nome</TableCellBorder>
                                <TableCellBorder align="center">Preço</TableCellBorder>
                                <TableCellBorder align="center">Data</TableCellBorder>
                                <TableCellBorder align="center">Investimento</TableCellBorder>
                                <TableCellBorder align="center">Fixa</TableCellBorder>
                                <TableCell align="center">Opções</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRowSele key={index}>
                                    <TableCellValueBorder receita={row.receita && 'true'} component="th" scope="col">{row.nome}</TableCellValueBorder>
                                    <TableCellValueBorder bold receita={row.receita && 'true'}>{row.receita ? '+ ' : '- '}{row.preco}</TableCellValueBorder>
                                    <TableCellValueBorder receita={row.receita && 'true'} align="center">{row.data}</TableCellValueBorder>
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
                                            <IconButton idfinanceiro={row._id} onClick={e => {
                                                if (row.receita) {
                                                    onDeleteReceitas(e.currentTarget.getAttribute('idfinanceiro'))
                                                } else {
                                                    onDeleteDespesas(e.currentTarget.getAttribute('idfinanceiro'))
                                                }
                                            }}>
                                                <DeleteIcon sx={{color: '#ED3237'}}/>
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={
                                            <span style={{fontSize: '1vw'}}>Editar essa despessa</span>
                                        } arrow placement="bottom">
                                            <IconButton bg="#a0c9ff" idfinanceiro={row._id} onClick={e => {
                                                if (row.receita) {
                                                    onEditReceita(e.currentTarget.getAttribute('idfinanceiro'))
                                                } else {
                                                    onEditDespesa(e.currentTarget.getAttribute('idfinanceiro'))
                                                }
                                            }}>
                                                <EditIcon sx={{color: '#0872FC'}}/>
                                            </IconButton>
                                        </Tooltip>
                                    </TableCellValueBorder>
                                </TableRowSele>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCellSaldo align="center" colSpan={8}>
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
    } else {
        return null
    }
}

export default memo(TableReceitasDespesas)