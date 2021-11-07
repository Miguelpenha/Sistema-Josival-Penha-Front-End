import { TableContainer, TableCellTitle, TableCellTotal, TextTotal, TableRowSele, TableCellValueBorder, TableCellBorder, IconButtonExclu, TableCellTitleBorder, LimitText, DialogTurma } from './style'
import { Paper, Table, TableHead, TableRow, TableBody, TableFooter, Tooltip, Checkbox, DialogContent, Skeleton } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { useState, memo } from 'react'
import TableAlunos from '../TableAlunos'
import { get } from '../../hooks'

function TableTurmas({ turmas, alunos, onDeleteTurmas, onDeleteTurmasTodos, setAlert, onDeleteAlunos, onDeleteAlunosTodos }) {
    if (typeof turmas != 'string' && turmas) {
        const [selecionados, setSelecionados] = useState([])
        turmas.map(turma => turma.criacao.sistema = new Date(turma.criacao.sistema))
        
        let rows = turmas
        
        function sortDate(a, b) {
            return b.criacao.sistema - a.criacao.sistema
        }
        
        rows.sort(sortDate)

        function Row({row, index}) {
            const [openDialogTurma, setOpenDialogTurma] = useState(false)

            function clickSele(id) {
                let index = selecionados.indexOf(id)
                if (index === -1) {
                    selecionados.push(id)
                    setSelecionados(selecionados)
                } else {
                    let newSelecionados = selecionados.map(selecionado => selecionado != id && selecionado)
                }

                //setOpenDialogTurma(true)
            }

            function ModelTurma({ open }) {
                const { data: alunos, mutate: mutateAlunos } = get(`/turmas/alunos/${row._id}`)

                if (open) {
                    return (
                        <DialogTurma open={true} onClose={() => setOpenDialogTurma(false)} maxWidth="lg">
                            <DialogContent>
                            {alunos ? <TableAlunos
                                        bg="#f0f0f0"
                                        setAlert={setAlert}
                                        alunos={alunos && alunos}
                                        onDeleteAlunos={onDeleteAlunos}
                                        onDeleteAlunosTodos={onDeleteAlunosTodos}
                                    /> : <Skeleton variant="rectangular" width={`85.5%`} height={`50%`} style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', borderRadius: '20px', marginTop: '5%'}} animation="wave"/>}
                            </DialogContent>
                        </DialogTurma>
                    )
                }

                return null
            }

            return (
                <>
                    <TableRowSele key={index} onClick={() => clickSele(row._id)}>
                        <TableCellValueBorder component="th" scope="col" align="center">
                            <Checkbox sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}/>
                        </TableCellValueBorder>
                        <TableCellValueBorder component="th" scope="col" align="center">
                            <LimitText limit={16}>{row.nome}</LimitText>
                        </TableCellValueBorder>
                        <TableCellValueBorder component="th" scope="col" align="center">{row.alunos}</TableCellValueBorder>
                        <TableCellValueBorder component="th" scope="col" align="center">{row.professora}</TableCellValueBorder>
                        <TableCellValueBorder component="th" scope="col" align="center">{row.serie}</TableCellValueBorder>
                        <TableCellValueBorder component="th" scope="col" align="center">{row.turno}</TableCellValueBorder>
                        <TableCellValueBorder align="center">
                            <Tooltip  title={
                                <span style={{fontSize: '1vw'}}>Excluir essa turma</span>
                            } arrow placement="bottom">
                                <IconButtonExclu onClick={() => onDeleteTurmas(row._id)}>
                                    <DeleteIcon sx={{color: '#ED3237'}}/>
                                </IconButtonExclu>
                            </Tooltip>       
                        </TableCellValueBorder>
                    </TableRowSele>
                    <ModelTurma open={openDialogTurma}/>
                </>
            )
        }
        
        return (
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCellTitle align="center" scope="col" colSpan={6}>Turmas</TableCellTitle>
                            <TableCellTitleBorder align="center" scope="col" colSpan={1}>
                                <Tooltip title={
                                    <span style={{fontSize: '1vw'}}>Excluir turmas</span>
                                } arrow placement="bottom">
                                    <IconButtonExclu onClick={() => onDeleteTurmasTodos()}>
                                        <DeleteIcon sx={{color: '#ED3237'}}/>
                                    </IconButtonExclu>
                                </Tooltip>
                            </TableCellTitleBorder>
                        </TableRow>
                        <TableRow>
                            <TableCellBorder>
                                <Checkbox sx={{'& .MuiSvgIcon-root': {fontSize: 24}}}/>
                            </TableCellBorder>
                            <TableCellBorder align="center">Nome</TableCellBorder>
                            <TableCellBorder align="center">Alunos</TableCellBorder>
                            <TableCellBorder align="center">Professora</TableCellBorder>
                            <TableCellBorder align="center">Série</TableCellBorder>
                            <TableCellBorder align="center">Turno</TableCellBorder>
                            <TableCellBorder align="center">Opções</TableCellBorder>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <Row key={index} row={row} index={index}/>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCellTotal align="center" colSpan={7}>
                                <TextTotal>{rows.length}{rows.length === 1 ? ' turma' : ' turmas'}</TextTotal>
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

export default memo(TableTurmas)