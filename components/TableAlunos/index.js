import { TableContainer, TableCell, TableCellTitle, TableCellTotal, TextTotal, TableRowSele, TableCellValueBorder, TableCellBorder, IconButton, TableCellTitleBorder } from './style'
import { Paper, Table, TableHead, TableRow, TableBody, TableFooter, Tooltip } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import CheckAnimation from '../../animations/check'
import NotCheckAnimation from '../../animations/notCheck'

export default function TableReceitasDespesas({ alunos=[], onDeleteAlunos, onDeleteAlunosTodos }) {
    if (typeof alunos != 'string' && alunos) {
        alunos.map(aluno => aluno.criacao.sistema = new Date(aluno.criacao.sistema))

        let rows = alunos
        
        function sortDate(a, b) {
            return b.criacao.sistema - a.criacao.sistema
        }
        
        rows.sort(sortDate)
        
        return (
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCellTitle align="center" scope="col" colSpan={1}>Alunos</TableCellTitle>
                            <TableCellTitleBorder align="center" scope="col" colSpan={1}>
                                <Tooltip title={
                                    <span style={{fontSize: '1vw'}}>Excluir itens</span>
                                } arrow placement="bottom">
                                    <IconButton onClick={() => onDeleteAlunosTodos()}>
                                        <DeleteIcon sx={{color: '#ED3237'}}/>
                                    </IconButton>
                                </Tooltip>
                            </TableCellTitleBorder>
                        </TableRow>
                        <TableRow>
                            <TableCellBorder align="center">Nome</TableCellBorder>
                            <TableCell align="center">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRowSele key={index}>
                                <TableCellValueBorder component="th" scope="col">{row.nome}</TableCellValueBorder>
                                <TableCellValueBorder align="center">
                                    <Tooltip title={
                                        <span style={{fontSize: '1vw'}}>Excluir essa despessa</span>
                                    } arrow placement="bottom">
                                        <IconButton onClick={() => onDeleteAlunos(row._id)}>
                                            <DeleteIcon sx={{color: '#ED3237'}}/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCellValueBorder>
                            </TableRowSele>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCellTotal align="center" colSpan={6}>
                                <TextTotal>{rows.length}{rows.length === 1 ? ' aluno' : ' alunos'}</TextTotal>
                            </TableCellTotal>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        )
    } else {
        return null
    }
}