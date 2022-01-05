import { TableContainer, TableCell, TableCellTitle, TableCellTotal, TextTotal, TableRowSele, TableCellValueBorder, TableCellBorder, IconButtonExclu, TableCellTitleBorder, LinkFotoAluno, FotoAluno, DialogGerarDeclaração, InputPorcentagemGerarDeclaração, ButtonSubmitGerarDeclaração, BolsistaSwitch } from './style'
import { Paper, Table, TableHead, TableRow, TableBody, TableFooter, Tooltip, Menu, MenuItem, Checkbox, DialogContent, SpeedDial, SpeedDialAction } from '@material-ui/core'
import LimitText from '../LimitText'
import { Delete as DeleteIcon, Download as DownloadIcon, Edit as EditIcon, Send as SendIcon } from '@material-ui/icons'
import Link from 'next/link'
import { useState, memo } from 'react'
import api from '../../services/api/base'
import { useRouter } from 'next/router'

function TableAlunos({ alunos=[], onDeleteAlunos, onDeleteAlunosTodos, bg, onDefaultFoto }) {
    if (typeof alunos != 'string' && alunos) {
        const router = useRouter()

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

        function Row({row, index}) {
            const [fechadoCadas, setFechadoCadas] = useState(null)
            const [openDialogGerarDeclaração, setOpenDialogGerarDeclaração] = useState(false)

            let actions = []

            if (row.foto.key === 'Padrão.jpg') {
                actions = [
                    {
                        icon: <DeleteIcon sx={{color: '#ED3237'}}/>,
                        name: 'Excluir aluno',
                        onClick: () => onDeleteAlunos(row._id),
                        background: '#FBD6D7'
                    },
                    {
                        icon: <SendIcon sx={{color: '#0872FC'}}/>,
                        name: 'Enviar e-mail para o responsável',
                        onClick: () => router.push(`/email/responsible/${row._id}`),
                        background: '#A8CDFE'
                    },
                    {
                        icon: <DownloadIcon sx={{color: '#0872FC'}}/>,
                        name: 'Baixar declaração de frequência do aluno',
                        onClick: () => setOpenDialogGerarDeclaração(true),
                        background: '#A8CDFE'
                    }
                ]
            } else {
                actions = [
                    {
                        icon: <DeleteIcon sx={{color: '#ED3237'}}/>,
                        name: 'Excluir aluno',
                        onClick: () => onDeleteAlunos(row._id),
                        background: '#FBD6D7'
                    },
                    {
                        icon: <DeleteIcon sx={{color: '#ED3237'}}/>,
                        name: 'Excluir foto do aluno',
                        onClick: () => api.patch('alunos/fotos/default', { id: row._id }).then(() => onDefaultFoto()),
                        background: '#FBD6D7'
                    },
                    {
                        icon: <DownloadIcon sx={{color: '#0872FC'}}/>,
                        name: 'Baixar declaração de frequência do aluno',
                        onClick: () => setOpenDialogGerarDeclaração(true),
                        background: '#A8CDFE'
                    },
                    {
                        icon: <SendIcon sx={{color: '#0872FC'}}/>,
                        name: 'Enviar e-mail para o responsável',
                        onClick: () => router.push(`/email/responsible/${row._id}`),
                        background: '#A8CDFE'
                    }
                ]
            }

            function clickCloseCadas() {
                setFechadoCadas(null)
            }

            const openCadas = Boolean(fechadoCadas)

            function ModelGerarDeclaração({ open }) {
                if (open) {
                    return (
                        <DialogGerarDeclaração open={true} onClose={() => setOpenDialogGerarDeclaração(false)}>
                            <DialogContent>
                                <form method="POST" target="_blank" action={`${process.env.NEXT_STATIC_API_URL}/alunos/documents/declaration`}>
                                    <InputPorcentagemGerarDeclaração name="frequencia" required placeholder="Porcentagem de aulas sem faltas" type="number" InputProps={{
                                        inputProps: {
                                            max: 100,
                                            min: 0
                                        }
                                    }} defaultValue={98} variant="standard"/>
                                    <span style={{fontSize: '0.8vw'}}>Porcentagem de aulas sem faltas</span>
                                    <input type="hidden" name="id" value={row._id}/>
                                    <input type="hidden" name="keyapi" value={process.env.NEXT_STATIC_API_KEY}/>
                                    <br/>
                                    <BolsistaSwitch name="bolsista"/>Bolsista
                                    <ButtonSubmitGerarDeclaração style={{marginBottom: '0%'}} type="submit" variant="contained">Gerar</ButtonSubmitGerarDeclaração>
                                </form>
                            </DialogContent>
                        </DialogGerarDeclaração>
                    )
                }

                return null
            }
            
            return <TableRowSele key={index}>
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
                {row.responsável2 && <>
                    <hr color="#cecece"/>
                    <span>
                        <LimitText limit={16}>{row.responsável2}</LimitText>
                    </span>
                </>}
            </TableCellValueBorder>
            <TableCellValueBorder component="th" scope="col" align="center">{row.nascimento} ({calcIdade(row.nascimento, new Date())} anos)</TableCellValueBorder>
            <TableCellValueBorder component="th" scope="col" align="center">{row.situação}</TableCellValueBorder>
            <TableCellValueBorder align="center">
                <div style={{position: 'relative', bottom: row.foto.key === 'Padrão.jpg' ? 210 : 270}}>
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{position: 'absolute'}}
                        icon={<EditIcon sx={{width: '40%', height: 'auto'}}/>}
                    >
                        {actions.map(action => (
                            <SpeedDialAction
                                tooltipOpen
                                key={action.name}
                                icon={action.icon}
                                tooltipPlacement="left"
                                onClick={action.onClick}
                                tooltipTitle={action.name}
                                sx={{
                                    '& .MuiSpeedDialAction-staticTooltipLabel': {
                                        backgroundColor: '#0872FC',
                                        color: '#ffffff',
                                        width: 'max-content',
                                        fontSize: '1vw'
                                    },
                                    '& .MuiSpeedDialAction-fab, & .MuiSpeedDialAction-fab:hover': {
                                        backgroundColor: action.background ? action.background :'#0872FC',
                                        color: '#ffffff'
                                    },
                                    '& .MuiSpeedDialAction-fab:hover': {
                                        opacity: '85%'
                                    },
                                    '& svg': {
                                        width: '70%',
                                        height: 'auto'
                                    }
                                }}
                            />
                        ))}
                    </SpeedDial>
                </div>
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
                    <span style={{fontSize: '1vw'}}>Baixar declaração do aluno</span>
                } arrow placement="bottom">
                    <MenuItem 
                        disableRipple 
                        style={{height: '40%', width: '100%', fontSize: '1.2vw', color: '#C6C6C6'}}
                        onClick={() => {
                            setFechadoCadas(false)
                            setOpenDialogGerarDeclaração(true)
                        }}
                    >
                        <IconButtonExclu style={{marginRight: '3%'}} bg="#B5D5FE">
                            <DownloadIcon sx={{color: '#0872FC'}}/>
                        </IconButtonExclu>
                        Baixar declaração do aluno
                    </MenuItem>
                </Tooltip>
            </Menu>
        </TableRowSele>
        }
        
        return (
            <TableContainer component={Paper} sx={{backgroundColor: bg && bg}}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <TableCellTitle align="center" scope="col" colSpan={6}>Alunos</TableCellTitle>
                            <TableCellTitleBorder align="center" scope="col" colSpan={2}>
                                <Tooltip title={
                                    <span style={{fontSize: '1vw'}}>Excluir itens</span>
                                } arrow placement="bottom">
                                    <IconButtonExclu style={{right: '10%'}} bg="#FBD6D7" onClick={() => onDeleteAlunosTodos()}>
                                        <DeleteIcon sx={{color: '#ED3237'}}/>
                                    </IconButtonExclu>
                                </Tooltip>
                                <Tooltip title={
                                    <span style={{fontSize: '1vw'}}>Baixar planilha</span>
                                } arrow placement="bottom">
                                    <form method="POST" action={`${process.env.NEXT_STATIC_API_URL}/alunos/exportar`} style={{display: 'inline-block'}}>
                                        <input type="hidden" name="keyapi" value={process.env.NEXT_STATIC_API_KEY}/>
                                        <IconButtonExclu type="submit" style={{left: '5%'}} bg="#B5D5FE">
                                            <DownloadIcon sx={{color: '#0872FC'}}/>
                                        </IconButtonExclu>
                                    </form>
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
                            <Row key={index} row={row} index={index}/>
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

export default memo(TableAlunos)