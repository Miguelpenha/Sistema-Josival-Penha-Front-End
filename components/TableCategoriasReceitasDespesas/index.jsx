import { memo } from 'react'
import { TableContainer, TableCell, TableCellTitle, TableCellSaldo, TextSaldo, TextSaldoValue, TableRowSele, TableCellValueBorder, TableCellBorder, IconButton, TableCellTitleBorder } from './style'
import { Paper, Table, TableHead, TableRow, TableBody, TableFooter, Tooltip } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import CheckAnimation from '../../animations/check'
import NotCheckAnimation from '../../animations/notCheck'
import { get } from '../../hooks'

function TableCategoriasReceitasDespesas({ categoriasReceitas=[], categoriasDespesas=[], onDeleteCategoriaReceita, onDeleteCategoriaDespesa, onDeleteReceitas, onDeleteTodos }) {
    if (typeof categoriasReceitas != 'string' && typeof categoriasDespesas != 'string') {
        categoriasReceitas.map(categoriaReceita => {
            categoriaReceita.receita = true
            categoriaReceita.criação.sistema = new Date(categoriaReceita.criação.sistema)
        })
        
        categoriasDespesas.map(categoriaDespesa => {
            categoriaDespesa.despesa = true
            categoriaDespesa.criação.sistema = new Date(categoriaDespesa.criação.sistema)
        })

        let rows = [...categoriasReceitas, ...categoriasDespesas]
        
        function sortDate(a, b) {
            return b.criação.sistema - a.criação.sistema
        }
        
        rows.sort(sortDate)
        
        return (
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCellTitle align="center" scope="col" colSpan={2}>Categorias</TableCellTitle>
                            <TableCellTitleBorder align="center" scope="col" colSpan={1}>
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
                            <TableCellBorder align="center">Data</TableCellBorder>
                            <TableCell align="center">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRowSele key={index}>
                                <TableCellValueBorder receita={row.receita && 'true'} component="th" scope="col">{row.nome}</TableCellValueBorder>
                                <TableCellValueBorder receita={row.receita && 'true'} align="center">{row.criação.data}</TableCellValueBorder>
                                <TableCellValueBorder align="center">
                                    <Tooltip title={
                                        <span style={{fontSize: '1vw'}}>Excluir essa despessa</span>
                                    } arrow placement="bottom">
                                        <IconButton idfinanceiro={row._id} onClick={e => {
                                            if (!row.receita) {
                                                onDeleteCategoriaReceita(e.currentTarget.getAttribute('idfinanceiro'))
                                            } else {
                                                onDeleteCategoriaDespesa(e.currentTarget.getAttribute('idfinanceiro'))
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
                            <TableCellSaldo align="center" colSpan={8}>
                                <TextSaldo>{rows.length}{rows.length === 1 ? ' categoria' : ' categorias'}</TextSaldo>
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

export default memo(TableCategoriasReceitasDespesas)