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

function ResumeFinanceiro({ receitas, despesas, onDeleteReceita, onDeleteDespesa, resume, saldoReceitas, saldoDespesas, saldo, ...props }) {
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
            
            receitas.map(receita => {
                receita.receita = true
                receita.criação.sistema = new Date(receita.criação.sistema)
            })
        
            despesas.map(despesa => {
                despesa.despesa = true
                despesa.criação.sistema = new Date(despesa.criação.sistema)
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
                                name={receitaOrDespesa.nome}
                                value={receitaOrDespesa.preco}
                                date={receitaOrDespesa.criação.data}
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