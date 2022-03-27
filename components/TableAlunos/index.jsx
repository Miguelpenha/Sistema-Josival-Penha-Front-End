import { TableContainer, TableCell, TableCellTitle, TableCellTotal, TextTotal, TableRowSele, TableCellValueBorder, TableCellBorder, IconButtonExclu, TableCellTitleBorder, LinkFotoAluno, FotoAluno, DialogGerarDeclaração, InputPorcentagemGerarDeclaração, ButtonSubmitGerarDeclaração, BolsistaSwitch } from './style'
import { Paper, Table, TableHead, TableRow, TableBody, TableFooter, Tooltip, Menu, MenuItem, Checkbox, DialogContent, SpeedDial, SpeedDialAction } from '@material-ui/core'
import LimitText from '../LimitText'
import { Delete as DeleteIcon, Download as DownloadIcon, Edit as EditIcon, Send as SendIcon, ListAlt as ListAltIcon, Paid as PaidIcon, Downloading as DownloadingIcon } from '@material-ui/icons'
import Link from 'next/link'
import { useState, memo } from 'react'
import api from '../../services/api/base'
import ContentModalEditAluno from '../pages/administrativo/alunos/ContentModalEditAluno/index.jsx'
import dinero from 'dinero.js'

dinero.globalLocale = 'pt-br'

function TableAlunos({ alunos=[], onDeleteAlunos, onDeleteAlunosTodos, bg, onDefaultFoto, onEditAluno }) {
    if (typeof alunos != 'string' && alunos) {
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
            const [openDialogGerarDeclaraçãoFinanceira, setOpenDialogGerarDeclaraçãoFinanceira] = useState(false)
            const [openDialogEditAluno, setOpenDialogEditAluno] = useState(false)

            let actions = []
            let bottom = 0

            if (row.foto.key === 'Padrão.jpg') {
                actions = [
                    {
                        icon: <DeleteIcon sx={{color: '#ED3237'}}/>,
                        name: 'Excluir aluno',
                        onClick: () => onDeleteAlunos(row._id),
                        background: '#FBD6D7'
                    },
                    {
                        icon: <DownloadIcon sx={{color: '#0872FC'}}/>,
                        name: 'Baixar declaração de frequência do aluno',
                        onClick: () => setOpenDialogGerarDeclaração(true),
                        background: '#A8CDFE'
                    },
                    {
                        icon: <DownloadIcon sx={{color: '#0872FC'}}/>,
                        name: 'Baixar declaração financeira do aluno',
                        onClick: () => setOpenDialogGerarDeclaraçãoFinanceira(true),
                        background: '#A8CDFE'
                    },
                    {
                        icon: <EditIcon sx={{color: '#0872FC'}}/>,
                        name: 'Editar aluno',
                        onClick: () => setOpenDialogEditAluno(true),
                        background: '#A8CDFE'
                    }
                ]

                bottom = 268
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
                        icon: <EditIcon sx={{color: '#0872FC'}}/>,
                        name: 'Editar aluno',
                        onClick: () => setOpenDialogEditAluno(true),
                        background: '#A8CDFE'
                    },
                    {
                        icon: <DownloadIcon sx={{color: '#0872FC'}}/>,
                        name: 'Baixar declaração de frequência do aluno',
                        onClick: () => setOpenDialogGerarDeclaração(true),
                        background: '#A8CDFE'
                    },
                    {
                        icon: <DownloadIcon sx={{color: '#0872FC'}}/>,
                        name: 'Baixar declaração financeira do aluno',
                        onClick: () => setOpenDialogGerarDeclaraçãoFinanceira(true),
                        background: '#A8CDFE'
                    }
                ]

                bottom = 325
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
                                <form method="POST" action={`${process.env.NEXT_STATIC_API_URL}/alunos/documents/declaration`}>
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
                                    <ButtonSubmitGerarDeclaração style={{marginBottom: '0%'}} type="submit" variant="contained"  onCLick={() => setOpenDialogGerarDeclaração(false)}>Gerar</ButtonSubmitGerarDeclaração>
                                </form>
                            </DialogContent>
                        </DialogGerarDeclaração>
                    )
                }

                return null
            }

            function ModelGerarDeclaraçãoFinanceira({ open }) {
                if (open) {
                    return (
                        <DialogGerarDeclaração open={true} onClose={() => setOpenDialogGerarDeclaraçãoFinanceira(false)}>
                            <DialogContent>
                                <form method="POST" action={`${process.env.NEXT_STATIC_API_URL}/alunos/documents/declaration-finance`}>
                                    <div style={{display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column'}}>
                                        <span style={{fontSize: '1vw', alignSelf: 'flex-start'}}>Ano da declaração</span>
                                        <InputPorcentagemGerarDeclaração name="ano" required placeholder="Ano da declaração" type="number" defaultValue={Number(new Date().toLocaleDateString('pt-br').split('/')[2])} variant="standard" fullWidth noTop/>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column'}}>
                                        <span style={{fontSize: '1vw', alignSelf: 'flex-start', marginTop: '5%'}}>Valor da mátricula</span>
                                        <InputPorcentagemGerarDeclaração name="mátricula" required placeholder="Valor da mátricula" type="text" defaultValue={dinero({ amount: Number(process.env.NEXT_STATIC_MATRICULA), currency: 'BRL' }).toFormat()} variant="standard" fullWidth noTop/>
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column'}}>
                                        <span style={{fontSize: '1vw', alignSelf: 'flex-start', marginTop: '5%'}}>Valor da mensalidade</span>
                                        <InputPorcentagemGerarDeclaração name="mensalidade" required placeholder="Valor da mensalidade" type="text" defaultValue={dinero({ amount: Number(process.env.NEXT_STATIC_MENSALIDADE), currency: 'BRL' }).toFormat()} variant="standard" fullWidth noTop/>
                                    </div>
                                    <input type="hidden" name="id" value={row._id}/>
                                    <input type="hidden" name="keyapi" value={process.env.NEXT_STATIC_API_KEY}/>
                                    <br/>
                                    <ButtonSubmitGerarDeclaração style={{marginBottom: '0%'}} type="submit" variant="contained" onCLick={() => setOpenDialogGerarDeclaraçãoFinanceira(false)}>Gerar</ButtonSubmitGerarDeclaração>
                                </form>
                            </DialogContent>
                        </DialogGerarDeclaração>
                    )
                }

                return null
            }

            function ModelEditAlunoBruto({ open }) {
                if (open) {
                    return (
                        <DialogGerarDeclaração open={true} onClose={() => setOpenDialogEditAluno(false)}>
                            <ContentModalEditAluno
                                aluno={row}
                                alunos={alunos}
                                onClose={() => {
                                    onEditAluno()
                                    setOpenDialogEditAluno(false)
                                }}
                            />
                        </DialogGerarDeclaração>
                    )
                }

                return null
            }

            const ModelEditAluno = memo(ModelEditAlunoBruto)
            
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
                <div style={{position: 'absolute', marginTop: -bottom}}>
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
                <ModelGerarDeclaraçãoFinanceira open={openDialogGerarDeclaraçãoFinanceira}/>
                <ModelEditAluno open={openDialogEditAluno}/>
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
                            <TableCellTitle align="center" scope="col" colSpan={5}>Alunos</TableCellTitle>
                            <TableCellTitleBorder align="center" scope="col" colSpan={3}>
                                <div style={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
                                    <Tooltip title={
                                        <span style={{fontSize: '1vw'}}>Excluir itens</span>
                                    } arrow placement="bottom">
                                        <IconButtonExclu bg="#FBD6D7" onClick={() => onDeleteAlunosTodos()}>
                                            <DeleteIcon sx={{color: '#ED3237'}}/>
                                        </IconButtonExclu>
                                    </Tooltip>
                                    <Tooltip title={
                                        <span style={{fontSize: '1vw'}}>Baixar planilha de alunos</span>
                                    } arrow placement="bottom">
                                        <form method="POST" action={`${process.env.NEXT_STATIC_API_URL}/alunos/exportar`} style={{display: 'inline-block'}}>
                                            <input type="hidden" name="keyapi" value={process.env.NEXT_STATIC_API_KEY}/>
                                            <IconButtonExclu type="submit" bg="#B5D5FE">
                                                <DownloadIcon sx={{color: '#0872FC'}}/>
                                            </IconButtonExclu>
                                        </form>
                                    </Tooltip>
                                    <Tooltip title={
                                        <span style={{fontSize: '1vw'}}>Enviar e-mail para o responsável</span>
                                    } arrow placement="bottom">
                                        <IconButtonExclu title="Enviar e-mail para o responsável" bg="#A8CDFE" component="a" href="/email/responsible">
                                            <SendIcon sx={{color: '#0872FC'}}/>
                                        </IconButtonExclu>
                                    </Tooltip>
                                    <Tooltip title={
                                        <span style={{fontSize: '1vw'}}>Ver boletim de aluno</span>
                                    } arrow placement="bottom">
                                        <IconButtonExclu title="Ver boletim de aluno" bg="#A8CDFE" component="a" href="/boletim">
                                            <ListAltIcon sx={{color: '#0872FC'}}/>
                                        </IconButtonExclu>
                                    </Tooltip>
                                    <Tooltip title={
                                        <span style={{fontSize: '1vw'}}>Baixar planilha de pagamentos dos alunos</span>
                                    } arrow placement="bottom">
                                        <form method="POST" action={`${process.env.NEXT_STATIC_API_URL}/alunos/documents/payments`} style={{display: 'inline-block'}}>
                                            <input type="hidden" name="keyapi" value={process.env.NEXT_STATIC_API_KEY}/>
                                            <IconButtonExclu type="submit" bg="#B5D5FE">
                                                <PaidIcon sx={{color: '#0872FC'}}/>
                                            </IconButtonExclu>
                                        </form>
                                    </Tooltip>
                                    <Tooltip title={
                                        <span style={{fontSize: '1vw'}}>Baixar planilha de aluno separada por turmas</span>
                                    } arrow placement="bottom">
                                        <form method="POST" action={`${process.env.NEXT_STATIC_API_URL}/alunos/exportar-por-turma`} style={{display: 'inline-block'}}>
                                            <input type="hidden" name="keyapi" value={process.env.NEXT_STATIC_API_KEY}/>
                                            <IconButtonExclu type="submit" bg="#B5D5FE">
                                                <DownloadingIcon sx={{color: '#0872FC'}}/>
                                            </IconButtonExclu>
                                        </form>
                                    </Tooltip>
                                </div>
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