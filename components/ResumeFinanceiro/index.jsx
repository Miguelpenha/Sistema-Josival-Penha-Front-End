import { useState } from 'react'
import {
    Container,
    ContainerReceitasDespesas,
    ContainerSaldos,
    Saldo,
    ContainerModalInfoReceitaOrDespesa,
    AlertCopyInfo,
    ContainerInfoReceitaOrDespesa,
    TitleInfoReceitaOrDespesa,
    InfoReceitaOrDespesa
} from './style'
import ReceitaOrDespesa from './ReceitaOrDespesa'
import { Modal } from '@material-ui/core'

export default function ResumeFinanceiro({ receitas, despesas, onDeleteReceita, onDeleteDespesa, resume, saldoReceitas, saldoDespesas, saldo, ...props }) {
    if (typeof receitas != 'string' && typeof despesas != 'string') {
        if (receitas.length || despesas.length) {
            const [openReceitaOrDespesa, setOpenReceitaOrDespesa] = useState(false)
            const [receitaOrDespesa, setReceitaOrDespesa] = useState(null)
            const [copyTextInfo, setCopyTextInfo] = useState(false)
            const closeModalReceitaOrDespesa = () => setOpenReceitaOrDespesa(false)
            const openModalReceitaOrDespesa = () => setOpenReceitaOrDespesa(true)
            
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

            function copyInfo(ev) {
                navigator.clipboard.writeText(ev.currentTarget.innerText)

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
                            />
                        ))}
                    </ContainerReceitasDespesas>
                    {resume && (
                        <ContainerSaldos>
                            <Saldo color="#EF5252">
                                <h1>Despesas - {saldoDespesas}</h1>
                            </Saldo>
                            <Saldo color="#60BF92">
                                <h1>Receitas + {saldoReceitas}</h1>
                            </Saldo>
                            <Saldo color="#0872FC">
                                <h1>Saldo {saldo}</h1>
                            </Saldo>
                        </ContainerSaldos>
                    )}
                    <Modal
                        open={openReceitaOrDespesa}
                        onClose={closeModalReceitaOrDespesa}
                    >
                        <div>
                            {receitaOrDespesa && (
                                <ContainerModalInfoReceitaOrDespesa receita={receitaOrDespesa.receita}>
                                    {copyTextInfo && <AlertCopyInfo>Texto copiado com sucesso!</AlertCopyInfo>}
                                    <ContainerInfoReceitaOrDespesa>
                                        <TitleInfoReceitaOrDespesa>Nome: </TitleInfoReceitaOrDespesa>
                                        <InfoReceitaOrDespesa title="Copiar nome" onClick={copyInfo}>{receitaOrDespesa.nome}</InfoReceitaOrDespesa>
                                    </ContainerInfoReceitaOrDespesa>
                                    <ContainerInfoReceitaOrDespesa>
                                        <TitleInfoReceitaOrDespesa>Valor: </TitleInfoReceitaOrDespesa>
                                        <InfoReceitaOrDespesa title="Copiar valor" onClick={copyInfo}>{receitaOrDespesa.preco}</InfoReceitaOrDespesa>
                                    </ContainerInfoReceitaOrDespesa>
                                    <ContainerInfoReceitaOrDespesa>
                                        <TitleInfoReceitaOrDespesa>Data: </TitleInfoReceitaOrDespesa>
                                        <InfoReceitaOrDespesa title="Copiar data" onClick={copyInfo}>{receitaOrDespesa.data}</InfoReceitaOrDespesa>
                                    </ContainerInfoReceitaOrDespesa>
                                    {receitaOrDespesa.observação && (
                                        <ContainerInfoReceitaOrDespesa>
                                            <TitleInfoReceitaOrDespesa>Observação: </TitleInfoReceitaOrDespesa>
                                            <InfoReceitaOrDespesa title="Copiar observação" onClick={copyInfo}>{receitaOrDespesa.observação}</InfoReceitaOrDespesa>
                                        </ContainerInfoReceitaOrDespesa>
                                    )}
                                    <ContainerInfoReceitaOrDespesa>
                                        <TitleInfoReceitaOrDespesa>Investimento: </TitleInfoReceitaOrDespesa>
                                        <InfoReceitaOrDespesa notCopy>
                                            {receitaOrDespesa.investimento ? 'Sim' : 'Não'}
                                        </InfoReceitaOrDespesa>
                                    </ContainerInfoReceitaOrDespesa>
                                    <ContainerInfoReceitaOrDespesa>
                                        <TitleInfoReceitaOrDespesa>Fixa: </TitleInfoReceitaOrDespesa>
                                        <InfoReceitaOrDespesa notCopy>
                                            {receitaOrDespesa.fixa ? 'Sim' : 'Não'}
                                        </InfoReceitaOrDespesa>
                                    </ContainerInfoReceitaOrDespesa>                                     
                                </ContainerModalInfoReceitaOrDespesa>
                            )}
                        </div>
                    </Modal>
                </Container>
            )
        } else {
            return null
        }
    } else {
        return null
    }
}