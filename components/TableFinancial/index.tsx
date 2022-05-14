import { Ireceita, Idespesa } from '../../types'
import { FC, useState, ChangeEvent } from 'react'
import { ContainerHeaderOptions, ContainerOptionFindName, IconOptionFindName, InputOptionsFindName, ContainerOptionMonth, SelectMonth, IconOptionMonth, ContainerOptionStatus, SelectStatus, IconOptionStatus, Table, Header, HeaderRow, HeaderCellTitle, Body, BodyRow, BodyCell, ContainerName, IconName, ContainerStatus, TextStatus, ContainerIconMore, IconMore } from './style'
import ModalReceitaOrDespesa from '../ModalReceitaOrDespesa'
import ModalEditReceitaOrDespesa from '../ModalEditReceitaOrDespesa'
import { Menu, MenuItem } from '@material-ui/core'
import { Edit as IconEdit } from '@material-ui/icons'

interface Iprops {
    receitas: Ireceita[]
    despesas: Idespesa[]
    month: string
    onEdit: Function
}

const TableFinanceiro: FC<Iprops> = ({ receitas, despesas, month, onEdit }) => {
    const [open, setOpen] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [copyTextInfo, setCopyTextInfo] = useState(false)
    const [receitaOrDespesaModal, setReceitaOrDespesaModal] = useState<Ireceita | Idespesa>()
    const [anchorElAddOptions, setAnchorElAddOptions] = useState(false)
    const openAddOptions = Boolean(anchorElAddOptions)
    const handleClickAddOptions = ev => setAnchorElAddOptions(ev.currentTarget)
    const handleCloseAddOptions = () => setAnchorElAddOptions(false)
    const [find, setFind] = useState('')
    const [monthFind, setMonthFind] = useState(new Date().toLocaleDateString().split('/')[1])
    const [status, setStatus] = useState<'Pago' | 'Aguardando' | 'Atrasado' | 'Full'>('Full')
    
    function copyInfo(ev, text) {
        navigator.clipboard.writeText(text || ev.currentTarget.innerText)

        setCopyTextInfo(true)

        setInterval(() => setCopyTextInfo(false), 5000)
    }

    function veriPago(receitaOrDespesa: Ireceita | Idespesa): 'Pago' | 'Atrasado' | 'Aguardando' {
        if (!receitaOrDespesa.fixa) {
            if (receitaOrDespesa.pago) {
                return 'Pago'
            } else {
                const mêsAtual = Number(new Date().toLocaleString().split('/')[1])
                const mêsVencimento = Number(!receitaOrDespesa.fixa ? receitaOrDespesa.data.split('/')[1] : receitaOrDespesa.months[String(new Date().toLocaleString().split('/')[1])])
        
                if (mêsVencimento >= mêsAtual) {
                    if (mêsVencimento === mêsAtual) {
                        const diaAtual = Number(new Date().toLocaleString().split('/')[0])
                        const diaVencimento = Number(!receitaOrDespesa.fixa ? receitaOrDespesa.data.split('/')[0] : receitaOrDespesa.fixaDay)
                        
                        if (diaVencimento >= diaAtual) {                
                            return 'Aguardando'
                        } else {
                            return 'Atrasado'
                        }
                    } else {
                        return 'Aguardando'
                    }
                } else {
                    return 'Atrasado'
                }
            }
        } else {
            if (receitaOrDespesa.months[monthFind].pago) {
                return 'Pago'
            } else {
                const mêsAtual = Number(monthFind)
                const mêsVencimento = Number(!receitaOrDespesa.fixa ? receitaOrDespesa.data.split('/')[1] : receitaOrDespesa.months[String(new Date().toLocaleString().split('/')[1])])
                
                if (mêsVencimento >= mêsAtual) {
                    if (mêsVencimento === mêsAtual) {
                        const diaAtual = Number(new Date().toLocaleString().split('/')[0])
                        const diaVencimento = Number(!receitaOrDespesa.fixa ? receitaOrDespesa.data.split('/')[0] : receitaOrDespesa.fixaDay)
                        
                        if (diaVencimento >= diaAtual) {                
                            return 'Aguardando'
                        } else {
                            return 'Atrasado'
                        }
                    } else {
                        return 'Aguardando'
                    }
                } else {
                    return 'Atrasado'
                }
            }
        }
    }  
    
    return <>
        <ModalReceitaOrDespesa
            open={open}
            copyInfo={copyInfo}
            copyTextInfo={copyTextInfo}
            onClose={() => setOpen(false)}
            receitaOrDespesa={receitaOrDespesaModal}
        />
        <ModalEditReceitaOrDespesa
            month={monthFind}
            onEdit={onEdit}
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            receitaOrDespesa={receitaOrDespesaModal}
        />
        <Menu
            open={openAddOptions}
            onClose={handleCloseAddOptions}
            anchorEl={anchorElAddOptions as unknown as Element}
            PaperProps={{
                style: {
                    transform: 'translateX(-80%) translateY(-90%)'
                }
            }}
            sx={{
                '.MuiMenu-paper': {
                    backgroundColor: '#0872FC',
                    borderRadius: '10px',
                    color: '#ffffff'
                }
            }}
        >
            <MenuItem
                onClick={() => {
                    handleCloseAddOptions()
                    setOpenEdit(true)
                }}
                sx={{fontSize: '1.5vw'}}
            >
                <IconEdit fontSize="large" sx={{color: '#ffffff', borderRadius: '50%', fontSize: '2.5vw', paddingRight: '10%'}}/>
                <span style={{paddingRight: '40%'}}>Editar</span>
            </MenuItem>
        </Menu>
        <ContainerHeaderOptions>
            <ContainerOptionFindName>
                <IconOptionFindName xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
                    <path d="M39.8 41.95 26.65 28.8Q25.15 30.1 23.15 30.825Q21.15 31.55 18.9 31.55Q13.5 31.55 9.75 27.8Q6 24.05 6 18.75Q6 13.45 9.75 9.7Q13.5 5.95 18.85 5.95Q24.15 5.95 27.875 9.7Q31.6 13.45 31.6 18.75Q31.6 20.9 30.9 22.9Q30.2 24.9 28.8 26.65L42 39.75ZM18.85 28.55Q22.9 28.55 25.75 25.675Q28.6 22.8 28.6 18.75Q28.6 14.7 25.75 11.825Q22.9 8.95 18.85 8.95Q14.75 8.95 11.875 11.825Q9 14.7 9 18.75Q9 22.8 11.875 25.675Q14.75 28.55 18.85 28.55Z"/>
                </IconOptionFindName>
                <InputOptionsFindName value={find} placeholder="Pesquisar" onChange={ev => setFind(ev.target.value)}/>
            </ContainerOptionFindName>
            <ContainerOptionMonth>
                <SelectMonth value={monthFind} onChange={(ev: ChangeEvent<HTMLInputElement>) => setMonthFind(ev.target.value)}>
                    <MenuItem value="full">Mostrar todos os meses</MenuItem>
                    <MenuItem value="01">Janeiro</MenuItem>
                    <MenuItem value="02">Fevereiro</MenuItem>
                    <MenuItem value="03">Março</MenuItem>
                    <MenuItem value="04">Abril</MenuItem>
                    <MenuItem value="05">Maio</MenuItem>
                    <MenuItem value="06">Junho</MenuItem>
                    <MenuItem value="07">Julho</MenuItem>
                    <MenuItem value="08">Agosto</MenuItem>
                    <MenuItem value="09">Setembro</MenuItem>
                    <MenuItem value="10">Outubro</MenuItem>
                    <MenuItem value="11">Novembro</MenuItem>
                    <MenuItem value="12">Dezembro</MenuItem>
                </SelectMonth>
                <IconOptionMonth xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45">
                    <path d="M8.85 44.75Q7.4 44.75 6.3 43.65Q5.2 42.55 5.2 41.1V9.8Q5.2 8.35 6.3 7.25Q7.4 6.15 8.85 6.15H11.3V3.25H15.2V6.15H32.8V3.25H36.7V6.15H39.15Q40.6 6.15 41.7 7.25Q42.8 8.35 42.8 9.8V41.1Q42.8 42.55 41.7 43.65Q40.6 44.75 39.15 44.75ZM8.85 41.1H39.15Q39.15 41.1 39.15 41.1Q39.15 41.1 39.15 41.1V19H8.85V41.1Q8.85 41.1 8.85 41.1Q8.85 41.1 8.85 41.1ZM8.85 15.35H39.15V9.8Q39.15 9.8 39.15 9.8Q39.15 9.8 39.15 9.8H8.85Q8.85 9.8 8.85 9.8Q8.85 9.8 8.85 9.8ZM8.85 15.35V9.8Q8.85 9.8 8.85 9.8Q8.85 9.8 8.85 9.8Q8.85 9.8 8.85 9.8Q8.85 9.8 8.85 9.8V15.35Z"/>
                </IconOptionMonth>
            </ContainerOptionMonth>
            <ContainerOptionStatus>
                <SelectStatus value={status} onChange={(ev: ChangeEvent<HTMLInputElement>) => 
                    setStatus(ev.target.value as ('Pago' | 'Aguardando' | 'Atrasado' | 'Full'))
                }>
                    <MenuItem value="Full">Mostrar todos os status</MenuItem>
                    <MenuItem value="Pago">Pago</MenuItem>
                    <MenuItem value="Aguardando">Aguardando</MenuItem>
                    <MenuItem value="Atrasado">Atrasado</MenuItem>
                </SelectStatus>
                <IconOptionStatus xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" colorType={status}>
                    <path d="M39 22.5Q38.45 17.2 34.675 13.425Q30.9 9.65 25.6 9.2V3.9Q33.05 4.45 38.325 9.725Q43.6 15 44.15 22.5ZM25.6 44.05V38.7Q30.9 38.3 34.65 34.55Q38.4 30.8 39 25.5H44.15Q43.6 33 38.35 38.275Q33.1 43.55 25.6 44.05ZM22.6 44.05Q14.6 43.45 9.225 37.675Q3.85 31.9 3.85 24Q3.85 16.05 9.225 10.3Q14.6 4.55 22.6 3.95V9.25Q16.85 9.8 12.95 14Q9.05 18.2 9.05 24Q9.05 29.8 12.95 34Q16.85 38.2 22.6 38.7Z"/>
                </IconOptionStatus>
            </ContainerOptionStatus>
        </ContainerHeaderOptions>
        <Table cellPadding="0" cellSpacing="0">
            <Header>
                <HeaderRow>
                    <HeaderCellTitle align="left" first colSpan={2}>Nome</HeaderCellTitle>
                    <HeaderCellTitle align="left">Status</HeaderCellTitle>
                    <HeaderCellTitle align="left">Vencimento</HeaderCellTitle>
                    <HeaderCellTitle align="left">Valor</HeaderCellTitle>
                    <HeaderCellTitle align="right" last>Ações</HeaderCellTitle>
                </HeaderRow>
            </Header>
            <Body>
                {receitas.map(receita => {
                    if (receita.nome.toUpperCase().includes(find.toUpperCase())) {
                        if (status === 'Full' || veriPago(receita) === status) {
                            if (!receita.fixa ? monthFind === 'full' ? true : monthFind === receita.data.split('/')[1] : true) {
                                return (
                                    <BodyRow onClick={() => {
                                        setReceitaOrDespesaModal(receita)
                                        setOpen(true)
                                    }}>
                                        <BodyCell first colSpan={2}>
                                            <ContainerName>
                                                {receita.auto ? (
                                                    <IconName
                                                        viewBox="0 0 45 45"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        colorType="receita"
                                                    >
                                                        <path d="M32.85 9.6 24.75 17.7 22.35 15.35 25.7 11.95H23.75Q18.9 11.95 15.375 15.525Q11.85 19.1 11.85 24Q11.85 25.6 12.175 27Q12.5 28.4 13.05 29.6L9.75 32.9Q8.35 30.85 7.75 28.625Q7.15 26.4 7.15 24Q7.15 17.25 12.05 12.25Q16.95 7.25 23.65 7.25H25.8L22.4 3.8L24.75 1.45ZM15.05 38.6 23.15 30.4 25.55 32.8 22.1 36.2H24.25Q29.1 36.2 32.625 32.625Q36.15 29.05 36.15 24.1Q36.15 22.55 35.825 21.15Q35.5 19.75 34.9 18.55L38.25 15.25Q39.6 17.35 40.225 19.55Q40.85 21.75 40.85 24.1Q40.85 30.9 35.95 35.925Q31.05 40.95 24.4 40.95H22.1L25.55 44.35L23.15 46.7Z"/>
                                                    </IconName>
                                                ) : (
                                                    <IconName xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" colorType="receita">
                                                        <path d="M6.35 36.85 2.95 33.5 18.8 17.75 27.15 26.1 37.1 16.1H31.15V11.4H45.05V25.25H40.4V19.5L27.1 32.8L18.75 24.45Z"/>
                                                    </IconName>
                                                )}
                                                {receita.nome}
                                            </ContainerName>
                                        </BodyCell>
                                        <BodyCell>
                                            <ContainerStatus colorType={veriPago(receita)}>
                                                <TextStatus>{veriPago(receita)}</TextStatus>
                                            </ContainerStatus>
                                        </BodyCell>
                                        <BodyCell>{receita.data ? receita.data : `${receita.fixaDay}/${monthFind==='full' ? new Date().toLocaleDateString().split('/')[1] : monthFind}/${new Date().toLocaleDateString().split('/')[2]}`}</BodyCell>
                                        <BodyCell>{receita.fixa ? receita.months[monthFind].preco : receita.preco}</BodyCell>
                                        <BodyCell>
                                            <ContainerIconMore onClick={ev => {
                                                ev.stopPropagation()
                                                ev.cancelable=true
                                                setReceitaOrDespesaModal(receita)
                                                handleClickAddOptions(ev)
                                            }}>
                                                <IconMore xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                                                    <path d="M20 35Q18.75 35 17.896 34.125Q17.042 33.25 17.042 32.042Q17.042 30.792 17.896 29.896Q18.75 29 20 29Q21.25 29 22.104 29.896Q22.958 30.792 22.958 32.042Q22.958 33.25 22.104 34.125Q21.25 35 20 35ZM20 22.958Q18.75 22.958 17.896 22.104Q17.042 21.25 17.042 20Q17.042 18.75 17.896 17.896Q18.75 17.042 20 17.042Q21.25 17.042 22.104 17.896Q22.958 18.75 22.958 20Q22.958 21.25 22.104 22.104Q21.25 22.958 20 22.958ZM20 11Q18.75 11 17.896 10.104Q17.042 9.208 17.042 7.958Q17.042 6.708 17.896 5.833Q18.75 4.958 20 4.958Q21.25 4.958 22.104 5.833Q22.958 6.708 22.958 7.958Q22.958 9.208 22.104 10.104Q21.25 11 20 11Z"/>
                                                </IconMore>
                                            </ContainerIconMore>
                                        </BodyCell>
                                    </BodyRow>
                                )
                            }
                        }
                    }
                })}
                {despesas.map(despesa => {
                    if (despesa.nome.toUpperCase().includes(find.toUpperCase())) {
                        if (status === 'Full' || veriPago(despesa) === status) {
                            return (
                                <BodyRow onClick={() => {
                                    setReceitaOrDespesaModal(despesa)
                                    setOpen(true)
                                }}>
                                    <BodyCell first colSpan={2}>
                                        <ContainerName>
                                            {despesa.auto ? (
                                                <IconName
                                                    viewBox="0 0 45 45"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    colorType="despesa"
                                                >
                                                    <path d="M32.85 9.6 24.75 17.7 22.35 15.35 25.7 11.95H23.75Q18.9 11.95 15.375 15.525Q11.85 19.1 11.85 24Q11.85 25.6 12.175 27Q12.5 28.4 13.05 29.6L9.75 32.9Q8.35 30.85 7.75 28.625Q7.15 26.4 7.15 24Q7.15 17.25 12.05 12.25Q16.95 7.25 23.65 7.25H25.8L22.4 3.8L24.75 1.45ZM15.05 38.6 23.15 30.4 25.55 32.8 22.1 36.2H24.25Q29.1 36.2 32.625 32.625Q36.15 29.05 36.15 24.1Q36.15 22.55 35.825 21.15Q35.5 19.75 34.9 18.55L38.25 15.25Q39.6 17.35 40.225 19.55Q40.85 21.75 40.85 24.1Q40.85 30.9 35.95 35.925Q31.05 40.95 24.4 40.95H22.1L25.55 44.35L23.15 46.7Z"/>
                                                </IconName>
                                            ) : (
                                                <IconName xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" colorType="despesa">
                                                    <path d="M2.95 14.75 6.35 11.4 18.75 23.8 27.1 15.45 40.4 28.75V23H45.05V36.85H31.15V32.15H37.1L27.15 22.15L18.8 30.5Z"/>
                                                </IconName>
                                            )}
                                            {despesa.nome}
                                        </ContainerName>
                                    </BodyCell>
                                    <BodyCell>
                                        <ContainerStatus colorType={veriPago(despesa)}>
                                            <TextStatus>{veriPago(despesa)}</TextStatus>
                                        </ContainerStatus>
                                    </BodyCell>
                                    <BodyCell>{despesa.data ? despesa.data : `${despesa.fixaDay}/${month==='full' ? new Date().toLocaleDateString().split('/')[1] : month}/${new Date().toLocaleDateString().split('/')[2]}`}</BodyCell>
                                    <BodyCell>{despesa.preco}</BodyCell>
                                    <BodyCell>
                                        <ContainerIconMore onClick={ev => {
                                            ev.stopPropagation()
                                            ev.cancelable=true
                                            setReceitaOrDespesaModal(despesa)
                                            handleClickAddOptions(ev)
                                        }}>
                                            <IconMore xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                                                <path d="M20 35Q18.75 35 17.896 34.125Q17.042 33.25 17.042 32.042Q17.042 30.792 17.896 29.896Q18.75 29 20 29Q21.25 29 22.104 29.896Q22.958 30.792 22.958 32.042Q22.958 33.25 22.104 34.125Q21.25 35 20 35ZM20 22.958Q18.75 22.958 17.896 22.104Q17.042 21.25 17.042 20Q17.042 18.75 17.896 17.896Q18.75 17.042 20 17.042Q21.25 17.042 22.104 17.896Q22.958 18.75 22.958 20Q22.958 21.25 22.104 22.104Q21.25 22.958 20 22.958ZM20 11Q18.75 11 17.896 10.104Q17.042 9.208 17.042 7.958Q17.042 6.708 17.896 5.833Q18.75 4.958 20 4.958Q21.25 4.958 22.104 5.833Q22.958 6.708 22.958 7.958Q22.958 9.208 22.104 10.104Q21.25 11 20 11Z"/>
                                            </IconMore>
                                        </ContainerIconMore>
                                    </BodyCell>
                                </BodyRow>
                            )
                        }
                    }
                })}
            </Body>
        </Table>
    </>
}

export default TableFinanceiro