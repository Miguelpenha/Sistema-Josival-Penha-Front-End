import { useState, memo } from 'react'
import {
    Container,
    ContainerReceitasDespesas,
    ContainerSaldos,
    Saldo
} from './style'
import ReceitaOrDespesa from './ReceitaOrDespesa'
import ModalReceitaOrDespesa from './ModalReceitaOrDespesa'
import ModalEditReceitaOrDespesa from './ModalEditReceitaOrDespesa'

function ResumeFinanceiro({month,  receitas, despesas, onDeleteReceita, onDeleteDespesa, onEdit, resume, saldoReceitas, saldoDespesas, saldo, ...props }) {
    if (typeof receitas != 'string' && typeof despesas != 'string') {
        if (receitas.length || despesas.length) {
            const [openReceitaOrDespesa, setOpenReceitaOrDespesa] = useState(false)
            const [openEditReceitaOrDespesa, setOpenModalEditReceitaOrDespesa] = useState(false)
            const [receitaOrDespesa, setReceitaOrDespesa] = useState(null)
            const [copyTextInfo, setCopyTextInfo] = useState(false)
            const closeModalReceitaOrDespesa = () => setOpenReceitaOrDespesa(false)
            const openModalReceitaOrDespesa = () => setOpenReceitaOrDespesa(true)
            const closeModalEditReceitaOrDespesa = () => setOpenModalEditReceitaOrDespesa(false)
            const openModalEditReceitaOrDespesa = () => setOpenModalEditReceitaOrDespesa(true)
            
            const receitasBrutas = receitas
            const despesasBrutas = despesas

            receitas = []
            despesas = []

            receitasBrutas.map(receita => {
                receita.receita = true
                receita.criação.sistema = new Date(receita.criação.sistema)
                
                if (!month || month === 'full') {
                    receitas.push(receita)
                } else {
                    if (receita.fixa) {
                        receitas.push(receita)
                    } else {
                        if (receita.data.split('/')[1] === month) {
                            receitas.push(receita)
                        }
                    }
                }
            })
        
            despesasBrutas.map(despesa => {
                despesa.despesa = true
                despesa.criação.sistema = new Date(despesa.criação.sistema)

                if (!month || month === 'full') {
                    despesas.push(despesa)
                } else {
                    if (despesa.fixa) {
                        despesas.push(despesa)
                    } else {
                        if (despesa.data.split('/')[1] === month) {
                            despesas.push(despesa)
                        }
                    }
                }
            })
        
            const receitasOrDespesas = [...receitas, ...despesas]
    
            function sortDate(a, b) {
                return b.criação.sistema - a.criação.sistema
            }

            function copyInfo(ev, text) {
                navigator.clipboard.writeText(text || ev.currentTarget.innerText)

                setCopyTextInfo(true)

                setInterval(() => setCopyTextInfo(false), 5000)
            }
            
            receitasOrDespesas.sort(sortDate)
            
            return (
                <Container {...props}>
                    <ContainerReceitasDespesas>
                        {receitasOrDespesas.map((receitaOrDespesa, index) => (
                            <ReceitaOrDespesa
                                key={index}
                                auto={receitaOrDespesa.auto}
                                name={receitaOrDespesa.nome}
                                value={receitaOrDespesa.preco}
                                date={receitaOrDespesa.data || `${receitaOrDespesa.fixaDay}/${new Date().toLocaleDateString().split('/')[1]}/${new Date().toLocaleDateString().split('/')[2]}`}
                                receita={receitaOrDespesa.receita ? true : false}
                                onDeleteReceita={() => onDeleteReceita(receitaOrDespesa._id)}
                                onDeleteDespesa={() => onDeleteDespesa(receitaOrDespesa._id)}
                                openModalReceitaOrDespesa={() => {
                                    openModalReceitaOrDespesa()
                                    setReceitaOrDespesa(receitaOrDespesa)
                                }}
                                openModalEditReceitaOrDespesa={() => {
                                    openModalEditReceitaOrDespesa()
                                    setReceitaOrDespesa(receitaOrDespesa)
                                }}
                            />
                        ))}
                    </ContainerReceitasDespesas>
                    {resume && (
                        <ContainerSaldos>
                            <Saldo color="#EF5252" onClick={() => copyInfo(null, saldoDespesas)}>
                                <h1>Despesas - {saldoDespesas}</h1>
                            </Saldo>
                            <Saldo color="#60BF92" onClick={() => copyInfo(null, saldoReceitas)}>
                                <h1>Receitas + {saldoReceitas}</h1>
                            </Saldo>
                            <Saldo color="#0872FC" onClick={() => copyInfo(null, saldo)} asd={{casd: '#a3a0a050'}}>
                                <h1>Saldo {saldo}</h1>
                            </Saldo>
                        </ContainerSaldos>
                    )}
                    {receitaOrDespesa && <>
                        <ModalReceitaOrDespesa
                            open={openReceitaOrDespesa}
                            onClose={closeModalReceitaOrDespesa}
                            copyTextInfo={copyTextInfo}
                            copyInfo={copyInfo}
                            receitaOrDespesa={receitaOrDespesa}
                        />
                        <ModalEditReceitaOrDespesa
                            open={openEditReceitaOrDespesa}
                            onClose={closeModalEditReceitaOrDespesa}
                            receitaOrDespesa={receitaOrDespesa}
                            onEdit={onEdit}
                        />
                    </>}
                </Container>
            )
        } else {
            return null
        }
    } else {
        return null
    }
}

export default memo(ResumeFinanceiro)