import { TableContainer, TableCell, TableCellTitle, TableCellTotal, TextTotal, TableRowSele, TableCellValueBorder, TableCellBorder, IconButtonExclu, IconButtonMais, TableCellTitleBorder, LinkFotoAluno, FotoAluno, LimitText } from './style'
import { Paper, Table, TableHead, TableRow, TableBody, TableFooter, Tooltip, Menu, MenuItem, Checkbox } from '@material-ui/core'
import { Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@material-ui/icons'
import CheckAnimation from '../../animations/check'
import NotCheckAnimation from '../../animations/notCheck'
import Link from 'next/link'
import { useState } from 'react'
export default function TableAlunos({ alunos=[], onDeleteAlunos, onDeleteAlunosTodos }) {
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
            function clickCloseCadas() {
                setFechadoCadas(null)
            }
            const openCadas = Boolean(fechadoCadas)
            
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
                    <IconButtonExclu  style={{right: '10%'}} onClick={() => onDeleteAlunos(row._id)}>
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
                <MenuItem 
                    disableRipple 
                    style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}}
                    onClick={() => {
                        setFechadoCadas(false)
                    }}
                >
                    Transferência
                </MenuItem>
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
                                    <IconButtonExclu onClick={() => onDeleteAlunosTodos()}>
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