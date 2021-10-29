import { TableContainer, TableCell, TableCellTitle, TableCellTotal, TextTotal, TableRowSele, TableCellValueBorder, TableCellBorder, IconButtonExclu, IconButtonMais, TableCellTitleBorder, LinkFotoAluno, FotoAluno, LimitText, DialogGerarDeclaração, InputPorcentagemGerarDeclaração, ButtonSubmitGerarDeclaração, InputNIS } from './style'
import { Paper, Table, TableHead, TableRow, TableBody, TableFooter, Tooltip, Menu, MenuItem, Checkbox, DialogContent } from '@material-ui/core'
import { Delete as DeleteIcon, MoreVert as MoreVertIcon, Download as DownloadIcon } from '@material-ui/icons'
import CheckAnimation from '../../animations/check'
import NotCheckAnimation from '../../animations/notCheck'
import Link from 'next/link'
import { useState } from 'react'

export default function TableAlunos({ alunos=[], onDeleteAlunos, onDeleteAlunosTodos, setAlert }) {
    if (typeof alunos != 'string' && alunos) {
        const [selecionados, setSelecionados] = useState(['asd'])
        alunos.map(aluno => aluno.criação.sistema = new Date(aluno.criação.sistema))

        let rows = alunos
        
        function sortDate(a, b) {
            return b.criação.sistema - a.criação.sistema
        }
        
        rows.sort(sortDate)

        function calcIdade(nascimento='', hoje) {
            nascimento = new Date(`${nascimento.split('/')[2]}-${nascimento.split('/')[1]}-${nascimento.split('/')[0]}`)
            return Math.floor(Math.ceil(Math.abs(nascimento.getTime()-hoje.getTime())/(1000*3600*24))/365.25)
        }

        function clickSele(id) {
            let index = selecionados.indexOf(id)
            console.log(index)
            if (index === -1) {
                selecionados.push(id)
                setSelecionados(selecionados)
                console.log(selecionados)
            } else {
                let newSelecionados = selecionados.map(selecionado => selecionado != id && selecionado)
                console.log(newSelecionados)
            }
        }

        function Row({row, index}) {
            const [fechadoCadas, setFechadoCadas] = useState(null)
            const [openDialogGerarDeclaração, setOpenDialogGerarDeclaração] = useState(false)

            function clickCloseCadas() {
                setFechadoCadas(null)
            }

            const openCadas = Boolean(fechadoCadas)

            function ModelGerarDeclaração({ open }) {
                if (open) {
                    return (
                        <DialogGerarDeclaração open={true} onClose={() => setOpenDialogGerarDeclaração(false)}>
                            <DialogContent>
                                <form method="POST" target="_blank" action="http://localhost:3000/api/alunos/exportar">
                                    <InputPorcentagemGerarDeclaração name="frequencia" required placeholder="Porcentagem de aulas sem faltas" type="number" InputProps={{
                                        inputProps: {
                                            max: 100,
                                            min: 0
                                        }
                                    }} defaultValue={98} variant="standard"/>
                                    <span style={{fontSize: '0.8vw'}}>Porcentagem de aulas sem faltas</span>
                                    <InputNIS name="nis" required placeholder="Número de Identificação Social (NIS)" type="text" InputProps={{
                                        inputProps: {
                                            max: 100,
                                            min: 0
                                        }
                                    }} variant="standard"/>
                                    <span style={{fontSize: '0.8vw'}}>Número de Identificação Social (NIS)</span>
                                    <input type="hidden" name="id" value={row._id}/>
                                    <ButtonSubmitGerarDeclaração style={{marginBottom: '0%'}} type="submit" variant="contained">Gerar</ButtonSubmitGerarDeclaração>
                                </form>
                            </DialogContent>
                        </DialogGerarDeclaração>
                    )
                }
                return null
            }
            
            return <TableRowSele key={index} onClick={() => clickSele(row._id)}>
                <TableCellValueBorder component="th" scope="col" align="center">
                    <Checkbox sx={{'& .MuiSvgIcon-root': {fontSize: 20}}}/>
                </TableCellValueBorder>
            <TableCellValueBorder component="th" scope="col" align="center">
                <Link href={row.foto.url} passHref>
                    <LinkFotoAluno target="_blank">
                        <FotoAluno src={row.foto.url} width="60" height="60"/>
                    </LinkFotoAluno>
                </Link>
            </TableCellValueBorder>
            <TableCellValueBorder component="th" scope="col" align="center">
                <LimitText limit={16}>{row.nome}</LimitText>
            </TableCellValueBorder>
            <TableCellValueBorder component="th" scope="col" align="center">{row.turma}</TableCellValueBorder>
            <TableCellValueBorder component="th" scope="col" align="center">
                <span>
                    <LimitText limit={16}>{row.responsável1}</LimitText>
                </span>
                <hr color="#cecece"/>
                <span>
                    <LimitText limit={16}>{row.responsável2}</LimitText>
                </span>
            </TableCellValueBorder>
            <TableCellValueBorder component="th" scope="col" align="center">{row.nascimento} ({calcIdade(row.nascimento, new Date())} anos)</TableCellValueBorder>
            <TableCellValueBorder component="th" scope="col" align="center">{row.situação}</TableCellValueBorder>
            <TableCellValueBorder align="center">
                <Tooltip title={
                    <span style={{fontSize: '1vw'}}>Excluir essa despessa</span>
                } arrow placement="bottom">
                    <IconButtonExclu bg="#FBD6D7" style={{right: '10%'}} onClick={() => onDeleteAlunos(row._id)}>
                        <DeleteIcon sx={{color: '#ED3237'}}/>
                    </IconButtonExclu>
                </Tooltip>
                <Tooltip title={
                    <span style={{fontSize: '1vw'}}>Mais opções</span>
                } arrow placement="bottom">
                    <IconButtonMais style={{left: '10%'}} onClick={event => setFechadoCadas(event.currentTarget)}>
                        <MoreVertIcon sx={{color: '#ffffff'}}/>
                    </IconButtonMais>
                </Tooltip>
                <ModelGerarDeclaração open={openDialogGerarDeclaração}/>
            </TableCellValueBorder>
            <Menu
                anchorEl={fechadoCadas} 
                open={openCadas} 
                onClose={clickCloseCadas}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}
                style={{height: '62%', width: '32%'}}
            >
                <Tooltip title={
                        <span style={{fontSize: '1vw'}}>Baixar planilha de alunos</span>
                } arrow placement="bottom">
                    <MenuItem 
                        disableRipple 
                        style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}}
                        onClick={() => {
                            setFechadoCadas(false)
                            setOpenDialogGerarDeclaração(true)
                        }}
                    >
                        <IconButtonExclu style={{marginRight: '3%'}} bg="#0872fc5a">
                            <DownloadIcon sx={{color: '#0872FC'}}/>
                        </IconButtonExclu>
                        Baixar declaração do aluno
                    </MenuItem>
                </Tooltip>
            </Menu>
        </TableRowSele>
        }
        
        return (
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCellTitle align="center" scope="col" colSpan={7}>Alunos</TableCellTitle>
                            <TableCellTitleBorder align="center" scope="col" colSpan={1}>
                                <Tooltip title={
                                    <span style={{fontSize: '1vw'}}>Excluir itens</span>
                                } arrow placement="bottom">
                                    <IconButtonExclu style={{right: '10%'}} bg="#FBD6D7" onClick={() => onDeleteAlunosTodos()}>
                                        <DeleteIcon sx={{color: '#ED3237'}}/>
                                    </IconButtonExclu>
                                </Tooltip>
                            </TableCellTitleBorder>
                        </TableRow>
                        <TableRow>
                            <TableCellBorder>
                                <Checkbox sx={{'& .MuiSvgIcon-root': {fontSize: 24}}}/>
                            </TableCellBorder>
                            <TableCellBorder align="center">Foto</TableCellBorder>
                            <TableCellBorder align="center">Nome</TableCellBorder>
                            <TableCellBorder align="center">Turma</TableCellBorder>
                            <TableCellBorder align="center">Responsáveis</TableCellBorder>
                            <TableCellBorder align="center">Nascimento</TableCellBorder>
                            <TableCellBorder align="center">Situação</TableCellBorder>
                            <TableCell align="center">Opções</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <Row row={row} index={index}/>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCellTotal align="center" colSpan={8}>
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